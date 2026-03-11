import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import img from 'assets/images/plan/cover.png';
import getCurrencySumbol from 'utils/getCurrencySymbol';
// import Input from 'components/elements/inputNew';
import LinkViewWithEdit from 'components/modules/LinkViewWithEdit';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { changeCheckoutURL } from 'api/AuthApi';

const PlanCreateRight = ({
   data, selectedProduct, isMobile, isMembership, isCoursePage, uuid,
}) => {
   const [changeCheckoutURLFunc] = useSubmitForm(changeCheckoutURL, {
      successMessage: 'Checkout URL has been changed.',
   });

   const [currencyData, setCurrencyData] = useState(1);
   const [price, setPrice] = useState({ price: 0, currency: '$' });
   const [newCheckoutUrl, setNewCheckoutUrl] = useState(data.checkout_url?.url || uuid);

   // useEffect(() => {
   //    Axios.get(
   //       'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
   //       .then(({ data: res }) => {
   //          setCurrencyData(res.usd);
   //       });
   // }, []);

   const handleChangeCheckoutURL = async (id, url, setLink, onClose) => {
      const { data: { errors = {} } = {} } = await changeCheckoutURLFunc(
         { id, url },
         () => {
            setNewCheckoutUrl(url);
            setLink('');
            onClose();
         },
         () => true
      ) || {};

      return errors;
   };

   const getMinimumPrice = () => {
      const all = data.pricings.map((pricing) => ({
         price: pricing.price,
         realPrice: pricing.price,
         currencyData: pricing.currency,
      }));

      const sortedPrice = all.sort((a, b) => (parseFloat(a.price) - parseFloat(b.price)));
      return sortedPrice && sortedPrice[0];
   };

   useEffect(() => {
      if (currencyData && getMinimumPrice()) {
         setPrice({
            price: getMinimumPrice().realPrice,
            currency: getMinimumPrice().currencyData,
         });
      }
   }, [data, currencyData]);

   const getCheckoutUrl = () => {
      if (data.test_mode) {
         return `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ data.test_mode.token }/${ uuid }/0/${ data.id }`;
      }
      return `${ process.env.REACT_APP_CHECKOUT_URL }${ newCheckoutUrl }/0/${ data.id }`;
   };

   const showCheckoutUrl = () => {
      const freePricing = data.pricings.length === 1 && !!data.pricings.filter(pr => pr.pricing_type === 0).length;
      if (!freePricing && !data.publish_without_integrations && isCoursePage) {
         return true;
      }
      return false;
   };

   return (
      <div className='plan__create__right'>
         {selectedProduct && (
            <>
               {
                  !isMobile && (
                     <Text
                        inner='Preview'
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  )
               }
               <div className='plan__create__right__course'>
                  <div className='plan__create__right__course__image'>
                     <img src={ (data.file && data.file.src) || data.picture_src || img } alt='' />
                  </div>
                  <Text
                     inner={ data.name || `Name of your ${ isMembership ? 'membership' : 'bundle' }` }
                     style={ { marginTop: '8px' } }
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <Text
                     inner={ data.description || '' }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            </>
         )}
         <div className='plan__create__right__price'>
            <Text
               inner='Price Starting At'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner={ `${ getCurrencySumbol(price.currency) || '$' } ${ Number.parseFloat(price.price || 0).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }` }
               type={ types.medium160 }
               size={ sizes.xlarge }
               style={ { color: '#24554E' } }
            />
         </div>
         <div>
            {showCheckoutUrl() && (
               <div>
                  <LinkViewWithEdit
                     label='Checkout Page URL'
                     copyUrl={ getCheckoutUrl() }
                     isValid={ selectedProduct && selectedProduct.is_published === 1 }
                     constantUrlStart={ process.env.REACT_APP_CHECKOUT_URL }
                     editableLink={ newCheckoutUrl }
                     constantUrlEnd={ `/0/${ data.id }` }
                     onSave={ (url, setLink, onClose) => handleChangeCheckoutURL(data.id, url, setLink, onClose) }
                  />
               </div>
            )}
         </div>
      </div>
   );
};

PlanCreateRight.propTypes = {
   data: PropTypes.object,
   selectedProduct: PropTypes.object,
   isMobile: PropTypes.bool,
   isMembership: PropTypes.bool,
   uuid: PropTypes.object,
   isCoursePage: PropTypes.bool,
};

export default PlanCreateRight;
