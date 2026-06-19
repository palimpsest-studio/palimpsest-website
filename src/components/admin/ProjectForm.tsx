'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ImageUpload from './ImageUpload'
import type { Project } from '@/types'

type Props = {
  project?: Project
  projectId: string
}

export default function ProjectForm({ project, projectId }: Props) {
  const router = useRouter()

  const [fields, setFields] = useState({
    name: project?.name ?? '',
    description: project?.description ?? '',
    location: project?.location ?? '',
    year: project?.year?.toString() ?? '',
    type: (project?.type ?? '') as '' | 'architectural' | 'interior' | 'mixed',
    cover_image: project?.cover_image ?? '',
    images: project?.images ?? ([] as string[]),
    show_homepage: project?.show_homepage ?? false,
    show_gallery: project?.show_gallery ?? true,
    sort_order: project?.sort_order?.toString() ?? '0',
  })

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = <K extends keyof typeof fields>(key: K, value: (typeof fields)[K]) =>
    setFields((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fields.name.trim()) {
      setError('Project name is required.')
      return
    }

    const year = fields.year ? parseInt(fields.year) : null
    if (fields.year && isNaN(year!)) {
      setError('Year must be a valid number.')
      return
    }

    setSaving(true)

    const { error } = await supabase.from('projects').upsert({
      id: projectId,
      name: fields.name.trim(),
      description: fields.description.trim() || null,
      location: fields.location.trim() || null,
      year,
      type: fields.type || null,
      cover_image: fields.cover_image || null,
      images: fields.images.length > 0 ? fields.images : null,
      show_homepage: fields.show_homepage,
      show_gallery: fields.show_gallery,
      sort_order: parseInt(fields.sort_order) || 0,
    })

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  const addExtraImage = (url: string) => {
    if (url) set('images', [...fields.images, url])
  }

  const removeExtraImage = (url: string) =>
    set('images', fields.images.filter((u) => u !== url))

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="admin-field">
        <label htmlFor="name" className="admin-label">
          Name <span style={{ color: '#C00' }}>*</span>
        </label>
        <input
          id="name"
          type="text"
          value={fields.name}
          onChange={(e) => set('name', e.target.value)}
          className="admin-input"
          required
        />
      </div>

      {/* Description */}
      <div className="admin-field">
        <label htmlFor="description" className="admin-label">
          Description
        </label>
        <textarea
          id="description"
          value={fields.description}
          onChange={(e) => set('description', e.target.value)}
          rows={4}
          className="admin-input"
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Location + Year */}
      <div className="flex gap-6">
        <div className="admin-field flex-1">
          <label htmlFor="location" className="admin-label">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={fields.location}
            onChange={(e) => set('location', e.target.value)}
            className="admin-input"
          />
        </div>
        <div className="admin-field" style={{ width: 140 }}>
          <label htmlFor="year" className="admin-label">
            Year
          </label>
          <input
            id="year"
            type="text"
            value={fields.year}
            onChange={(e) => set('year', e.target.value)}
            className="admin-input"
            maxLength={4}
            placeholder="2024"
          />
        </div>
      </div>

      {/* Type */}
      <div className="admin-field">
        <label htmlFor="type" className="admin-label">
          Type
        </label>
        <select
          id="type"
          value={fields.type}
          onChange={(e) =>
            set('type', e.target.value as typeof fields.type)
          }
          className="admin-input"
        >
          <option value="">— Select type —</option>
          <option value="architectural">Architectural</option>
          <option value="interior">Interior</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Cover image */}
      <div className="admin-field">
        <ImageUpload
          projectId={projectId}
          value={fields.cover_image}
          onChange={(url) => set('cover_image', url)}
          label="Cover image"
        />
      </div>

      {/* Additional images */}
      <div className="admin-field">
        <span className="admin-label">Additional images</span>
        {fields.images.length > 0 && (
          <div
            className="flex flex-wrap"
            style={{ gap: 12, marginBottom: 16 }}
          >
            {fields.images.map((url) => (
              <div
                key={url}
                style={{ position: 'relative', width: 120, height: 90 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => removeExtraImage(url)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 3,
                    padding: '2px 6px',
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <ImageUpload
          projectId={`${projectId}/img-${fields.images.length}`}
          value=""
          onChange={addExtraImage}
          label=""
        />
      </div>

      {/* Toggles */}
      <div className="admin-field flex" style={{ gap: 40 }}>
        <label className="flex items-center" style={{ gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={fields.show_homepage}
            onChange={(e) => set('show_homepage', e.target.checked)}
            className="admin-checkbox"
          />
          <span className="admin-label" style={{ marginBottom: 0 }}>
            Show on homepage
          </span>
        </label>
        <label className="flex items-center" style={{ gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={fields.show_gallery}
            onChange={(e) => set('show_gallery', e.target.checked)}
            className="admin-checkbox"
          />
          <span className="admin-label" style={{ marginBottom: 0 }}>
            Show in gallery
          </span>
        </label>
      </div>

      {/* Sort order */}
      <div className="admin-field" style={{ width: 140 }}>
        <label htmlFor="sort_order" className="admin-label">
          Sort order
        </label>
        <input
          id="sort_order"
          type="number"
          value={fields.sort_order}
          onChange={(e) => set('sort_order', e.target.value)}
          className="admin-input"
        />
      </div>

      {error && (
        <p style={{ fontSize: 'var(--text-small)', color: '#C00', marginBottom: 20 }}>
          {error}
        </p>
      )}

      <div className="flex items-center" style={{ gap: 20, marginTop: 8 }}>
        <button
          type="submit"
          disabled={saving}
          className="btn btn-fill"
          style={{ opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving…' : project ? 'Save changes' : 'Create project'}
        </button>
        <Link href="/admin" className="btn btn-text">
          Cancel
        </Link>
      </div>
    </form>
  )
}
