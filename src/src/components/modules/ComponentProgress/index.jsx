import React from 'react';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const ComponentProgress = ({ loading, children }) => {
   if (loading) return <LoaderSpinner />;
   return children;
};

ComponentProgress.propTypes = {
   loading: PropTypes.bool,
   children: PropTypes.any,
};

export default ComponentProgress;
