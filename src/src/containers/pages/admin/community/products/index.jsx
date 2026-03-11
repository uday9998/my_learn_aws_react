import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Input from 'components/elements/inputNew';
import EmptyPageWithImage from 'components/modules/EmptyPageWithImage';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import {
   getCommunityProducts, dettachProduct, getCommunityProductsMember,
   getCommunityProductsSearch, getCommunityProductsMemberSearch,
} from 'api';
import './index.scss';
import { communityButtonColors } from 'utils/communityButtonColors';
import ProductModal from './productModal';
import ProductList from './productList';

const CommunityProducts = ({
   role, community,
}) => {
   const {
      data: products, loading, setData: setProducts,
   } = useApiQuery(role === 'admin' ? getCommunityProducts : getCommunityProductsMember, [community.id]);

   const [search, setSearch] = useState('');

   const [currentPage, setCurrentPage] = useState(1);

   const [getCommunityProductsUpdate, { loading: loadingProduct }] = useSubmitForm(role === 'admin' ? getCommunityProducts : getCommunityProductsMember, {
      successMessage: '',
   });

   const [getCommunityProductsUpdateSearch, { loading: loadingProductSearch }] = useSubmitForm(role === 'admin' ? getCommunityProductsSearch : getCommunityProductsMemberSearch, {
      successMessage: '',
   });

   const [handleDettachProduct] = useSubmitForm(dettachProduct, {
      successMessage: 'Products has been removed',
   });
   
   const [isOpenModal, setIsOpenModal] = useState('');

   const [checkedDataIds, setCheckedDataIds] = useState([]);
   const handleCheck = (id) => {
      if (checkedDataIds.includes(id)) {
         setCheckedDataIds(checkedDataIds.filter((e) => e !== id));
         return;
      }
      setCheckedDataIds([...checkedDataIds, id]);
   };


   const addProduct = () => {
      setCheckedDataIds([]);
      setIsOpenModal(true);
   };


   const handleDettachProductFunc = () => {
      handleDettachProduct({ communityId: community.id, ids: checkedDataIds }, () => {
         setIsOpenModal(false);
         setCheckedDataIds([]);
         getCommunityProductsUpdate(community.id, (res) => {
            setCurrentPage(1);
            setProducts(res);
         });
      });
   };

   const handleSearch = (value) => {
      setSearch(value);
      getCommunityProductsUpdateSearch({ cummunityId: community.id, search: value, page: 1 }, (res) => {
         setCurrentPage(1);
         setProducts(res);
      });
   };

   const listInnerRef = useRef();

   const onScroll = () => {
      if (listInnerRef.current) {
         const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
         if (scrollTop + clientHeight === scrollHeight && currentPage < products.last_page) {
            setCurrentPage(currentPage + 1);
            getCommunityProductsUpdateSearch({ cummunityId: community.id, search, page: currentPage + 1 }, (res) => {
               setProducts({
                  ...res,
                  data: [...products.data, ...res.data],
               });
            }); 
         }
      }
   };

   return (
      <div
         className='communityProducts'
         onScroll={ onScroll }
         ref={ listInnerRef }>
         {(loading || loadingProduct || loadingProductSearch) && <LoaderSpinner />}
         <div className='communityProducts__title'>
            <Text
               inner='Products'
               type={ types.medium }
               size={ sizes.xxlarge }
            />
           
            <div className='communityProducts__btns'>
               <Input
                  type='search'
                  value={ search }
                  onChange={ (name, value) => handleSearch(value) }
                  placeholder='Search'
               />
               {role === 'admin' && (
                  <>
                     {!!checkedDataIds.length && (
                        <Button
                           text='Remove Products'
                           theme={ themes.primary }
                           onClick={ () => handleDettachProductFunc() }
                           style={ communityButtonColors(community) }
                        />
                     )}
                     <Button
                        text='Add Product'
                        theme={ themes.primary }
                        onClick={ () => addProduct() }
                        style={ communityButtonColors(community) }
                     /> 
                  </>
               )}
            </div>
              
         </div>
         {!loading && !loadingProduct && products.data && !!products.data.length && (
            <ProductList
               coursesData={ products.data }
               checkedDataIds={ checkedDataIds }
               handleCheck={ handleCheck }
               community={ community }
               role={ role } />
         )}
         {!loading && !loadingProduct && !loadingProductSearch && !search && products.data && !products.data.length
             && (
                <EmptyPageWithImage title='No Products yet' />
             )
         }
     
         {isOpenModal && (
            <ProductModal 
               community={ community }
               setIsOpenModal={ setIsOpenModal }
               getCommunityProductsUpdate={ getCommunityProductsUpdate } 
               setProducts={ setProducts }
               setCurrentPage={ setCurrentPage }
            />
         )}
      </div>
   );
};

CommunityProducts.propTypes = {
   community: PropTypes.object,
   role: PropTypes.string, 
}; 


export default CommunityProducts;
