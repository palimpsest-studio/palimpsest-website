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
        className="relative flex flex-col items-center justify-center text-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Architectural frames */}
        <div className="hero-frame hero-frame-outer" />
        <div className="hero-frame hero-frame-inner" />

        {/* Content */}
        <div className="flex flex-col items-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-wordmark-wrapper">
            <span className="hero-wordmark-ghost" aria-hidden="true">
              PALIMPS&#x3A3;EST
            </span>
            <h1 className="hero-wordmark">PALIMPS&#x3A3;EST</h1>
          </div>

          <p className="hero-subtitle" style={{ marginTop: 24 }}>
            Architectural &amp; Interior Design
          </p>
          <p className="hero-name" style={{ marginTop: 8 }}>
            Evgenia Gkratsi
          </p>
        </div>

        {/* Scroll indicator */}
        <p className="hero-scroll">Scroll</p>
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
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--weight-light)',
                color: 'var(--color-text)',
                lineHeight: 1.15,
              }}
            >
              Evgenia<br />Gkratsi
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
                lineHeight: 1.8,
              }}
            >
              Architectural &amp;<br />Interior Designer
            </p>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--weight-light)',
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
            }}
          >
            <p>
              A design practice rooted in the layered nature of space, where history, material,
              and lived experience converge. Each project begins with deep contextual reading,
              allowing architecture to emerge from what already exists rather than replace it.
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
            <SectionLabel withLine>Selected Work</SectionLabel>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-hero)',
                fontWeight: 200,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                marginTop: 'var(--space-xs)',
                marginBottom: 'var(--space-md)',
                lineHeight: 1,
              }}
            >
              PROJECTS
            </h2>

            <div className="featured-grid">
              {featured[0] && (
                <div className="featured-main">
                  <ProjectCard project={featured[0]} size="large" aspectRatio="2/3" />
                </div>
              )}
              {featured.slice(1, 3).map((project) => (
                <div key={project.id} className="featured-secondary">
                  <ProjectCard project={project} size="small" aspectRatio="4/3" />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-md)' }}>
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
