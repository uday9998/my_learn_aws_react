import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Icon from 'components/elements/Icon';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const ProductCard = ({
   buttonIconName, title, subtitle, buttonInner, iconName,
}) => {
   const history = useHistory();
   const handleNavigateToProductCreatingPage = () => {
      history.push({
         pathname: '/admin/programs/create',
         state: {
            productName: title === 'Online Course' ? 'onlineCourse' : title === 'Video Membership' ? 'program' : title.toLowerCase(),
         },
      });
   };

   return (
      <div className='card' role='presentation' onClick={ handleNavigateToProductCreatingPage }>
         <div>
            <Icon name={ iconName } />
         </div>
         <div className='card__title'>
            <Text 
               inner={ title }
               size={ sizes.medium }
               type={ types.regularMin }
            />
         </div>
         <div className='card__subtitle'>
            <Text 
               inner={ subtitle }
               size={ sizes.medium }
               style={ {
                  color: '#717171',
                  fontWeight: '400',
               } }
            />
         </div>
         <div>
            <TextWithIcon 
               inner={ buttonInner }
               isIconRight={ true }
               iconName={ buttonIconName }
               size={ sizes.extraSmall }
               style={ {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#24554e',
               } }
               onClick={ handleNavigateToProductCreatingPage }
            />
         </div>
      </div>
   );
};

ProductCard.propTypes = {
   buttonIconName: PropTypes.string,
   title: PropTypes.string,
   subtitle: PropTypes.string,
   buttonInner: PropTypes.string,
   iconName: PropTypes.string,
};

export default ProductCard;