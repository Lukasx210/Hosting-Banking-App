import React from 'react';

import RegisterForm from './RegisterForm';

export default function Register() {

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <RegisterForm/>
        </div>
      </div>
    </>
  );
}
