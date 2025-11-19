import React from 'react';
import SignUpEmployer from '@/components/employer/SignUpEmployer';
import LinkerNavBar from '@/components/linker/LinkerNavBar';
import { Toaster } from '@/components/ui/sonner';
import Headersimple from '@/components/ui/header-simple';
import SignUpEmployerCompany from '@/components/employer/SignUpEmployerCompany';

export default function Signup() {
  return (
    <>
      <Headersimple />
        <div
          className="flex min-h-screen flex-col items-center justify-center py-15"
          style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
    >
        <SignUpEmployerCompany />
        <Toaster />
      </div>
    </>
  );
}
