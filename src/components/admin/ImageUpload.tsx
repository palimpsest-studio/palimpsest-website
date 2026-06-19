'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

type Props = {
  projectId: string
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ projectId, value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const upload = async (file: File) => {
    setUploading(true)
    setUploadError('')

    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${projectId}/cover.${ext}`

    const { error } = await supabase.storage
      .from('project-images')
      .upload(path, file, { upsert: true })

    if (error) {
      setUploadError(error.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('project-images').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return
    upload(files[0])
  }

  return (
    <div>
      {label && <span className="admin-label">{label}</span>}

      {value ? (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: 12 }}>
          <Image src={value} alt="Cover" fill style={{ objectFit: 'cover' }} />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          style={{
            border: `1px dashed ${dragOver ? 'var(--color-text)' : 'var(--color-border)'}`,
            padding: 40,
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: dragOver ? '#F8F8F8' : 'transparent',
            transition: 'all 200ms ease',
            marginBottom: 12,
          }}
        >
          <p style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-subtle)' }}>
            {uploading ? 'Uploading…' : 'Drop image here or click to select'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploadError && (
        <p style={{ fontSize: 'var(--text-small)', color: '#C00', marginTop: 8 }}>
          {uploadError}
        </p>
      )}
    </div>
  )
}
