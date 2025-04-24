import { Prompt } from 'next/font/google'
import "./globals.css";
import Foot from '@/components/footer';
import Navcomp from '@/components/navcomp';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-prompt',
});

export const metadata = {
  title: "TUSW Admission",
  description: "ระบบรับสมัครโรงเรียนเตรียมอุดมศึกษา สุวินทวงศ์",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="flex flex-col min-h-screen">
        <Navcomp />
        <main className="flex-grow">
          {children}
        </main>
        <Foot />
      </body>
    </html>
  );
}
