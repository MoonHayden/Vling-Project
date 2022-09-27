import React from 'react';
import { useRouter } from 'next/router';
const index = () => {
  const router = useRouter();
  console.log(router);
  return <div>index</div>;
};

export default index;
