import React from 'react';

const Input = ({ name: label, value, onChange }) => {
  //console.log(label);

  return (
    <div className='mb-3'>
      <label
        htmlFor={label}
        className='form-label'
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
        {/* buraya props'tan bilgi alarak direkt metin de yazabilirdim ama yukardakini tercih ettim */}
      </label>
      <input
        value={value}
        name={label}
        onChange={onChange}
        type='text'
        className='form-control'
        id={label}
        aria-describedby={label + 'Help'}
      />
      <div
        id={label + 'Help'}
        className='form-text'
      >
        Enter your {label}
      </div>
    </div>
  );
};

export default Input;
