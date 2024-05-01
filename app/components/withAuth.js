// withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = checkIfUserIsLoggedIn(); // ตรวจสอบว่าผู้ใช้งานล็อกอินหรือไม่

      if (!isLoggedIn) {
        // ถ้าไม่ได้ล็อกอินให้เปลี่ยนเส้นทางไปยังหน้าล็อกอิน
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
