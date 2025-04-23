
import Link from 'next/link'
import React from 'react'
import { SignInButton } from './SignInButton'

type Props = {}

export const AppBar = (props: Props) => {
  return (
    <div className='p-2 shadow flex gap-3 bg-violet-500 text-white'>
        <Link href={'/'}>Home</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
        <SignInButton/>
    </div>
  )
}