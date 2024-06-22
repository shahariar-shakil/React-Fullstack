import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <h1 className='mt-5'>Welcome to My Fullstack</h1>
          <p>
            Welcome to My App, a platform designed to simplify your experience with our services.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
          </p>
          <p>
            Here at My App, we strive to provide exceptional services and solutions tailored to your needs.
            Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.
          </p>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Why Choose Us?</h5>
              <p className="card-text">
                We are committed to delivering high-quality services with a focus on customer satisfaction.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
              </p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">
                Our mission is to innovate and simplify the way you interact with technology.
                Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
