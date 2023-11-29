'use client';

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '../redux-store/store';
import './globals.css';
import Navbar from '../components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <div className="children">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
