import React from 'react';
import PropTypes from 'prop-types';
import Finished from './Finished';
import Unfinished from './Unfinished';

const LessonMedal = ({ level, finished }) => {
   return finished ? <Finished level={ level } /> : <Unfinished level={ level } />;
};

LessonMedal.propTypes = {
   level: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   finished: PropTypes.bool,
};

LessonMedal.defaultProps = {
   finished: false,
   level: 0,
};

export default LessonMedal;
