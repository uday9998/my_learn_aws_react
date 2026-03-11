/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import { isArray } from 'lodash';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';


const IntegrationElem = ({
   title, image, subtitle, data, id, onChange, onConnect,
   helpUri,
}) => {
   const [isOpenInputs, setIsOpenInputs] = useState(false);

   const handleClickConnectButton = () => {
      if (isArray(data)) {
         setIsOpenInputs(true);
         return;
      }
      onConnect();
   };

   const handleOpenHelpUrl = () => {
      window.open(helpUri, '_blank');
   };

   return (
      <div className='pricing__integration__elem'>
         <div className='pricing__integration__elem__top'>
            <div className='pricing__integration__elem__top__left'>
               <img src={ image } alt='' />
               <Text
                  inner={ title }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div className='pricing__integration__elem__top__right'>
               <Text
                  inner='Learn More'
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#24554E', cursor: 'pointer' } }
                  onClick={ () => handleOpenHelpUrl() }
               />
               {!isOpenInputs ? (
                  <Button
                     text='Connect'
                     size={ btnSizes.xsmall }
                     onClick={ () => handleClickConnectButton() }
                  />
               ) : (
                  <Button
                     text='Cancel'
                     size={ btnSizes.xsmall }
                     theme={ themes.secondary }
                     onClick={ () => setIsOpenInputs(false) }
                  />
               )}
            </div>
         </div>
         {isOpenInputs && (
            <div className='pricing__integration__elem__bottom'>
               <Text
                  inner={ subtitle }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div className='pricing__integration__elem__bottom__inputs'>
                  {data.map((e, index) => {
                     return (
                        <Input
                           { ...e }
                           key={ index }
                           value={ e.field_value }
                           onChange={ onChange }
                        />
                     );
                  })}
               </div>
               <div>
                  <Button
                     text='Connect'
                     onClick={ () => onConnect(id) }
                  />
               </div>
               <Line />
            </div>
         )}
      </div>
   );
};

IntegrationElem.propTypes = {
   title: PropTypes.string,
   subtitle: PropTypes.string,
   helpUri: PropTypes.string,
   image: PropTypes.string,
   data: PropTypes.any,
   id: PropTypes.string,
   onChange: PropTypes.func,
   onConnect: PropTypes.func,
};

export default IntegrationElem;
