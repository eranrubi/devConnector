import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';

function AddExperience({ addExperience }) {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(experience);
    navigate('/dashboard');
  };

  const [experience, setExprience] = useState({
    titel: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const { title, company, location, from, current, to, description } =
    experience;

  const updateField = (e) => {
    setExprience({ ...experience, [e.target.name]: e.target.value });
  };

  const updateCheckboxField = (e) => {
    setExprience({ ...experience, [e.target.name]: e.target.checked });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            required
            onChange={updateField}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            required
            onChange={updateField}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={updateField}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={updateField} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              onChange={updateCheckboxField}
            />{' '}
            Current Job
          </p>
        </div>
        {!current && (
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' value={to} onChange={updateField} />
          </div>
        )}
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={updateField}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
