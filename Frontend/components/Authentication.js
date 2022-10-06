import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function authentication({ children }) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (
      !localStorage.getItem('masterToken') === 'master' &&
      router.pathname !== '/login'
    ) {
      router.push('/login');
      setShowChild(true);
    } else if (router.pathname !== '/login') {
      setShowChild(true);
    } else {
      setShowChild(true);
    }
  }, []);

  if (showChild === false) return;

  return <>{showChild && children}</>;
}
