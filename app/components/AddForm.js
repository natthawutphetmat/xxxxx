// pages/addData.js

import React, { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function AddData() {
  const [formData, setFormData] = useState({
    namebil: '',
    name: '',
    price: 0,
    ads: '',
    ads_price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.webadsapp.io/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      const data = await response.json();
      console.log('Data added successfully:', data);
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data added successfully',
        timer: 3000
      });
    } catch (error) {
      console.error('Error adding data:', error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add data'
      });
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="text-center mt-3">
            <Image src='/img/favicon.ico' width={70} height={70} className='mt-5' />
            <h6>เพิ่มข้อมูล</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="namebil" className="form-label">ชื่อบิล</label>
              <input type="text" className="form-control" id="namebil" name="namebil" value={formData.namebil} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">ชื่อสินค้า</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">ราคาสินค้า</label>
              <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="ads" className="form-label">ประเภทโฆษณา</label>
              <input type="text" className="form-control" id="ads" name="ads" value={formData.ads} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="ads_price" className="form-label">ราคาโฆษณา</label>
              <input type="number" className="form-control" id="ads_price" name="ads_price" value={formData.ads_price} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}
