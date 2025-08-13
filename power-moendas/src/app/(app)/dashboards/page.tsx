import Image from 'next/image';
import Logo from '../../../../public/image/PM.jpg';

export default function Home() {
  return (
    <div className='mx-auto w-full flex items-center justify-center flex-col'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl mb-4 max-md:text-2xl mt-5'>
          Gerenciamento Carteira Power Moendas
        </h1>
        <h2 className='text-2xl mb-4 max-md:text-xl'>GESTÃO DO PLANEJAMENTO</h2>
      </div>

      <div className='relative w-[1240px] h-[661.25px]'>
        <Image
          src={Logo}
          alt='Logo G-Tech'
          className='w-full h-full absolute top-0 left-0 rounded-lg opacity-40 z-0'
        />

        <iframe
          className='absolute top-0 left-0 w-full h-full border border-black rounded-md z-10 bg-transparent'
          title='Dashboard Power'
          src='https://app.powerbi.com/reportEmbed?reportId=2547452d-d792-4795-9ca0-3d547b3cfa80&autoAuth=true&ctid=e85dd7f0-8c72-4b11-8de6-81a4272e0320'
        />
      </div>
    </div>
  );
}
