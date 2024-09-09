import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 mainpage">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8">
          Welcome to our platform! We are passionate about providing the best
          services and experiences for our customers. Our team works tirelessly
          to ensure your satisfaction and success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To create innovative solutions that empower businesses and
              individuals to achieve their full potential.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To be the global leader in providing cutting-edge services and
              solutions in the tech industry.
            </p>
          </div>
        </div>
        {/* <div className="mt-8 flex justify-center">
      <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300">
        Learn More
      </button>
    </div> */}
      </div>
    </div>
  );
};

export default AboutPage;
