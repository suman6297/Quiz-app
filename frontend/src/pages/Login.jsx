import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful:', response.data);
      alert("login sucessfull");
      navigate("/dashbord")
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      alert(" login unsucessfull / please regester ")
    }
  };

  return (
    <div>
      <h2 className='text-center text-5xl'>Login</h2>
      {error && <p style={{ color: 'red' }} className='text-center'>{error}</p>}
      <form onSubmit={handleSubmit}>

      <div className='flex m-8 text-center justify-center text-1xl'>
      <p className='mr-3'>Email</p>

        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className='border-2 border-solid border-black' />
        </div>

        <div className='flex m-8 text-center justify-center text-1xl'>
          <p className='mr-3'>Password</p>

        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className='border-2 border-solid border-black'/>

        </div>
        <p className='flex m-8 text-center justify-center text-1xl'> login with otp  <Link to="/otp" className='ml-2 text-white border-b-2'> click here</Link></p>


        <button type="submit" className='block m-auto bg-orange-500 py-2 px-6 text-2xl rounded-2xl hover:bg-yellow-400'>Login</button>
      </form>
    </div>
  );
};

export default Login;

