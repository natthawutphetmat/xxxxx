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
        
          <form onSubmit={handleSubmit}>
          
          <div class="row">
             <div class="col">
             <br/> <input type="text" className="form-control" list="datalistOptions" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="รายการ" />
                    </div>
                   
              <div class="col-md-3">
              <br/> <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required placeholder="ราคา" />
              </div>
                 </div>
                 <br/>
                 <hr/>
                 <br/>
                 
                 <div class="row">
                <div class="col">
                <br/> <input type="text" className="form-control" list="datalistOptionss" id="ads" name="ads" value={formData.ads} onChange={handleChange} required placeholder="ค่าโฆษณา" />

                </div>
                <div class="col-md-3">
                <br/> <input type="number" className="form-control" id="ads_price" name="ads_price" value={formData.ads_price} onChange={handleChange} required placeholder="ราคา" />

                </div>
              </div>
         
                 <hr/>
             
              <div class="col-md-4">
              <br/> <input type="text" className="form-control" id="namebil" name="namebil" value={formData.namebil} onChange={handleChange} required placeholder="ชื่อลูกค้า" />
              </div>

              <br/><br/>
            <button type="submit" className="btn btn-primary">Submit</button>
               
       
         
            </form>

                  <datalist id="datalistOptions">
                        <option value="คอร์สเรียนทำโฆษณาออนไลน์ Google Ads สายเทา"/>
                        <option value="คอร์สเรียนทำโฆษณาออนไลน์ facebook Ads สายเทา"/>
                        <option value="บริการทำโฆษณา Google Ads สายเทา รายเดือน"/>
                        <option value="บริการทำโฆษณา facebook Ads สายเทา รายเดือน"/>
                        <option value="บัญชีโฆษณา Google Ads คีย์เทา อุธรแล้ว"/>
                    </datalist>

                    <datalist id="datalistOptionss">
                        <option value="ค่าโฆษณาที่ต้องจ่ายให้กับ Google (งบยิง)    วัน x    บาท"/>
                        <option value="ค่าโฆษณาที่ต้องจ่ายให้กับ facebook (งบยิง)     วัน x     บาท"/>
                    </datalist>










        </div>
      </main>
    </div>
  );
}
