import React from 'react';
import SiteHeader from 'views/layout/SiteHeader';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';

const BaseHeader = ({
   switchAddingCourse,
   goToCategories, marginTop,
}) => {
   return (
      <SiteHeader
         title='Your Products'
         tooltip=''
         marginTop={ marginTop }
         right={ (
            <div className='header-product-btns'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.medium }
                  isIconRight={ true }
                  iconName='CategoriesProductM'
                  text='Categories'
                  className='reOrderbtnProduct'
                  btnTextClassName='mobTextRemove'
                  onClick={ () => goToCategories() }
               />
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSizes.medium }
                  text='New Product'
                  iconName='Plus'
                  isIconRight={ true }
                  onClick={ () => switchAddingCourse() }
               />
            </div>
         ) }
         hasArrow
      />
   );
};

BaseHeader.propTypes = {
   switchAddingCourse: PropTypes.func,
   goToCategories: PropTypes.func,
   marginTop: PropTypes.number,
};

BaseHeader.defaultValue = {
   switchAddingCourse: () => {},
};

export default BaseHeader;
