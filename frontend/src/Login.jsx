import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Corrected typo from 'axiox' to 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/login', { email, password })
      .then((result) => {
        if (result.data === 'success') {
          toast.success('Login successful!');
          navigate('/home');
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error occurred. Please try again.');
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-gradient vh-100'>
      <div className='bg-white p-4 rounded shadow-lg' style={styles.formContainer}>
        <h2 className='text-center mb-4' style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' style={styles.label}>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              autoComplete='on'
              name='email'
              className='form-control rounded-pill'
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' style={styles.label}>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              autoComplete='on'
              name='password'
              className='form-control rounded-pill'
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-pill' style={styles.submitButton}>
            Login
          </button>
        </form>
        <p className='text-center mt-3' style={styles.footerText}>
          Don't have an account?{' '}
          <Link to='/' className='text-decoration-none' style={styles.link}>
            Register
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

const styles = {
  formContainer: {
    maxWidth: '400px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    borderColor: '#ddd',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#6c757d',
  },
  link: {
    color: '#007bff',
  },
};

export default Login;
