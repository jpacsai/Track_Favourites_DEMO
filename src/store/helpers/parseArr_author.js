import parseHelpers from './parseHelpers'

export default function parseArrAuthor (arr, today) {
  const parsed = arr.map(obj => {
    const year = obj.publication_year || 1900
    const month = obj.publication_month || 1
    const day = obj.publication_day || 1
    if (obj.hasOwnProperty('titleDecoded') === false) {
      obj.titleDecoded = parseHelpers.decodeTitle(obj.title)
    }
    if (obj.hasOwnProperty('future') === false) {
      const releaseDate = parseHelpers.releaseDate(year, month, day)
      obj.future = releaseDate > today
    }
    if (obj.hasOwnProperty('release') === false) {
      obj.release = parseHelpers.releaseString(year, month, day)
    }
    if (obj.hasOwnProperty('serie') === false) {
      obj.serie = obj.title.includes('#')
      if (obj.serie === true) {
        if (obj.hasOwnProperty('title_without_series') === false) {
          obj.title_without_series = parseHelpers.noSeriesTitle(obj.titleDecoded)
        }
        if (obj.hasOwnProperty('title_serie') === false) {
          obj.title_serie = parseHelpers.serieTitle(obj.titleDecoded)
        }
      }
    }
    return obj
  })
  return parsed
}
