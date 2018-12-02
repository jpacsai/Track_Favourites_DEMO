export default function parseReminder (obj, type) {
  const parsed = {
    type,
    title: obj.title,
    author: obj.author || null,
    sourceUrl: obj.sourceUrl,
    dateObj: obj.dateObj,
    displayDateString: obj.displayDateString,
    id: obj.id,
    hidden: false
  }
  return parsed
}
