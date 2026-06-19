'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

type Props = {
  projects: Project[]
}

export default function ProjectTable({ projects }: Props) {
  const router = useRouter()

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) return

    // Remove images from storage
    const { data: files } = await supabase.storage
      .from('project-images')
      .list(project.id)

    if (files && files.length > 0) {
      const paths = files.map((f) => `${project.id}/${f.name}`)
      await supabase.storage.from('project-images').remove(paths)
    }

    const { error } = await supabase.from('projects').delete().eq('id', project.id)

    if (error) {
      alert('Failed to delete: ' + error.message)
      return
    }

    router.refresh()
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Year</th>
          <th>Homepage</th>
          <th>Gallery</th>
          <th>Order</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td style={{ color: 'var(--color-text)', fontWeight: 'var(--weight-regular)' }}>
              {project.name}
            </td>
            <td>{project.type ?? '—'}</td>
            <td>{project.year ?? '—'}</td>
            <td>{project.show_homepage ? '✓' : '—'}</td>
            <td>{project.show_gallery ? '✓' : '—'}</td>
            <td>{project.sort_order ?? 0}</td>
            <td>
              <div className="flex items-center" style={{ gap: 16 }}>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="admin-nav-link"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project)}
                  className="admin-nav-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#C00',
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
