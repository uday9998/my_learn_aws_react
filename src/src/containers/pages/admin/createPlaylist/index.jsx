import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { PlaylistTabVariants, tabVariants, statusVariants } from 'utils/constants';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   getLesson,
   getAllAuthors,
   savePlaylist,
   createAuthor,
   updatePlaylistAuthor,
   updatePlaylistAuthorName,
   deleteAuthor,
   changePlaylistVideoData,
   addVideoCategory,
} from 'api';
import moment from 'moment/moment';
import { toast } from 'react-toastify';

import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import Tabs from 'components/elements/tabs';
import Button, { SIZES as btnSizes, THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Seo from 'components/modules/Seo';
import Router from 'routes/router';
import ActionMenu from './components/ActionMenu';
import PlaylistInfo from './components/PlaylistInfo';
import InstructorSection from './components/InstructorSection';
import PlaylistContent from './components/PlaylistContent';
import PlaylistStatus from './components/PlaylistStatus';

import './index.scss';

const CreatePlaylist = () => {
   const { id, sectionId, playlistId } = useParams();
   const { data: playListsData, loading } = useApiQuery(getLesson, [id, sectionId, playlistId]);
   const [saveData, { loading: saveLoading }] = useSubmitForm(savePlaylist, {
      successMessage: 'Playlist updated successfully!',
   });
   const [changeVideoData] = useSubmitForm(changePlaylistVideoData);
   const [deleteNewAuthor] = useSubmitForm(deleteAuthor);
   const [updateInstructorName] = useSubmitForm(updatePlaylistAuthorName);
   const [updateNewAuthor] = useSubmitForm(updatePlaylistAuthor);
   const [createNewInstructor, { createAuthorLoading }] = useSubmitForm(createAuthor);
   const { data: authors } = useApiQuery(getAllAuthors);
   const history = useHistory();
   const [selectedTab, setSelectedTab] = useState(PlaylistTabVariants[0].value);
   const [selectedInstructorTab, setSelectedInstructorTab] = useState(tabVariants[0].value);
   const [fieldsValues, setFieldsValues] = useState({
      playlistName: '',
      areaValue: '',
      thumbnail_image: '',
      instructorAreaValue: '',
      imageName: '',
      fileType: '',
   });
   const [seo, setSeo] = useState(playListsData?.main_lesson?.seo_data || {});
   const [contentListData, setContentListData] = useState([]);
   const [isInstructor, setIsInstructor] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const [showSettings, setShowSettings] = useState(false);
   const [showActionMenu, setShowActionMenu] = useState(false);
   const [instructorData, setInstructorData] = useState({
      instAuthors: null,
      selectedAuthor: null,
      status: null,
      isOpenCreateModal: false,
   });
   const [addCategory, setAddCategory] = useState({
      active: false,
      inputValue: '',
   });
   const [playlistAccess, setPlaylistAccess] = useState('1');
   const [playlistCategories, setPlaylistCategores] = useState([]);
   const [uploadTrailer, setUploadTrailer] = useState({
      isOpenModal: false,
      pictureSrc: '',
      video__length: 0,
      isUploadedTrailer: false,
      createdAt: '',
   });
   const [createCategory] = useSubmitForm(addVideoCategory);
   const [allVideoData, setAllVideoData] = useState([]);
   const [seoLink, setSeoLink] = useState(playListsData?.main_lesson?.link || '');
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   const createPlaylist = (newCategory) => {
      setPlaylistCategores(prevState => {
         return [...prevState, newCategory];
      });
   };

   const handleAddCategory = (categoryValue) => {
      if (!categoryValue) {
         setAddCategory(prevState => {
            return {
               ...prevState,
               active: true,
            };
         });
      } else {
         setAddCategory(prevState => {
            return {
               ...prevState,
               inputValue: categoryValue.target.value,
            };
         });
      }
   };

   const handleCreateCategory = () => {
      const newCategory = { name: addCategory.inputValue };

      createCategory(newCategory, res => {
         newCategory.id = res.id;
         createPlaylist(newCategory);
      });

      setAddCategory(prevState => {
         return {
            ...prevState,
            active: !prevState.active,
            inputValue: '',
         };
      });
   };

   const handleAddVidoes = (data) => {
      setAllVideoData(data);
   };

   const handleChangeSeoLink = (link) => {
      setSeoLink(link);
   };

   const handleShowSettings = () => {
      setShowSettings(prevState => !prevState);
   };

   const handleShowActionMenu = () => {
      setShowActionMenu(prevState => !prevState);
   };

   const handleChangeVideoData = (showOnly, blockId) => {
      if (showOnly) {
         setContentListData(prevState => {
            return prevState.map(listData => {
               if (blockId === listData.block_id) {
                  return {
                     ...listData,
                     show_only_playlist: listData.show_only_playlist === 1 ? 0 : 1,
                  };
               }

               return listData;
            });
         });
      } else {
         setContentListData(prevState => {
            return prevState.map(listData => {
               if (blockId === listData.block_id) {
                  return {
                     ...listData,
                     free: listData.free === 1 ? 0 : 1,
                  };
               }

               return listData;
            });
         });
      }
   };

   const handleDeleteVideoData = (blockId) => {
      setAllVideoData(prevState => {
         return prevState.filter(videoData => {
            return videoData.id !== blockId;
         });
      });
   };

   const handleOpenModal = () => {
      setUploadTrailer(prevState => {
         return {
            ...prevState,
            isOpenModal: !prevState.isOpenModal,
         };
      });
   };

   const handleUploadTrailerVideo = (videoLength, createdAt) => {
      setUploadTrailer(prevState => {
         return {
            ...prevState,
            video__length: videoLength,
            isOpenModal: false,
            isUploadedTrailer: true,
            createdAt,
         };
      });
   };

   const handleDeleteTrailer = () => {
      setUploadTrailer(prevState => {
         return {
            ...prevState,
            isUploadedTrailer: false,
         };
      });
   };

   const handleChangeContentListData = (data) => {
      setContentListData(prevState => {
         return [...prevState, data];
      });
   };

   const handleChangePlaylistFileds = (name, value, file) => {
      if (file?.type.includes('video')) {
         setFieldsValues(prevState => {
            return {
               ...prevState,
               [name]: value,
               imageName: file?.name ? file.name : '',
               fileType: 'video',
            };
         });
      } else {
         const errorMessageName = name === 'playlistName' ? 'name' : name;

         if (errorMessages[errorMessageName]?.length) {
            removeErrorMessage(errorMessageName);
         }

         setFieldsValues(prevState => {
            return {
               ...prevState,
               [name]: value,
               imageName: file?.name ? file.name : '',
               fileType: 'image',
            };
         });
      }
   };

   const handleChangeTextarea = (event) => {
      const { name, value } = event.target;
      setFieldsValues(prevState => {
         return {
            ...prevState,
            [name]: value,
         };
      });
   };

   const goBack = () => {
      history.goBack();
   };

   const handleChangeSelectedTab = (step) => {
      setSelectedTab(PlaylistTabVariants.find(tab => tab.value === step).value);
   };

   const handleChangeInstructorTab = (step) => {
      setSelectedInstructorTab(tabVariants.find(tab => tab.value === step).value);
   };

   const handleChangeInstructorActive = () => {
      setIsInstructor(prevState => !prevState);
   };

   const handleChangeAuthorImage = (name, value) => {
      setInstructorData(prevState => {
         return {
            ...prevState,
            selectedAuthor: {
               ...prevState.selectedAuthor,
               [name]: value,
            },
         };
      });
   };

   const handleChangeInstructor = (_, id) => {
      setInstructorData(prevState => {
         return {
            ...prevState,
            selectedAuthor: {
               ...prevState.instAuthors.find(author => author.value === id),
               changedName: true,
            },
         };
      });
   };

   const handleGetSeoData = (title, description, image, keywords, link) => {
      return {
         title,
         description,
         image,
         keywords,
         link,
      };
   };

   const handleSaveAndContinue = (selectedTab) => {
      if (selectedTab === 2 && !allVideoData.length) {
         toast.error('Add at least one video to publish this playlist.');
      } else {
         saveData(
            {
               courseId: id,
               sectionId,
               lessonId: playlistId,
               params: {
                  name: fieldsValues.playlistName,
                  description: fieldsValues.areaValue,
                  [fieldsValues.fileType === 'video' ? 'video_src' : 'picture_src']: fieldsValues.thumbnail_image,
                  is_published: instructorData.status,
                  show_instructor: Number(isInstructor),
                  is_free_lesson: playlistAccess === '1' ? 0 : 1,
                  category_ids: JSON.parse(localStorage.getItem('categoriesIds')),
                  new_category: addCategory.inputValue ? addCategory.inputValue : null,
                  is_playlist: 1,
                  originalName: fieldsValues.imageName,
                  blocks: allVideoData,
                  seo_data: {
                     ...seo,
                  },
                  link: seoLink,
               },
            },
            () => { setSelectedTab(prevState => prevState + 1); },
            addErrorsFromQuery
         );
      }
     

      setAddCategory(prevState => ({
         ...prevState,
         active: false,
         inputValue: '',
      }));

      changeVideoData({
         playlistId,
         params: contentListData,
      });

      setUploadTrailer(prevState => ({
         ...prevState,
         pictureSrc: fieldsValues.thumbnail_image,
      }));

      updateNewAuthor({
         id: instructorData.selectedAuthor.value,
         params: {
            description: fieldsValues.instructorAreaValue,
            picture_src: instructorData.selectedAuthor.picture_src,
         },
      });

      if (instructorData.selectedAuthor.changedName) {
         updateInstructorName({ playlistId, authorId: instructorData.selectedAuthor.value });
      }

      // setSelectedTab(prevState => prevState + 1);
   };

   const handleCreatePlayList = () => {
      handleSaveAndContinue();
      goBack();
   };

   const handleChangeStatus = (type, date) => {
      if (!date) {
         setInstructorData(prevState => {
            return {
               ...prevState,
               status: type,
            };
         });
      } else {
         setInstructorData(prevState => {
            return {
               ...prevState,
               status: '3',
            };
         });
      }
   };

   const handleChangePlaylistStatus = (value) => {
      setPlaylistAccess(value);
   };

   const handleChangeOpenCreateModal = () => {
      setInstructorData(prevState => {
         return {
            ...prevState,
            isOpenCreateModal: !prevState.isOpenCreateModal,
         };
      });
   };

   const handleSaveAuthor = (newAuthor) => {
      createNewInstructor(
         newAuthor,
         res => {
            setInstructorData(prevState => {
               return {
                  ...prevState,
                  instAuthors: [...prevState.instAuthors, {
                     label: res.name,
                     value: res.id,
                     picture_src: res.picture_src,
                  }],
               };
            });
         },
         addErrorsFromQuery
      );
   };

   const handleDeleteAuthor = (authorId) => {
      deleteNewAuthor(authorId, () => {
         setInstructorData(prevState => {
            return {
               ...prevState,
               instAuthors: prevState.instAuthors.filter(author => author.value !== authorId),
            };
         });
      });
   };

   const handlePreviousTab = () => {
      setSelectedTab(prevState => prevState - 1);
   };

   const handleChangeplaylistCategories = (category, type) => {
      if (type === 'add') {
         setPlaylistCategores(prevState => prevState.concat(category));
      } else {
         setPlaylistCategores(prevState => prevState.filter(prevStateCategory => prevStateCategory.id !== category.id));
      }
   };


   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      if (playListsData && authors) {
         const instAuthors = authors.map(author => (
            {
               label: author.name, value: author.id, picture_src: author.picture_src, description: author.description,
            }
         ));
         const selectedAuthor = instAuthors.find(author => author.value === playListsData.main_lesson?.author?.id);

         setFieldsValues(prevState => {
            return {
               ...prevState,
               playlistName: playListsData.main_lesson.name,
               areaValue: playListsData.main_lesson.description,
               thumbnail_image: playListsData.main_lesson?.file?.src 
                  ? playListsData.main_lesson.file.src 
                  : playListsData.main_lesson.video?.src,
               instructorAreaValue: selectedAuthor?.description,
               fileType: playListsData.main_lesson.video ? 'video' : 'image',
            };
         });
         setSeoLink(playListsData?.main_lesson?.link);
         const showInstructor = playListsData.main_lesson.show_instructor > 0;
         setIsInstructor(showInstructor);
         setPlaylistAccess(!playListsData.main_lesson.is_free_lesson ? '1' : '2');

         if (playListsData.main_lesson.trailer) {
            const date = moment(playListsData.main_lesson.trailer.created_at).format('DD');
            const year = moment(playListsData.main_lesson.trailer.created_at).format('YYYY');
            setUploadTrailer(prevState => {
               return {
                  ...prevState,
                  pictureSrc: playListsData.main_lesson.file?.src,
                  isUploadedTrailer: true,
                  createdAt: `${ date }, ${ year }`,
               };
            });
         }

         setInstructorData(prevState => {
            return {
               ...prevState,
               instAuthors,
               selectedAuthor: {
                  ...selectedAuthor,
                  changedName: false,
               },
               status: playListsData.main_lesson.is_published,
            };
         });

         setPlaylistCategores(prevState => {
            return [...prevState, ...playListsData.main_lesson.categories];
         });
      }
   }, [playListsData, authors]);

   const previewPlaylist = () => {
      window.open(Router.route('MEMBERSHIP_PLAYLIST').getCompiledPath({ playlistLink: playListsData.main_lesson.link, type: 'membership' }), '_blank');
   };

   return (
      <div className='playlist__wrapper'>
         <HeaderTypeFirst
            goBack={ goBack }
            title='Back'
            isPlaylist={ true }
            handleSaveAndContinue={ handleSaveAndContinue }
            previewPlaylist={ previewPlaylist }
            isMobile={ isMobile }
            handleShowActionMenu={ handleShowActionMenu }
         />

         {
            (saveLoading || createAuthorLoading) && <LoaderSpinner />
         }

         {
            loading ? <LoaderSpinner /> : (
               <div className='settings__wrapper'>
                  <div className='new__playlist__settings'>
                     <div className='title_section'>
                        <Text
                           inner='New Playlist Settings'
                           size={ sizes.large_new }
                        />
                     </div>
                     <div className='tabs__section'>
                        <Tabs
                           variants={ PlaylistTabVariants }
                           selectedVariant={ selectedTab }
                           onSelect={ handleChangeSelectedTab }
                        />
                     </div>
                     <div className='content__wrapper'>
                        {
                           selectedTab === 1 ? (
                              <PlaylistInfo
                                 fieldsValues={ fieldsValues }
                                 handleChangePlaylistFileds={ handleChangePlaylistFileds }
                                 handleChangeTextarea={ handleChangeTextarea }
                                 handleChangeInstructorActive={ handleChangeInstructorActive }
                                 isInstructor={ isInstructor }
                                 errorMessages={ errorMessages }
                              />
                           ) : selectedTab === 2 ? (
                              <PlaylistContent
                                 playlistCategories={ playlistCategories }
                                 handleChangeplaylistCategories={ handleChangeplaylistCategories }
                                 createPlaylist={ createPlaylist }
                                 playlistName={ fieldsValues.playlistName }
                                 handleChangeContentListData={ handleChangeContentListData }
                                 trailer={ playListsData.main_lesson.trailer }
                                 trailerPicture={ fieldsValues.thumbnail_image }
                                 uploadTrailer={ uploadTrailer }
                                 handleOpenUploadModal={ handleOpenModal }
                                 handleUploadTrailerVideo={ handleUploadTrailerVideo }
                                 handleDeleteTrailer={ handleDeleteTrailer }
                                 contentListData={ contentListData }
                                 handleChangeVideoData={ handleChangeVideoData }
                                 handleAddVidoes={ handleAddVidoes }
                                 allVideoData={ allVideoData }
                                 handleDeleteVideoData={ handleDeleteVideoData }
                                 handleAddCategory={ handleAddCategory }
                                 handleCreateCategory={ handleCreateCategory }
                                 addCategory={ addCategory }
                              />
                           ) : (
                              <Seo
                                 title='Playlist SEO'
                                 inputs={ playListsData.main_lesson }
                                 courseUrl={ playListsData.course.url }
                                 seo={ seo }
                                 setSeo={ setSeo }
                                 isPlaylist={ true }
                                 handleGetSeoData={ handleGetSeoData }
                                 handleChangeSeoLink={ handleChangeSeoLink }
                                 playlistName={ fieldsValues.playlistName }
                                 seoLink={ seoLink }
                              />
                           )
                        }
                        {
                           isInstructor && selectedTab === 1 && (
                              <InstructorSection
                                 selectedInstructorTab={ selectedInstructorTab }
                                 handleChangeInstructorTab={ handleChangeInstructorTab }
                                 fieldsValues={ fieldsValues }
                                 handleChangeTextarea={ handleChangeTextarea }
                                 instructorData={ instructorData }
                                 handleChangeInstructor={ handleChangeInstructor }
                                 handleChangeAuthorImage={ handleChangeAuthorImage }
                                 handleChangeOpenCreateModal={ handleChangeOpenCreateModal }
                                 handleSaveAuthor={ handleSaveAuthor }
                                 handleDeleteAuthor={ handleDeleteAuthor }
                                 errorMessages={ errorMessages }
                                 removeErrorMessage={ removeErrorMessage }
                              />
                           )
                        }
                        <div className={ selectedTab > 1 ? 'button__wrapper previous' : 'button__wrapper' }>
                           {
                              selectedTab > 1 && (
                                 <Button
                                    text='Previous'
                                    size={ btnSizes.large }
                                    onClick={ handlePreviousTab }
                                    theme={ themes.secondary }
                                 />
                              )
                           }
                           <Button
                              text={ selectedTab === 3 ? 'Create Playlist' : 'Save & Continue' }
                              size={ btnSizes.large }
                              onClick={ selectedTab !== 3 ? () => handleSaveAndContinue(selectedTab) : handleCreatePlayList }
                           />
                        </div>
                     </div>
                  </div>
                  <PlaylistStatus
                     instructorData={ instructorData }
                     handleChangeStatus={ handleChangeStatus }
                     statusVariants={ statusVariants }
                     playlistAccess={ playlistAccess }
                     handleChangePlaylistStatus={ handleChangePlaylistStatus }
                     isMobile={ isMobile }
                     showSettings={ showSettings }
                     handleShowSettings={ handleShowSettings }
                  />
                  {
                     showActionMenu && (
                        <ActionMenu
                           handleShowActionMenu={ handleShowActionMenu }
                           goBack={ goBack }
                           handleSaveAndContinue={ handleSaveAndContinue }
                           previewPlaylist={ previewPlaylist }
                        />
                     )
                  }
               </div>
            )
         }

      </div>
   );
};

export default CreatePlaylist;
