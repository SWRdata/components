export default function slugify(str: String) {
  return str
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
}
