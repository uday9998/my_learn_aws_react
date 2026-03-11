import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import img3 from 'assets/images/community/empty.png';
import img2 from 'assets/images/community/step2Image.png';
import img1 from 'assets/images/community/illustration.png';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import moment from 'moment';
import EventCreateInputs from '../communityCommponents/EventCreateInputs';

const EventCreate = ({
   handleSumbit, goBack, step, setStep, options, courseId, data, setData, user, isCalendarModal, 
   setIsCalendarState, community,
}) => {
   const handleInputChange = (name, value) => {
      if (name === 'time') {
         const today = moment().format('YYYY-MM-DD');
         const localDateTime = moment(`${ today } ${ value }`, 'YYYY-MM-DD HH:mm:ss');
         const utc = localDateTime.utc().format('HH:mm:ss');
         setData({
            ...data,
            [name]: utc,
            defaultTime: value,
         });
      } else {
         setData({
            ...data,
            [name]: value,
         });
      }
   };
   
   const goBackPrevious = () => {
      if (isCalendarModal) {
         setIsCalendarState(true);
      } else {
         goBack();
      }
   };

   const selectOptions = [];
   if (isCalendarModal) {
      community.rooms.forEach((room) => {
         if (room.type === 'events') {
            selectOptions.push({ value: room.id, label: room.name });
         }
      });
   }
    

   return (
      <div className='event__creation'>
         {step === 1 && (
            <CourseCreatetionForm
               title='Event Information'
               imgUrl={ img1 }
               input={ {
                  name: 'name',
                  label: 'Event Name',
                  value: data.name,
                  onChange: handleInputChange,
               } }
               isInlineEditor={ true }
               area={ {
                  name: 'description',
                  label: 'Event Description',
                  placeholder: 'Write here...',
                  value: data.description,
                  onChange: handleInputChange,
               } }
               secondaryButton={ {
                  text: isCalendarModal ? 'Cancel' : 'Previous',
                  onClick: goBackPrevious,
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(2),
               } }
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title='Event Information'
               imgUrl={ img2 }
               right={ (
                  <div>
                     <UploadMediaImageView
                        src={ data.picture_src }
                        type='image'
                        buttonText='Image'
                        iconName='ClearImageM'
                        isRemove={ true }
                        hideMediaLibrary={ user.role !== 1 }
                        uploadProps={ {
                           fileLessonFormat: 'image',
                           isAmazonFile: true,
                           cropRatio: '1920x1080',
                           onChange: (value) => handleInputChange('picture_src', value),
                        } }
                     />
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(1),
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(3),
               } }
            />
         )}
         {step === 3 && (
            <CourseCreatetionForm
               title='Event Settings & Access'
               imgUrl={ data.picture_src || img3 }
               right={ (
                  <EventCreateInputs
                     inputs={ data }
                     options={ options }
                     courseId={ courseId }
                     onChange={ handleInputChange }
                  />
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(2),
               } }
               primaryButton={ {
                  text: 'Done',
                  onClick: () => handleSumbit(data),
               } }
            />
         )}
      </div>
   );
};

EventCreate.propTypes = {
   handleSumbit: PropTypes.func,
   goBack: PropTypes.func,
   step: PropTypes.number,
   setStep: PropTypes.func,
   options: PropTypes.array,
   courseId: PropTypes.number,
   data: PropTypes.object,
   setData: PropTypes.func,
   user: PropTypes.func,
   isCalendarModal: PropTypes.bool,
   setIsCalendarState: PropTypes.func,
   community: PropTypes.object,
};

export default EventCreate;
