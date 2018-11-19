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
  extractSeries (data, title) {
    if (Array.isArray(data) === true) {
      const serie = data.filter(obj => {
        const t = obj.series.title
        return t.substring(1, t.length - 1).trim() === title
      })
      return serie[0]
    } else {
      return data
    }
  },
  transformSeries (arr) {
    const t = arr.reduce((a, obj) => {
      const o = obj.work
      o.position = obj.user_position.toString()
      a.push(o)
      return a
    }, [])
    return t
  }
}

export default parseHelpers
