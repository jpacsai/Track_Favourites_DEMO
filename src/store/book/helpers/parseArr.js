import parseHelpers from './parseHelpers'

export default function parseArr (arr, today) {
  const parsed = arr.map(obj => {
    const day = obj.original_publication_day || obj.publication_day || 1
    const month = obj.original_publication_month || obj.publication_month || 1
    const year = obj.original_publication_year || obj.publication_year || 1900
    const titleDecode = parseHelpers.decodeTitle(obj.best_book ? obj.best_book.title : obj.title)

    const book = {
      title: titleDecode,
      id: obj.best_book ? obj.id : obj.work.id,
      author: obj.best_book ? obj.best_book.author.name : obj.authors.author.name,
      authorId: obj.best_book ? obj.best_book.author.id : obj.authors.author.id,
      imgUrl: obj.best_book ? obj.best_book.small_image_url || obj.best_book.image_url : obj.image_url,
      rating: obj.average_rating || +((obj.ratings_sum / obj.ratings_count).toFixed(2)) || 0,
      url: obj.link || 'https://www.goodreads.com/book/show/' + obj.best_book.id,
      release: {
        displayYear: obj.original_publication_year ? String(obj.original_publication_year) : obj.publication_year ? String(obj.publication_year) : 'unknown',
        string: parseHelpers.releaseString(year, month, day),
        dateObj: parseHelpers.releaseDate(year, month, day)
      },
      get future () { return this.release.dateObj > today },
      serie: {
        serie: titleDecode.includes('#'),
        get title_without_serie () { return this.serie === true ? parseHelpers.noSeriesTitle(titleDecode) : null },
        get serieTitle () { return this.serie === true ? parseHelpers.serieTitle(titleDecode) : null },
        get position () { return this.serie === true ? obj.position : null }
      }
    }
    return book
  })
  return parsed
}
