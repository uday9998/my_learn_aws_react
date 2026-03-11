import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { addVideoCategory } from 'api';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

import IconNew from 'components/elements/iconsSize';
import Text, { TextWithIcon, SIZES as sizes } from 'components/elements/TextNew';
import Tag from '../Tag';

import './index.scss';

const TagsInput = ({
   allCategories,
   playlistCategories,
   handleChangeplaylistCategories,
   addCategory,
   handleCreateCategory,
   handleAddCategory,
}) => {
   const menuRef = useRef(null);
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const [newAllCategories, setNewAllCategories] = useState([]);
   const [createCategory] = useSubmitForm(addVideoCategory);
   useOutsideClickDetector(menuRef, () => {
      setIsOpenMenu(false);
   });

   useEffect(() => {
      if (playlistCategories) {
         localStorage.setItem('categoriesIds', JSON.stringify(playlistCategories.map(category => category.id)));
      }
   }, [playlistCategories]);

   useEffect(() => {
      if (allCategories) {
         const objectToArray = Array.isArray(allCategories) ? allCategories : Object.values(allCategories);
         setNewAllCategories(objectToArray);
      }
   }, [allCategories]);

   const handleOpenMenu = (e) => {
      if (e.target.localName === 'svg') {
         setIsOpenMenu(prevState => !prevState);
      } else {
         setIsOpenMenu(true);
      }
   };

   const OnAddCategory = (categoryValue) => {
      handleAddCategory(categoryValue);
   };

   return (
      <div ref={ menuRef } className='input__tags__wrapper' onClick={ handleOpenMenu } role='presentation'>
         <div className={ isOpenMenu ? 'tags__wrapper active' : 'tags__wrapper' }>
            <div className='tags'>
               {
                  !addCategory.active ? playlistCategories.map(category => {
                     return (
                        <div key={ category.id } role='presentation'>
                           <Tag 
                              innerText={ category.name }
                              iconName='PlaylistContentTagClose'
                              handleChangeplaylistCategories={ handleChangeplaylistCategories }
                              category={ category }
                           />
                        </div>
                     );
                     // eslint-disable-next-line jsx-a11y/no-autofocus
                  }) : <input autoFocus={ true } type='text' value={ addCategory.inputValue } onChange={ OnAddCategory } />
               }
            
            </div>
            <div className='icon__wrapper' role='presentation'> 
               <IconNew name='PlayListContentArrowBottom' />
            </div>
         </div>
         {
            isOpenMenu && (
               <div className='bottom__menu__wrapper'>
                  <div className='bottom__menu' role='presentation'>
                     <div className={ newAllCategories && newAllCategories?.length ? 'tags_and_text_wrapper active' : 'tags_and_text_wrapper' }>
                        {
                           newAllCategories?.length ? (
                              newAllCategories
                                 .filter(
                                    category => !playlistCategories.find(firstCategory => firstCategory.id === category.id)
                                 )
                                 .map(filteredCategory => (
                                    <div className='category__item__wrapper' key={ filteredCategory.id } role='presentation' onClick={ () => handleChangeplaylistCategories(filteredCategory, 'add') }>
                                       <Text
                                          key={ filteredCategory.id }
                                          inner={ filteredCategory.name }
                                          size={ sizes.small14 }
                                       />
                                    </div>
                                 ))
                           ) : (
                              <Text
                                 inner='No other categories yet.'
                                 size={ sizes.small14 }
                              />
                           )
                        }

                     
                     </div>
                  
                  </div>
                  <div className='add__button__wrapper'>
                     <div role='presentation' onClick={ addCategory.active ? handleCreateCategory : () => OnAddCategory(false) }>
                        <TextWithIcon 
                           inner={ addCategory.active ? `Add “${ addCategory.inputValue }”` : 'Add new' }
                           iconName='PlaylistContentAdd'
                           size={ sizes.small14 }
                        />
                     </div>
                  </div>
               </div>
            ) 
         }
      </div>
   );
};

TagsInput.propTypes = {
   allCategories: PropTypes.array,
   playlistCategories: PropTypes.array,
   handleChangeplaylistCategories: PropTypes.func,
   handleCreateCategory: PropTypes.func,
   handleAddCategory: PropTypes.func,
   addCategory: PropTypes.object,
};

export default TagsInput;