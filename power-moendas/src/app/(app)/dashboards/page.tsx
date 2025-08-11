export default function Home() {
  return (
    <div className='mx-auto w-full flex items-center justify-center'>
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
