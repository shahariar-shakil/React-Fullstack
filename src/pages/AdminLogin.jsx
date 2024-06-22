// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase'; // Ensure database is imported
import Form from '../components/Form';
import { ref, set } from 'firebase/database'; // Import set function from Firebase database

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleAdminLogin = (formData) => {
    const { email, password } = formData;
    // Assuming admin credentials
    const adminEmail = 'admin@example.com';
    const adminPassword = 'adminPassword';

    if (email === adminEmail && password === adminPassword) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin');
        })
        .catch((error) => {
          setError('Authentication failed. Please try again.');
          console.error(error);
        });
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleSubmitContact = (formData) => {
    const { name, phone, email, message } = formData;
    
    // Example path in your database where you want to store contacts
    const contactRef = ref(database, 'contacts');

    // Generate a new key for the contact
    const newContactRef = push(contactRef);

    // Set the data in the database
    set(newContactRef, {
      name: name,
      phone: phone,
      email: email,
      message: message
    }).then(() => {
      console.log('Contact message sent successfully!');
      // Optionally navigate to another page after submission
    }).catch((error) => {
      console.error('Error writing contact message: ', error);
    });
  };

  return (
    <div className="container">
      <h4 className='mt-3'>Admin Login</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form handleSubmit={handleAdminLogin} />
    </div>
  );
};

export default AdminLogin;

