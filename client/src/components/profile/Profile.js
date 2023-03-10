import React, { Fragment, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById,
  match,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to={'/profiles'} className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            !auth.isLoading &&
            auth.user._id === profile.user._id && (
              <Link to={'/edit-profile'} className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
