export default function Home() {
  return (
    <div className='mx-auto w-full flex items-center justify-center flex-col z-10'>
      <div className='flex flex-col items-start'>
        <h1 className='text-4xl mb-4 max-md:text-2xl'>
          Gerenciamento Carteira Power Moendas
        </h1>
        <h2 className='text-2xl mb-4 max-md:text-xl'>GESTÃO DO PLANEJAMENTO</h2>
      </div>

      <iframe
        className='border border-black rounded-md'
        title='Dashboard Power'
        width='1140'
        height='541.25'
        src='https://app.powerbi.com/reportEmbed?reportId=2547452d-d792-4795-9ca0-3d547b3cfa80&autoAuth=true&ctid=e85dd7f0-8c72-4b11-8de6-81a4272e0320'
      ></iframe>
    </div>
  );
}
