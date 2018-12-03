export default function parseReminder (obj, type) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const parsed = {
    type,
    title: obj.title,
    author: obj.author || null,
    sourceUrl: obj.sourceUrl,
    imgUrl: obj.imgUrl,
    year: (obj.dateObj).getUTCFullYear(),
    month: (obj.dateObj).getUTCMonth(),
    get monthText () {
      return monthNames[this.month]
    },
    day: (obj.dateObj).getUTCDate(),
    get displayDateString () {
      const day = ('0' + this.day).slice(-2)
      return day + ' ' + this.monthText.slice(0, 3)
    },
    id: obj.id,
    hidden: false
  }
  return parsed
}
