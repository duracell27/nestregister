import { getProtectedData } from '@/lib/actions/auth'
import { getSession } from '@/lib/session'
import React from 'react'

type Props = {}

const Dashboard = async (props: Props) => {
const response = await getProtectedData()
const session = await getSession()
console.log('lolololol',response)
console.log('session',session)
  return (
    <div></div>
  )
}

export default Dashboard