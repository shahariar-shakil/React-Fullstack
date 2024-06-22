import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here (e.g., clear authentication tokens)
    setIsAuthenticated(false);
    navigate('/signin'); // Redirect to the Sign In page after logging out
  }, [setIsAuthenticated, navigate]);

  return (
    <div className="container">
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
