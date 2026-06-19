import Image from 'next/image'
import type { Project } from '@/types'

type Props = {
  project: Project
  size?: 'large' | 'small'
}

export default function ProjectCard({ project, size = 'small' }: Props) {
  const meta = [project.location, project.type, project.year]
    .filter(Boolean)
    .join(' — ')

  return (
    <div className="project-card">
      <div
        className="project-card-image"
        style={{ aspectRatio: size === 'large' ? '16 / 10' : '4 / 3' }}
      >
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.name}
            fill
            sizes={
              size === 'large'
                ? '(max-width: 768px) 100vw, 60vw'
                : '(max-width: 768px) 100vw, 40vw'
            }
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            className="project-card-placeholder"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                color: 'var(--color-text-subtle)',
              }}
            >
              {project.name}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginTop: 'var(--space-xs)' }}>
        <h3 className="project-card-name">{project.name}</h3>
        {meta && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--weight-regular)',
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              color: 'var(--color-text-subtle)',
              marginTop: 6,
            }}
          >
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}
