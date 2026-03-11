import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconButton from 'components/elements/buttons/IconButton';
import './index.scss';
import DeleteModal from 'components/elements/DeleteModal';

const AffiliateHeader = ({
   onPreview, onSave, step, setStep, createLoading, isEdit, handleClear,
}) => {
   const history = useHistory();
   const [isOpenClearModal, setIsOpenClearModal] = useState(false);
   const handleGoBack = () => {
      if (isEdit && step === 1) {
         history.goBack();
         return;
      }
      if (step === 0) {
         history.goBack();
         return;
      }
      setStep(step - 1);
   };
   return (
      <div className='affiliate__create__header'>
         {isOpenClearModal && (
            <DeleteModal
               title='Are you sure you want to delete your all changes?'
               deleteText='Yes'
               onCancel={ () => setIsOpenClearModal(false) }
               onDelete={ () => {
                  handleClear();
                  setIsOpenClearModal(false);
               } }
            />
         )}
         <div className='affiliate__create__header__wrapper'>
            <TextWithIcon
               inner='Affiliate Program'
               type={ types.regular160 }
               iconProps={ {
                  style: { cursor: 'pointer' },
                  onClick: handleGoBack,
               } }
               size={ sizes.xlarge }
            />
            {step !== 0 && (
               <div className='affiliate__create__header__wrapper__actions'>
                  {(step > 1 && !isEdit) && (
                     <>
                        <IconButton
                           name='DeleteMediaM'
                           onClick={ () => setIsOpenClearModal(true) }
                        />
                        <div className='line' />
                     </>
                  )}
                  <div className='affiliate__create__header__wrapper__actions__buttons'>
                     {/* <Button
                        text='Affiliate Dashboard Preview'
                        theme={ themes.secondary }
                        size='xsmall'
                        iconName='AffiliatePreviewM'
                        isIconRight={ true }
                        onClick={ () => onPreview() }
                        disabled={ step < 1 || createLoading }
                     /> */}
                     <Button
                        text='Save & Exit'
                        theme={ themes.secondary }
                        size='xsmall'
                        onClick={ () => onSave() }
                        disabled={ step < 1 || createLoading }
                     />
                     {/* <Button
                        text='Save & Exit'
                        onClick={ () => onSave(true) }
                        size='xsmall'
                        disabled={ step < 1 }
                     /> */}
                  </div>
               </div>
            )}
         </div>
         <div className='affiliate__create__header__line' style={ { width: `${ step === 0 ? 0 : 100 / 4 * (step - 1) }%` } } />
      </div>
   );
};

AffiliateHeader.propTypes = {
   step: PropTypes.number,
   setStep: PropTypes.func,
   onPreview: PropTypes.func,
   onSave: PropTypes.func,
   createLoading: PropTypes.bool,
   isEdit: PropTypes.bool,
   handleClear: PropTypes.func,
};

export default AffiliateHeader;
