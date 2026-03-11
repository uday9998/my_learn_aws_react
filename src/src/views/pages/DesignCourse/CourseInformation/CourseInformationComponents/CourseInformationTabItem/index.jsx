import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';

const CourseInformationTabItem = ({
   iconName, isActive, title, onSelect,
}) => {
   return (
      <div
         className='course__information__tab__item'
         onClick={ () => onSelect(title) }
         role='presentation'
         style={ { background: isActive ? '#36796F' : 'inherit', cursor: 'pointer' } }
      >
         <div className={ `course__information__tab__item__left${ isActive ? ' course__information__tab__item__left__active' : '' }` }>
            <IconNew name={ iconName } />
            <Text
               inner={ title }
               type={ types.regularDefault }
               size={ sizes.small }
               onClick={ () => onSelect(title) }
               style={ { cursor: 'pointer', color: isActive ? '#fff' : '#131F1E' } }
            />
         </div>
         <div className='course__information__tab__item__right' role='presentation' onClick={ () => onSelect(title) }>
            <IconNew name='ArrowSectionProgramM' color={ isActive ? '#FFFFFF' : null } />
         </div>
      </div>
   );
};

CourseInformationTabItem.propTypes = {
   iconName: PropTypes.string,
   isActive: PropTypes.bool,
   title: PropTypes.string,
   onSelect: PropTypes.func,
};

export default CourseInformationTabItem;
