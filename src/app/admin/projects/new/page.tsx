import { randomUUID } from 'crypto'
import ProjectForm from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  const projectId = randomUUID()

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
        Add project
      </h1>
      <ProjectForm projectId={projectId} />
    </div>
  )
}
