import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';

const ViewCard = ({ title, content }) => {
   return (
      <ItemWrapper>
         <div className='viewCard'>
            <div className='viewCard__title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ title }
               />
            </div>
            <div className='viewCard__content'>
               { content }
            </div>
         </div>
      </ItemWrapper>
   );
};

ViewCard.propTypes = {
   title: PropTypes.string,
   content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
};

ViewCard.defaultProps = {
   title: '',
   content: null,
};

export default ViewCard;
