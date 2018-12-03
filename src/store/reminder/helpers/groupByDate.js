export default function groupByDate (arr) {
  let dates = []

  for (let i = 0; i < arr.length; i++) {
    const month = arr[i].monthText + ' ' + arr[i].year
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
