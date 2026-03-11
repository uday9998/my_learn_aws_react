import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { uniqueId } from 'lodash';
import { videoAdminImg } from 'utils/videoImg';
import IconNew from 'components/elements/iconsSize';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import Playlist from 'components/modules/Playlist';

const tabVariants = [
   { key: 'Videos', value: 'videos' },
   { key: 'Playlists', value: 'playlists' },
];


const AttachCourse = ({
   item, attach,
   detachedCourses, setIsOpenAttachPopup,
   isCreate, isSelectedCategory,
   setSelectedCategory, onCreate, onCancel,
   isCreateCategory, coursesIds, setCoursesIds,
   isProgressDetachedCourses, isVideo,
}) => {
   const [selectedVariant, setSelectedVariant] = useState('videos');
   const [isSelectedAll, setIsSelectedAll] = useState(false);
   const [filteredDataVidoes, setFilteredDataVidoes] = useState(null);
   const [filteredDataPlaylists, setFilteredDataPlaylists] = useState(null);
   const [dataVidoes, setDataVidoes] = useState(detachedCourses);
   const [dataPlaylists, setDataPlaylists] = useState(detachedCourses);
   const [search, setSearch] = useState('');


   useEffect(() => {
      const videos = [];
      const playlists = [];
      detachedCourses.forEach(course => {
         if (course.is_playlist !== 1) {
            videos.push(course);
         } else {
            playlists.push(course);
         }
      });

      setFilteredDataVidoes(videos);
      setFilteredDataPlaylists(playlists);
      setDataVidoes(videos);
      setDataPlaylists(playlists);
   }, [detachedCourses]);

   const handleCheck = (id) => {
      if (coursesIds.includes(id)) {
         setCoursesIds(coursesIds.filter((c) => c !== id));
         return;
      }
      setCoursesIds([...coursesIds, id]);
   };

   const handleSelectAll = () => {
      const detachedCoursesIds = detachedCourses.map(course => course.id);
      setCoursesIds([...detachedCoursesIds]);
      if (isSelectedAll) {
         setCoursesIds([]);
      }
      setIsSelectedAll(!isSelectedAll);
   };

   const handleChangeTab = (step) => {
      setSelectedVariant(step);
   };

   const handleSearch = (value) => {
      setSearch(value);

      const filteredVideoDataNew = dataVidoes.filter(
         (item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredDataVidoes(filteredVideoDataNew);

      const filteredPlaylistDataNew = dataPlaylists.filter(
         (item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredDataPlaylists(filteredPlaylistDataNew);
   };

   return (
      <div className='videoCategoryItem__attach__modal'>
         {!isCreate && (
            <div className='videoCategoryItem__attach__modal__top'>
               <Text
                  inner={ `Add  ${ isVideo ? 'Video or Playlists' : 'Product' } To Category` }
                  type={ types.medium }
                  size={ sizes.xxlarge }
               />
               <Text
                  inner={ `You can add same  ${ isVideo ? 'videos' : 'products' } to different categories` }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
                  style={ { marginTop: '12px' } }
               />
            </div>
         )}

         {isVideo && (
            <div className='videoCategoryItem__attach__search'>
               <Tabs
                  variants={ tabVariants }
                  selectedVariant={ selectedVariant }
                  onSelect={ handleChangeTab }
               />
               <Input
                  name='search'
                  type='search'
                  onChange={ (name, value) => handleSearch(value) }
                  value={ search }
                  placeholder='Search'
               />
            </div>
         )}
         {!isProgressDetachedCourses
          && ((selectedVariant === 'videos' && filteredDataVidoes && !!filteredDataVidoes.length)
                || (selectedVariant === 'playlists' && filteredDataPlaylists && !!filteredDataPlaylists.length))
               && (
                  <div>
                     <div className='videoCategoryItem__modal__top__create'>
                        <Text
                           inner={ selectedVariant === 'videos' ? `Videos (${ filteredDataVidoes.length })` : `Playlists (${ filteredDataPlaylists.length })` }
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
                     <div className='videoCategoryItem__attach__modal__courses'>
                        {
                           selectedVariant === 'videos' && filteredDataVidoes && filteredDataVidoes.length > 0 && (
                              filteredDataVidoes.map((course) => {
                                 return (
                                    <div className='videoCategoryItem__attach__modal__course' key={ uniqueId() }>
                                       <CheckBox
                                          checked={ coursesIds.includes(course.id) }
                                          onChange={ () => handleCheck(course.id) }
                                       />
                                       <div className='videoCategoryItem__attach__modal__course__rigth'>
                                          <div className='videoCategoryItem__attach__modal__course__image'>
                                             {(!course.thumbnail_image && !videoAdminImg(course)) ? <IconNew name='DefaultImg' />
                                                : <img src={ course.thumbnail_image || videoAdminImg(course) } alt='' />}
                                          </div>
                                          <Text
                                             inner={ course.name }
                                             type={ types.regularDefault }
                                             size={ sizes.small }
                                          />
                                       </div>
                                    </div>
                                 );
                              })
                           )}

                        {selectedVariant === 'playlists' && filteredDataPlaylists && filteredDataPlaylists.length > 0 && (
                           filteredDataPlaylists.map((course) => {
                              return (
                                 <div className='videoCategoryItem__attach__modal__course' key={ uniqueId() }>
                                    <CheckBox
                                       checked={ coursesIds.includes(course.id) }
                                       onChange={ () => handleCheck(course.id) }
                                    />
                                    <Playlist playlist={ course } />
                                 </div>
                              );
                           })
                        )}

                     </div>
                  </div>
               )}

         {selectedVariant === 'playlists' && filteredDataPlaylists && !filteredDataPlaylists.length && (
            <div className='videoCategoryItem__attach__modal__empty'>
               <IconNew name='PlayList' />
               <Text
                  inner={ search ? 'No results found for your search.' : 'You don\'t have playlists yet' }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
               />
            </div>
         )}

         {selectedVariant === 'videos' && filteredDataVidoes && !filteredDataVidoes.length && (
            <div className='videoCategoryItem__attach__modal__empty'>
               <IconNew name='PlayList' />
               <Text
                  inner={ search ? 'No results found for your search.' : 'You don\'t have videos yet' }
                  type={ types.regularDefault }
                  size={ sizes.small_14 }
               />
            </div>
         )}

         <div className='videoCategoryItem__attach__modal__bottom'>
            <BaseButton
               text='Cancel'
               theme={ themes.secondary }
               size={ btnSizes.large120 }
               onClick={ () => {
                  setCoursesIds([]);
                  setIsOpenAttachPopup(false);
                  setSelectedCategory({});
                  onCancel();
               } }
            />
            <BaseButton
               text={ selectedVariant === 'videos' ? 'Add Video' : 'Add Playlist' }
               size={ btnSizes.large120 }
               disabled={ isCreateCategory ? false : coursesIds.length === 0 }
               onClick={ () => {
                  if (isSelectedCategory || !isCreate) {
                     attach(item.id, coursesIds);
                  } else {
                     onCreate(coursesIds);
                  }
                  setCoursesIds([]);
                  setIsOpenAttachPopup(false);
               } }
            />
         </div>


      </div>

   );
};

AttachCourse.defaultProps = {
   setSelectedCategory: () => {},
   attach: () => {},
   setIsOpenAttachPopup: () => {},
   item: {},
   detachedCourses: [],
   isSelectedCategory: false,
   isCreate: false,
   onCreate: () => {},
   onCancel: () => {},
   isCreateCategory: false,
   coursesIds: [],
   setCoursesIds: () => {},
   isProgressDetachedCourses: false,
};

AttachCourse.propTypes = {
   item: PropTypes.object,
   setIsOpenAttachPopup: PropTypes.func,
   detachedCourses: PropTypes.array,
   attach: PropTypes.func,
   isCreate: PropTypes.bool,
   isSelectedCategory: PropTypes.bool,
   setSelectedCategory: PropTypes.func,
   onCreate: PropTypes.func,
   onCancel: PropTypes.func,
   isCreateCategory: PropTypes.bool,
   coursesIds: PropTypes.array,
   setCoursesIds: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   isVideo: PropTypes.bool,
};

export default AttachCourse;
