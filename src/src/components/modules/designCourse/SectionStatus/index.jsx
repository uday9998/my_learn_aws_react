import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import { Popover } from '@material-ui/core';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import DesignCourseSectionDripDate from '../DesignCourseDripDate';

const SectionStatus = ({ status, onChangeStatus }) => {
   const [isOpenedPopover, setIsOpenedPopover] = useState(false);
   const [anchorEl, setAnchorEl] = useState();
   const [statusList, setStatusList] = useState([]);
   const [isOpenDripModal, setIsOpenDripModal] = useState(false);
   const statuses = [
      ['Published', 1],
      ['Drip', 2],
      // ['Lock', 3],
      ['Unpublished', 0],
   ];

   const getClassByVersion = () => {
      switch (status) {
         case 1:
            return ['published', 'Published'];
         case 2:
            return ['drip', 'Drip'];
         case 3:
            return ['lock', 'Lock'];
         default:
            return ['unpublished', 'Unpublished'];
      }
   };

   useEffect(() => {
      const toChange = statuses.filter((item) => item[1] !== status);
      setStatusList(toChange);
   }, [status]);

   const getColorByStatus = (numberStatus = status) => {
      switch (numberStatus) {
         case 1:
            return '#153833';
         case 2:
            return '#9B2355';
         case 3:
            return '#58239B';
         default:
            return '#131F1E';
      }
   };

   const getBackgroundByStatus = (numberStatus = status) => {
      switch (numberStatus) {
         case 1:
            return '#A6C9C5';
         case 2:
            return '#FEE1F2';
         case 3:
            return '#EAE1FE';
         default:
            return 'rgba(19, 31, 30, 0.1)';
      }
   };
   return (
      <div className='section__versions'>
         {isOpenDripModal && (
            <DesignCourseSectionDripDate
               onCancel={ () => setIsOpenDripModal(false) }
               onSave={ (type, data) => {
                  onChangeStatus(type, data);
                  setIsOpenDripModal(false);
               } }
            />
         )}
         <div
            role='presentation'
            style={ { background: isOpenedPopover ? getBackgroundByStatus() : 'inherit' } }
            onClick={ (e) => {
               setIsOpenedPopover(true);
               setAnchorEl(e.currentTarget);
            } }
            className={ `section__versions__button ${ isOpenedPopover ? `section__version__button__${ getClassByVersion()[0] }` : '' }` }
         >
            <IconNew
               color={ isOpenedPopover ? getColorByStatus() : null }
               name={ `${ getClassByVersion()[1] }ProgramActiveM` }
            />
         </div>
         <Popover
            open={ isOpenedPopover }
            anchorEl={ anchorEl }
            onClose={ () => setIsOpenedPopover(false) }
            className='section-status-popover custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className='section__version__content'>
               {statusList.map((item) => {
                  return (
                     <div
                        className='section__version__content__item'
                        key={ uniqueId() }
                        style={ { background: getBackgroundByStatus(item[1]) } }
                        role='presentation'
                        onClick={ () => {
                           setIsOpenedPopover(false);
                           if (item[1] === 2) {
                              setIsOpenDripModal(true);
                              return;
                           }
                           onChangeStatus(item[1]);
                        } }
                     >
                        <IconNew name={ `${ item[0] }ProgramS` } />
                        <Text
                           inner={ item[0] }
                           type={ types.regularLarge }
                           size={ sizes.xsmall }
                           style={ { color: getColorByStatus(item[1]) } }
                        />
                     </div>
                  );
               })}
            </div>
         </Popover>
      </div>
   );
};

SectionStatus.propTypes = {
   status: PropTypes.number,
   onChangeStatus: PropTypes.func,
};

export default SectionStatus;
