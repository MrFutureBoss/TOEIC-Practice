import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState<number>(15);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [startIndex, setStartIndex] = useState<number>(1); // State để lưu trữ chỉ số bắt đầu
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Khởi tạo inputRefs.current với độ dài bằng length
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const numberToLetter = (number: number): string => {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    return letters[number - 1] || '';
  };

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value, 10);
    if (!isNaN(newLength)) {
      setLength(newLength);
    }
  };

  const handleStartIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStartIndex = parseInt(event.target.value, 10);
    if (!isNaN(newStartIndex)) {
      setStartIndex(newStartIndex); // Cập nhật chỉ số bắt đầu
    }
  };

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    const number = parseInt(value, 10);
    const letter = numberToLetter(number);

    if (/^[A-E1-5]?$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [index]: letter || value,
      }));
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') { // Kiểm tra phím Space
      event.preventDefault(); // Ngăn chặn hành động mặc định của phím Space
      const nextIndex = index + 1;
      if (nextIndex < length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus(); // Chuyển focus sang input tiếp theo
      }
    }
  };

  const redInputCount = Object.values(checkedItems).filter((isChecked) => isChecked).length;

  return (
    <div>
      <div className='mb-4'>
        <label className='font-semibold' htmlFor='length-input'>Số câu: </label>
        <input
          id='length-input'
          type='number'
          value={length}
          onChange={handleLengthChange}
          min={1}
          className='w-13'
        />
      </div>

      <div className='mb-4'>
        <label className='font-semibold' htmlFor='start-index-input'>Chỉ số bắt đầu: </label>
        <input
          id='start-index-input'
          type='number'
          value={startIndex}
          onChange={handleStartIndexChange}
          min={1}
          className='w-13'
        />
      </div>

      <div className='mb-4'>
        <strong className='text-red-600'>Số câu sai: {redInputCount}</strong>
      </div>

      <div className='grid grid-cols-4 mt-10'>
        {Array.from({ length }, (_, index) => {
          const displayIndex = startIndex + index; // Tính chỉ số hiển thị
          return (
            <div className='p-3 flex items-center' key={displayIndex}>
              <input
                type='checkbox'
                checked={!!checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className='mr-2'
              />
              <span className='mr-2 font-semibold'>{displayIndex}.</span>
              <input
                type='text'
                placeholder='...'
                value={inputValues[index] || ''}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                maxLength={1}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el; // Gán ref nếu phần tử tồn tại
                  }
                }}
                className={`p-1 w-8 ${checkedItems[index] ? 'text-red-500 font-bold' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;