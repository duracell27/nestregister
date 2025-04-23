'use client'

import { logout } from "@/lib/actions/auth"

export const SignOutButton = () => {
  return (
    <form action={logout}>
      <button type="submit" >Sign Out</button>
    </form>
  )
}