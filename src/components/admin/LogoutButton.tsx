'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className="admin-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      Sign out
    </button>
  )
}
