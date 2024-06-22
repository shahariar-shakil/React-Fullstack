// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, remove, update } from 'firebase/database';
import { auth, database } from '../firebase'; // Ensure auth is imported
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMessage, setViewMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin-login');
      }
    });

    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.keys(usersData).map(key => ({
          id: key,
          ...usersData[key]
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    const contactsRef = ref(database, 'contacts');
    onValue(contactsRef, (snapshot) => {
      const contactsData = snapshot.val();
      if (contactsData) {
        const contactsArray = Object.keys(contactsData).map((key, index) => ({
          id: index + 1,
          ...contactsData[key]
        }));
        setContacts(contactsArray);
      } else {
        setContacts([]);
      }
    });

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      unsubscribe();
    };
  }, [navigate]);

  const handleDelete = (type, id) => {
    const itemRef = ref(database, `${type}/${id}`);
    remove(itemRef).then(() => {
      console.log('Item deleted successfully.');
    }).catch((error) => {
      console.error('Error removing item:', error);
    });
  };

  const handleEdit = (type, id, currentData) => {
    setEditingItemId(id);
    setEditFormData(currentData);
  };

  const handleSaveEdit = (type, id) => {
    const { name, email, phone, message } = editFormData;

    if (name !== '' || email !== '' || phone !== '' || message !== '') {
      const updatedData = {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        message: message || undefined,
      };

      const itemRef = ref(database, `${type}/${id}`);
      update(itemRef, updatedData).then(() => {
        console.log('Item updated successfully.');
        setEditingItemId(null);
      }).catch((error) => {
        console.error('Error updating item:', error);
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleViewMessage = (message) => {
    setViewMessage(message);
  };

  const closeModal = () => {
    setViewMessage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container">
      <h4 className="">Admin Dashboard</h4>
      <hr />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Id, Name, Email, Phone or Message"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <div className="alert alert-info mt-3">Loading data...</div>}
      <h5 className="mt-5">Users Sign Up Table:</h5>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{editingItemId === user.id ? (
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : user.name}</td>
              <td>{editingItemId === user.id ? (
                <input
                  type="text"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : user.email}</td>
              <td>{editingItemId === user.id ? (
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : user.phone}</td>
              <td>
                {editingItemId === user.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm mx-1"
                      onClick={() => handleSaveEdit('users', user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm mx-1"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEdit('users', user.id, { name: user.name, email: user.email, phone: user.phone })}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete('users', user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="mt-5">Contacts Form Table:</h5>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{editingItemId === contact.id ? (
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : contact.name}</td>
              <td>{editingItemId === contact.id ? (
                <input
                  type="text"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : contact.email}</td>
              <td>{editingItemId === contact.id ? (
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : contact.phone}</td>
              <td>
                {contact.message && (
                  <>
                    {contact.message.length > 30 ? (
                      editingItemId === contact.id ? (
                        <textarea
                          value={editFormData.message}
                          onChange={handleInputChange}
                          name="message"
                          className="form-control"
                        />
                      ) : (
                        contact.message.substring(0, 30) + '...'
                      )
                    ) : (
                      contact.message
                    )}
                  </>
                )}
              </td>
              <td>
                {editingItemId === contact.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm mx-1"
                      onClick={() => handleSaveEdit('contacts', contact.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm mx-1"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEdit('contacts', contact.id, { name: contact.name, email: contact.email, phone: contact.phone, message: contact.message })}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete('contacts', contact.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info btn-sm mx-1"
                  onClick={() => handleViewMessage(contact.message)}
                >
                  View Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewMessage && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{viewMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
