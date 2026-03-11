import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import './index.scss';
// import cx from 'classnames';

const CreateAutomationModalContent = ({
   setIsOpenCreate,
   createAutomation,
}) => {
   // const [activeTab, setActiveTab] = useState('Follow-Ups');

   // const AutomationTypes = [
   //    'Follow-Ups', 'eCommerce', 'Retargeting', 'Webinars',
   // ];

   return (
      <div className='createAutomationModal'>
         <div>
            <div className='close' onClick={ () => setIsOpenCreate(false) } role='presentation'>
               <Icon name='CloseXNew' color='#c2cedb' />
            </div>
            <div>
               <Text
                  type={ textType.normal }
                  size={ textSizes.large }
                  inner='Create Automation'
               />
            </div>
            <div className='scratch'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text='Start From Scratch'
                  onClick={ () => createAutomation() }
               />
            </div>
            {/* <div className='or'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.small }
                  inner='or'
               />
            </div>
            <div className='template'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.small }
                  inner='Create From Template'
               />
            </div>
            <div className='automation__nav'>
               { AutomationTypes.map(type => {
                  return (
                     <div
                        className={ cx('automation__nav_item', { 'automation__nav_item_active': type === activeTab }) }
                        onClick={ () => setActiveTab(type) }
                        role='presentation'
                        key={ type }
                     >
                        <Text
                           type={ textType.normal }
                           size={ textSizes.extraSmall }
                           inner={ type }
                        />
                     </div>
                  );
               }) }
            </div>
            <div className='automation__content'>
               <div className='automation__content__item'>
                  <div className='title'>
                     <Text
                        type={ textType.bold }
                        size={ textSizes.medium }
                        inner='Message Tagged Contacts'
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.extraSmall }
                        inner='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'
                     />
                  </div>
               </div>
               <div className='automation__content__item'>
                  <div className='title'>
                     <Text
                        type={ textType.bold }
                        size={ textSizes.medium }
                        inner='Follow Up With Engaged Contacts'
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.extraSmall }
                        inner='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'
                     />
                  </div>
               </div>
               <div className='automation__content__item'>
                  <div className='title'>
                     <Text
                        type={ textType.bold }
                        size={ textSizes.medium }
                        inner='Welcome New Contacts'
                     />
                  </div>
                  <div>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.extraSmall }
                        inner='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'
                     />
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   );
};

CreateAutomationModalContent.propTypes = {
   setIsOpenCreate: PropTypes.func,
   createAutomation: PropTypes.func,
};

export default CreateAutomationModalContent;
