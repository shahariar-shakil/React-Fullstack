import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'We create responsive and user-friendly websites tailored to your needs.',
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications for iOS and Android.',
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Design intuitive and appealing interfaces that enhance user experience.',
    },
    {
      id: 4,
      title: 'Cloud Services',
      description: 'Utilize cloud technologies to improve scalability and reliability of your applications.',
    },
    {
      id: 4,
      title: 'Cloud Services',
      description: 'Utilize cloud technologies to improve scalability and reliability of your applications.',
    },
    {
      id: 5,
      title: 'Digital Marketing',
      description: 'Boost your online presence with SEO, social media, and content marketing strategies.',
    },
  ];

  return (
    <div className="container">
      <h1 className='mt-5'>Our Services</h1>
      <hr className='mb-5' />
      <div className="row">
        {services.map(service => (
          <div className="col-md-6 mb-4" key={service.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
