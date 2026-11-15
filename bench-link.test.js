import { describe, expect, it } from 'vitest'
import { teaFromHash, teaSlug } from './bench-link.js'

const NAMES = ['Emerald Sencha', 'Midnight Earl Grey', 'Ceremonial Matcha']

describe('bench deep link', () => {
  it('slugs a tea name', () => {
    expect(teaSlug('Emerald Sencha')).toBe('emerald-sencha')
  })
  it('resolves a known tea from the hash', () => {
    expect(teaFromHash('#tea=midnight-earl-grey', NAMES)).toBe('Midnight Earl Grey')
  })
  it('ignores unknown teas and unrelated hashes', () => {
    expect(teaFromHash('#tea=nope', NAMES)).toBeNull()
    expect(teaFromHash('#brew', NAMES)).toBeNull()
    expect(teaFromHash('', NAMES)).toBeNull()
  })
})
