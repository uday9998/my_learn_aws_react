import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Info from 'components/elements/messages/info';
import Switch from 'components/elements/switchNew';
import IconButton from 'components/elements/buttons/IconButton';

const SectionsMenu = ({
   sections, showSection, changeProp,
}) => {
   return (
      <div className='schoolroom__sections'>
         <Info
            title='Select a block to start editing content.'
            isHaveCancel={ false }
         />
         { sections.map((item, i) => {
            if (item.school_room_section && item.school_room_section.props
               && (item.school_room_section.props.duplicated === 'filter'
               || item.school_room_section.props.duplicated === 'content')) {
               return null;
            }

            return (
               <div
                  className='menu-item'
                  key={ item.school_room_section.slug }
                  onClick={ () => {
                     showSection(i, item.school_room_section.slug);
                  } }
                  role='presentation'
               >
                  <Text
                     type={ types.regularDefault }
                     size={ sizes.small }
                     inner={ item.school_room_section.name }
                  />
                  <div className='menu-item-actions'>
                     {item.school_room_section.name === 'Hero' && (

                        <Switch
                           value={ item.school_room_section.props.school_slider_status }
                           onChange={ () => {
                              changeProp(!item.school_room_section.props.school_slider_status, 'school_slider_status', 'section');
                           }
                           }
                           size='medium'
                        />
                     )}
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
   changeProp: PropTypes.func,
};

export default SectionsMenu;
