/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Info from 'components/elements/messages/info';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   createBundleProduct, deleteBundleProduct, duplicatePlans, getBundleProduct,
} from 'api';
import LoaderMini from 'components/elements/loaderMini';
import CheckBox from 'components/elements/form/CheckBoxNew';
import GeneratorModal from 'components/elements/GeneratorModal';
import LinkViewWithEdit from 'components/modules/LinkViewWithEdit';
import { changeCheckoutURL } from 'api/AuthApi';

const PLanMainLeft = ({
   plan, onChange, uuid, isCoursePage,
   errorMessages, removeErrorMessage
}) => {
   const [changeCheckoutURLFunc] = useSubmitForm(changeCheckoutURL, {
      successMessage: 'Checkout URL has been changed.',
   });
   const course = plan.default_course[0];
   const [searchMoodal, setSearchModal] = useState('');
   const [get, { loading }] = useSubmitForm(getBundleProduct);
   const [duplicatePlan] = useSubmitForm(duplicatePlans, {
      successMessage: 'Plan duplicated successfully.',
   });
   const [deleteBundle] = useSubmitForm(deleteBundleProduct, {
      successMessage: 'Bundle deleted successfully.',
   });
   const [create] = useSubmitForm(createBundleProduct, {
      successMessage: 'Bundles created successfully.',
   });

   const [isOpenModal, setIsOpenModal] = useState('');
   const [openGeneratorModal, setOpenGenratorModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });

   const [modal, setModal] = useState({
      isOpen: false,
      name: '',
      id: '',
   });
   const [data, setData] = useState([]);
   const [newCheckoutUrl, setNewCheckoutUrl] = useState(plan.checkout_url?.url || uuid);
   const [checkedDataIds, setCheckedDataIds] = useState([]);

   const openModal = () => {
      get([plan.id, ''], (prev) => setData(prev));
      setIsOpenModal(true);
   };
   const onCreateBundles = () => {
      create([plan.id, checkedDataIds], (prev) => {
         onChange('bundle_courses', prev);
         setIsOpenModal(false);
         setCheckedDataIds([]);
         setSearchModal('');
      });
   };

   const handleCheck = (id) => {
      if (checkedDataIds.includes(id)) {
         setCheckedDataIds(checkedDataIds.filter((e) => e !== id));
         return;
      }
      setCheckedDataIds([...checkedDataIds, id]);
   };

   const onDelete = () => {
      deleteBundle([plan.id, modal.id], () => {
         onChange('bundle_courses', plan.bundle_courses.filter((e) => e.id !== modal.id));
         setModal({
            isOpen: false,
         });
      });
   };

   useEffect(() => {
      if (!loading) {
         get([plan.id, searchMoodal], (prev) => setData(prev));
      }
   }, [searchMoodal]);

   const nameChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      onChange(name, value);
   };

   const getCheckoutUrl = () => {
      if (plan.test_mode) {
         return `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ plan.test_mode.token }/${ uuid }/0/${ plan.id }`;
      }
      return `${ process.env.REACT_APP_CHECKOUT_URL }${ newCheckoutUrl }/0/${ plan.id }`;
   };


   const handleChangeCheckoutURL = async (id, url, callback, onClose) => {
      const { data: { errors = {} } = {} } = await changeCheckoutURLFunc(
         { id, url },
         (res) => {
            setNewCheckoutUrl(url);
            callback('');
            onClose();
         },
         () => true
      ) || {};

      return errors;
   };

   return (
      <div className='plan__main__left'>
         <Input
            errorMessages={ errorMessages.name }
            value={ plan.name }
            label='Bundle Name'
            placeholder='Bundle Name'
            onChange={ nameChange } 
            withIcon={ true }
            iconName='Generator'
            setOpenModal={ (name, value) => setOpenGenratorModal({ name, value, isOpen: true }) }
            IToolTipTextNew='AI Generator'
            name='name'
            maxlength={ 30 }
            helpText={ `${ (plan.name || '').length }/30` }
         />
         {modal.isOpen && (
            <DeleteModal
               deleteText='Delete'
               title={ `Are you sure you want to delete the [${ modal.name }] product from bundle` }
               onCancel={ () => setModal({ isOpen: false }) }
               maxWidth={ 414 }
               onDelete={ () => onDelete() }
            />
         )}
         {isOpenModal && (
            <ModalNew onCloseModal={ () => setIsOpenModal(false) }>
               <div className='plan__main__left__modal'>
                  <div className='plan__main__left__modal__top'>
                     <Text
                        inner='Add Product to Bundle'
                        type={ types.medium }
                        size={ sizes.xxlarge }
                     />
                     <Text
                        inner='Choose from the list of products'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
                  <div className='plan__main__left__modal__middle'>
                     <Input
                        type='search'
                        value={ searchMoodal }
                        onChange={ (name, value) => setSearchModal(value) }
                        placeholder='Search'
                     />
                     {loading ? (
                        <LoaderMini
                           color='#131F1E'
                        />
                     ) : (
                        <div className='plan__main__left__modal__middle__items'>
                           {data.map((e, index) => {
                              return (
                                 <div
                                    key={ index }
                                    className='plan__main__left__modal__middle__item'
                                 >
                                    <CheckBox
                                       checked={ checkedDataIds.includes(e.id) }
                                       onChange={ () => handleCheck(e.id) }
                                    />
                                    <Text
                                       inner={ e.name }
                                       type={ types.regularDefault }
                                       size={ sizes.small }
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     )}
                  </div>
                  <div className='plan__main__left__modal__buttons'>
                     <Button
                        theme={ themes.secondary }
                        text='Close'
                        onClick={ () => {
                           setIsOpenModal(false);
                           setCheckedDataIds([]);
                           setSearchModal('');
                        } }
                     />
                     <Button
                        text='Add Products'
                        onClick={ () => onCreateBundles() }
                        disabled={ !checkedDataIds.length }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         {!plan.publish_without_integrations && getCheckoutUrl() && (
            // <Input
            //    value={ getCheckoutUrl() }
            //    isHaveCopyButton={ true }
            //    label='Checkout Page URL'
            // />
            <LinkViewWithEdit
               label='Checkout Page URL'
               copyUrl={ getCheckoutUrl() }
               isValid={ plan && plan.status === 1 }
               constantUrlStart={ process.env.REACT_APP_CHECKOUT_URL }
               editableLink={ newCheckoutUrl }
               constantUrlEnd={ `/0/${ plan.id }` }
               onSave={ (url, callback, onClose) => handleChangeCheckoutURL(plan.id, url, callback, onClose) }
            />
         )}
         {course && (
            <>
               <div className='plan__main__left__line' />
               <div className='plan__main__left__course'>

                  <div className='plan__main__left__course__top'>
                     {/* eslint-disable-next-line no-nested-ternary */}
                     <img src={ plan.default_course[0].communities?.file_id ? plan.default_course[0].communities?.file_id : course.thumbnail_image ? course.thumbnail_image : plan.file.src ? plan.file.src : course.src } alt='' />
                     <Text
                        inner={ course.name }
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </div>
                  {!isCoursePage && (
                     <Info
                        isHaveCancel={ false }
                        title='If for some reason you need to remove this course from the plan, you must first make a duplicate '
                     >
                        <TextWithIcon
                           inner='Duplicate'
                           iconName='DuplicateMediaM'
                           isIconRight={ false }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           generalStyles={ { cursor: 'pointer' } }
                           style={ { color: '#24554E', whiteSpace: 'nowrap' } }
                           onClick={ () => duplicatePlan([plan.id]) }
                        />
                     </Info>
                  )}
               </div>
            </>
         )}
         <div className='plan__main__left__line' />
         {!isCoursePage && (
            <div className='plan__main__left__bundle'>
               <div className='plan__main__left__bundle__top'>
                  {/* <Text
                     inner='Add Product'
                     type={ types.medium153 }
                     size={ sizes.large }
                  /> */}
                  <Text
                     inner='Show several products in one bundle.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               <div className='plan__main__left__bundle__items'>
                  {plan.bundle_courses.map((e, index) => {
                     return (
                        <div
                           key={ index }
                           className='plan__main__left__bundle__item'
                        >
                           <div className='plan__main__left__bundle__item__left'>
                              {/* eslint-disable-next-line no-nested-ternary */}
                              <img src={ e?.communities?.file_id ? e?.communities?.file_id : e?.thumbnail_image ? e?.thumbnail_image : e?.picture_src } alt='' />
                              <Text
                                 className='size-on-mobile'
                                 inner={ e.name }
                                 type={ types.mediumLarge }
                                 size={ sizes.small }
                              />
                           </div>
                           <IconButton
                              name='DeleteCommunityM'
                              theme='delete'
                              onClick={ () => setModal({
                                 isOpen: true,
                                 name: e.name,
                                 id: e.id,
                              }) }
                              className='button-width-unset'
                           />
                        </div>
                     );
                  })}
               </div>
               <div>
                  <Button
                     text='Add Product'
                     iconName='plusNew'
                     isIconRight={ true }
                     theme={ themes.secondary }
                     onClick={ () => openModal() }
                     iconColor='#24554E'
                  />
               </div>
            </div>
         )}
         {openGeneratorModal.isOpen && (
            <GeneratorModal
               name={ openGeneratorModal.name }
               value={ openGeneratorModal.value }
               setOpenModal={ setOpenGenratorModal }
               title='Plan'
               isQuiz={ true }
               setData={ onChange }
            />
         )}
      </div>
   );
};

PLanMainLeft.propTypes = {
   plan: PropTypes.object,
   onChange: PropTypes.func,
   uuid: PropTypes.any,
   isCoursePage: PropTypes.bool,
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
};

export default PLanMainLeft;
