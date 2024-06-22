import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="container">
      <h1>Welcome to react fullstack application</h1>
      <p>
        <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Index;
