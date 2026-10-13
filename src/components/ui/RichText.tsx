// ============================================================
// RichText — Renderiza markdown leve (**negrito**, listas "- ")
// ============================================================

import { Fragment } from 'react'
import { parseInlineMarkdown, parseMarkdownBlocks } from '@/utils/markdown'

interface RichTextProps {
  content: string
  className?: string
}

function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInlineMarkdown(text).map((token, i) => (
        <Fragment key={i}>
          {token.type === 'bold' ? (
            <strong className="font-semibold text-gray-900">{token.value}</strong>
          ) : (
            token.value
          )}
        </Fragment>
      ))}
    </>
  )
}

export function RichText({ content, className = '' }: RichTextProps) {
  const blocks = parseMarkdownBlocks(content)

  return (
    <div className={`text-sm text-gray-700 leading-relaxed space-y-3 ${className}`}>
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i} className="space-y-1.5 pl-5">
            {block.lines.map((line, j) => (
              <li key={j} className="relative">
                <span className="absolute -left-4 text-gray-400">•</span>
                <InlineText text={line} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                <InlineText text={line} />
              </Fragment>
            ))}
          </p>
        ),
      )}
    </div>
  )
}
