// Source: https://svelte.dev/playground/b130be5e485441a1842ae97e4ce4f244?version=5.20.0

export default function slugify(str: string): string {
  return str
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
}
