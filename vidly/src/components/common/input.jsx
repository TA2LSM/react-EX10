import React from 'react';

const Input = ({ name: label, value, error, onChange }) => {
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
        type={label === 'password' ? 'password' : 'text'}
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
      {error && (
        <div
          className='alert alert-danger d-flex align-items-center mt-2 mb-2'
          role='alert'
          style={{ height: '20px', fontSize: '14px' }}
        >
          {/* <i className='bi bi-exclamation-triangle-fill me-2' /> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-exclamation-triangle-fill me-2'
            viewBox='0 0 16 16'
          >
            <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
