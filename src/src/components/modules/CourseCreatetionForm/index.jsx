import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

const CourseCreatetionForm = ({
   title, imgUrl, input, area, secondaryButton, primaryButton, right,
   isEdit, disabled, isQuiz, subtitle, placeholder, view, skipButton,
   hasSelect, optional, hasSelectAbove, disableForRoom,
}) => {
   return (
      <div className='course__createtion__form'>
         <div className='course__createtion__form__left'>
            <div style={ { display: 'flex', flexDirection: 'column', gap: '5px' } }>
               <Text
                  inner={ title }
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               {subtitle && (
                  <Text
                     inner={ subtitle }
                     type={ types.regularDefaultGrey }
                     size={ sizes.xsmall }
                  />
               )}
            </div>
            {!right ? (
               <>
                  {hasSelectAbove && <>{ optional }</>}
                  <Input
                     { ...input }
                     placeholder={ placeholder }
                     maxlength='50'
                     characterLimit='50'
                     onChange={ input.onChange }
                  />
                  <Input
                     type='textarea'
                     { ...area }
                     maxLengthTextArea='500'
                     characterLimit='500'
                     onChange={ area.onChange }
                  />
                  {hasSelect && <>{ optional }</>}
               </>
            ) : (
               <>
                  {right}
               </>
            )}
            {!isEdit && (
               <div className='course__createtion__form__left__buttons'>
                  {secondaryButton !== undefined ? (
                     <BaseButton
                        { ...secondaryButton }
                        theme={ themes.secondary }
                     />
                  ) : (
                     <div className='' />
                  )}
                  <div className='course__createtion__form__left__buttons__rigth'>
                     {skipButton !== undefined && (
                        <BaseButton
                           { ...skipButton }
                           theme={ themes.secondary }
                        />
                     )}
          
                     <BaseButton
                     // eslint-disable-next-line no-nested-ternary
                        disabled={ isQuiz ? disabled : (!right ? (!input.value?.trim() || disableForRoom) : false) }
                        { ...primaryButton }
                     />
                  </div>
               </div>
            )}
         </div>
         {(imgUrl || view) && (
            <div className='course__createtion__form__right'>
               {!view && imgUrl && <img src={ imgUrl } alt='' />}
               {view && (
                  <>
                     {view}
                  </>
               ) }
            </div>
         )}
      </div>
   );
};

CourseCreatetionForm.propTypes = {
   title: PropTypes.string,
   isEdit: PropTypes.bool,
   imgUrl: PropTypes.string,
   right: PropTypes.any,
   input: PropTypes.any,
   area: PropTypes.object,
   secondaryButton: PropTypes.object,
   primaryButton: PropTypes.object,
   disabled: PropTypes.bool,
   isQuiz: PropTypes.bool,
   subtitle: PropTypes.string,
   placeholder: PropTypes.string,
   view: PropTypes.any,
   skipButton: PropTypes.object,
   hasSelect: PropTypes.bool,
   optional: PropTypes.any,
   hasSelectAbove: PropTypes.bool,
   disableForRoom: PropTypes.bool,
};

export default CourseCreatetionForm;
