"use client"

import React, { useState, useEffect } from 'react';
import Apage from './Apage'
import '../app.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // เมื่อโหลดหน้า Login ตรวจสอบว่ามีข้อมูลการล็อกอินบันทึกไว้ใน Local Storage หรือไม่
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []); // การใช้งาน useEffect ด้วย dependency array เป็นวิธีเพื่อให้ useEffect ทำงานเพียงครั้งเดียวเมื่อโหลดหน้า Login

  const handleLogin = () => {
    // ตรวจสอบข้อมูลการล็อกอิน
    if (username === 'admin' && password === '1234') {
      // บันทึกสถานะการล็อกอินใน Local Storage เมื่อล็อกอินสำเร็จ
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>admin</h1>
      {loggedIn ? (
        <Apage/>
      ) : (
        <form className='form'>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='btn btn-success' type="button" onClick={handleLogin}>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
