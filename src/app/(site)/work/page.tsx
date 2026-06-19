import { createClient } from '@/lib/supabase-server'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Project } from '@/types'

export default async function WorkPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('show_gallery', true)
    .order('sort_order', { ascending: true })

  const projects: Project[] = error ? [] : ((data ?? []) as Project[])

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: 'var(--space-lg) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionLabel>Work</SectionLabel>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--weight-light)',
              color: 'var(--color-text)',
              marginTop: 'var(--space-xs)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Selected Projects
          </h1>

          {projects.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-subtle)',
              }}
            >
              Projects coming soon.
            </p>
          ) : (
            <div className="gallery-grid">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size={i % 3 === 0 ? 'large' : 'small'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
