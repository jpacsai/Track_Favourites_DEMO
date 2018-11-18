const parseHelpers = {
  decodeTitle (title) {
    return title.replace(/&amp;/g, '&')
  },
  releaseDate (year, month, day) {
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
  },
  releaseString (year, month, day) {
    return day + '/' + month + '/' + year
  }
}

export default parseHelpers
