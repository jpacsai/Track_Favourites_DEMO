const parseHelpers = {
  decodeTitle (title) {
    return title.replace(/&amp;/g, '&')
  },
  releaseDate (year, month, day) {
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  },
  releaseString (year, month, day) {
    return day + '/' + month + '/' + year
  },
  noSeriesTitle (title) {
    if ((/\(/).test(title) === true) {
      return title.split('(')[0].trim()
    } else {
      return title
    }
  },
  serieTitle (title) {
    const start = title.search(/\(/) + 1
    const t = title.substring(start)
    const end = t.search(/[,#]/)
    return t.substring(0, end).trim()
  },
  extractTags (text) {
    return text.split(',')
  },
  addTags (arr) {
    const parsed = arr.map(obj => {
      const tags = this.extractTags(obj.tagString)
      return Object.assign({tags}, obj)
    }
    )
    return parsed
  }
}

export default parseHelpers
