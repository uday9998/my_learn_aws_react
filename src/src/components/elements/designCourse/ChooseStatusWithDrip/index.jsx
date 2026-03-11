import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import CheckList from 'components/elements/checkListNew';
// import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import './index.scss';
// import IconNew from 'components/elements/iconsSize';
import DesignCourseSectionDripDate from 'components/modules/designCourse/DesignCourseDripDate';
import ChooseStatus from 'components/elements/designCourse/ChooseStatus';

const ChooseStatusWithDrip = ({
   isPublished, onChangeStatus, publishDate, lesson,
}) => {
   const [isOpenDripModal, setIsOpenDripModal] = useState(false);


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
               onCancel={ (e) => { e.stopPropagation(e); e.preventDefault(e); setIsOpenDripModal(false); } }
               onSave={ (type, data) => {
                  onChangeStatus({ type: '3', data });
                  setIsOpenDripModal(false);
               } }
            />
         )}
         <ChooseStatus
            isPublished={ isPublished }
            onClick={ (data) => handleChangeStatus({ type: data }) }
            openModal={ () => setIsOpenDripModal(true) }
            publishDate={ publishDate }
            lesson={ lesson }
            publishTime=''
            onlyIcon={ true }
         />
      </div>
   );
};

ChooseStatusWithDrip.propTypes = {
   isPublished: PropTypes.string || PropTypes.number,
   onChangeStatus: PropTypes.func,
   publishDate: PropTypes.string,
   lesson: PropTypes.object,
};

export default ChooseStatusWithDrip;
