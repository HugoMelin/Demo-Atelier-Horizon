export interface RichTextChild {
  text: string
  type: 'text'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface RichTextBlock {
  type: string
  children: RichTextChild[]
}
