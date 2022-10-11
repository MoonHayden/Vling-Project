import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Authentication({ children }) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('masterToken') && router.pathname !== '/login') {
      router.replace('/login');
    } else if (
      localStorage.getItem('masterToken') &&
      router.pathname === '/login'
    ) {
      router.replace('/');
    } else {
      setShowChild(true);
    }
  }, [router]);
  return <>{showChild && children}</>;
}
