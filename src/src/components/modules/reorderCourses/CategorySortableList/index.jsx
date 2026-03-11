import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.scss';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import CategoryItem from './CategoryItem';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';


const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
   display: 'flex',
   flexDirection: 'column',
   ...draggableStyle,
});

const getListStyle = () => ({
   width: '100%',
   padding: grid,
});

const CategorySortableList = ({
   categories, onChange, categoryProps, isVideo, isAdminVideo, videoProps, isCategorySettings,
   seo, setSeo, removeCategory, isProgressDetachedCourses, duplicatePlaylist,
}) => {
   let courses = 'courses';
   if (isVideo) {
      courses = 'lessons';
   }

   const [searchQuery, setSearchQuery] = useState('');
   const [filterOptions, setFilterOptions] = useState({
      status: 'all',
      sortBy: 'newest'
   });
   const [videoTypeFilter, setVideoTypeFilter] = useState('all');
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [isVideoFilterOpen, setIsVideoFilterOpen] = useState(false);
   const [filteredCategories, setFilteredCategories] = useState(categories || []);

   useEffect(() => {
      if (!categories) {
         setFilteredCategories([]);
         return;
      }

      const filtered = categories.map(category => {
         const newCategory = { ...category };
         
         if (category[courses] && Array.isArray(category[courses])) {
            let filteredItems = [...category[courses]];
            
            if (searchQuery) {
               filteredItems = filteredItems.filter(item => 
                  item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
               );
            }
            
            if (filterOptions.status !== 'all') {
               filteredItems = filteredItems.filter(item => {
                  const status = getItemStatus(item).toLowerCase();
                  return status === filterOptions.status.toLowerCase();
               });
            }
            
            if (videoTypeFilter !== 'all') {
               filteredItems = filteredItems.filter(item => {
                  const videoType = item.video_type || 'standard';
                  return videoType === videoTypeFilter;
               });
            }
            
            if (filterOptions.sortBy === 'newest') {
               filteredItems.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            } else if (filterOptions.sortBy === 'oldest') {
               filteredItems.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
            } else if (filterOptions.sortBy === 'most-viewed') {
               filteredItems.sort((a, b) => (b.views || 0) - (a.views || 0));
            } else if (filterOptions.sortBy === 'alphabetical') {
               filteredItems.sort((a, b) => a.name.localeCompare(b.name));
            }
            
            newCategory[courses] = filteredItems;
         }
         
         return newCategory;
      });
      
      setFilteredCategories(filtered);
   }, [categories, courses, searchQuery, filterOptions, videoTypeFilter]);

   const getItemStatus = (item) => {
      if (item.is_published === "1") return "Published";
      if (item.draft) return "Draft"; 
      return "Published";
   };

   const handleFilterToggle = () => {
      setIsFilterOpen(!isFilterOpen);
      if (isVideoFilterOpen) setIsVideoFilterOpen(false);
   };

   const handleVideoFilterToggle = () => {
      setIsVideoFilterOpen(!isVideoFilterOpen);
      if (isFilterOpen) setIsFilterOpen(false);
   };

   const handleFilterChange = (type, value) => {
      setFilterOptions({
         ...filterOptions,
         [type]: value
      });
   };

   const handleVideoTypeChange = (type) => {
      setVideoTypeFilter(type);
      setIsVideoFilterOpen(false);
   };
   
   const totalVideos = useMemo(() => {
      return filteredCategories.reduce((total, category) => {
         if (category[courses] && Array.isArray(category[courses])) {
            const nonPlaylistItems = category[courses].filter(item => !item.is_playlist);
            return total + nonPlaylistItems.length;
         }
         return total;
      }, 0);
   }, [filteredCategories, courses]);
   
   const hasVideos = useMemo(() => {
      return filteredCategories.some(category => 
         category[courses] && 
         Array.isArray(category[courses]) && 
         category[courses].filter(item => !item.is_playlist).length > 0
      );
   }, [filteredCategories, courses]);

   const onDragEnd = (result) => {
      if (!result.destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      if (result.type === 'droppableItem') {
         const items = reorder(categories, sourceIndex, destIndex);

         onChange(items);
      } else if (result.type === 'droppableSubItem') {
         const itemSubItemMap = categories.reduce((acc, item) => {
            acc[item.id] = item[courses];
            return acc;
         }, {});

         const sourceParentId = +result.source.droppableId;
         const destParentId = +result.destination.droppableId;

         const sourceSubItems = itemSubItemMap[sourceParentId];
         const destSubItems = itemSubItemMap[destParentId];

         let newItems = [...categories];

         if (sourceParentId === destParentId) {
            const reorderedSubItems = reorder(
               sourceSubItems,
               sourceIndex,
               destIndex
            );
            newItems = newItems.map(item => {
               const itemVariable = item;
               if (item.id === sourceParentId) {
                  itemVariable[courses] = reorderedSubItems;
               }
               return item;
            });
            onChange(newItems);
         } else if (sourceParentId !== destParentId) {
            const newSourceSubItems = [...sourceSubItems];
            const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

            const newDestSubItems = [...destSubItems];
            if (newDestSubItems.filter(subitem => subitem.id === draggedItem.id)
            && !!newDestSubItems.filter(subitem => subitem.id === draggedItem.id).length) {
               if (isPrint("The element can't be added in this area.")) {
                  toast.error("The element can't be added in this area.");
               }
               return;
            }
            newDestSubItems.splice(destIndex, 0, draggedItem);
            newItems = newItems.map(item => {
               const itemVariable = item;
               if (item.id === sourceParentId) {
                  itemVariable[courses] = newSourceSubItems;
               } else if (item.id === destParentId) {
                  itemVariable[courses] = newDestSubItems;
               }
               return item;
            });
            onChange(newItems);
         }
      }
   };

   const visibleCategoriesCount = filteredCategories.filter(category => 
      category[courses] && 
      Array.isArray(category[courses]) && 
      category[courses].filter(item => !item.is_playlist).length > 0
   ).length;

   return (
      <div className="video-categories-container">
         <div className="search-filter-container">
            <div className="search-container">
               <input
                  type="text"
                  placeholder="Search across all categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
               />
            </div>
            <div className="filters-container">
               <div className="filter-dropdown">
                  <button className="filter-button" onClick={handleFilterToggle}>
                     <IconNew name="Filter" color="#333" />
                     <span>Filter</span>
                  </button>
                  {isFilterOpen && (
                     <div className="filter-dropdown-menu">
                        <div className="filter-section">
                           <div className="filter-title">Status</div>
                           <div className="filter-options">
                              <div 
                                 className={`filter-option ${filterOptions.status === 'all' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('status', 'all')}
                              >
                                 All
                              </div>
                              <div 
                                 className={`filter-option ${filterOptions.status === 'published' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('status', 'published')}
                              >
                                 Published
                              </div>
                              <div 
                                 className={`filter-option ${filterOptions.status === 'draft' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('status', 'draft')}
                              >
                                 Draft
                              </div>
                           </div>
                        </div>
                        <div className="filter-section">
                           <div className="filter-title">Sort By</div>
                           <div className="filter-options">
                              <div 
                                 className={`filter-option ${filterOptions.sortBy === 'newest' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('sortBy', 'newest')}
                              >
                                 Newest
                              </div>
                              <div 
                                 className={`filter-option ${filterOptions.sortBy === 'oldest' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('sortBy', 'oldest')}
                              >
                                 Oldest
                              </div>
                              <div 
                                 className={`filter-option ${filterOptions.sortBy === 'most-viewed' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('sortBy', 'most-viewed')}
                              >
                                 Most Viewed
                              </div>
                              <div 
                                 className={`filter-option ${filterOptions.sortBy === 'alphabetical' ? 'active' : ''}`}
                                 onClick={() => handleFilterChange('sortBy', 'alphabetical')}
                              >
                                 A-Z
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
               <div className="video-selector-container">
                  <div className="video-selector" onClick={handleVideoFilterToggle}>
                     <span>{videoTypeFilter === 'all' ? 'All Videos' : videoTypeFilter}</span>
                     <IconNew name="ChevronDown" color="#333" />
                  </div>
                  {isVideoFilterOpen && (
                     <div className="video-dropdown-menu">
                        <div 
                           className={`video-option ${videoTypeFilter === 'all' ? 'active' : ''}`}
                           onClick={() => handleVideoTypeChange('all')}
                        >
                           All Videos
                        </div>
                        <div 
                           className={`video-option ${videoTypeFilter === 'standard' ? 'active' : ''}`}
                           onClick={() => handleVideoTypeChange('standard')}
                        >
                           Standard
                        </div>
                        <div 
                           className={`video-option ${videoTypeFilter === 'featured' ? 'active' : ''}`}
                           onClick={() => handleVideoTypeChange('featured')}
                        >
                           Featured
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className="filter-summary">
            {hasVideos ? (
               <Text
                  inner={`Showing ${totalVideos} video${totalVideos !== 1 ? 's' : ''} across ${visibleCategoriesCount} categor${visibleCategoriesCount !== 1 ? 'ies' : 'y'}`}
                  type={types.regularDefault}
                  size={sizes.small}
               />
            ) : searchQuery || filterOptions.status !== 'all' || videoTypeFilter !== 'all' ? (
               <Text
                  inner="No videos match your current filters"
                  type={types.regularDefault}
                  size={sizes.small}
               />
            ) : null}
         </div>

         {!hasVideos && (searchQuery || filterOptions.status !== 'all' || videoTypeFilter !== 'all') && (
            <div className="empty-results">
               <IconNew name="EmptySearch" color="#999" size="large" />
               <Text
                  inner="No videos found matching your filters"
                  type={types.regularDefault}
                  size={sizes.medium}
               />
            </div>
         )}

         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable' type='droppableItem'>
               {(provided, snapshot) => (
                  <div
                     ref={provided.innerRef}
                     style={getListStyle(snapshot.isDraggingOver)}
                     className="categories-list"
                  >
                     {filteredCategories.map((item, index) => {
                        // Skip rendering categories with no matching videos
                        const nonPlaylistItems = item[courses]?.filter(courseItem => !courseItem.is_playlist) || [];
                        if (nonPlaylistItems.length === 0) {
                           return null;
                        }

                        // Calculate the actual visible index for header display
                        const visibleIndex = filteredCategories
                           .slice(0, index)
                           .filter(cat => 
                              cat[courses]?.filter(i => !i.is_playlist).length > 0
                           ).length;

                        return (
                           <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                              {(p, s) => (
                                 <div>
                                    <CategoryItem
                                       provided={p}
                                       snapshot={s}
                                       isCategorySettings={isCategorySettings}
                                       courses={courses}
                                       isAdminVideo={isAdminVideo}
                                       isProgressDetachedCourses={isProgressDetachedCourses}
                                       videoProps={videoProps}
                                       categories={categories}
                                       isVideo={courses === 'lessons'}
                                       getItemStyle={getItemStyle}
                                       item={item}
                                       removeCategory={removeCategory}
                                       seo={seo}
                                       setSeo={setSeo}
                                       duplicatePlaylist={duplicatePlaylist}
                                       index={index}
                                       showSearchBar={false}
                                       showHeader={visibleIndex === 0}
                                       {...categoryProps}
                                    />
                                    {p.placeholder}
                                 </div>
                              )}
                           </Draggable>
                        );
                     })}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </div>
   );
};

CategorySortableList.propTypes = {
   categories: PropTypes.array,
   categoryProps: PropTypes.object,
   onChange: PropTypes.func,
   isVideo: PropTypes.bool,
   isAdminVideo: PropTypes.bool,
   videoProps: PropTypes.object,
   isCategorySettings: PropTypes.bool,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   removeCategory: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   duplicatePlaylist: PropTypes.func,
};

export default CategorySortableList;