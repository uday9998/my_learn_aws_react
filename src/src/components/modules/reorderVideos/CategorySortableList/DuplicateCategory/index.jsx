import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';


const DuplicateCategory = ({
   setIsOpenDuplicate,
   coursesIds, setCoursesIds,
   categoriesList,
   duplicatePlaylist, currentPlaylist,
}) => {
   const [isSelectedAll, setIsSelectedAll] = useState(false);
   const [filteredCategories, setFIlteredCategories] = useState(categoriesList);
   const [categoriesConst] = useState(categoriesList);
   const [search, setSearch] = useState('');

   const handleCheck = (id) => {
      if (coursesIds.includes(id)) {
         setCoursesIds(coursesIds.filter((c) => c !== id));
         return;
      }
      setCoursesIds([...coursesIds, id]);
   };

   const handleSelectAll = () => {
      const detachedCoursesIds = filteredCategories.map(course => course.id);
      setCoursesIds([...detachedCoursesIds]);
      if (isSelectedAll) {
         setCoursesIds([]);
      }
      setIsSelectedAll(!isSelectedAll);
   };


   const handleSearch = (value) => {
      setSearch(value);
      const filteredData = categoriesConst.filter(
         (item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setFIlteredCategories(filteredData);
   };

   return (
      <div className='duplicateCategroyItem__attach__modal'>
         <div className='duplicateCategroyItem__attach__modal__top'>
            <Text
               inner='Duplicate to another category'
               type={ types.medium }
               size={ sizes.xxlarge }
            />
            <Text
               inner='You can add same videos to different categories'
               type={ types.regularDefault }
               size={ sizes.size_14 }
            />
         </div>
         <div className='duplicateCategroyItem__attach__search'>
            <Input
               name='search'
               type='search'
               onChange={ (name, value) => handleSearch(value) }
               value={ search }
               placeholder='Search'
            />
         </div>
         <div>
            <div className='duplicateCategroyItem__modal__top__create'>
               <Text
                  inner={ `Categories (${ filteredCategories.length })` }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />

               <div>
                  <BaseButton
                     iconName=''
                     theme='tertiaryGreen'
                     size='small'
                     text={ !isSelectedAll ? 'Select All' : 'Deselect All' }
                     isIconRight={ false }
                     isHidenDiv={ true }
                     onClick={ () => handleSelectAll() }
                  />
               </div>
            </div>
            <div className='duplicateCategroyItem__attach__modal__courses'>
               {
                  filteredCategories && filteredCategories.length > 0 && (
                     filteredCategories.map((course) => {
                        return (
                           <div className='duplicateCategroyItem__attach__modal__course' key={ course.id }>
                              <CheckBox
                                 checked={ coursesIds.includes(course.id) }
                                 onChange={ () => handleCheck(course.id) }
                              />
                              <Text
                                 inner={ course.name }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 className='duplicateCategroyItem__rigth'
                              />
                           </div>
                        );
                     })
                  )}


            </div>
         </div>
         {filteredCategories && !filteredCategories.length && (
            <div className='duplicateCategroyItem__attach__modal__empty'>
               <IconNew name='PlayList' />
               <Text
                  inner={ search ? 'No results found for your search.' : 'You don\'t have categories yet' }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
               />
            </div>
         )}


         <div className='duplicateCategroyItem__attach__modal__bottom'>
            <BaseButton
               text='Cancel'
               theme={ themes.secondary }
               size={ btnSizes.large120 }
               onClick={ () => {
                  setCoursesIds([]);
                  setIsOpenDuplicate(false);
               } }
            />
            <BaseButton
               text='Duplicate'
               size={ btnSizes.large120 }
               disabled={ coursesIds.length === 0 }
               onClick={ () => {
                  duplicatePlaylist(currentPlaylist.section_id, currentPlaylist.id, coursesIds);
                  setCoursesIds([]);
                  setIsOpenDuplicate(false);
               } }
            />
         </div>


      </div>

   );
};

DuplicateCategory.defaultProps = {
   setIsOpenDuplicate: () => {},
   coursesIds: [],
   setCoursesIds: () => {},
};

DuplicateCategory.propTypes = {
   setIsOpenDuplicate: PropTypes.func,
   coursesIds: PropTypes.array,
   setCoursesIds: PropTypes.func,
   categoriesList: PropTypes.array,
   duplicatePlaylist: PropTypes.func,
   currentPlaylist: PropTypes.any,
};

export default DuplicateCategory;
