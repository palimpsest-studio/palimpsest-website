import Image from 'next/image'
import type { Project } from '@/types'

type Props = {
  project: Project
  size?: 'large' | 'small'
  aspectRatio?: string
}

export default function ProjectCard({ project, size = 'small', aspectRatio }: Props) {
  const meta = [project.type, project.year].filter(Boolean).join(' · ')

  const ratio = aspectRatio ?? (size === 'large' ? '2 / 3' : '4 / 3')

  return (
    <div className="project-card">
      <div className="project-card-image" style={{ aspectRatio: ratio }}>
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

      <div style={{ marginTop: 14 }}>
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
              marginTop: 5,
            }}
          >
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}
