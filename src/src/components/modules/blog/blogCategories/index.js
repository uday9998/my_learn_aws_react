import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import { useTranslate } from 'react-polyglot';

const BlogCategories = ({ categoriesFront, handleBlogByCategory, siteInfo }) => {
   // const t = useTranslate();
   return (
      <div className='categoriesRectangle'>
         {/* <div className='mainTitle'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner={ t('categories') }
               //  color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#3f4f65' }
            />
         </div> */}
         {/* <div className='title' onClick={ () => handleBlogByCategory() } role='presentation'>
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner={ t('all_topics') }
               // color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#3f4f65' }
            />
         </div> */}
         {categoriesFront.length !== 0 && categoriesFront.map(category => {
            return (
               <div style={ { background: siteInfo.active_school_room.school_color, border: '1px solid --borderColor' } } className='title' key={ category.id } onClick={ () => handleBlogByCategory([{ category_id: category.id }, categoriesFront]) } role='presentation'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner={ category.name }
                     style={ { color: siteInfo.active_school_room.school_text_color } }
                     // color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#3f4f65' }
                  />
               </div>
            );
         })}
      </div>
   );
};

BlogCategories.propTypes = {
   categoriesFront: PropTypes.array,
   handleBlogByCategory: PropTypes.func,
   siteInfo: PropTypes.object,
};


export default BlogCategories;
