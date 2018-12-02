export default function addDate (arr) {
  const parsed = arr.map(r => Object.assign({
    dateObj: new Date(Date.UTC(r.year, r.month, r.day, 0, 0, 0, 0))
  }, r))
  parsed.sort((a, b) => (a.dateObj).getTime() - (b.dateObj).getTime())
  return parsed
}
