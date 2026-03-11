import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckList from 'components/elements/checkListNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import DesignCourseSectionDripDate from '../DesignCourseDripDate';

const StatusCheckList = ({ status, onChangeStatus, isPlaylist }) => {
   const [isOpenDripModal, setIsOpenDripModal] = useState(false);

   const statusWithoutDrip = [
      {
         value: '1' || 1,
         content: (
            <div className='lesson__status__item lesson__status__published'>
               <IconNew name='PublishedLessonProgramS' />
               <Text
                  inner='Published'
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#24554E' } }
               />
            </div>
         ),
      },
      {
         value: '2' || 2,
         content: (
            <div className='lesson__status__item lesson__status__unpublished'>
               <IconNew name='UnpublishedProgramS' />
               <Text
                  inner='Unpublished'
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: 'rgba(19, 31, 30, 0.8)' } }
               />
            </div>
         ),
      },
   ];

   let statusVariants = [
      ...statusWithoutDrip,
      {
         value: '3' || 3,
         content: (
            <div className='lesson__status__item lesson__status__drip'>
               <IconNew name='DripProgramS' />
               <Text
                  inner='Drip'
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#9B2355' } }
               />
            </div>
         ),
      },
   ];

   if (isPlaylist) {
      statusVariants = [...statusWithoutDrip];
   }

   const handleChangeStatus = (type) => {
      if (type === '3' || type === 3) {
         setIsOpenDripModal(true);
         return;
      }
      onChangeStatus(type);
   };

   return (
      <div className='lesson__status'>
         {isOpenDripModal && (
            <DesignCourseSectionDripDate
               onCancel={ () => setIsOpenDripModal(false) }
               onSave={ (type, data) => {
                  onChangeStatus('3', data, type);
                  setIsOpenDripModal(false);
               } }
            />
         )}
         <CheckList
            items={ statusVariants }
            values={ [status] }
            onChange={ handleChangeStatus }
         />
      </div>
   );
};

StatusCheckList.propTypes = {
   status: PropTypes.string || PropTypes.number,
   onChangeStatus: PropTypes.func,
   isPlaylist: PropTypes.bool,
};

export default StatusCheckList;
