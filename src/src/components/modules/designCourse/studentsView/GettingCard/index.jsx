import React from 'react';
import ListItem from 'components/elements/designCourse/studentsView/ListItem';
import PropTypes from 'prop-types';
import ViewCard from 'components/modules/designCourse/studentsView/ViewCard';


const GettingCard = ({ offers }) => {
   return (
      <ViewCard
         title='What You’ll be Getting'
         content={ offers.map(item => {
            return <ListItem key={ item.id } text={ item.text } />;
         }) }
      />
   );
};

GettingCard.propTypes = {
   offers: PropTypes.array,
};

GettingCard.defaultProps = {
   offers: [],
};

export default GettingCard;
