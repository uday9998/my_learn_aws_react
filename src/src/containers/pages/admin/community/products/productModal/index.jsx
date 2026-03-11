/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import ModalNew from 'components/elements/ModalNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getCommunityUnAttachedProducts, attachProduct,
} from 'api';

import LoaderMini from 'components/elements/loaderMini';
import CheckBox from 'components/elements/form/CheckBoxNew';

const ProductModal = ({
   community, setIsOpenModal, getCommunityProductsUpdate, setProducts, setCurrentPage,
}) => {
   const {
      data: unAttachedProductes, loading: loadingUnAttached,
   } = useApiQuery(getCommunityUnAttachedProducts, [community.id]);
    
   const [handleAttachProduct] = useSubmitForm(attachProduct, {
      successMessage: 'Products has been attached',
   });
 
   const [searchModal, setSearchModal] = useState('');

   const [filteredData, setFilteredData] = useState([]);
   const [checkedDataIds, setCheckedDataIds] = useState([]);


   const onAttachProduct = () => {
      handleAttachProduct({ communityId: community.id, ids: checkedDataIds }, () => {
         setIsOpenModal(false);
         setCheckedDataIds([]);
         setSearchModal('');
         getCommunityProductsUpdate(community.id, (res) => {
            setCurrentPage(1);
            setProducts(res);
         });
      });
   };

   const handleCheck = (id) => {
      if (checkedDataIds.includes(id)) {
         setCheckedDataIds(checkedDataIds.filter((e) => e !== id));
         return;
      }
      setCheckedDataIds([...checkedDataIds, id]);
   };

   const handleSearch = (value) => {
      setSearchModal(value);
      const filteredData = unAttachedProductes.filter(
         (item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filteredData);
   };
  
   const productData = searchModal ? filteredData : unAttachedProductes;

   return (
      <ModalNew onCloseModal={ () => setIsOpenModal(false) }>
         <div className='product__left__modal'>
            <div className='product__left__modal__top'>
               <Text
                  inner='Add Product'
                  type={ types.medium }
                  size={ sizes.xxlarge }
               />
               <Text
                  inner='Choose from the list of products'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div className='product__left__modal__middle'>
               <Input
                  type='search'
                  value={ searchModal }
                  onChange={ (name, value) => handleSearch(value) }
                  placeholder='Search'
               />
               {loadingUnAttached ? (
                  <LoaderMini
                     color='#131F1E'
                  />
               ) : (
                  <div className='product__left__modal__middle__items'>
                     {productData.map((e, index) => {
                        return (
                           <div
                              key={ index }
                              className='product__left__modal__middle__item'
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
            <div className='product__left__modal__buttons'>
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
                  onClick={ () => onAttachProduct() }
                  disabled={ !checkedDataIds.length }
               />
            </div>
         </div>
      </ModalNew>
    
   );
};

ProductModal.propTypes = {
   community: PropTypes.object,
   setIsOpenModal: PropTypes.func,
   getCommunityProductsUpdate: PropTypes.func,
   setProducts: PropTypes.func,
   setCurrentPage: PropTypes.func,
};

export default ProductModal;
