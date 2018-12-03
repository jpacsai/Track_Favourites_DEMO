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
    displayDateString: (obj.dateObj).getUTCDate() + '/' + ((obj.dateObj).getUTCMonth() + 1),
    id: obj.id,
    hidden: false
  }
  return parsed
}
