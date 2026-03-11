/* eslint-disable no-debugger */
import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Switch from 'components/elements/switchNew';
// import Input from 'components/elements/inputNew';
// import UploadImage from 'components/modules/uploadImage';
// import MultiSelect from 'components/elements/multiSelectNew';
// import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import { isEqual } from 'lodash';
// import ColorInput from 'components/elements/form/ColorInput';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import DeleteModal from 'components/elements/DeleteModal';
import LinkEdit from 'components/elements/LinkEdit';
import {
   getCommunityCategories, createCommunityCategories,
   editCommunityCategories, deleteCommunityCategory,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import IconNew from 'components/elements/iconsSize';
import Button from 'components/elements/buttons/BaseButtonNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';

const CommunitySettingsCategories = () => {
   const [categories, setCategories] = useState([]);
   const [isOpenCategory, setIsOpenCategory] = useState(false);
   const [isOpenDesc, setIsOpenDesc] = useState(null);
   const [isOpenName, setIsOpenName] = useState(null);
   const inputRef = useRef(null);
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(null);

   const [getCommunityCategoriesFunc, { loading }] = useSubmitForm(getCommunityCategories, {
      successMessage: '',
   });

   const [createCommunityCategoriesFunc, { loading: createLoading }] = useSubmitForm(createCommunityCategories, {
      successMessage: 'Category created succcessfully.',
   });

   const [editCommunityCategoriesFunc, { loading: editLoading }] = useSubmitForm(editCommunityCategories, {
      successMessage: 'Category udpated succcessfully.',
   });

   const [deleteCommunityCategoryFunc, { loading: deleteLoading }] = useSubmitForm(deleteCommunityCategory, {
      successMessage: 'Category udpated succcessfully.',
   });

   const getCategories = () => {
      getCommunityCategoriesFunc({}, (res) => {
         setCategories(res);
      });
   };

   useEffect(() => {
      getCategories();
   }, []);

   const createCategories = (name) => {
      createCommunityCategoriesFunc({ name }, (res) => {
         setCategories([...categories, res]);
      });
   };

   const editCategories = (id, name, description) => {
      const newData = { };
      if (description) {
         newData.description = description;
      } 
      if (name) {
         newData.name = name;
      }
      editCommunityCategoriesFunc({ id, data: newData }, () => {
         setIsOpenDesc(null);
         const editedCat = categories.filter(cat => cat.id === id)[0];
         editedCat.name = name;
         editedCat.description = description;
      });
   };

   const deleteCategory = (id) => {
      deleteCommunityCategoryFunc({ id }, () => {
         const catS = categories.filter(cat => cat.id !== id);
         setCategories(catS);
      });
   };


   return (
      <CommunitySettingsWrapper
         title='Community Categories'
         tooltip='text'
      >
         {(loading || createLoading || editLoading || deleteLoading) && <LoaderSpinner />}
         {!loading 
         && (
            <div className='communityCategories'>
               <div className='communityCategories__header'>
                  {!!categories.length && (
                     <Text
                        inner={ `${ categories.length } ${ categories.length > 1 ? 'Categories' : 'Category' } ` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  )}
                  <div>
                     <Button
                        iconName='plusNew'
                        theme='primary'
                        size='small14'
                        text='Add New Category'
                        isIconRight={ true }
                        isHidenDiv={ true }
                        onClick={ () => setIsOpenCategory(true) }
                        iconColor='#fff'
                     />
                  </div>
               </div>
               {isOpenCategory && (
                  <LinkEdit
                     editableLink=''
                     placeholder='Enter Category Name'
                     allowSpacing={ true }
                     maxLength={ 190 }
                     minLength={ 1 }
                     inputRef={ inputRef }
                     errorMessage='The Name field is required.'
                     onClose={ () => {
                        setIsOpenCategory(false);
                     } }
                     onSave={ (link) => {
                        createCategories(link);
                        setIsOpenCategory(false);
                     } }
                  />                 
               ) }  
               { categories && !!categories.length 
               && (
                  <div className='communityCategories__content'> 
                     <div className='video__categories__view__top'>
                        <Text
                           inner='Category Name'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </div>
                     {categories.map((category) => {
                        return (
                           <div className='communityCategories__item'>
                              <div className='communityCategories__item__general'>
                                 <div className='communityCategories__item__title'>
                                    {isOpenName !== category.id
                              && (
                                 <>
                                    <Text
                                       inner={ category.name }
                                       size={ sizes.medium }
                                       type={ types.bold }
                                    />
                                    <div
                                       role='presentation'
                                       onClick={ () => {
                                          setIsOpenName(category.id);
                                       } }
                                    >
                                       <IconNew name='RenameCategoryM' />
                                    </div>
                                 </>
                              )}
                                    {isOpenName === category.id && (
                                       <LinkEdit
                                          editableLink={ category.name }
                                          allowSpacing={ true }
                                          maxLength={ 190 }
                                          minLength={ 1 }
                                          inputRef={ inputRef }
                                          errorMessage='The Name field is required.'
                                          onClose={ () => {
                                             setIsOpenName(null);
                                          } }
                                          onSave={ (link) => {
                                             editCategories(category.id, link, category.description);
                                             setIsOpenName(null);
                                          } }
                                       />
                                    )}
                                 </div>
                                 {isOpenName !== category.id && (
                                    <div
                                       className='communityCategories__item__delete'
                                       role='presentation'
                                       title='delete'
                                       onClick={ () => setIsOpenDeletePopup(category.id) }
                                    >
                                       <IconNew name='TrashCategoryM' />
                                    </div>
                                 )}
                              </div>
                              <div className='communityCategories__item__desc'>
                                 {category.description && isOpenDesc !== category.id && (
                                    <Text
                                       inner={ category.description }
                                       size={ sizes.xsmall }
                                       type={ types.regularDefault }
                                    />
                                 )}
                                 {isOpenDesc !== category.id && category.description && (
                                    <div
                                       role='presentation'
                                       onClick={ () => {
                                          setIsOpenDesc(category.id);
                                       } }
                                    >
                                       <IconNew name='RenameCategoryM' />
                                    </div>
                                 )}

                                 {isOpenDesc !== category.id && !category.description && (
                                    <Button
                                       iconName='plusNew'
                                       theme='tertiaryGreen'
                                       size='xsmall'
                                       text='Add Category Description'
                                       isIconRight={ true }
                                       disabled={ !category.id }
                                       isHidenDiv={ true }
                                       onClick={ () => {
                                          setIsOpenDesc(category.id);
                                       } }
                                       iconColor='#24554E'
                                    />
                                 )}
                                 {isOpenDesc === category.id && (
                                    <LinkEdit
                                       editableLink={ category.description }
                                       allowSpacing={ true }
                                       isTextarea={ true }
                                       maxLength={ 190 }
                                       minLength={ 1 }
                                       errorMessage=''
                                       onClose={ () => {
                                          setIsOpenDesc(null);
                                       } }
                                       onSave={ (link) => {
                                          editCategories(category.id, category.name, link);
                                       } }
                                    />
                                 )} 
                              </div>
                           </div>
                        ); 
                     })}
                  </div>
               )}
            </div>
         )} 
         {isOpenDeletePopup && (
            <DeleteModal
               title='Are you sure you want to delete the this category?'
               description=''
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  deleteCategory(isOpenDeletePopup);
                  setIsOpenDeletePopup(null);
               } }
               onCancel={ () => setIsOpenDeletePopup(null) }
            />
         )}
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsCategories.propTypes = {
   // settings: PropTypes.object,
   // onSave: PropTypes.func,
};

export default CommunitySettingsCategories;
