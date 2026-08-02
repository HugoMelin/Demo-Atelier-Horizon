export interface RichTextTextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface RichTextLinkNode {
  type: 'link'
  url: string
  target?: '_blank' | '_self' | '_parent' | '_top' | null
  children: RichTextTextNode[]
}

export type RichTextInlineNode = RichTextTextNode | RichTextLinkNode

export interface RichTextParagraphNode {
  type: 'paragraph'
  children: RichTextInlineNode[]
}

export interface RichTextHeadingNode {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: RichTextInlineNode[]
}

export interface RichTextListItemNode {
  type: 'list-item'
  children: Array<RichTextInlineNode | RichTextParagraphNode | RichTextListNode>
}

export interface RichTextListNode {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: RichTextListItemNode[]
}

export interface RichTextQuoteNode {
  type: 'quote'
  children: RichTextInlineNode[]
}

export interface RichTextCodeNode {
  type: 'code'
  language?: string
  children: RichTextTextNode[]
}

export interface RichTextImageData {
  url: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
}

export interface RichTextImageNode {
  type: 'image'
  image: RichTextImageData
  children: RichTextTextNode[]
}

export type RichTextBlock =
  | RichTextParagraphNode
  | RichTextHeadingNode
  | RichTextListNode
  | RichTextQuoteNode
  | RichTextCodeNode
  | RichTextImageNode

export type RichTextNode = RichTextBlock | RichTextListItemNode | RichTextInlineNode

// Alias conservé pour les imports déjà présents dans l'application.
export type RichTextChild = RichTextInlineNode
