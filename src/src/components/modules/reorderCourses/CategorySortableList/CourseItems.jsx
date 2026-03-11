import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import IToolTipNew from 'components/elements/IToolTipNew';
import LessonRight from 'views/pages/DesignCourse/DesingCourseGeneral/DesignCourseGeneralComponents/VideoProgramMediaViewLessons/LessonRight';
import { videoAdminImg } from 'utils/videoImg';
import './courseitem.css';

const customStyles = `
.publish-button-container {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.publish-button-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.publish-text {
  font-size: 12px;
  font-weight: 500;
}

.action-button.publish {
  border-radius: 4px;
  padding: 0;
  margin-right: 8px;
  overflow: hidden;
}

.action-button.publish.unpublish .publish-button-container {
  background-color: rgba(76, 175, 80, 0.1);
}

.bulk-publish-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 12px;
}

.bulk-publish-button:hover {
  background-color: #3d8b40;
}

.bulk-actions-bar {
  display: flex;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 16px;
  align-items: center;
}
`;


export default function CategoryCourses({
  type, subItems, detach, categoryName, isAdminVideo, videoProps, category,
  showSearchBar = false, 
  showHeader = true,
  onPublish = () => {}      
}) {
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedDeleteItems, setSelectedDeleteItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [filterOptions, setFilterOptions] = useState({
    status: 'all',
    sortBy: 'newest'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [videoTypeFilter, setVideoTypeFilter] = useState('all');
  const [isVideoFilterOpen, setIsVideoFilterOpen] = useState(false);
  const [publishingItem, setPublishingItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIsTablet(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (!subItems) return;
    
    let filtered = [...subItems];
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterOptions.status !== 'all') {
      filtered = filtered.filter(item => {
        const status = getStatus(item).toLowerCase();
        return status === filterOptions.status.toLowerCase();
      });
    }
    
    if (videoTypeFilter !== 'all') {
      filtered = filtered.filter(item => {
        const videoType = item.video_type || 'standard';
        return videoType === videoTypeFilter;
      });
    }
    
    if (filterOptions.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (filterOptions.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
    } else if (filterOptions.sortBy === 'most-viewed') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (filterOptions.sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, subItems, filterOptions, videoTypeFilter]);

  const handleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  const handleSelectItem = (itemId, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const getStatus = (item) => {
    if (item.is_published === "1") return "Published";
    if (item.draft) return "Draft"; 
    return "Draft";
  };

  const getFileSize = (item) => {
    return item.file_size || "";
  };

  const getViews = (item) => {
    return item.views || "N/A";
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

  const nonPlaylistItems = useMemo(() => {
    const filtered = filteredItems.filter(item => !item.is_playlist);
    return filtered;
  }, [filteredItems]);

  const handleBulkDelete = () => {
    const itemsToDelete = nonPlaylistItems.filter(item => selectedItems.has(item.id));
    setSelectedDeleteItems(itemsToDelete);
    setIsOpenDeletePopup(true);
  };

  const handleConfirmBulkDelete = () => {
    selectedDeleteItems.forEach(item => {
      if (!(categoryName === 'New Releases' && !item.allowDelete)) {
        detach(item.id);
      }
    });
    
    setIsOpenDeletePopup(false);
    setSelectedItems(new Set());
    setSelectedDeleteItems([]);
  };

  const handlePublish = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    const newPublishState = item.is_published === "1" ? "0" : "1";
    onPublish(item.id, newPublishState);
    setPublishingItem(item.id);
    
    // Update UI optimistically
    const updatedItems = subItems.map(subItem => {
      if (subItem.id === item.id) {
        return {
          ...subItem,
          is_published: newPublishState
        };
      }
      return subItem;
    });
    
    setTimeout(() => {
      setPublishingItem(null);
    }, 1000);
  };

  const handleBulkPublish = () => {
    const itemsToPublish = nonPlaylistItems.filter(item => selectedItems.has(item.id));
    itemsToPublish.forEach(item => {
      onPublish(item.id, "1");
    });
    setSelectedItems(new Set());
  };

  const getDeleteModalTitle = () => {
    if (selectedDeleteItems.length === 1) {
      return `Are you sure you want to delete [${selectedDeleteItems[0].name}] from [${categoryName}] category?`;
    } else {
      return `Are you sure you want to delete ${selectedDeleteItems.length} items from [${categoryName}] category?`;
    }
  };

  const selectedItemsCount = selectedItems.size;
  const isAdminVideoValue = isAdminVideo;

  return (
    <div className="category-courses-container">
      <style>{customStyles}</style>
      {showSearchBar && (
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search videos..."
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
      )}
      
      {selectedItems.size > 0 &&  (
        <div className="bulk-actions-bar">
          {/* <button className="bulk-publish-button" onClick={handleBulkPublish}>
            <IconNew name="CheckCircle" color="#4CAF50" />
            <span>Publish Selected ({selectedItems.size})</span>
          </button> */}
          <button className="bulk-delete-button" onClick={handleBulkDelete}>
            <IconNew name="TrashCategoryM" color="#D12D36" />
            <span>Delete Selected ({selectedItems.size})</span>
          </button>
        </div>
      )}
      
      {!isSmallScreen && nonPlaylistItems.length > 0 && showHeader && (
        <div className={`video-list-header ${isTablet ? 'tablet-view' : ''}`}>
          <div className="header-checkbox">
            <input
              type="checkbox"
              checked={selectedItems.size === nonPlaylistItems.length && nonPlaylistItems.length > 0}
              onChange={handleSelectAll}
              className="checkbox-input"
            />
          </div>
          <div className="header-title">Title</div>
          {!isTablet && (
            <div className="header-status">Status</div>
          )}
          <div className="header-actions">Actions</div>
        </div>
      )}
      
      <div className="video-list-container">
        {isOpenDeletePopup && (
          <DeleteModal
            title={getDeleteModalTitle()}
            deleteText="Delete"
            cancelBtnSize="large120"
            onDelete={() => {
              if (selectedDeleteItems.length > 1) {
                handleConfirmBulkDelete();
              } else if (selectedDeleteId) {
                detach(selectedDeleteId.id);
                setIsOpenDeletePopup(false);
                setSelectedDeleteId(null);
              }
            }}
            onCancel={() => {
              setIsOpenDeletePopup(false);
              setSelectedDeleteItems([]);
              setSelectedDeleteId(null);
            }}
          />
        )}
        
        {nonPlaylistItems.length > 0 ? (
          nonPlaylistItems.map((item) => {
            const itemStatus = getStatus(item);
            const itemFileSize = getFileSize(item);
            const isPublished = item.is_published === "1";
            
            return (
              <React.Fragment key={item.id}>
                <div 
                  className={`video-list-item-wrapper ${isTablet ? 'tablet-view' : ''} ${isSmallScreen ? 'mobile-view' : ''}`}
                  onClick={isAdminVideo ? () => {
                    videoProps.goToLesson(item);
                  } : null}
                  role="presentation"
                  style={isAdminVideo ? { cursor: 'pointer' } : {}}
                >
                  <div
                    className={`video-list-item ${isTablet ? 'tablet-view' : ''} ${isSmallScreen ? 'mobile-view' : ''}`}
                  >
                    <div className="video-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e)}
                        className="checkbox-input"
                      />
                    </div>
                    <div className="video-title-column">
                      <div className="video-thumbnail">
                        {isAdminVideo ? (
                          <IconNew name="VideoM" />
                        ) : (
                          <div className="thumbnail-container">
                            {((item.thumbnail_image && item.thumbnail_image.includes('/images/defaults/thumbnail.png') && item.picture_src) || 
                              (!item.thumbnail_image && !videoAdminImg(item))) ? (
                              <IconNew name="DefaultImg" />
                            ) : (
                              <img 
                                src={item.thumbnail_image || videoAdminImg(item)} 
                                className="thumbnail-image" 
                                alt="" 
                              />
                            )}
                          </div>
                        )}
                        <div className="video-title-text">
                          <Text
                            inner={item.name.length > (isSmallScreen ? 10 : isTablet ? 20 : 70) ? 
                              `${item.name.slice(0, isSmallScreen ? 10 : isTablet ? 20 : 70)}...` : 
                              item.name}
                            type={types.regularDefault}
                            size={isAdminVideo ? sizes.small_14 : sizes.small}
                          />
                          <span className="file-size">{itemFileSize}</span>
                        </div>
                      </div>
                      {isSmallScreen && (
                        <div className="mobile-metadata">
                          <div className="mobile-status">
                            <span className={`status-badge ${itemStatus.toLowerCase()}`}>
                              {itemStatus}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {!isSmallScreen && (
                      <>
                        {!isTablet && (
                          <div className="video-status-column">
                            <span className={`status-badge ${itemStatus.toLowerCase()}`}>
                              {itemStatus}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="video-actions-column">
                      {!isAdminVideo ? (
                        <>
                          <div
                            role="presentation"
                            onClick={(e) => handlePublish(item, e)}
                            className={`action-button publish ${isPublished ? 'unpublish' : ''}`}
                            title={isPublished ? "Unpublish" : "Publish"}
                          >
                            {publishingItem === item.id ? (
                              <IconNew name="Spinner" color="#4CAF50" />
                            ) : (
                              <>
                                <div className="publish-button-container">
                                  <IconNew
                                    name={isPublished ? "CheckCircle" : "Globe"}
                                    color={isPublished ? "#4CAF50" : "#666"}
                                  />
                                  <span className="publish-text">{isPublished ? "Published" : "Publish"}</span>
                                </div>
                              </>
                            )}
                          </div>
                          <div
                            role="presentation"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!(!item.allowDelete && categoryName === 'New Releases')) {
                                setIsOpenDeletePopup(true);
                                setSelectedDeleteId({ id: item.id, name: item.name });
                                setSelectedDeleteItems([item]);
                              }
                            }}
                            className="action-button delete"
                          >
                            <IconNew
                              name="TrashCategoryM"
                              color={!item.allowDelete && categoryName === 'New Releases' ? 'grey' : '#D12D36'}
                            />
                            {categoryName === 'New Releases' && !item.allowDelete && (
                              <IToolTipNew
                                tooltip="The course should be connected with at least one category"
                                iconName="ToolTipCategory"
                                id={`${item.id}`}
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <LessonRight
                          lesson={item}
                          category={category}
                          course={videoProps.course}
                          deleteLesson={videoProps.deleteLesson}
                          handleSaveLesson={videoProps.handleSaveLesson}
                          onSelectLessonSettings={videoProps.onSelectLessonSettings}
                          currentSection={videoProps.currentSection}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {!isAdminVideo && <div className="item-divider" />}
              </React.Fragment>
            );
          })
        ) : (
          <div className="empty-results">
            <IconNew name="EmptySearch" color="#999" size="large" />
            <Text
              inner="No videos found matching your filters"
              type={types.regularDefault}
              size={sizes.medium}
            />
          </div>
        )}
      </div>
    </div>
  );
}

CategoryCourses.propTypes = {
  type: PropTypes.string,
  subItems: PropTypes.array,
  categoryName: PropTypes.string,
  detach: PropTypes.func,
  isAdminVideo: PropTypes.bool,
  videoProps: PropTypes.object,
  category: PropTypes.object,
  showSearchBar: PropTypes.bool,
  showHeader: PropTypes.bool,
  onPublish: PropTypes.func
};