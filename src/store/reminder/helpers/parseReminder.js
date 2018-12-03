export default function parseReminder (obj, type) {
  const parsed = {
    type,
    title: obj.title,
    author: obj.author || null,
    sourceUrl: obj.sourceUrl,
    imgUrl: obj.imgUrl,
    year: (obj.dateObj).getUTCFullYear(),
    month: (obj.dateObj).getUTCMonth(),
    day: (obj.dateObj).getUTCDate(),
    get displayDateString () {
      return (this.day < 10 ? '0' + this.day : this.day) + '/' + ((this.month + 1) < 10 ? '0' + (this.month + 1) : (this.month + 1))
    },
    id: obj.id,
    hidden: false
  }
  return parsed
}
