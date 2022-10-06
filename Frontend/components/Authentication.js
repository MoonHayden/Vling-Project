import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function authentication({ children }) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);

  //   useEffect(() => {
  //     console.log('use');
  //     console.log(router.pathname);
  //     if (!localStorage.getItem('masterToken') && router.pathname !== '/login') {
  //       router.push('/login');
  //     } else if (!localStorage.getItem('masterToken')) {
  //       setShowChild(true);
  //     } else if (router?.pathname === '/login') {
  //       console.log('2');
  //       setShowChild(true);
  //     }
  //   }, []);

  useEffect(() => {
    console.log('use');
    console.log(router.pathname);
    if (!localStorage.getItem('masterToken') && router.pathname !== '/login') {
      router.push('/login');
    } else {
      setShowChild(true);
    }
  }, []);

  return <>{showChild && children}</>;
}
