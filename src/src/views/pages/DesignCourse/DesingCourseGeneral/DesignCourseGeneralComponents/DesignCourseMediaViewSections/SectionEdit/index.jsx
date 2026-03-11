import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import IconButton from 'components/elements/buttons/IconButton';
import Input from 'components/elements/inputNew';

const SectionEdit = ({
   onClose, onAccept, changeSectionName, name, setOpenModal,
   errorMessages
}) => {
   return (
      <div className='sectionEdit'>
         <Input
            errorMessages={ errorMessages.name }
            name='name'
            onChange={ changeSectionName }
            iconNameEdit='EditSettingsM'
            value={ name }
            maxlength={ 150 }
            placeholder='Enter a section name'
            setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
         />
         <div className='sectionEdit__icon'>
            <IconNew name='EditSettingsM' />
         </div>
         <div className='sectionEdit__btns'>
            <IconButton
               onClick={ onClose }
               theme='light'
               name='cancel'
            />
            {onAccept && (
               <IconButton
                  name='BulletCheck'
                  theme='primary'
                  onClick={ onAccept }
               />
            )}
         </div>
      </div>
   );
};

SectionEdit.propTypes = {
   onClose: PropTypes.func,
   onAccept: PropTypes.func,
   name: PropTypes.string,
   changeSectionName: PropTypes.func,
   setOpenModal: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default SectionEdit;
