// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, runTransaction } from 'firebase/database';
import { database, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const usersRef = ref(database, 'users');
        const userCountRef = ref(database, 'counters/userCount');

        runTransaction(userCountRef, (currentCount) => {
          if (currentCount === null) {
            return 1;
          } else {
            return currentCount + 1;
          }
        }).then((result) => {
          const userId = result.snapshot.val();
          const newUserRef = ref(database, `users/user_${userId}`);

          const userData = {
            id: userId,
            name,
            email,
            phone
          };

          set(newUserRef, userData)
            .then(() => {
              alert('User registered successfully!');
              setName('');
              setEmail('');
              setPhone('');
              setPassword('');
              navigate('/signin'); // Redirect to sign-in page after successful sign-up
            })
            .catch((error) => {
              console.error('Error saving user data:', error);
            });
        }).catch((error) => {
          console.error('Transaction failed:', error);
        });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  return (
    // <div className="container" style={{ paddingTop: '70px' }}>
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
