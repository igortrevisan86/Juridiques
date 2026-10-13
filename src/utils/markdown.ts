// ============================================================
// MARKDOWN LEVE — Inline: **negrito** | Blocos: parágrafos e listas "- "
// ============================================================

export interface MarkdownToken {
  type: 'text' | 'bold'
  value: string
}

/**
 * Quebra um texto em tokens de texto simples e trechos em negrito (**negrito**).
 */
export function parseInlineMarkdown(text: string): MarkdownToken[] {
  const tokens: MarkdownToken[] = []
  const regex = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    tokens.push({ type: 'bold', value: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return tokens
}

export interface MarkdownBlock {
  type: 'paragraph' | 'list'
  /** Em parágrafos: texto bruto (com \n). Em listas: itens sem o prefixo "- ". */
  lines: string[]
}

/**
 * Divide o conteúdo em blocos: parágrafos separados por linha em branco
 * e listas cujas linhas comecem com "- ".
 */
export function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const rawBlocks = content.trim().split(/\n\s*\n/)
  const blocks: MarkdownBlock[] = []

  for (const raw of rawBlocks) {
    const lines = raw.split('\n').filter((l) => l.trim().length > 0)
    if (lines.length === 0) continue

    const isList = lines.every((l) => l.trim().startsWith('- '))
    if (isList) {
      blocks.push({ type: 'list', lines: lines.map((l) => l.trim().slice(2)) })
    } else {
      blocks.push({ type: 'paragraph', lines })
    }
  }

  return blocks
}
