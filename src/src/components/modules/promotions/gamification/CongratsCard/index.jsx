import React, { useState } from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

import { isLocalhost } from 'utils/Helpers';


const apiUrl = isLocalhost() ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;
const CongratsCard = ({
   img, title, lesson, course, active, deleteGamificationsClick, handleChooseBadge,
}) => {
   const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
   const imgSrc = /^(http|https):/.test(img) ? img : `${ apiUrl }${ img }`;
   function openPopup(e) {
      e.stopPropagation();
      setDeletePopupIsOpen(!deletePopupIsOpen);
   }

   return (
      <SelectedWrapper
         hasSelected={ true }
         active={ active }
      >
         <div className='congratsCard' role='presentation' onClick={ handleChooseBadge }>
            <div className='congratsCard__content__left'>
               <div className='congratsCard__img'>
                  <img src={ imgSrc } alt='' />
               </div>
               <div className='congratsCard__text'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.extraSmall }
                     inner={ title }
                  />
                  <Text
                     style={ { fontSize: '12px' } }
                     type={ TextType.regular }
                     color='#8a94a2'
                     inner={ `${ course }/${ lesson }` }
                  />
               </div>
            </div>
            <div title='delete' role='presentation' className='congratsCard__content__right'>
               <div
                  role='presentation'
                  className='congratsCard__openDelete'
                  onClick={ (e) => openPopup(e) }
               >
                  <Icon name='Dotes' />
               </div>
               {
                  deletePopupIsOpen && (
                     <div
                        className='congratsCard__deletePopup'
                        role='presentation'
                        onClick={ (e) => {
                           e.stopPropagation();
                           deleteGamificationsClick();
                        } }
                     >
                        <Text
                           style={ { fontSize: '12px' } }
                           type={ TextType.normal }
                           inner='delete'
                        />
                     </div>
                  )
               }
            </div>
         </div>

      </SelectedWrapper>
   );
};

CongratsCard.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
   lesson: PropTypes.string,
   course: PropTypes.string,
   active: PropTypes.bool,
   deleteGamificationsClick: PropTypes.func,
   handleChooseBadge: PropTypes.func,
};

CongratsCard.defaultProps = {
   img: '',
   title: '',
   lesson: '',
   course: '',
   active: false,
   deleteGamificationsClick: () => {},
};

export default CongratsCard;
