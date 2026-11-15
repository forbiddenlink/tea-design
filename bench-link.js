// Deep links for the brew bench: "#tea=emerald-sencha" preselects a tea.

export const teaSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Returns the tea name whose slug matches the hash, or null.
export const teaFromHash = (hash, names) => {
  const match = /^#tea=([a-z0-9-]+)$/.exec(hash)
  if (!match) return null
  return names.find((name) => teaSlug(name) === match[1]) ?? null
}
