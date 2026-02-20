export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description?: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}
