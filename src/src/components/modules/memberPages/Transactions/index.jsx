import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { uniqueId } from 'lodash';
import { ColendarPeriod } from 'components/elements/CalendarPeriod';
import chartEmpty from 'assets/images/report/chart_empty.svg';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

const MemberTransactionsPage = ({ currentMember, onClassFilter }) => {
   const { transaction, courses } = currentMember;
   const [coursesOptons, setCourseOptions] = useState([]);
   const [isOpenCourseSelect, setIsOpenCourseSelect] = useState(false);
   const [courseValue, setCourseValue] = useState(undefined);
   const [isOpenDateSelect, setIsOpenDateSelect] = useState(false);
   const [date, setDate] = useState({
      from: '',
      to: '',
   });
   useEffect(() => {
      const options = courses && courses.map((course) => {
         return {
            key: course.name,
            value: course.id,
         };
      });
      setCourseOptions(options);
   }, [currentMember]);

   useEffect(() => {
      if (date.to) {
         onClassFilter(courseValue, date.from ? moment(date.from).format('YYYY-MM-DD') : '', date.to ? moment(date.to).format('YYYY-MM-DD') : '');
      }
   }, [date.to]);

   useEffect(() => {
      if (courseValue) {
         onClassFilter(courseValue, date.from ? moment(date.from).format('YYYY-MM-DD') : '', date.to ? moment(date.to).format('YYYY-MM-DD') : '');
      }
   }, [courseValue]);

   const TransactionPaymentIcon = (payment) => {
      switch (payment) {
         case 'paypal':
            return 'TransactionPaypal';
         case 'stripe':
            return 'TransactionStripe';
         default:
            return 'TransactionBraintree';
      }
   };

   function typeFunc(transactionType) {
      if (transactionType) {
         return 'Subscription';
      }
      return 'One Time Payment';
   }

   return (
      <div className='member__transactions'>
         <div className='member__transactions__top'>
            <div className='member__transactions__top__title'>
               <Text
                  inner='Transactions'
                  type={ txtTypes.regular160 }
                  size={ txtSizes.xlarge }
               />
            </div>

            <div className='member__transactions__top__filter'>
               <div className='member__transactions__top__filter__date'>
                  <BaseButton
                     theme={ btnTheme.filter }
                     iconName='DateTransactionFilterL'
                     isActiveFilterButton={ isOpenDateSelect }
                     isIconRight={ true }
                     text={ date.from ? (`${ date.from.getMonth() + 1 }/${ date.from.getDate() }/${ date.from.getFullYear() }${ date.to ? `-${ date.to.getMonth() + 1 }/${ date.to.getDate() }/${ date.to.getFullYear() }` : '' }`) : 'All Time' }
                     onClick={ () => {
                        setIsOpenCourseSelect(false);
                        setIsOpenDateSelect(!isOpenDateSelect);
                     } }
                  />
                  {isOpenDateSelect && (
                     <ClickOutside onClick={ () => setIsOpenDateSelect(false) }>
                        <div className='member__transactions__top__filter__datepicker'>
                           <ColendarPeriod
                              onChange={ (typeChange, time) => {
                                 switch (typeChange) {
                                    case 'from':
                                       setDate({
                                          to: '',
                                          from: time,
                                       });
                                       break;
                                    default:
                                       setDate({
                                          ...date,
                                          to: time,
                                       });
                                 }
                              } }
                              from={ date.from || new Date() }
                              to={ date.to }
                           />
                        </div>
                     </ClickOutside>
                  )}
               </div>
               <div className='member__transactions__top__filter__course'>
                  <BaseButton
                     disabled={ !coursesOptons.length }
                     theme={ btnTheme.filter }
                     iconName='ClassTransactionFilterL'
                     isActiveFilterButton={ isOpenCourseSelect }
                     text={ courseValue ? coursesOptons.filter((course) => course.value === courseValue)[0].key : 'All Classes' }
                     onClick={ () => {
                        setIsOpenCourseSelect(!isOpenCourseSelect);
                        setIsOpenDateSelect(false);
                     } }
                  />
                  {isOpenCourseSelect && (
                     <ClickOutside onClick={ () => setIsOpenCourseSelect(false) }>
                        <div className='member__transactions__top__filter__course__dropdown'>
                           <div className='wrapper'>
                              {coursesOptons.map((course) => {
                                 if (course.value === courseValue) {
                                    return null;
                                 }
                                 return (
                                    <div
                                       className='course__option'
                                       key={ uniqueId() }
                                       role='presentation'
                                       onClick={ () => {
                                          setCourseValue(course.value);
                                          setIsOpenCourseSelect(false);
                                       } }
                                    >
                                       <Text
                                          inner={ course.key.length > 15 ? `${ course.key.slice(0, 16) }...` : course.key }
                                          style={ { padding: '16px 16px' } }
                                          type={ txtTypes.regularDefault }
                                          size={ txtSizes.small }
                                       />
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     </ClickOutside>
                  )}
               </div>
            </div>

         </div>
         {transaction.length ? (
            <div className='member__transactions__table'>
               <table>
                  <thead>
                     <tr>
                        <th className='table-col-1'>
                           <Text inner='Amount' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                        </th>
                        <th className='table-col-2'>
                           <Text inner='Name' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                        </th>
                        <th>
                           <Text inner='Status' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                        </th>
                        <th>
                           <Text inner='Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                        </th>
                        <th>
                           <Text inner='Type' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {transaction && transaction.map((item) => {
                        return (
                           <tr key={ uuidv4() } className='transaction__table__item'>
                              <td className='table-col-1'>
                                 <div className='table-flex'>
                                    <Icon name={ TransactionPaymentIcon(item.type) } />
                                    <Text inner={ `${ item.amount } ${ item.currency }` } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                                 </div>
                              </td>
                              <td className='table-col-2'>
                                 <div className='table-flex'>
                                    <img src={ currentMember.picture_full_src } alt='' className='table-image' />
                                    <Text inner={ currentMember.name } className='table-name table-decorate-name' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                                 </div>

                              </td>
                              <td>
                                 <Text
                                    inner={ item.status }
                                    style={ { color: item.status === 'succeeded' ? '#24554E' : '#444C4B', background: item.status === 'succeeded' ? '#E8F2F1' : '#E7E9E9' } }
                                    className={ `table-tipe table-tipe-${ item.status }` }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                              </td>
                              <td>
                                 <Text inner={ moment(item.created_at).format('MMMM DD, YYYY') } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                              </td>
                              <td>
                                 {!item.amount
                                    ? (
                                       <Text
                                          style={ { color: '#444C4B', background: '#E7E9E9' } }
                                          inner='Free'
                                          type={ txtTypes.regularDefault }
                                          className='table-tipe table-tipe-free'
                                          size={ txtSizes.small }
                                       />
                                    ) : (
                                       <Text
                                          inner={ typeFunc(item.subscription_id) }
                                          className={ `table-tipe table-tipe-${ typeFunc(item.subscription_id).split(' ').join('') }` }
                                          type={ txtTypes.regularDefault }
                                          size={ txtSizes.small }
                                       />
                                    )}
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className='member__transactions__empty'>
               <Text
                  inner='No Transactions Yet'
                  style={ { color: '#727978', textAlign: 'center' } }
                  type={ txtTypes.mediumLargeGrey }
                  size={ txtSizes.new_size_28 }
               />
               <img src={ chartEmpty } alt='chart' />
            </div>
         )}
      </div>
   );
};

MemberTransactionsPage.propTypes = {
   currentMember: PropTypes.object,
   onClassFilter: PropTypes.func,
};

export default MemberTransactionsPage;
