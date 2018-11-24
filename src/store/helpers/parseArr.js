import parseHelpers from './parseHelpers'

export default function parseArr (arr, today) {
  const parsed = arr.map(obj => {
    const day = obj.original_publication_day || 1
    const month = obj.original_publication_month || 1
    const year = obj.original_publication_year || 1900
    const title = parseHelpers.decodeTitle(obj.best_book.title)

    const book = {
      title: title,
      id: obj.id,
      author: obj.best_book.author.name,
      authorId: obj.best_book.author.id,
      imgUrl: obj.best_book.small_image_url || obj.best_book.image_url,
      rating: obj.average_rating || +((obj.ratings_sum / obj.ratings_count).toFixed(2)),
      url: 'https://www.goodreads.com/book/show/' + obj.best_book.id,
      release: {
        displayYear: String(obj.original_publication_year) || 'unknown',
        string: parseHelpers.releaseString(year, month, day),
        dateObj: parseHelpers.releaseDate(year, month, day)
      },
      get future () { return this.release.dateObj > today },
      serie: {
        serie: title.includes('#'),
        get title_without_serie () { return this.serie === true ? parseHelpers.noSeriesTitle(title) : null },
        get serieTitle () { return this.serie === true ? parseHelpers.serieTitle(title) : null },
        get position () { return this.serie === true ? obj.position : null }
      }
    }
    return book
  })
  return parsed
}
