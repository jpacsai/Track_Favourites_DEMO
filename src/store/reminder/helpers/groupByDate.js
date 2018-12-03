export default function groupByDate (arr) {
  let dates = []
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  for (let i = 0; i < arr.length; i++) {
    const month = monthNames[arr[i].month] + ' ' + arr[i].year
    const index = dates.findIndex(date => date.title === month)
    if (index === -1) {
      dates.push({ title: month, arr: [arr[i]] })
    } else {
      dates[index].arr.push(arr[i])
      dates[index].arr.sort((a, b) => a.day - b.day)
    }
  }
  return dates
}
