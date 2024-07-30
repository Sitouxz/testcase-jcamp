import React from 'react';
import Slider from 'react-slick';
import useTitle from '../../hooks/useTitle';
import img1 from '../../assets/img/image 1.png';
import img2 from '../../assets/img/image 2.png';
import img3 from '../../assets/img/image 3.png';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type arrowProps = {
  onClick?: () => void;
};

const PageHome: React.FC = () => {
  useTitle('Layout 1 Desktop', 'Layout 1 Tablet', 'Layout 1 Mobile');

  function SampleNextArrow(props: arrowProps) {
    const { onClick } = props;
    return (
      <button
        className='absolute top-1/2 right-8 z-10 p-2 bg-white/10
      rounded-full hover:bg-white/20'
        onClick={onClick}>
        <MdKeyboardArrowRight className='text-white text-xl' />
      </button>
    );
  }

  function SamplePrevArrow(props: arrowProps) {
    const { onClick } = props;
    return (
      <button
        className='absolute top-1/2 left-8 z-10 p-2 bg-white/10
        rounded-full hover:bg-white/20'
        onClick={onClick}>
        <MdKeyboardArrowLeft className='text-white text-xl' />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out'
  };

  const slidesTemplate = (img: string) => {
    return (
      <div className='relative overflow-hidden rounded-2xl'>
        <img src={img} alt='Slide 1' className='w-full' />
        <h1 className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold'>
          Frontend <br />— Mockup
        </h1>
      </div>
    );
  };

  const slides = [img1, img2, img3];
  const cards = [
    {
      title: 'Frontend',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      lastUpdate: 'Last updated 5 mins ago'
    },
    {
      title: 'Mockup',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      lastUpdate: 'Last updated 5 mins ago'
    },
    {
      title: 'Design',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      lastUpdate: 'Last updated 5 mins ago'
    },
    {
      title: 'Test',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      lastUpdate: 'Last updated 5 mins ago'
    }
  ];

  return (
    <div className='flex flex-col items-center justify-center container px-4 py-4 mx-auto'>
      <Slider {...settings} className='w-full overflow-hidden'>
        {slides.map((slide, index) => (
          <div key={index}>{slidesTemplate(slide)}</div>
        ))}
      </Slider>
      <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4'>
        {cards.map((card, index) => (
          <div
            key={index}
            className='h-[210px] bg-neutral-100 rounded-xl shadow border border-gray-200 flex-col justify-start items-start inline-flex'>
            <div className=' h-[210px] p-5 flex-col justify-between items-start gap-4 flex'>
              <h1 className='text-gray-800 text-lg font-bold tracking-tight'>
                {card.title}
              </h1>
              <p className='text-gray-500 font-medium tracking-tight'>
                {card.description}
              </p>
              <p className='text-gray-500 text-sm font-semibold leading-tight'>
                {card.lastUpdate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageHome;
