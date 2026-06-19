import { createClient } from '@/lib/supabase-server'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import type { Project } from '@/types'

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('show_homepage', true)
    .order('sort_order', { ascending: true })

  const featured: Project[] = error ? [] : ((data ?? []) as Project[])

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center"
        style={{ minHeight: '100vh', padding: 'var(--gutter)' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-hero)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            lineHeight: 1.1,
          }}
        >
          PALIMPS&#x3A3;EST
        </p>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--weight-light)',
            fontStyle: 'italic',
            color: 'var(--color-text-muted)',
            marginTop: 24,
          }}
        >
          Evgenia Gkratsi
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-label)',
            fontWeight: 'var(--weight-regular)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-text-subtle)',
            marginTop: 16,
          }}
        >
          Architectural &amp; Interior Designer
        </p>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        style={{
          padding: 'var(--space-lg) var(--gutter)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div
          className="about-grid"
          style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-h2)',
                fontWeight: 'var(--weight-light)',
                color: 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              Evgenia Gkratsi
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--weight-regular)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-text-subtle)',
                marginTop: 12,
              }}
            >
              Architectural &amp; Interior Designer
            </p>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--weight-light)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
            }}
          >
            <p>
              A practice rooted in the layered nature of space — where history, material, and lived
              experience converge into considered, lasting design. Palimpsest approaches each project
              as a site of accumulation, where new interventions speak with what already exists.
            </p>
            <p style={{ marginTop: '1em' }}>
              Working across architectural and interior scales, the studio brings a rigorous attention
              to material, light, and proportion. Each project is shaped by its context — physical,
              cultural, and human.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      {featured.length > 0 && (
        <section
          style={{
            padding: 'var(--space-lg) var(--gutter)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
            <SectionLabel withLine>Selected Projects</SectionLabel>

            <div className="featured-grid" style={{ marginTop: 'var(--space-md)' }}>
              {featured.map((project, i) => (
                <div
                  key={project.id}
                  className={i === 0 ? 'featured-main' : 'featured-secondary'}
                >
                  <ProjectCard project={project} size={i === 0 ? 'large' : 'small'} />
                </div>
              ))}
            </div>

            <div className="flex justify-center" style={{ marginTop: 'var(--space-md)' }}>
              <Button href="/work" variant="text">
                View all work
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
