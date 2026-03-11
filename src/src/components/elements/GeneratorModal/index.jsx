/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Input from 'components/elements/inputNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { connect } from 'react-redux';
import { generatedArraySelector, generateInprogressSelector } from 'state/modules/designCourse/create/selectors';
import { emptyGeneratedArray } from 'state/modules/designCourse/create/actions';
import { generateTitleDescOperation } from 'state/modules/designCourse/create/operations';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import IconNew from '../iconsSize';


const GeneratorModal = ({
   generateInprogress, name, value, generatedArray, setData, data,
   emptyGeneratedArrayAction, setOpenModal, generateTitleDesc, isQuiz,
   title,
}) => {
   const [post, setPost] = useState(
      value
   );
   const handleSpecificText = () => {
      let titleAndDesc = {
         title: `${ title } ${ name === 'subtitle' ? 'Subtitle' : 'Title' }`,
         btnText: `Generate Attention-Grabbing ${ name === 'subtitle' ? 'Subtitle' : 'Title' }`,
         subtitle: `Write an attention-grabbing headline for your ${ title }.`,
      };
      switch (name) {
         case 'description': titleAndDesc = {
            title: `${ title } Description`,
            btnText: 'Generate Eye-Catching Description',
            subtitle: `Write an eye-catching description for your ${ title }.`,
         };
            break;
         default:
      }
      return titleAndDesc;
   };

   const onGenerate = (name, value) => {
      generateTitleDesc(name, value);
   };


   const onDiscard = () => {
      setOpenModal({
         name: '',
         value: '',
         isOpen: false,
      });
      emptyGeneratedArrayAction();
   };

   const onApply = (name, value) => {
      if (isQuiz) {
         setData(name, value);
      } else if (title === 'Section' || title === 'Subject Line') {
         setData(value);
      } else {
         setData({ ...data, [name]: value });
      }

      onDiscard();
      if (name === 'description') {
         if (isPrint('A generated eye-catching description was applied')) {
            toast.success('A generated eye-catching description was applied');
         }
      } else if (isPrint(`A generated attention-grabbing ${ name === 'subtitle' ? 'Subtitle' : 'headline' }  was applied`)) {
         toast.success(`A generated attention-grabbing ${ name === 'subtitle' ? 'Subtitle' : 'headline' }  was applied`);
      }
   };

   const removeHtmlTags = (input) => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = input;
      return tempElement.innerText || tempElement.textContent;
   };


   return (
      <div className='generator__modal'>
         <div className='generator__modal__background' />
         <ClickOutside onClick={ () => onDiscard() }>
            <div className='generator__modal__content'>
               <div>
                  <div>
                     <Text
                        inner={ handleSpecificText().title }
                        type={ txtTypes.medium }
                        size={ txtSizes.medium }
                     />
                  </div>
                  <div
                     // eslint-disable-next-line no-nested-ternary
                     onClick={ () => onDiscard() }
                     role='presentation'
                     className='generator__modal__close'
                  ><IconNew name='CloseM' />
                  </div>
               </div>
               <div>
                  <Text
                     inner={ handleSpecificText().subtitle }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: 'rgba(114, 121, 120, 1)' } }
                  />
               </div>


               <div className='generator__modal_date'>
                  <Input
                     label='Briefly Describe Topic'
                     value={ removeHtmlTags(post) }
                     name={ name }
                     onChange={ (name, valuenew) => { setPost(valuenew); } }
                     placeholder=''
                  />
               </div>

               {generateInprogress
               && (
                  <div className='generator__modal__generated__content'>
                     <div className='generator__modal__generated__content__title'>
                        <div>
                           <Text
                              inner='Generated content'
                              type={ txtTypes.medium }
                              size={ txtSizes.medium }
                           />
                        </div>
                        <div
                           // eslint-disable-next-line no-nested-ternary
                           onClick={ () => onGenerate(title === 'Plan' ? 'plan_name' : (name === 'subtitle' || name === 'headline' || name === 'subject') ? 'title' : name, post) }
                           role='presentation'
                           className='generator__modal__close'
                        ><IconNew name='ChangeBlackM' />
                        </div>
                     </div>
                     <div className='generator__modal__line' />
                     <LoaderSpinner width={ 150 } heigth={ 150 } />
                  </div>
               )}

               {!generateInprogress && generatedArray && !!generatedArray.length
               && (
                  <div className='generator__modal__generated__content'>
                     <div className='generator__modal__generated__content__title'>
                        <div>
                           <Text
                              inner='Generated content'
                              type={ txtTypes.medium }
                              size={ txtSizes.medium }
                           />
                        </div>
                        <div
                           // eslint-disable-next-line no-nested-ternary
                           onClick={ () => onGenerate(title === 'Plan' ? 'plan_name' : (name === 'subtitle' || name === 'headline' || name === 'subject') ? 'title' : name, post) }
                           role='presentation'
                           className='generator__modal__close'
                        ><IconNew name='ChangeBlackM' />
                        </div>
                     </div>
                     <div className='generator__modal__line' />
                     {generatedArray && !!generatedArray.length && generatedArray.map((item, index) => {
                        const key = index + 1;
                        if (!item) {
                           return null;
                        }
                        return (
                           <div key={ key } className='single__title'>
                              <div>

                                 <Text
                                    inner={ item }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                                 <BaseButton
                                    text='Apply'
                                    size={ btnSize.xsmall }
                                    theme={ btnTheme.secondary }
                                    onClick={ () => onApply(name, item) }
                                 />
                              </div>
                              <div className='generator__modal__line' />
                           </div>
                        );
                     }

                     )}
                  </div>
               )}
               <div className='generator__modal__content__footer'>
                  { generatedArray && !!generatedArray.length && (
                     <BaseButton
                        text='Discard'
                        size={ btnSize.large120 }
                        theme={ btnTheme.secondary }
                        onClick={ () => onDiscard() }
                     />
                  )}
                  <BaseButton
                     text={ generatedArray && !!generatedArray.length ? 'Generate Again' : handleSpecificText().btnText }
                     theme={ btnTheme.primary }
                     isIconRight={ !!(generatedArray && !!generatedArray.length) }
                     iconName='ChangeWhiteM'
                     size={ btnSize.large }
                     disabled={ !post || generateInprogress }
                     // eslint-disable-next-line no-nested-ternary
                     onClick={ () => onGenerate(title === 'Plan' ? 'plan_name' : (name === 'subtitle' || name === 'headline' || name === 'subject') ? 'title' : name, post) }
                  />
               </div>
            </div>
         </ClickOutside>
      </div>
   );
};

GeneratorModal.defaultProps = {
   title: 'Product',
};

GeneratorModal.propTypes = {
   generateInprogress: PropTypes.bool,
   generatedArray: PropTypes.array,
   name: PropTypes.string,
   value: PropTypes.string,
   generateTitleDesc: PropTypes.func,
   emptyGeneratedArrayAction: PropTypes.func,
   setData: PropTypes.func,
   data: PropTypes.object,
   setOpenModal: PropTypes.func,
   isQuiz: PropTypes.bool,
   title: PropTypes.string,
};

const mapStateToProps = (state) => {
   return {
      generatedArray: generatedArraySelector(state),
      generateInprogress: generateInprogressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      generateTitleDesc: (name, value) => {
         dispatch(generateTitleDescOperation(name, value));
      },
      emptyGeneratedArrayAction: () => {
         dispatch(emptyGeneratedArray());
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(GeneratorModal);
