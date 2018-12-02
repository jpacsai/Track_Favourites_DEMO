export default function groupByDate (arr) {
  let dates = []
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  for (let i = 0; i < arr.length; i++) {
    const month = monthNames[arr[i].month] + ' ' + arr[i].year
    if (dates.includes(d => d === month) === false) {
      dates.push({ [month]: [arr[i]] })
    } else {
      dates[month].push(arr[i])
    }
  }
  return dates
}
