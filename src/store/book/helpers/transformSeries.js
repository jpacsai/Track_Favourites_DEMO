export default function transformSeries (arr) {
  const t = arr.reduce((a, obj) => {
    const o = obj.work
    o.position = obj.user_position.toString()
    a.push(o)
    return a
  }, [])
  return t
}
