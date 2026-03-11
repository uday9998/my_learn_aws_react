import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Input from 'components/elements/inputNew';
import Modal from 'components/elements/Modal';
import { TimePicker } from 'antd';
import IconNew from '../iconsSize';

const ApproveModal = ({
   title, btnText, onApprove, onCancel, children, isBlogDate, cancelText, dontCancelOnClickOutside,
   withoutCancel, onClickOutside, titleImg, withoutSave, className, isCommunity, onCloseCommunity,
}) => {
   const [post, setPost] = useState(
      {
         publish_date: '',
         publish_time: '',
      }
   );

   const handleClickOutside = () => {
      if (onClickOutside) {
         return onClickOutside();
      } if (isBlogDate || dontCancelOnClickOutside) {
         return () => {};
      }
      return onCancel();
   };

   return (
      <Modal>
         <div className='approve__modal'>
            <div className='approve__modal__background' />
            <ClickOutside
               onClick={ handleClickOutside }
            >
               <div className={ `approve__modal__content ${ className }` }>
                  <div className='approve__modal__content__img'>
                     {titleImg && <img src={ titleImg } alt='currency' />}
                     <Text
                        inner={ title }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                     />
                     {isCommunity && <div onClick={ onCloseCommunity } role='presentation'><IconNew name='CloseM' /></div>}
                  </div>
                  {children}
                  {isBlogDate
               && (
                  <div className='approve__modal_date'>
                     <Input
                        label='Set a Specific Publishing Date'
                        type='date'
                        value={ post.publish_date ? new Date(post.publish_date) : null }
                        name='date'
                        onChange={ (name, value) => setPost({ ...post, publish_date: value }) }
                        placeholder='Select Date'
                     />
                     <div className='time__picker__wrapper'>
                        <TimePicker 
                           placeholder='Enter the send time'
                           className='inputNew__timepicker'
                           onChange={ (time, timeString) => {
                              setPost({ ...post, publish_time: timeString });
                           } }
                        />
                     </div>
                  </div>
               )}
                  <div className={ isBlogDate ? 'approve__modal__content__footer_date' : 'approve__modal__content__footer' }>
                     {!withoutCancel && (
                        <BaseButton
                           text={ cancelText || 'Cancel' }
                           size={ btnSize.large120 }
                           theme={ btnTheme.secondary }
                           onClick={ () => onCancel() }
                        />
                     )}
                     {!withoutSave && (
                        <BaseButton
                           text={ btnText }
                           theme={ btnTheme.primary }
                           size={ isBlogDate ? btnSize.large : btnSize.large120 }
                           onClick={ isBlogDate ? () => onApprove(post) : () => onApprove() }
                        />
                     )}
                  </div>
               </div>
            </ClickOutside>
         </div>
      </Modal>
   );
};

ApproveModal.defaultProps = {
   dontCancelOnClickOutside: false,
};

ApproveModal.propTypes = {
   title: PropTypes.string,
   onApprove: PropTypes.func,
   onCancel: PropTypes.func,
   btnText: PropTypes.string,
   children: PropTypes.any,
   isBlogDate: PropTypes.bool,
   cancelText: PropTypes.string,
   dontCancelOnClickOutside: PropTypes.bool,
   withoutCancel: PropTypes.bool,
   onClickOutside: PropTypes.func,
   titleImg: PropTypes.string,
   withoutSave: PropTypes.bool,
   className: PropTypes.string,
   isCommunity: PropTypes.bool,
   onCloseCommunity: PropTypes.bool,
};

export default ApproveModal;
