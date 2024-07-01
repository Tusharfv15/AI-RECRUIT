import Header from './questions/_components/Header'
import Footer from './questions/_components/Footer'
import Image from 'next/image';



export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <Header />
      <h2 className='flex justify-center text-xl font-bold mt-4 text-primary'>Welcome to AI-Recruit.com</h2>
      <div className='flex items-center justify-center'>
        <Image src={'/iab.jpg'} width={600} height={600} alt='Hero' priority />
      </div>
      <Footer />
      
   </div>
  );
}
