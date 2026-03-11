/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
// import PropTypes from 'prop-types';

const DomainEdit = () => {
   return (
      <div className='d-domainEdit'>
         <div className='domainEdit'>
            <div className='domainEdit__content'>
               <Text
                  type={ textType.demiBold }
                  size={ textSizes.large }
                  inner='Settings'
               />
               <div className='domainEdit__input'>
                  <div className='m-t-m'>
                     <TextInput
                        placeholder='Entrepreneur Overwhelm Training'
                        label='Name'
                        type='text'
                        name='name'
                     />
                  </div>
               </div>
               <div className='domainEdit__actions'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.large }
                        text='Save'
                     />
                  </div>
               </div>
            </div>
            <div className='domainEdit__content'>
               <Text
                  type={ textType.demiBold }
                  size={ textSizes.large }
                  inner='Closed Caption'
               />
               <div className='domainEdit__input'>
                  <div className='m-t-m'>
                     <TextArea
                        placeholder='Text'
                        label='Closed Caption Text'
                        name='text'
                     />
                  </div>
               </div>
               <div className='domainEdit__actions'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.lightGreen }
                        size={ btnSize.large }
                        text='Upload'
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.large }
                        text='Save'
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

DomainEdit.propTypes = {

};
DomainEdit.defaultProps = {

};

export default DomainEdit;
