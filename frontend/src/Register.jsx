import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/register', { name, email, password })
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.background}>
      <div className='bg-light p-5 rounded-lg shadow-lg' style={styles.formContainer}>
        <h2 className='text-center mb-4' style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' style={styles.label}>
              <strong>Name</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              autoComplete='off'
              name='name'
              required
              className='form-control rounded-pill'
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' style={styles.label}>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              autoComplete='off'
              name='email'
              required
              className='form-control rounded-pill'
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' style={styles.label}>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              autoComplete='off'
              name='password'
              required
              className='form-control rounded-pill'
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100 rounded-pill' style={styles.submitButton}>
            Register
          </button>
        </form>
        <p className='text-center mt-3' style={styles.footerText}>
          Already have an account?{' '}
          <Link to='/login' className='text-decoration-none' style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(https://postimg.cc/v1tsy2kr)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: '450px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontWeight: '700',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  label: {
    fontWeight: '500',
    color: '#333',
    fontSize: '1rem',
  },
  input: {
    borderColor: '#ccc',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '12px 15px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderColor: '#007bff',
    fontWeight: '600',
    padding: '12px 0',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease',
  },
  footerText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  link: {
    color: '#007bff',
    fontWeight: '600',
  },
};

export default Register;
