import parseHelpers from './parseHelpers'
import parseArrSearch from './parseArr_Search'

export default function parseArrSeries (arr) {
  const parsed = parseArrSearch(arr)
  const a = parsed.map(obj => {
    if (obj.best_book.hasOwnProperty('titleNoSeries') === false) {
      obj.best_book.titleNoSeries = parseHelpers.noSeriesTitle(obj.best_book.titleDecoded)
    }
    return obj
  })
  return a
}
