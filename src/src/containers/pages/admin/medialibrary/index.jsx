/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as operations from 'state/modules/mediaLibrary/operations';
import * as selectors from 'state/modules/mediaLibrary/selectors';
import * as actions from 'state/modules/mediaLibrary/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import MediaLibraryView from 'views/pages/mediaLibrary';
import MediaEmpty from 'views/newLayout/mediaEmpty';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import Popup from 'components/modules/Popup';
import CreatePopupContent from 'components/modules/mediaLibrary/CreatePopupContent';
import UploadModal from 'components/modules/UploadModal';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMob from 'containers/modules/siteheader/index.mob';
import { screenWidthSelector } from 'state/modules/common/selectors';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import { sendAwsFile } from 'api';


class MediaLibraryContainer extends Component {
   static propTypes = {
      mediaTypes: PropTypes.array,
      getMedias: PropTypes.func,
      setMediasMode: PropTypes.func,
      updateMediaName: PropTypes.func,
      medias: PropTypes.array,
      mode: PropTypes.object,
      isFetchingData: PropTypes.bool,
      changePageInProgress: PropTypes.bool,
      pagination: PropTypes.object,
      activeTab: PropTypes.string,
      changeActiveTab: PropTypes.func,
      deleteMedia: PropTypes.func,
      createMedia: PropTypes.func,
      addTag: PropTypes.func,
      createFolder: PropTypes.func,
      folders: PropTypes.array,
      getFolders: PropTypes.func,
      getTags: PropTypes.func,
      duplicate: PropTypes.func,
      filter: PropTypes.func,
      count: PropTypes.number,
      labels: PropTypes.array,
      getLabels: PropTypes.func,
      createLabel: PropTypes.func,
      getProgress: PropTypes.bool,
      updateFolderName: PropTypes.func,
      screenWidth: PropTypes.number,
      tags: PropTypes.array,
   };

   state = {
      isOpenCreateFolderPopup: false,
      search: { date_from: new Date(), date_to: null },
      filterData: {
         searchValue: '', sortingBy: 'created_at', fileType: 'all',
      },
      currentFolder: {
         id: null,
      },
      isOpenUploadModal: false,
      checkedFoldersIds: [],
      checkedFilesIds: [],
      folderData: {
         isMulti: false, titleFolder: '', selectedTags: [], selectedLabels: [],
      },
      isLibraryInited: false,
      isUploadingInProgress: false,
      errorMessages: {},
   }

   componentDidMount() {
      const { getTags, getFolders, getLabels } = this.props;
      getTags();
      getLabels();
      getFolders(() => this.setState({ isLibraryInited: true }));
      // getMedias({ format: 'video', isFilter: true });
      // changeActiveTab('video');
   }

   componentDidUpdate(prevProps, prevState) {
      const { folders } = this.props;

      if (prevState.currentFolder && prevState.currentFolder.id) {
         const newCurrentFolder = folders.find(fold => fold.id === prevState.currentFolder.id);


         if (!newCurrentFolder) {
            // eslint-disable-next-line
            this.setState({ currentFolder: folders[0] });
         }

         if (JSON.stringify(newCurrentFolder) !== JSON.stringify(prevState.currentFolder)) {
            // eslint-disable-next-line
         {this.setState({ currentFolder: folders.find(fold => fold.id === prevState.currentFolder.id) });}
         }
      }
   }

   removeErrorMessage = (fieldName) => {
      this.setState((prevState) => ({
         errorMessages: {
            ...prevState.errorMessages,
            [fieldName]: [],
         },
      }));
   };

   addErrorMessages = (newErrors) => {
      this.setState((prevState) => ({
         errorMessages: {
            ...prevState.errorMessages,
            ...newErrors,
         },
      }));
   };

   onChangeActiveTab = (tab) => {
      const { getMedias, changeActiveTab } = this.props;
      this.setState({ search: {} });
      changeActiveTab(tab);
      getMedias({ format: tab, isFilter: true });
   }

   isVaildSearch = () => {
      const { search } = this.state;
      return search.search || (search.date_to && search.date_from);
   }

   onChangeMode = (mode, data) => {
      const { setMediasMode } = this.props;
      setMediasMode({ mode, data });
   }

   onModalClose = () => {
      const { setMediasMode } = this.props;
      setMediasMode({});
   }

   onEditName = () => {
      const {
         mode, updateMediaName, activeTab, setMediasMode,
      } = this.props;
      setMediasMode({ ...mode, mode: 'edit-submit' });
      if (mode.data.isTitle) {
         updateMediaName({
            title: mode.data.title, isTitle: true, id: mode.data.id, src: mode.data.src,
         });
      } else {
         updateMediaName({
            format: activeTab, name: mode.data.name, src: mode.data.src, id: mode.data.id,
         });
      }
   }

   onDelete = () => {
      const { mode, deleteMedia, activeTab } = this.props;
      if (mode.data.isTitle) {
         deleteMedia({
            format: activeTab, src: mode.data.src, isTitle: mode.data.isTitle, id: mode.data.id,
         });
      } else {
         deleteMedia({ format: activeTab, src: mode.data.src, id: mode.data.id });
      }
   }

   onPageChange = data => {
      const { getMedias, activeTab } = this.props;
      getMedias({ format: activeTab, page: data.currentPage });
   }

   onSearch = () => {
      const { getMedias, activeTab } = this.props;
      if (this.isVaildSearch()) {
         const { search } = this.state;

         const formatedDate = {};
         if (search.date_from && search.date_to) {
            formatedDate.date_from = moment(search.date_from).format('YYYY/MM/DD');
            formatedDate.date_to = moment(search.date_to).format('YYYY/MM/DD');
         }

         getMedias({ isFilter: true, format: activeTab, ...{ ...search, ...formatedDate } });
      } else {
         getMedias({ format: activeTab });
      }
   }

   onSearchChange = (key, value) => {
      const { search } = this.state;
      if (key instanceof Object) {
         this.setState({ search: { ...search, ...key } });
      } else {
         this.setState({ search: { ...search, [key]: value } });
      }
   }

   uploadVideo = (info) => {
      const { createMedia, activeTab } = this.props;
      const params = {
         src: info.cdnUrl,
         size: info.size,
         format: activeTab,
         mime_type: info.mimeType,
         original_name: info.name,
      };
      createMedia(params, activeTab);
   }

   uploadMedia = (info) => {
      const { createMedia, activeTab } = this.props;
      const params = {
         src: info.cdnUrl,
         mime_type: info.mimeType,
         format: activeTab,
         original_name: info.name,

      };
      createMedia(params, activeTab);
   }

   onUpload = (info) => {
      const { activeTab } = this.props;
      if (activeTab === 'video') {
         this.uploadVideo(info);
      } else {
         this.uploadMedia(info);
      }
   }

   handleOpenCreatePopup = () => {
      this.setState({
         isOpenCreateFolderPopup: true,
      });
   }

   handleAcceptCreate = async () => {
      const { folderData } = this.state;
      const { createFolder } = this.props;
      const tagIds = folderData.selectedTags.map((tag) => tag.id);
      const labels = folderData.selectedLabels.map((label) => label.id);
      const folderObj = {
         name: folderData.titleFolder,
      };
      if (tagIds.length) {
         folderObj.tags_id = tagIds;
      }
      if (labels.length) {
         folderObj.labels_id = labels;
      }

      const errMessage = await createFolder(folderObj);

      if (errMessage === undefined) {
         this.setState({
            isOpenCreateFolderPopup: false,
         });
         this.handleClearState();
      }

      if (errMessage) {
         this.addErrorMessages({ name: errMessage });

         setTimeout(() => {
            this.removeErrorMessage('name');
         }, 1500);
      }
   }

   handleChangeFolderData = (name, value, action) => {
      const { folderData, folderData: { selectedTags, selectedLabels } } = this.state;
      if (name === 'tag') {
         if (action === 'attach') {
            this.setState({
               folderData: {
                  ...folderData,
                  selectedTags: [
                     ...selectedTags,
                     value,
                  ],
               },
            });
         } else {
            this.setState({
               folderData: {
                  ...folderData,
                  selectedTags: selectedTags.filter((i) => i.id !== value),
               },
            });
         }
      } else if (name === 'label') {
         if (action === 'attach') {
            this.setState({
               folderData: {
                  ...folderData,
                  selectedLabels: [
                     ...selectedLabels,
                     value,
                  ],
               },
            });
         } else {
            this.setState({
               folderData: {
                  ...folderData,
                  selectedLabels: selectedLabels.filter((i) => i.id !== value),
               },
            });
         }
      } else {
         this.setState({
            folderData: {
               ...folderData,
               [name]: value,
            },
         });
      }
   }

 changeVideoFilter = (format) => {
    const { filterData } = this.state;
    this.setState({
       filterData: { ...filterData, fileType: format },
    });
 }

   handleUploadFile = async (info) => {
      const { createMedia } = this.props;
      const { currentFolder, filterData } = this.state;
      const { folders } = this.props;
      const data = {
         mime_type: info.file.type,
         original_name: info.name,
         src: info.url,
         folder_id: folders.length ? currentFolder.id || folders[0].id : null,
      };
      if (info.file.type.includes('image')) {
         data.format = 'image';
      } else if (info.file.type.includes('pdf')) {
         data.format = 'pdf';
      } else if (info.file.type.includes('ppt') || info.file.type.includes('application')) {
         data.format = 'ppt';
      } else if (info.file.type.includes('audio')) {
         data.format = 'audio';
      } else if (info.file.type.includes('video')) {
         data.format = 'video';
         data.size = info.file.size;
      }

      try {
         if (data.format === 'video') {
            const res = await sendAwsFile({
               file: info.file,
               src: info.url,
               name: info.url.split('/')[info.url.split('/').length - 1],
               original_name: info.name,
               subtitle: 0,
               type: info.file.type,
               folder_id: folders.length ? currentFolder.id || folders[0].id : null,
            });
         }
      } catch (error) {
      } finally {
         this.setState({
            isOpenUploadModal: false,
            filterData: { ...filterData, sortingBy: 'created_at' },
            // currentFolder: { id: null },
         });
         createMedia(data, data.format, filterData.fileType);
      }
   }


   handleFilter = (data) => {
      const { filterData } = this.state;
      const toFilter = {
         ...filterData,
         ...data,
      };
      const { filter } = this.props;
      filter(`?${ toFilter.searchValue ? `search=${ toFilter.searchValue }&` : '' }${ toFilter.sortingBy ? `type=${ toFilter.sortingBy }` : '' }&${ `fileType=${ toFilter.fileType }` }`);
   }

   handleChangeFilterData = (name, value) => {
      const { filterData } = this.state;
      this.setState({
         filterData: {
            ...filterData,
            [name]: value,
         },
      });
      if (name === 'searchValue' || name === 'fileType') {
         this.handleFilter({
            [name]: value,
         });
      } else if (name === 'sortingBy') {
         this.handleFilter({
            ...filterData,
            [name]: value,
         });
      }
   }

   handleFolderGeneralCheck = () => {
      const { checkedFoldersIds } = this.state;
      const { folders } = this.props;
      if (checkedFoldersIds.length === folders.length - 1) {
         this.setState({
            checkedFoldersIds: [],
         });
      } else {
         const ids = folders.filter((folder) => !folder.is_default).map(folder => folder.id);
         this.setState({
            checkedFoldersIds: ids,
         });
      }
   }

   selectFolder = (id) => {
      const { folders } = this.props;
      this.setState({
         currentFolder: folders.filter((folder) => folder.id === id)[0],
      });
   }

   handleCheck = (id, type, action) => {
      const { checkedFoldersIds, checkedFilesIds } = this.state;
      const { folders } = this.props;
      if (type === 'folder') {
         const ids = folders.filter((folder) => folder.id === id)[0].files || [];
         if (action === 'delete') {
            this.setState({
               checkedFoldersIds: checkedFoldersIds.filter((i) => i !== id),
               checkedFilesIds: checkedFilesIds.filter((file) => ids.includes(file)),
            });
         } else {
            const newCheckedIds = new Set([
               ...checkedFilesIds,
               ...(ids.map((file) => file.id)),
            ]);
            this.setState({
               checkedFoldersIds: [...checkedFoldersIds, id],
               checkedFilesIds: Array.from(newCheckedIds),
            });
         }
      }
   }

   handleBulkRemove = (closeModal) => {
      const { checkedFoldersIds, checkedFilesIds, filterData } = this.state;
      const { deleteMedia } = this.props;
      deleteMedia(checkedFoldersIds, checkedFilesIds);
      closeModal(false);
      this.setState({
         // currentFolder: { id: null },
         checkedFoldersIds: [],
         checkedFilesIds: [],
         filterData: {
            ...filterData,
            isMulti: false,
         },
      });
   }

   handleRemove = (data, closeModal) => {
      const { deleteMedia } = this.props;
      const { filterData } = this.state;
      deleteMedia(data.folders_id, { id: data.files_id, type: data.type || filterData.fileType });
      closeModal(null);
      this.setState({
         // currentFolder: { id: null },
         checkedFoldersIds: [],
         checkedFilesIds: [],
         filterData: {
            ...filterData,
            isMulti: false,
         },
      });
   }

   handleCheckFile = (checkedFile) => {
      const { checkedFilesIds, filterData } = this.state;

      if (checkedFilesIds.find(file => file.id === checkedFile.id)) {
         this.setState({
            checkedFilesIds: checkedFilesIds.filter(file => file.id !== checkedFile.id),
         });
      } else {
         this.setState({
            checkedFilesIds: [...checkedFilesIds, { ...checkedFile, type: checkedFile.type || filterData.fileType }],
         });
      }
   }

   handleCheckAllFiles = (ids, verson) => {
      const { checkedFilesIds } = this.state;
      if (verson === 'remove') {
         this.setState({
            checkedFilesIds: checkedFilesIds.filter((file) => !ids.includes(file)),
         });
      } else {
         this.setState({
            checkedFilesIds: Array.from(new Set([...checkedFilesIds, ...ids])),
         });
      }
   }

   handelDuplicate = (id) => {
      const { duplicate } = this.props;
      duplicate(id);
   }

   handleClearState = () => {
      const { folderData } = this.state;
      this.setState({
         folderData: {
            ...folderData,
            titleFolder: '',
            selectedLabels: [],
            selectedTags: [],
         },
      });
   }

   handleCreateLabel = (name) => {
      const { createLabel } = this.props;
      createLabel(name);
   }

   render() {
      const {
         medias = [], mediaTypes = [], isFetchingData, mode, pagination,
         activeTab, changePageInProgress, tags, addTag, folders, count, labels,
         getProgress, updateFolderName, screenWidth, getFolders,
      } = this.props;
      const {
         checkedFoldersIds, isOpenCreateFolderPopup, folderData, isOpenUploadModal, filterData,
         currentFolder, checkedFilesIds, isLibraryInited, isUploadingInProgress, errorMessages
      } = this.state;

      return (
         <>
            <MobileHeader>
               <SiteHeaderMob
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <Container
            // isLoading={ isFetchingData || getProgress }
            >
               {isOpenUploadModal && (
                  <UploadModal
                     fileLessonFormat='media'
                     isWithoutModal={ true }
                     isAmazonFile={ true }
                     onChange={ (url, name, file) => {
                        this.handleUploadFile({ url, name, file });
                     } }
                     onCloseModal={ isUploadingInProgress
                        ? () => {} : () => this.setState({ isOpenUploadModal: false }) }
                     isBulk={ true }
                     onLoadingChange={ (bool) => this.setState({ isUploadingInProgress: bool }) }
                     onClickCancel={ () => this.setState({ isOpenUploadModal: false }) }
                  />
               )}
               {isOpenCreateFolderPopup && (
                  <Popup
                     isOpen={ isOpenCreateFolderPopup }
                     onAcceptText='Create'
                     onAccept={ () => {
                        this.handleAcceptCreate();
                        // this.handleClearState();
                     } }
                     onClose={ () => {
                        this.setState({ isOpenCreateFolderPopup: false });
                        this.handleClearState();
                     } }
                     cancelText='Close'
                  >
                     <CreatePopupContent
                        inputs={ folderData }
                        onChange={ this.handleChangeFolderData }
                        errorMessages={ errorMessages }
                        // tags={ tags }
                        // labels={ labels }
                        // onCreateTag={ addTag }
                        // onCreateLabel={ this.handleCreateLabel }
                     />
                  </Popup>
               )}
               <Container.Content>
                  <HeaderTypeSecond
                     title='Media Library'
                     tooltip='text'
                     isHaveBaseButton={ Boolean(folders.length) }
                     buttonProps={ {
                        text: 'Upload File',
                        iconName: 'UploadFile',
                        isIconRight: true,
                        onClick: () => this.setState({ isOpenUploadModal: true }),
                     } }
                     isHidenSearch={ true }
                     paddingTop={ 0 }
                  />
                  {(isFetchingData || !isLibraryInited || getProgress) && (
                     <LoaderSpinner />
                  )}
                  <>
                     {count ? (
                        <MediaLibraryView
                           onCheck={ this.handleCheck }
                           onRemoveSelected={ this.handleBulkRemove }
                           data={ folders }
                           selectedFolderId={ folders.length
                              ? (currentFolder && currentFolder.id) || folders[0].id : null }
                           checkedFoldersIds={ checkedFoldersIds }
                           currentFolder={ currentFolder && currentFolder.id ? currentFolder : folders[0] }
                           handleFolderGeneralCheck={ this.handleFolderGeneralCheck }
                           filterData={ filterData }
                           setFilterData={ this.handleChangeFilterData }
                           onFilter={ this.handleFilter }
                           onUpload={ () => this.setState({ isOpenUploadModal: true }) }
                           onSelect={ this.selectFolder }
                           checkedFiles={ checkedFilesIds }
                           onCheckFile={ this.handleCheckFile }
                           onSingleRemove={ this.handleRemove }
                           onDuplicate={ this.handelDuplicate }
                           onAdd={ this.handleOpenCreatePopup }
                           onCheckAllFiles={ this.handleCheckAllFiles }
                           updateFolderName={ updateFolderName }
                           isMobile={ screenWidth < 1025 }
                           getFolders={ getFolders }
                        />
                     ) : (
                        <>
                           {!(isFetchingData || !isLibraryInited || getProgress)
                         && (
                            <MediaEmpty
                               handleOpenCreateFolderPopup={ this.handleOpenCreatePopup }
                               onUpload={ this.handleUploadFile }
                            />
                         )}
                        </>
                     )}
                  </>
               </Container.Content>
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      medias: selectors.mediasSelector(state),
      folders: selectors.foldersSelector(state),
      mediaTypes: selectors.mediaTypesSelector(state),
      isFetchingData: selectors.isFetchingDataSelector(state),
      mode: selectors.mediaModeSelector(state),
      pagination: selectors.mediaPaginationSelector(state),
      activeTab: selectors.activeTabSelector(state),
      tags: selectors.mediaTagsSelectore(state),
      changePageInProgress: selectors.changePageInProgressSelector(state),
      count: selectors.folderCountSelector(state),
      labels: selectors.mediaLabelsSelector(state),
      getProgress: selectors.getProgressSelector(state),
      screenWidth: screenWidthSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      filter: (query) => {
         dispatch(operations.filterFolders(query));
      },
      getMedias: (params) => {
         dispatch(operations.getMedias(params));
      },
      getFolders: (callback) => {
         dispatch(operations.getFoldersData('all', callback));
      },
      getTags: () => {
         dispatch(operations.getTagsForMedia());
      },
      addTag: (name) => {
         dispatch(operations.addTagOperation(name));
      },
      updateMediaName: (params) => {
         dispatch(operations.updateMediaNameOperation(params));
      },
      setMediasMode: data => {
         dispatch(actions.setMediasMode(data));
      },
      changeActiveTab: tab => {
         dispatch(actions.changeActiveTab(tab));
      },
      createMedia: (params, tab, currentType) => {
         dispatch(operations.CreateMediaOperation(params, tab, currentType));
      },
      createFolder: (params) => dispatch(operations.addFolderOperation(params)),
      deleteMedia: (folderIds, filesIds) => {
         dispatch(operations.bulkDeleteMedia(folderIds, filesIds));
      },
      duplicate: (id) => {
         dispatch(operations.duplicateFolder(id));
      },
      getLabels: () => {
         dispatch(operations.getLabelsOperation());
      },
      createLabel: (name) => {
         dispatch(operations.createLabelOperation(name));
      },
      updateFolderName: (id, folderName, callback) => {
         dispatch(operations.updateFolderNameOperation(id, folderName, callback));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaLibraryContainer);
