/* eslint-disable radix */
import React, { useState } from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';


const SettingPermission = ({
   isOpen, currentMember, handleInputChange, handlePermissonSave,
}) => {
   const [isChecked, setIsChecked] = useState(
      parseInt(currentMember.role) === 0 ? parseInt(currentMember.role) + 1 : parseInt(currentMember.role)
   );
   const members = [
      {
         title: 'Member',
         content: 'A member has access to classes and offers assigned to them.',
      },
      {
         title: 'Administrator',
         content: 'An administrator has access to everything except the payment/financial connections.',
      },
      {
         title: 'Assistant',
         content: 'An assistant only has access to delete and modify the contents on the website except the payment/financial connections.',
      },
      {
         title: 'Support Specialist',
         content: 'A support Specialist only has access to moderate comments and manage people.',
      },
   ];

   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Roles'
         borderColor='#cddaf1'
         hasCommentTooltip
         tooltipText='Assign roles to your members.'
      >
         <div className='settingPermission__content'>
            {members.map((member, i) => {
               const n = i;
               return (
                  <div className={ isChecked === i + 1 ? 'settingPermission settingPermission__checked' : 'settingPermission' } key={ n } onClick={ () => { setIsChecked(i + 1); handleInputChange('role', i === 0 ? 0 : i + 1); } } role='presentation'>
                     <div className='settingPermission__left'>
                        <div className={ isChecked === i + 1 ? 'circle__checked' : 'circle' }>
                           {isChecked && <div className='green__circle' />}
                        </div>
                     </div>
                     <div className='settingPermission__right'>
                        <div>
                           <Text
                              type={ textType.bold }
                              size={ textSize.medium }
                              inner={ member.title }
                           />
                        </div>
                        <div>
                           <Text
                              type={ textType.normal }
                              size={ textSize.extraSmall }
                              color='#8a94a2'
                              inner={ member.content }
                           />
                        </div>
                     </div>
                     <div />
                  </div>
               );
            })}
            <div className='settingPermission__btn'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  className='user-save'
                  onClick={ () => handlePermissonSave(currentMember.id) }
               />
            </div>
         </div>

      </DynamicWrapper>
   );
};

SettingPermission.propTypes = {
   isOpen: PropTypes.bool,
   currentMember: PropTypes.object,
   handleInputChange: PropTypes.func,
   handlePermissonSave: PropTypes.func,
};

SettingPermission.defaultProps = {
   isOpen: false,
};

export default SettingPermission;
