import parseHelpers from './parseHelpers'

export default function parseArrSearch (arr, today) {
  const parsed = arr.map(obj => {
    const year = obj.original_publication_year || 1900
    const month = obj.original_publication_month || 1
    const day = obj.original_publication_day || 1
    if (obj.best_book.hasOwnProperty('titleDecoded') === false) {
      obj.best_book.titleDecoded = parseHelpers.decodeTitle(obj.best_book.title)
    }
    if (obj.hasOwnProperty('future') === false) {
      const releaseDate = parseHelpers.releaseDate(year, month, day)
      obj.future = releaseDate > today
    }
    if (obj.hasOwnProperty('release') === false) {
      obj.release = parseHelpers.releaseString(year, month, day)
    }
    if (obj.hasOwnProperty('serie') === false) {
      obj.serie = obj.best_book.title.includes('#')
    }
    return obj
  })
  return parsed
}
