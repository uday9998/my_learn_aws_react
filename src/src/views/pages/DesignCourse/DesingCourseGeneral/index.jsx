import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CourseHeader } from 'views/layout/DesignCourse/CourseHeader';
import AdminContainer from 'views/layout/AdminContainer';
import './index.scss';
import DesignCourseNav from 'views/layout/DesignCourse/DesignCourseNav';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import DesignCourseMediaView from './DesignCourseMediaView';
import DesignCourseGeneralSectionRow from './DesignCourseGeneralSection';
import DesignCourseSearchView from './DesignCourseSearchView';
import SectionSettings from '../SectionSettings';
import LessonSettings from '../LessonSettings';

const DesignCourseGeneral = ({
   TabConsumer, headerProps, onCreateSection, onChangeStatus, isLoading, allCourses, copySection,
   onTransfer, onDeleteSection, addLesson, search, setSearch, onReorder, courseMaterial, onReorderLessons,
   onSearch, isFiltering, goToCategorys, onSaveSection, saveLesson, goToComments, goTo,
   deleteLesson, searchLessonValue, searchLesson, user, goToPricings,
}) => {
   const location = useLocation();
   const history = useHistory();
   const [selectedSection, setSelectedSection] = useState(null);
   const [selectedSectionsSettings, setSelectedSectionSettings] = useState(null);
   const [selectedTab, setSelectedTab] = useState('information');
   const [selectedLessonSettings, setSelectedLessonSettings] = useState({
      is_published: 1,
   });
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   // const windowSize = useWindowSizeChange();
   // const [initialLessonSettings, setInitialLessonSettings] = useState(null);

   const resetLocationState = () => {
      history.replace(location.pathname);
   };

   const handleDeleteSection = (id) => {
      if (selectedSection.id === id) {
         setSelectedSection(null);
      }
      onDeleteSection(id);
   };
   const [isOpenSearch, setIsOpenSearch] = useState(false);
   useEffect(() => {
      resetLocationState();
      if (window.innerWidth > 1023) {
         if (courseMaterial && courseMaterial.sections.length && !selectedSection) {
            if (location.state) {
               setSelectedSection(courseMaterial.sections.find((e) => e.id === Number.parseFloat(location.state[0])));
               return;
            }
            setSelectedSection(courseMaterial.sections[0]);
         }
      }
   }, []);

   useEffect(() => {
      if (location.state && location.state.type) {
         setSelectedTab(location.state.type);
         setSelectedLessonSettings(location.state.lesson);
      }
   }, [location]);

   const handleChangeSectionSettingsInputs = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setSelectedSectionSettings({
         ...selectedSectionsSettings,
         [name]: value,
      });
   };
   const handleChangeLessonSettingsInputs = (name, value, date, file) => {
      if (name === 'picture_src') {
         setSelectedLessonSettings({
            ...selectedLessonSettings,
            [name]: value,
            original_name: file.name,
            mime_type: file.type,
         });
      } else {
         if (name === 'is_published' && (value === 3 || value === '3')) {
            const time = moment(`${ date.time } ${ date.timeType }`, ['h:mm A']).format('HH:mm:ss');
            const dripDayTime = `${ moment(date.date).format('YYYY-MM-DD ') }${ time }`;
            const userTimeZone = momentTimezone.tz.guess();
            const dateUserTimeZone = momentTimezone.tz(dripDayTime, userTimeZone);
            const dateUTC = dateUserTimeZone.utc().format('YYYY-MM-DD, HH:mm:ss z');
            setSelectedLessonSettings({
               ...selectedLessonSettings,
               [name]: value,
               drip_day_type: date.type,
               count: date.count,
               drip_date: dateUTC,
               time: date.time,
               timeType: date.timeType,

            });
            return;
         }
         setSelectedLessonSettings({
            ...selectedLessonSettings,
            [name]: value,
         });
      }
   };
   const handleSaveSection = () => {
      if (!selectedSectionsSettings.name.trim()) {
         addErrorMessages({ name: ['Section name is required'] });
         return;
      }

      onSaveSection(selectedSectionsSettings.id, {
         name: selectedSectionsSettings.name,
         picture_src: selectedSectionsSettings.picture_src,
         description: selectedSectionsSettings.description,
      });
   };

   const handleTransfer = (data) => {
      onTransfer({ ...data, currentCourseId: courseMaterial.course.id }, setSelectedSection);
   };

   const handleSaveLesson = (isLessonListing, data, lesson, sectionId) => {
      if (isLessonListing) {
         let changedLesson = {
            ...lesson,
            is_published: data.type ? '2' : '1',
         };
         if (data.data) {
            const time = moment(`${ data.data.time } ${ data.data.timeType }`, ['h:mm A']).format('HH:mm:ss');
            const dripDayTime = `${ moment(data.data.date).format('YYYY-MM-DD ') }${ time }`;
            const userTimeZone = momentTimezone.tz.guess();
            const dateUserTimeZone = momentTimezone.tz(dripDayTime, userTimeZone);
            const dateUTC = dateUserTimeZone.utc().format('YYYY-MM-DD, HH:mm:ss z');
            changedLesson = {
               ...lesson,
               is_published: data.type,
               drip_day_type: data.data.type,
               count: data.data.count,
               drip_date: dateUTC,
               time: data.data.time,
               timeType: data.data.timeType,
            };
         }
         saveLesson(courseMaterial.course.id, sectionId,
            lesson.id, changedLesson);
      } else {
         if (!selectedLessonSettings.name) {
            selectedLessonSettings.name = (courseMaterial.course.type === '1' ? 'Video title' : 'Lesson title');
         }
         saveLesson(courseMaterial.course.id, selectedLessonSettings.section_id,
            selectedLessonSettings.id, selectedLessonSettings);
         setSelectedLessonSettings({});
         setSelectedSection(courseMaterial.sections[0]);
         history.push('#program-information');
         //  { ...getDeff(initialLessonSettings, selectedLessonSettings), name: selectedLessonSettings.name
      }
   };

   return (
   // <AdminContainer>
      <div className='design__course__general'>
         <AdminContainer.Header>
            {(selectedSectionsSettings || (selectedLessonSettings && selectedLessonSettings.name !== undefined)) ? (
               <>
                  {(selectedLessonSettings && selectedLessonSettings.name !== undefined) ? (
                     <HeaderTypeFirst
                        title={ selectedLessonSettings.name || (courseMaterial.course.type === '1' ? 'Video title' : 'Lesson title') }
                        goBack={ () => {
                           history.goBack();
                           setSelectedLessonSettings(null);
                           setSelectedSection(courseMaterial.sections[0]);
                           //  setInitialLessonSettings(null);
                        } }
                        onSave={ () => handleSaveLesson() }
                     />
                  ) : (
                     <HeaderTypeFirst title={ selectedSectionsSettings.name || 'Education' } goBack={ () => setSelectedSectionSettings(null) } onSave={ () => handleSaveSection() } />
                  )}
               </>
            ) : (
               <CourseHeader
                  { ...headerProps }
                  course={ courseMaterial.course }
               />
            )}
         </AdminContainer.Header>
         <AdminContainer.Content>
            {(isLoading || isFiltering) && (
               <LoaderSpinner />
            )}
            {
               selectedSectionsSettings
                  || (selectedLessonSettings && (!!selectedLessonSettings.status || selectedLessonSettings.id)) ? (
                     <>
                        {(selectedLessonSettings.status || selectedLessonSettings.id) ? (
                           <LessonSettings
                              onChange={ handleChangeLessonSettingsInputs }
                              inputs={ selectedLessonSettings }
                              goToComments={ () => goToComments() }
                              user={ user }
                              course={ courseMaterial.course }
                              selectedTab={ selectedTab }
                              setSelectedTab={ setSelectedTab }
                           />
                        ) : (
                           <SectionSettings
                              onChange={ handleChangeSectionSettingsInputs }
                              inputs={ selectedSectionsSettings }
                              errorMessages={ errorMessages }
                           />
                        )}
                     </>
                  ) : (
                     <div className='design__course__general__content'>
                        <DesignCourseNav
                           commentsCount={ courseMaterial.course.comments_count }
                           goToComments={ () => goToComments() }
                           goTo={ goTo }
                           goToPricings={ goToPricings }
                           onSwitch={ TabConsumer.switchTab }
                           course={ courseMaterial.course }
                        />
                        {selectedSection && selectedSection.id && courseMaterial.course.type !== '1' && (
                           <>
                              {selectedSection ? (
                                 <div className='design__course__general__filter'>
                                    {!isOpenSearch ? (
                                       <>
                                          {selectedSection && (
                                             <DesignCourseGeneralSectionRow
                                                allCourses={
                                                   allCourses.filter((e) => e.id !== courseMaterial.course.id)
                                                }
                                                onChangeStatus={ (status, data) => {
                                                   onChangeStatus(selectedSection.id, status, data);
                                                } }
                                                section={ selectedSection }
                                                onTransfer={ (data) => handleTransfer(data) }
                                                copySection={ copySection }
                                                onDeleteSection={ handleDeleteSection }
                                             />
                                          )}
                                          {selectedSection && courseMaterial.course.type !== '1' && courseMaterial.sections && courseMaterial.sections.length > 1 && (
                                             <div
                                                className='design__course__general__filter__button'
                                                role='presentation'
                                                onClick={ () => setIsOpenSearch(true) }
                                             >
                                                <IconNew name='SearchProgramM' />
                                             </div>
                                          )}
                                       </>
                                    ) : (
                                       <Input
                                          onClearSearchValue={ () => setIsOpenSearch(false) }
                                          type='search'
                                          value={ search }
                                          isCloseHidenOnEmpty={ false }
                                          onKeyPress={ (e) => {
                                             if (e.key === 'Enter') {
                                                onSearch();
                                             }
                                          } }
                                          onChange={ (name, value) => setSearch(value) }
                                          name='search'
                                          placeholder='Enter section name'
                                       />
                                    )}
                                 </div>
                              ) : (
                                 <div className='design__course__general__filter'>
                                    <Input
                                       onClearSearchValue={ () => setIsOpenSearch(false) }
                                       type='search'
                                       isCloseHidenOnEmpty={ false }
                                       value={ search }
                                       onKeyPress={ (e) => {
                                          if (e.key === 'Enter') {
                                             onSearch();
                                          }
                                       } }
                                       onChange={ (name, value) => setSearch(value) }
                                       name='search'
                                       placeholder='Enter section name'
                                    />
                                 </div>
                              )}
                           </>
                        )}
                        {/* {courseMaterial.course.type === '1' && courseMaterial.sections[0] && courseMaterial.sections[0].lessons.length > 1
                        && (
                           <div className='design__course__general__filter'>
                              <Input
                                 type='search'
                                 isCloseHidenOnEmpty={ true }
                                 value={ searchLessonValue }
                                 onChange={ (name, value) => searchLesson(value) }
                                 name='search'
                                 placeholder='Search video'
                              />
                           </div>
                        )} */}
                        {!isFiltering && (
                           <>
                              {((isOpenSearch || !selectedSection) && search) ? (
                                 <DesignCourseSearchView
                                    search={ search }
                                    data={ courseMaterial.sections }
                                    setSelectedSection={ (section) => {
                                       setSearch('');
                                       setIsOpenSearch(false);
                                       setSelectedSection(section);
                                    } }
                                 />
                              ) : (
                                 <DesignCourseMediaView
                                    setSelectedLessonSettings={ (lesson) => {
                                       history.push('?settings');
                                       setSelectedLessonSettings({
                                          ...lesson,
                                          // is_published: 1,
                                       });
                                       // setInitialLessonSettings(lesson);
                                    } }
                                    setSelectedSectionSettings={
                                       (d) => { setSelectedSectionSettings(d); setSelectedLessonSettings({}); } }
                                    selectedSection={
                                       (courseMaterial && courseMaterial.sections.length && selectedSection)
                                          ? courseMaterial.sections.filter((el) => el.id === selectedSection.id)[0]
                                          : { lessons: [] } }
                                    setSelectedSection={ setSelectedSection }
                                    onCreate={ onCreateSection }
                                    onReorderLessons={ (data, id) => onReorderLessons(data, id, selectedSection.id) }
                                    onReorder={ onReorder }
                                    sections={ courseMaterial ? courseMaterial.sections : [] }
                                    addLesson={ addLesson }
                                    goTo={ goTo }
                                    course={ courseMaterial.course }
                                    deleteLesson={ deleteLesson }
                                    searchLesson={ searchLesson }
                                    searchLessonValue={ searchLessonValue }
                                    handleSaveLesson={ handleSaveLesson }

                                 />
                              )}
                           </>
                        )}
                     </div>
                  )}
         </AdminContainer.Content>
      </div>
   // </AdminContainer>
   );
};

DesignCourseGeneral.propTypes = {
   headerProps: PropTypes.object,
   TabConsumer: PropTypes.object,
   onChangeStatus: PropTypes.func,
   course: PropTypes.object,
   onReorderLessons: PropTypes.func,
   onCreateSection: PropTypes.func,
   isLoading: PropTypes.bool,
   allCourses: PropTypes.array,
   onTransfer: PropTypes.func,
   onReorder: PropTypes.func,
   search: PropTypes.string,
   setSearch: PropTypes.func,
   copySection: PropTypes.func,
   onDeleteSection: PropTypes.func,
   addLesson: PropTypes.func,
   courseMaterial: PropTypes.object,
   onSearch: PropTypes.func,
   goTo: PropTypes.func,
   isFiltering: PropTypes.bool,
   goToCategorys: PropTypes.func,
   onSaveSection: PropTypes.func,
   goToComments: PropTypes.func,
   saveLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   searchLesson: PropTypes.func,
   searchLessonValue: PropTypes.string,
   user: PropTypes.object,
   goToPricings: PropTypes.func,
};

export default DesignCourseGeneral;
