"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import AddForm from './components/AddForm';
import withAuth from './components/withAuth';



const generatePayload = require('promptpay-qr');

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("095-642-2872");
  const [amount, setAmount] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrCode, setQrCode] = useState("sample");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.webadsapp.io/bil/`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const totalPrice = data.reduce((acc, item) => acc + item.ads_price + item.price, 0);
      setTotalPrice(totalPrice);
    }
  }, [data]);

  useEffect(() => {
    const qrCodeData = generatePayload(phoneNumber, { amount: totalPrice });
    setQrCode(qrCodeData);
  }, [phoneNumber, totalPrice]);

  const copyText = () => {
    navigator.clipboard.writeText("1761696374").then(function() {
      setCopySuccess(true);
    }, function() {
      console.error('Unable to copy');
    });
  };




  const handleDelete = (id) => {
    // ส่ง request ไปยังเซิร์ฟเวอร์เพื่อลบข้อมูล
    fetch(`https://api.webadsapp.io/bil/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete data');
        }
        console.log('Data deleted successfully');
        // ลบข้อมูลใน UI หรือทำอย่างอื่นตามที่ต้องการ
        // ตัวอย่าง: อัปเดตรายการข้อมูลหรือโหลดข้อมูลใหม่
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <>
<withAuth/>
    <div className="container">
      <div className="text-center">
      <AddForm/>
      </div>
    </div>
      {data.map((item, index) => (
        <main key={index} className='box'>
          <div className="container">
            <div className="text-center mt-3">
              <Image src='/img/favicon.ico' width={70} height={70} className='mt-5' />
              <p>@adsmanager 0956422872</p>
              <h6>ใบเสนอราคา แจ้งรายละเอียดบริการต่าง</h6>
            </div>
            <div className="mt-4 "></div>
            <div className="d-flex justify-content-around">
              <h5>ลูกค้า : {item.namebil}</h5>
            </div>
            <div className="linecut "></div>
            <div className="text-center mt-3">รายละเอียดบริการ</div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">รายละเอียด</th>
                  <th scope="col"></th>
                  <th scope="col">ยอดเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td></td>
                  <td>{item.price}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>{item.ads}</td>
                  <td></td>
                  <td>{item.ads_price}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><b>Total Price</b></td>
                  <td><b>{item.ads_price + item.price} บาท</b></td>
                </tr>
              </tbody>
            </table>
            <div className="linecut"></div>
            <div className="d-flex justify-content-between">
           
            <a href={`/bil/${item.namebil}`}>xxx</a>
              <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>ลบ</button>
            </div>
          </div>
        </main>
      ))}
    </>
  );
}
