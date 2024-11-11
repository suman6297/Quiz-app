import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
  });
  const navigate=useNavigate()
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      alert("regastration sucessfull");
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      
      alert("regastration unsucessfull : please chaeck the from");
    }
  };

  return (
    <div className='m-14 text-black  '>
      <h2 className='text-center text-5xl text-white'>Registration</h2>
      {error && <p style={{ color: 'red' }} className='text-center'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='flex m-8 text-center justify-center text-1xl'>
          <p className='mr-3'>First Name</p>


        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className=' border-2 border-solid border-black' />

        </div>


        <div className='flex m-8 text-center justify-center text-1xl'>
          <p className='mr-3'>Last Name</p>


        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className='border-2 border-solid border-black' />

        </div>



     
          <div className='flex  justify-center gap-2'>
          <h1 className='text-xl mr-3'> Gender</h1>
            
        Male<input type='radio' name="gender" value="male" checked={formData.gender==='male'} onChange={handleChange} placeholder="Gender" required />

        female<input type='radio' name="gender" value="female" checked={formData.gender==='female'} onChange={handleChange} placeholder="Gender" required />

        orther<input type='radio' name="gender" value="orther" checked={formData.gender==='orther'} onChange={handleChange} placeholder="Gender" required />


        </div>

        <div className='flex m-8 text-center justify-center text-1xl'>
          <p className='mr-3'>Email</p>

      
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className='border-2 border-solid border-black'/>

        </div>

        <div className='flex m-8 text-center justify-center text-1xl'>
          <p className='mr-3'>Password</p>



        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className='border-2 border-solid border-black'/>

        </div>


        <button type="submit" className='block m-auto bg-orange-500 py-2 px-6 text-2xl rounded-2xl hover:bg-yellow-400'>Register</button>
      </form>
    </div>
  );
};

export default Register;
