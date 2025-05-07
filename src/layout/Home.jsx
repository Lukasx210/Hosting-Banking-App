import Navbar from '@/components/Navbars/AuthNavbar';
import React from 'react';

const Home = ({ children }) => {
  return (
    <>
      <Navbar fixed  />
      <main>
        <section className="relative w-full h-full mt-16 min-h-screen text-slate-600">
          <div
            className="w-full h-full bg-slate-50 "
            // style={{
            //   backgroundImage: `url(${background})`,
            // }}
          >
            {children}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
