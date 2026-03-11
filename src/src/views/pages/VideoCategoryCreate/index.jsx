import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const VideoCategoryCreate = ({
   onClose,
   onCreate,
}) => {
   const [addNewCategory, setAddNewCategory] = useState(false);

   const [name, setName] = useState('');
   const handleInputChange = (value) => {
      setName(value);
   };

   const onCancel = () => {
      setAddNewCategory(false);
      setName('');
      onClose();
   };


   const handleOncreate = () => {
      onCreate({
         name: '',
         course_ids: [],
      });
   };

   return (
      <div className='videoCategory_creation__form'>
         <div className='videoCategory_creation__form__left'>
            <Text
               inner='Category Information'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            {(addNewCategory && (
               <>
                  <Input
                     label='Category Name'
                     name='name'
                     value={ name }
                     onChange={ (name, value) => handleInputChange(value) }
                     placeholder='Enter Category Name'
                  />
               </>
            )
            )}
            {(!addNewCategory && (
               <div className='videoCategory_creation__form__types'>
                  <Text
                     inner='Create your own category'
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                  />
                  <div className='videoCategory_creation__form__types__content'>
                     <div
                        className='videoCategory_creation__form__types__content__single__plus'
                        onClick={ () => handleOncreate() }
                        role='presentation'
                     >
                        <IconNew name='plusL' />
                        <Text
                           inner='Create New Category'
                           type={ types.medium150 }
                           size={ sizes.xsmall }
                        />
                     </div>
                  </div>

               </div>
            ))}
            <div className='videoCategory__btn'>
               {!!addNewCategory && (
                  <BaseButton
                     text='Add Category'
                     size={ btnSizes.large120 }
                     disabled={ false }
                     onClick={ () => {
                        handleOncreate();
                     } }
                  />
               )}
               <BaseButton
                  text='Cancel'
                  theme={ themes.secondary }
                  size={ btnSizes.large120 }
                  onClick={ () => {
                     onCancel();
                  } }
               />
            </div>
         </div>
      </div>
   );
};

VideoCategoryCreate.propTypes = {
   onClose: PropTypes.func,
   onCreate: PropTypes.func,
};

export default VideoCategoryCreate;
