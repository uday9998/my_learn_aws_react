import React from 'react';
import './index.mob.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SearchFilter = ({
   big, nameExist, labelExist, btnText,
}) => {
   return (
      <div className={ classnames('mob-searchFilter', { 'mob-serachFilter__smaller': !big }) }>
         {labelExist && (
            <div className='m-b-s'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.medium }
                  inner='Filter'
               />
            </div>
         )}
         {nameExist && (
         <>
            <TextInput placeholder='Name or Email' />
            <div className='m-t-m' />
         </>
         )}
         <TextInput placeholder='From' />
         <div className='m-t-m' />
         <TextInput placeholder='To' />
         <div className='m-t-exl'>
            <BaseButton
               theme={ btnTheme.lightBlue }
               size={ btnSizes.full }
               text={ btnText }
               style={ big ? {} : { height: '40px' } }
            />
         </div>
      </div>
   );
};

SearchFilter.propTypes = {
   big: PropTypes.bool,
   nameExist: PropTypes.bool,
   labelExist: PropTypes.bool,
   btnText: PropTypes.string,
};

SearchFilter.defaultProps = {
   big: false,
   nameExist: true,
   labelExist: true,
   btnText: 'Search',
};

export default SearchFilter;
