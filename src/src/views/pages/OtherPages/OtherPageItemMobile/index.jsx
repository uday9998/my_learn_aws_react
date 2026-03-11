import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/elements/buttons/IconButton';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';


const OtherPageItemMobile = ({
   item,
   imgSrc,
   openPreview,
   onClick,
   updatedAt,
}) => {
   return (
      <div
         className='other__page__mob__item'
         role='presentation'
         onClick={ onClick }
      >
         <div>
            <div>
               <img src={ imgSrc } alt='Other page' />
               <span>{ item.name }</span>
            </div>
            <div
               className='other__page__mob__item__actions'
            >
               <IconButton
                  name='AffiliateEditM'
               />
               <IconButton
                  onClick={ (event) => openPreview(event, item.url) }
                  name='EyeCommentM'
                  color='#131F1E'
               />
            </div>
         </div>
         <div>
            <span>Updated at</span>
            <Text
               inner={ updatedAt }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
      </div>
   );
};

OtherPageItemMobile.propTypes = {
   item: PropTypes.object,
   imgSrc: PropTypes.string,
   openPreview: PropTypes.func,
   onClick: PropTypes.func,
   updatedAt: PropTypes.string,
};

export default OtherPageItemMobile;
