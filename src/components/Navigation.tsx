const NavigationHeader = ({ title }: { title: string }) => {
  return (
    <nav className='shadow'>
      <div className='flex items-center justify-between container px-4 py-4 mx-auto'>
        <h1 className='text-black text-2xl font-extrabold'>Frontend.</h1>
        <span className='text-black'>{title}</span>
      </div>
    </nav>
  );
};

export default NavigationHeader;
