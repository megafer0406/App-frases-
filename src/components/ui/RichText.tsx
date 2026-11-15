import { Fragment, type ReactNode } from 'react'

/**
 * Render mínimo de **negrita** y *cursiva* dentro del contenido.
 * Sin HTML: el contenido nunca se inyecta como markup.
 */
export function RichText({ text }: { text: string }) {
  return <>{parse(text)}</>
}

function parse(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>)
    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-bold text-ink">
          {token.slice(2, -2)}
        </strong>,
      )
    } else {
      nodes.push(
        <em key={key++} className="font-display italic">
          {token.slice(1, -1)}
        </em>,
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>)
  return nodes
}
