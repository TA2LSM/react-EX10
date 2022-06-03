import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const handleSave = navigate => {
  navigate('/movies');
};

const MovieForm = props => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h3>Movie Form: {id}</h3>
      <button
        className='btn btn-outline-primary'
        onClick={() => handleSave(navigate)}
      >
        Save
      </button>
    </>
  );
};

export default MovieForm;
