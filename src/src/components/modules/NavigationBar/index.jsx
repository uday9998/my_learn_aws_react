import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import ReactTooltip from 'react-tooltip';
// import Table from 'components/elements/tableNew';
import Input from 'components/elements/inputNew';

export const Header = ({
   links = [], isBack, title, TooltipText, buttonProps, table, isSearch,
}) => {
   const [search, setSearch] = useState('');
   const [tableS, setTableS] = useState(table);
   return (
      <div className='header'>
         {links && <BreadCrumb links={ links } />}
         <div className='header__top'>
            <div className='header__top__title'>
               {isBack && (<div role='presentation' onClick={ isBack } className='header__top__title__back'><Icon name='ArrowBackHeader' className='backIcon' /></div>)}
               <Text inner={ title } type={ txtTypes.regularMin } size={ txtSizes.xxlarge } />
               {TooltipText && (
                  <div className='tooltip' data-tip={ TooltipText }>
                     <Icon name='ToolTip' className='backIcon' />
                     <ReactTooltip />
                  </div>
               )}
            </div>
            {buttonProps && (
               <BaseButton
                  { ...buttonProps }
               />
            )}
         </div>
         {isSearch && (
            <Input type='search' placeholder='Search' classI='navbar__search' value={ search } onChange={ (name, value) => setSearch(value) } />
         )}
         {/* {table && (
            <Table className='header__top__table' tables={ tableS } onSelect={ (data) => setTableS(data) } />
         )} */}
      </div>
   );
};

Header.propTypes = {
   links: PropTypes.object,
   isBack: PropTypes.func,
   title: PropTypes.string,
   buttonProps: PropTypes.object,
   TooltipText: PropTypes.string,
   table: PropTypes.object,
   isSearch: PropTypes.bool,
};
