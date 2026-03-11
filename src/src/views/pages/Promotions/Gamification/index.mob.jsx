import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import FirstBadgeCard from 'components/modules/promotions/gamification/FirstBadgeCard';
import AddBadgeCard from 'components/modules/promotions/gamification/AddBadgeCard';

const Gamification = ({ empty, file, completed }) => {
   return empty ? <FirstBadgeCard /> : <AddBadgeCard checked={ file ? 2 : 1 } completed={ completed } />;
};

Gamification.propTypes = {
   empty: PropTypes.bool,
   file: PropTypes.bool,
   completed: PropTypes.bool,
};

Gamification.defaultProps = {
   empty: false,
   file: false,
   completed: false,
};

export default Gamification;
