
import { getProtectedData } from '@/lib/actions/auth';
import React from 'react'



const Dashboard = async () => {
  const res = await getProtectedData();
  return (
    <div>
      ProfilePage
      <p>{JSON.stringify(res)}</p>
    </div>
  );
}

export default Dashboard