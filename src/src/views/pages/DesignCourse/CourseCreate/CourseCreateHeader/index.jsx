import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import './index.scss';
import { getWindowSize } from 'utils/getWindowSize';

const CourseCreateHeader = ({
   goBack, isDesingedStep, isFinishCommunityStep, title,
}) => {
   const { innerWidth } = getWindowSize();
   const isMobile = innerWidth < 1024;
   return (
      <div className='course__create__header'>
         <div className='course__create__header__left'>
            <div className='course__create__header__back' role='presentation' onClick={ () => goBack() }>
               <Icon name='ArrowLeftLarge' />
            </div>
            <Text
               inner={ title || ((isDesingedStep && !isMobile) ? 'Back' : 'New Product') }
               type={ types.regular160 }
               size={ sizes.large }
            />
         </div>
         {isDesingedStep && (
            <div className='course__create__header__line' style={ { width: isFinishCommunityStep ? '75%' : '50%' } } />
         )}
      </div>
   );
};

CourseCreateHeader.propTypes = {
   goBack: PropTypes.func,
   isFinishCommunityStep: PropTypes.bool,
   isDesingedStep: PropTypes.bool,
   title: PropTypes.string,
};

export default CourseCreateHeader;
