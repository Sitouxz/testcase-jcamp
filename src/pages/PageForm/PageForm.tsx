import React, { useState } from 'react';
import useTitle from '../../hooks/useTitle';
import {
  MdOutlineAdd,
  MdOutlineFileDownload,
  MdOutlineFileUpload,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from 'react-icons/md';

const PageForm: React.FC = () => {
  useTitle('Layout 2 Desktop', 'Layout 2 Tablet', 'Layout 2 Mobile');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('2020');
  const options = ['2020', '2021', '2022'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col items-center justify-center container px-4 py-4 mx-auto'>
      <div className='w-full  justify-start items-start gap-14 lg:gap-4 inline-flex lg:flex-row flex-col'>
        <div className=' gap-4 w-full lg:w-auto flex justify-between '>
          <button
            type='button'
            className='px-4 py-3.5 bg-[#2c2c2c] text-[#f2f2f2] rounded-lg justify-center items-center gap-2.5 flex tracking-tight font-semibold'>
            <MdOutlineAdd className='text-[#f2f2f2] text-lg' />
            Tambah
          </button>
          <div className='flex gap-4'>
            <button
              type='button'
              className='px-4 py-3.5 bg-[#cccccc] rounded-lg justify-start items-center gap-2.5 flex font-semibold tracking-tight'>
              <MdOutlineFileDownload className='text-[#2c2c2c] text-lg' />
              Import
            </button>
            <button
              type='button'
              className='px-4 py-3.5 bg-[#cccccc] rounded-lg justify-start items-center gap-2.5 flex font-semibold tracking-tight'>
              <MdOutlineFileUpload className='text-[#2c2c2c] text-lg' />
              Export
            </button>
          </div>
        </div>
        <div className='flex-1 gap-4 flex justify-center w-full flex-col md:flex-row'>
          <input
            type='text'
            className='flex-1 px-4 py-3 rounded-lg text-gray-500 font-medium tracking-tight shadow border border-gray-200 flex'
            placeholder='Search'
          />
          <div className='relative min-w-[207px]'>
            <button
              type='button'
              className='h-[52px] w-full px-4 py-3 bg-white shadow border border-gray-200 rounded-lg justify-between items-center gap-2.5 flex font-medium tracking-tight text-[#1e1e1e] '
              onClick={toggleDropdown}>
              {selectedOption}
              {isOpen ? (
                <MdKeyboardArrowUp className='text-[#1f2937]' />
              ) : (
                <MdKeyboardArrowDown className='text-[#1f2937]' />
              )}
            </button>
            {isOpen && (
              <ul
                className='absolute left-0 right-0 -mt-3 pt-3 bg-white border border-t-0 border-gray-200 rounded-lg shadow-lg z-10
              rounded-t-none
              '>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className='px-4 py-3.5 cursor-pointer hover:bg-gray-100 tracking-tight'
                    onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageForm;
