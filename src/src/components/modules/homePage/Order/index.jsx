/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';

const OrderItem = ({ order }) => {
   return (
      <div className='landingOrder__item'>
         <Icon name={ order.icon } />
         <span className='m-l-exl' />
         <Text
            type={ TextType.regular }
            size={ TextSize.large }
            inner={ order.text }
            style={ { lineHeight: '1.3' } }
            bold
         />
      </div>
   );
};

const Order = ({
   orders, reverse,
}) => {
   return (
      <div className='landingOrder'>
         {/*  <div className='landingOrder__title' style={ { maxWidth: titleWidth } }>
            <Text
               type={ TextType.bold }
               inner={ title }
               style={ { fontSize: '40px' } }
            />
   </div> */}
         <div className={ classnames('landingOrder__content', { 'landingOrder__content-reverse': reverse }) }>
            <div className='landingOrder__list'>
               { orders.map((order) => {
                  return (
                     <div className='m-b-exl' key={ order.icon }>
                        <OrderItem order={ order } />
                     </div>
                  );
               }) }
            </div>
            {/*  <div className='landingOrder__img'>
               <img src={ img } alt='order-img' />
            </div> */}
         </div>
      </div>
   );
};

Order.propTypes = {
   title: PropTypes.string,
   titleWidth: PropTypes.string,
   img: PropTypes.string,
   orders: PropTypes.array,
   reverse: PropTypes.bool,
};

Order.defaultProps = {
   title: 'Title',
   img: '',
   titleWidth: '100%',
   reverse: false,
   orders: [],
};

export default Order;
