'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ url, redirectTo }) 
{
  const router = useRouter();

  async function handleDelete() 
  {
    if (!confirm('Are you sure you want to delete this?')) 
        return;
    
    await fetch(url, { method: 'DELETE' });
    
    if (redirectTo) 
        router.push(redirectTo);
    
    else 
        router.refresh();
  }

  return <button onClick={handleDelete}>Delete</button>;
}
