// pages/payment.js
import React from 'react';
import Image from 'next/image';
const PaymentPage = () => {
  const paytmPhoneNumber = '095-6422872'; // เบอร์โทรศัพท์ของพร้อมเพย์
  const amount = 1000; // ยอดเงินที่ต้องการรับ

  const paytmURL = `https://paytm.me/${paytmPhoneNumber}/${amount}`;

  return (
    <div>
      <h1>รับชำระเงินผ่านพร้อมเพย์</h1>
      <p>สแกน QR Code เพื่อชำระเงินผ่านทางพร้อมเพย์</p>
      <Image src={paytmURL} alt="Paytm QR Code" width={300} height={300} />
    </div>
  );
};

export default PaymentPage;
