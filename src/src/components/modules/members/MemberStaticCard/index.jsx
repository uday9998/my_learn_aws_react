import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Icon from 'components/elements/Icon';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';

const MemberStaticCard = ({ title, description, icon }) => {
   return (
      <ItemWrapper style={ { boxShadow: 'none' } }>
         <div className='MemberStaticCard'>
            <div className='m-r-exs'>
               <Icon name={ icon } />
            </div>
            <div className='flex flex-col'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.small }
                  inner={ title }
               />
               <Text
                  type={ textType.regular }
                  size={ textSizes.small }
                  inner={ description }
                  color='#c1c7ce'
                  bold
                  style={ { fontSize: '12px' } }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

MemberStaticCard.propTypes = {
   title: PropTypes.any,
   description: PropTypes.string,
   icon: PropTypes.string,
};

export default MemberStaticCard;
