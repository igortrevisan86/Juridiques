// ============================================================
// TESTES — Markdown leve
// ============================================================

import { describe, it, expect } from 'vitest'
import { parseInlineMarkdown, parseMarkdownBlocks } from '@/utils/markdown'

describe('parseInlineMarkdown', () => {
  it('retorna texto simples como único token', () => {
    const tokens = parseInlineMarkdown('Texto sem formatação.')
    expect(tokens).toEqual([{ type: 'text', value: 'Texto sem formatação.' }])
  })

  it('extrai trechos em negrito', () => {
    const tokens = parseInlineMarkdown('O **Direito** é norma.')
    expect(tokens).toEqual([
      { type: 'text', value: 'O ' },
      { type: 'bold', value: 'Direito' },
      { type: 'text', value: ' é norma.' },
    ])
  })

  it('suporta múltiplos trechos em negrito', () => {
    const tokens = parseInlineMarkdown('**A** e **B**')
    expect(tokens.filter((t) => t.type === 'bold')).toHaveLength(2)
  })

  it('trata texto sem fechamento de negrito como texto comum', () => {
    const tokens = parseInlineMarkdown('abc **def')
    expect(tokens).toEqual([{ type: 'text', value: 'abc **def' }])
  })
})

describe('parseMarkdownBlocks', () => {
  it('separa parágrafos por linha em branco', () => {
    const blocks = parseMarkdownBlocks('Parágrafo um.\n\nParágrafo dois.')
    expect(blocks).toHaveLength(2)
    expect(blocks.every((b) => b.type === 'paragraph')).toBe(true)
  })

  it('detecta lista quando todas as linhas começam com "- "', () => {
    const blocks = parseMarkdownBlocks('- item um\n- item dois')
    expect(blocks).toHaveLength(1)
    expect(blocks[0].type).toBe('list')
    expect(blocks[0].lines).toEqual(['item um', 'item dois'])
  })

  it('mistura parágrafos e listas', () => {
    const blocks = parseMarkdownBlocks('Intro.\n\n- a\n- b\n\nFim.')
    expect(blocks.map((b) => b.type)).toEqual(['paragraph', 'list', 'paragraph'])
  })

  it('remove marcadores de negrito dos itens de lista', () => {
    const blocks = parseMarkdownBlocks('- **Coercibilidade**: força estatal')
    expect(blocks[0].lines[0]).toBe('**Coercibilidade**: força estatal')
  })
})
