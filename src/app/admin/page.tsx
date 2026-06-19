import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import ProjectTable from '@/components/admin/ProjectTable'
import type { Project } from '@/types'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const projects: Project[] = (data ?? []) as Project[]

  return (
    <div style={{ maxWidth: 1100 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--weight-light)',
            color: 'var(--color-text)',
          }}
        >
          Projects
        </h1>
        <Link href="/admin/projects/new" className="btn btn-outline">
          Add project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-subtle)',
          }}
        >
          No projects yet.
        </p>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  )
}
