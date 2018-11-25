import parseHelpers from './parseHelpers'

export default function parseArrAuthor (arr, today) {
  const parsed = arr.map(obj => {
    // console.log(obj.title)
    const day = obj.publication_day || 1
    const month = obj.publication_month || 1
    const year = obj.publication_year || 1900
    const titleDecode = parseHelpers.decodeTitle(obj.title)

    const book = {
      title: titleDecode,
      id: obj.work.id,
      author: obj.authors.author.name,
      authorId: obj.authors.author.id,
      imgUrl: obj.image_url,
      rating: obj.average_rating,
      url: obj.link,
      release: {
        displayYear: String(obj.publication_year) || 'unknown',
        string: parseHelpers.releaseString(year, month, day),
        dateObj: parseHelpers.releaseDate(year, month, day)
      },
      get future () { return this.release.dateObj > today },
      serie: {
        serie: titleDecode.includes('#'),
        get title_without_serie () { return this.serie === true ? parseHelpers.noSeriesTitle(titleDecode) : null },
        get serieTitle () { return this.serie === true ? parseHelpers.serieTitle(titleDecode) : null }
      }
    }
    return book
  })
  return parsed
}
