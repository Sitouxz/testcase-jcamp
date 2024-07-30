import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface DropdownProps {
  options: { id: number; name: string }[];
  selectedOption: number | null;
  onSelect: (value: number | null) => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  defaultOption?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  label,
  loading = false,
  disabled = false,
  defaultOption = `Select ${label}`
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleOptionSelect = (id: number | null) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        className={`w-full px-4 py-3.5 bg-white shadow border border-gray-200 rounded-lg flex justify-between items-center gap-2.5 font-medium tracking-tight text-gray-500 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        onClick={toggleDropdown}
        disabled={disabled}>
        {loading
          ? 'Loading...'
          : options.find((option) => option.id === selectedOption)?.name ||
            defaultOption}{' '}
        {isOpen ? (
          <MdKeyboardArrowUp className='text-gray-500 text-lg' />
        ) : (
          <MdKeyboardArrowDown className='text-gray-500 text-lg' />
        )}
      </button>
      {isOpen && !disabled && !loading && (
        <ul className='absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto'>
          <li
            className='px-4 py-3.5 cursor-pointer hover:bg-gray-100'
            onClick={() => handleOptionSelect(null)}>
            {defaultOption}
          </li>
          {options.length ? (
            options.map((option) => (
              <li
                key={option.id}
                className='px-4 py-3.5 cursor-pointer hover:bg-gray-100'
                onClick={() => handleOptionSelect(option.id)}>
                {option.name}
              </li>
            ))
          ) : (
            <li className='px-4 py-3.5 text-gray-500'>No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
