export default function extractSeries (data, title) {
  if (Array.isArray(data) === true) {
    const serie = data.filter(obj => {
      const t = obj.series.title
      return t.substring(1, t.length - 1).trim() === title
    })
    return serie[0]
  } else {
    return data
  }
}
