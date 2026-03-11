import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Info from 'components/elements/messages/info';
import IconButton from 'components/elements/buttons/IconButton';

const SectionsMenu = ({ sections, showSection }) => {
   // Filter out "Left Side" and "Main Background" sections
   const filteredSections = sections?.filter(item => {
      const sectionName = item.checkout_section?.name;
      return sectionName !== 'Left Side' && sectionName !== 'Main Background';
   });

   return (
      <div className='checkout__sections'>
         <Info
            title='Select a block to start editing content.'
            isHaveCancel={ false }
         />
         { filteredSections && filteredSections.map((item, i) => {
          
            const originalIndex = sections.findIndex(section => 
               section.checkout_section.slug === item.checkout_section.slug
            );
            
            return (
               <div
                  className='menu-item'
                  key={ item.checkout_section.slug }
                  onClick={ () => {
                     showSection(originalIndex, item.checkout_section.slug);
                  } }
                  role='presentation'
               >
                  <Text
                     type={ types.regularDefault }
                     size={ sizes.small }
                     inner={ item.checkout_section.name }
                  />
                  <div className='menu-item-actions'>
                     <IconButton
                        name='SchoolRoomArrowRightL'
                        onClick={ () => {} }
                     />
                  </div>
               </div>
            );
         })}
      </div>
   );
};

SectionsMenu.propTypes = {
   sections: PropTypes.array,
   showSection: PropTypes.func,
};

export default SectionsMenu;