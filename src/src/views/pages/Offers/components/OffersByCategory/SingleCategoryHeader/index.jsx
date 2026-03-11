import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';
import './index.scss';

const SingleCategoryHeader = ({
   category,
   goToCheckoutFromCategory,
}) => {
   return (
      <div className='singleCategoryHeader'>
         {category.picture_src && category.picture_src !== 'thumbnail.png' && (
            <div className='singleCategoryHeader__left'>
               <img src={ category.picture_src } alt='category' />
            </div>
         )}
         {category.file && category.file.src && (
            <div className='singleCategoryHeader__left'>
               <img src={ category.file.src } alt='category' />
            </div>
         )}
         <div className='singleCategoryHeader__right'>
            <Text
               inner={ category.name }
               type={ types.bold }
               size={ sizes.size_56 }
            />
            {category.description && (
               <div className='description__wrapper'>
                  <TextWithSeeMore text={ category.description } textSize='medium' maxLength={ 300 } />
               </div>
            )}
            <div className='singleCategoryHeader__right__action'>
               <Button
                  text='Watch Now'
                  size={ btnSize.large56 }
                  theme={ btnTheme.primary }
                  iconName='playCircleL'
                  isIconLeft={ false }
                  isIconRight={ true }
                  style={ {
                     backgroundColor: 'var(--buttonBgcolor)',
                     color: 'var(--offersSliderColor)',
                     borderColor: 'var(--buttonBgcolor)',
                  } }
                  // onClick={ () => goToCheckoutFromCategory(category.plan_id
                  //    || (category.lessons[0]?.pricings[0]?.plan_id), category) }
                  onClick={ () => goToCheckoutFromCategory(category) }
               />
            </div>

         </div>

      </div>
   );
};

SingleCategoryHeader.propTypes = {
   category: PropTypes.array,
   goToCheckoutFromCategory: PropTypes.func,
};

export default SingleCategoryHeader;
