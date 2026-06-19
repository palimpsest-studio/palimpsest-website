export type Project = {
  id: string
  created_at: string
  name: string
  description: string | null
  location: string | null
  year: number | null
  type: 'architectural' | 'interior' | 'mixed' | null
  cover_image: string | null
  images: string[] | null
  show_homepage: boolean
  show_gallery: boolean
  sort_order: number | null
}
