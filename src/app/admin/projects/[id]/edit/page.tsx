import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ProjectForm from '@/components/admin/ProjectForm'
import type { Project } from '@/types'

type Params = Promise<{ id: string }>

export default async function EditProjectPage({ params }: { params: Params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()

  return (
    <div style={{ maxWidth: 720 }}>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h2)',
          fontWeight: 'var(--weight-light)',
          color: 'var(--color-text)',
          marginBottom: 40,
        }}
      >
        Edit project
      </h1>
      <ProjectForm project={data as Project} projectId={id} />
    </div>
  )
}
