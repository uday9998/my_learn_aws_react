import React, { useState } from 'react';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getCheckoutSettings, updateCheckoutSettings, getCheckoutCodes } from 'api/AuthApi';
import withLoading from 'utils/withLoading';
import ApproveModal from 'components/elements/ApproveModal';
import Receipt from './Receipt';
import CheckoutCodes from './CheckoutCodes';

const ReceiptLoading = withLoading(Receipt);

const tabsSelector = [
   { value: 'receipt', key: 'Receipt', iconName: 'receiptM' },
   { value: 'checkoutcodes', key: 'Checkout Codes', iconName: 'codeM' },
];

const CheckoutSettings = () => {
   const [selectedPage, setSelectedPage] = useState('receipt');
   const [openModal, setOpenModal] = useState(false);

   const {
      data: receipt, loading, setData: setReceipt,
   } = useApiQuery(getCheckoutSettings);

   const {
      data: codes, loadingCodes, setData: setCodes,
   } = useApiQuery(getCheckoutCodes);


   const [updateCheckoutSettingsFunc, { loading: updateLoading }] = useSubmitForm(updateCheckoutSettings, {
      successMessage: 'Checkout Settings has been changed.',
   });

   const updateReceipt = (name, value, isAddress) => {
      if (isAddress) {
         setReceipt({
            ...receipt,
            value: {
               ...receipt.value,
               new_address_data:
             { ...receipt.value.new_address_data, [name]: value },
            },
         });
      } else if (name === 'send_email' && value === 0) {
         setOpenModal(true);
      } else {
         setReceipt({ ...receipt, value: { ...receipt.value, [name]: value } });
      }
   };

   const saveReceipt = () => {
      updateCheckoutSettingsFunc({ ...receipt.value }, (res) => {
         setReceipt(res);
      });
   };

   const OnAprrove = () => {
      setReceipt({ ...receipt, value: { ...receipt.value, 'send_email': 0 } });
      setOpenModal(false);
   };

   const getSelectedPages = () => {
      if (selectedPage === 'checkoutcodes') {
         return (
            <CheckoutCodes codes={ codes } loadingCodes={ loadingCodes } setCodes={ setCodes } />
         );
      }
      return (
         <ReceiptLoading
            isLoading={ loading || updateLoading }
            receipt={ receipt }
            updateReceipt={ updateReceipt }
            saveReceipt={ saveReceipt }
            setOpenModal={ setOpenModal }
         />
      );
   };

   return (
      <>
         <InnerWrapper title='Checkout Settings' hasTabs={ true } tabName={ tabsSelector } selectedPage={ selectedPage } setSelectedPage={ setSelectedPage }>
            {getSelectedPages()}
         </InnerWrapper>
         {openModal && (
            <ApproveModal
               title='Are you sure you want to never send a receipt?'
               btnText="I'm Sure"
               onApprove={ () => OnAprrove() }
               onCancel={ () => setOpenModal(false) }
            />
         )}
      </>
   );
};

CheckoutSettings.propTypes = {
};

export default CheckoutSettings;
