import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import getDeff from 'utils/getDeff';
import GeneratorModal from 'components/elements/GeneratorModal';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import CourseInformationTabItem from './CourseInformationComponents/CourseInformationTabItem';
import CourseInformationPage from './CourseInformationComponents/CourseInformationPage';
import CourseInstructorPage from './CourseInformationComponents/CourseInstructorPage';

const CourseInformation = ({
   TabConsumer, onSave, course, onSaveInstructor, isLoading, createAuthor, authors, deleteAuthor,
   errorMessages, removeErrorMessage, clearErrorMessages
}) => {
   const { isMobile } = useWindowSizeChange();

   const [currentSettingTab, setCurrentSettingTab] = useState(isMobile ? '' : 'page');
   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });
   const [inputs, setInputs] = useState({
      ...course,
   });
   const [selectedAuthor, setSelectedAuthor] = useState(null);

   useEffect(() => {
      setSelectedAuthor(course && course.authors.length ? course.authors[0] : null);
   }, [course]);

   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const selectSettingTab = (tab) => {
      clearErrorMessages();
      setCurrentSettingTab(tab);
   };

   const handleSaveAuthor = () => {
      const data = {
         description: selectedAuthor.description,
         picture_src: selectedAuthor.picture_src,
      };
      onSaveInstructor(data, selectedAuthor.id);
   };

   const handleSaveSettings = () => {
      const data = {
         description: selectedAuthor.description,
         picture_src: selectedAuthor.picture_src,
      };
      onSave(getDeff(course, inputs), data, selectedAuthor.id, () => TabConsumer.switchTab('program-general'));
   };

   return (
      // <AdminContainer>
      <>
         <div className='course__information'>
            <AdminContainer.Header>
               <HeaderTypeFirst
                  title={ (isMobile && currentSettingTab) ? `Product ${ currentSettingTab === 'instructor' ? 'Instructor' : 'Page' }` : course.name }
                  goBack={ (isMobile && currentSettingTab) ? () => selectSettingTab('') : () => TabConsumer.switchTab('program-general') }
                  onSave={ handleSaveSettings }
               />
            </AdminContainer.Header>
            {isLoading ? (
               <LoaderSpinner />
            ) : (
               <AdminContainer.Content>
                  <div className='course__information__settings'>
                     { (!isMobile || (isMobile && !currentSettingTab)) && (
                        <div className='course__information__settings__left'>
                           <CourseInformationTabItem
                              iconName='ProductInformationPageM'
                              title='Product Page'
                              onSelect={ () => selectSettingTab('page') }
                              isActive={ currentSettingTab === 'page' }
                           />
                           <CourseInformationTabItem
                              iconName='ProductInformationInstructorM'
                              title='Product Instructor'
                              onSelect={ () => selectSettingTab('instructor') }
                              isActive={ currentSettingTab === 'instructor' }
                           />
                        </div>
                     )}
                     {!!currentSettingTab
                     && (
                        <div className='course__information__settings__right'>
                           {!isMobile && (
                              <Text
                                 inner={ `Product ${ currentSettingTab === 'instructor' ? 'Instructor' : 'Page' }` }
                                 type={ types.medium160 }
                                 size={ sizes.xlarge }
                              />
                           )}
                           {currentSettingTab === 'page' && (
                              <CourseInformationPage
                                 inputs={ inputs }
                                 onChange={ handleInputChange }
                                 setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                                 errorMessages={errorMessages}
                              />
                           )}
                           {currentSettingTab === 'instructor' && (
                              <CourseInstructorPage
                                 selectedAuthor={ selectedAuthor }
                                 setSelectedAuthor={ setSelectedAuthor }
                                 inputs={ inputs }
                                 createAuthor={ createAuthor }
                                 deleteAuthor={ deleteAuthor }
                                 authors={ authors }
                                 onSaveInstructor={ handleSaveAuthor }
                                 onChange={ handleInputChange }
                                 errorMessages={ errorMessages }
                                 removeErrorMessage={ removeErrorMessage }
                              />
                           )}
                        </div>
                     )}
                  </div>
               </AdminContainer.Content>
            )}
         </div>
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               data={ inputs }
               setData={ setInputs }
            />
         )}
      </>
   // </AdminContainer>
   );
};

CourseInformation.propTypes = {
   course: PropTypes.object,
   isLoading: PropTypes.func,
   TabConsumer: PropTypes.object,
   onSaveInstructor: PropTypes.func,
   createAuthor: PropTypes.func,
   authors: PropTypes.array,
   deleteAuthor: PropTypes.func,
   onSave: PropTypes.func,
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
   clearErrorMessages: PropTypes.func,
};

export default CourseInformation;
