import React, { useState, useEffect } from 'react';
import { ref, push, set, get } from 'firebase/database';
import { database } from '../firebase';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [contactId, setContactId] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchContactCount = async () => {
      const contactsRef = ref(database, 'contacts');
      const snapshot = await get(contactsRef);
      const contactsData = snapshot.val();
      if (contactsData) {
        setContactId(Object.keys(contactsData).length + 1);
      } else {
        setContactId(1);
      }
    };

    fetchContactCount();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!phoneRegex.test(phone)) newErrors.phone = 'Phone must be 10 digits.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Email is not valid.';
    if (!file) newErrors.file = 'File is required.';
    if (!message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newContactRef = push(ref(database, 'contacts'));

    const formData = {
      id: contactId,
      name,
      phone,
      email,
      file: file ? file.name : '',
      message,
    };

    set(newContactRef, formData)
      .then(() => {
        setFeedbackMessage('Thank you! It has been sent successfully.');
        setMessageType('success');
        setTimeout(() => {
          setFeedbackMessage('');
          setMessageType('');
        }, 3000);

        setName('');
        setPhone('');
        setEmail('');
        setFile(null);
        setMessage('');
        setErrors({});
      })
      .catch((error) => {
        setFeedbackMessage('Something went wrong! Please try again.');
        setMessageType('error');
        setTimeout(() => {
          setFeedbackMessage('');
          setMessageType('');
        }, 3000);

        console.error('Error submitting contact form:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-5">Contact</h1>
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
          {errors.name && <div className="text-danger">{errors.name}</div>}
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
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">File Upload</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {errors.file && <div className="text-danger">{errors.file}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {errors.message && <div className="text-danger">{errors.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {feedbackMessage && (
          <div
            className={`alert mt-3 ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}
            role="alert"
          >
            {feedbackMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;
