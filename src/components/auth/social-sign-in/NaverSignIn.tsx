'use client';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverSignIn() {
  const loginFormWithNaver = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/',
      callbackHandle: true,
      isPopup: false,
      loginButton: { color: 'green', type: 1 },
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status: any) {
      if (status) {
        // const userid = naverLogin.user.getEmail();
        // const username = naverLogin.user.getName();
        // console.log(userid, username);
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];

    localStorage.setItem('access_token', token);
  };

  useEffect(() => {
    loginFormWithNaver();
    userAccessToken();
  });

  return (
    <>
      <div className="w-[52px]" id="naverIdLogin"></div>
    </>
  );
}
