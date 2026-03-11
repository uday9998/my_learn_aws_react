/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Table';
import getCurrencySumbol from 'utils/getCurrencySymbol';
// import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'views/pages/DesignCourse/plan/DeleteModalContent';
import Icon from 'components/elements/Icon';

const headings = [
   'Name',
   'Plan Type',
   'Price',
   'Recurring',
   // 'Type',
   // 'Name',
   // 'Payment Method',
   // 'Price',
   // 'Frequency',
   // 'Number Of Payments',
   '',
];


const PlansTable = ({
   plans, checkedId, onClick, deletePlan,
}) => {
   // handlePricingHideShow
   const [isModalOpened, setIsModalOpened] = useState(false);
   const [planId, setPlanId] = useState(0);

   const delPlanModalClick = (id) => {
      setPlanId(id);
      setIsModalOpened(true);
   };

   const delPlanModalApproveClick = () => {
      setPlanId(planId);
      deletePlan(planId);
      setIsModalOpened(false);
   };

   const renderTableHeader = () => {
      return headings.map((key, index) => {
         return (
            <Th key={ index.toString() } className='desctop-tab'>
               {key}
            </Th>
         );
      });
   };

   const renderTableData = () => {
      return plans && plans.map((plan) => {
         const {
            id, pricing_type: type, name,
            //   payment_method: paymentMethod,
            price,
            currency,
            //    payment_frequence: frequency,
            //  free_trial: freeTrial,
            //  number_of_payments: paymentNumber,
            //  is_visible: isVisible,
         } = plan;
         const typeName = ['Free Plan', 'One Time', 'Subscription'];
         //    const paymentMethods = { stripe: 'Stripe', paypal: 'PayPal' };
         // const data = {
         //    is_visible: isVisible ? 0 : 1,
         //    name,
         // };
         return (
            <Tr checked={ checkedId === id } key={ id } onClick={ () => onClick(plan) } className='desctop-tab'>
               <Td>{name}</Td>
               <Td>{typeName[type]}</Td>
               {/* <Td>{paymentMethods[paymentMethod] || '-'}</Td> */}
               <Td>{`${ getCurrencySumbol(currency) }${ price || '-' }`}</Td>
               <Td>{typeName[type] === 'Subscription' ? 'yes' : 'no'}</Td>
               {/* <Td>{frequency || '-'}</Td> */}
               {/* <Td>{freeTrial || '-'}</Td> */}
               {/* <Td>{paymentNumber || '-'}</Td> */}
               {/* <Td noText>
                  <BaseButton
                     size={ btnSize.medium }
                     text={ isVisible ? 'HIDE' : 'SHOW' }
                     onClick={ () => handlePricingHideShow(id, data) }
                  />
               </Td> */}
               <Td noText>
                  <div
                     onClick={ (e) => {
                        e.stopPropagation(); delPlanModalClick(id);
                     } }
                     role='presentation'
                     title='delete'
                  >
                     <Icon
                        name='Delete'
                     />
                  </div>
                  {/* <BaseButton
                     size={ btnSize.medium }
                     text='DELETE'
                     onClick={ () => delPlanModalClick(id) }
                  /> */}
               </Td>
            </Tr>
         );
      });
   };

   return (
      <div className='plansTableAdmin'>
         {
            window.innerWidth >= 1024 && (

               <table id='plans' className='plans desctop-tab w-full'>
                  <Theader className='plans__header'>
                     <Tr>
                        {renderTableHeader()}
                     </Tr>
                  </Theader>
                  <Tbody>
                     {renderTableData()}
                  </Tbody>
               </table>
            )
         }
         {
            window.innerWidth < 1024 && plans && plans.map((plan) => {
               const {
                  id, pricing_type: type, name,
                  //   payment_method: paymentMethod,
                  price,
                  currency,
                  //  payment_frequence: frequency,
                  //  free_trial: freeTrial,
                  //  number_of_payments: paymentNumber,
                  //  is_visible: isVisible,
               } = plan;
               const typeName = ['Free Plan', 'One Time', 'Subscription'];
               // const paymentMethods = { stripe: 'Stripe', paypal: 'PayPal' };
               // const data = {
               //    is_visible: isVisible ? 0 : 1,
               //    name,
               // };
               return (
                  <div
                     checked={ checkedId === id }
                     key={ id }
                     onClick={ () => onClick(plan) }
                     role='presentation'
                     className='mob-plans-tabel'
                  >
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Name </span>
                        <span className='plans-value'>{ name } </span>
                     </div>
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Plan Type </span>
                        <span className='plans-value'>  {typeName[type]}  </span>
                     </div>
                     {/* <div className='mob-plans-tabel-row'>
                        <span className='header'> Payment Method </span>
                        <span className='plans-value'> { paymentMethods[paymentMethod] || '-' } </span>
                     </div> */}
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Price </span>
                        <span className='plans-value'> { `${ getCurrencySumbol(currency) }${ price || '-' }`} </span>
                     </div>
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Recurring </span>
                        <span className='plans-value'> {typeName[type] === 'Subscription' ? 'yes' : 'no'} </span>
                     </div>
                     {/* <div className='mob-plans-tabel-row'>
                        <span className='header'> Frequency </span>
                        <span className='plans-value'> { frequency || '-' } </span>
                     </div>
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Free Trial </span>
                        <span className='plans-value'>  { freeTrial || '-' } </span>
                     </div>
                     <div className='mob-plans-tabel-row'>
                        <span className='header'> Number Of Payments </span>
                        <span className='plans-value'> { paymentNumber || '-' } </span>
                     </div>
                     <div
                        role='presentation'
                        onClick={ (e) => {
                           e.stopPropagation();
                        } }
                        className='mob-plans-tabel-bottom'
                     >
                        <BaseButton
                           size={ btnSize.medium }
                           text={ isVisible ? 'HIDE' : 'SHOW' }
                           onClick={ (e) => {
                              handlePricingHideShow(id, data);
                           } }
                        />
                     </div> */}
                  </div>
               );
            })
         }
         {
            isModalOpened && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => setIsModalOpened(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setIsModalOpened(false) }
                        onDelete={ () => delPlanModalApproveClick() }
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

export default PlansTable;

PlansTable.propTypes = {
   plans: PropTypes.array,
   checkedId: PropTypes.number,
   onClick: PropTypes.func,
   //  handlePricingHideShow: PropTypes.func,
   deletePlan: PropTypes.func,
};
