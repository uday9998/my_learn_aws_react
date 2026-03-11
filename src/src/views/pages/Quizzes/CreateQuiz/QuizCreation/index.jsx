import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import QuizSettings from 'views/pages/Quizzes/CreateQuiz/QuizSettings';
// import img1 from 'assets/images/Program/program-image-3.png';
import GeneratorModal from 'components/elements/GeneratorModal';
import './index.scss';


const OnlineCourseCreatetion = ({
   goBack, setStep, step, onCreate,
   title, inputName, inputdescription, descriptionPlaceholder, img, title2,
   saveButtonTxt,
}) => {
   const [data, setData] = useState({
      'description': '',
      'passing_grade': 80,
      'passing_grade_status': 1,
      'send_email': 0,
      'resault_breakdown': 1,
      name: ''
   });
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });

   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };
   const handleSave = async () => {
      const errMessage = await onCreate({ ...data });

      const { 0: linkErrMessage = [] } = Object.values(errMessage);

      if (linkErrMessage.length) {
         addErrorMessage(linkErrMessage[0]);
      }
   };

   return (
      <div className='online__creation'>
         {step === 1 && (
            <CourseCreatetionForm
               title={ title }
               imgUrl={ img }
               placeholder='Name Your Quiz'
               input={ {
                  name: 'name',
                  label: inputName,
                  value: data.name,
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
               } }
               area={ {
                  name: 'description',
                  label: inputdescription,
                  placeholder: descriptionPlaceholder,
                  value: data.description,
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
               } }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: goBack,
               } }
               primaryButton={ {
                  text: 'Next Step',
                  disabled: !data.name.trim(),
                  onClick: () => { if (data.name) { setStep(2); } },
               } }
               isQuiz={true}
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title={ title2 }
               imgUrl={ img }
               right={ <QuizSettings quiz={ data } setQuiz={ handleInputChange } localErrorMessages={ localErrorMessages } /> }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(1),
               } }
               primaryButton={ {
                  text: saveButtonTxt || 'Done',
                  onClick: () => handleSave(),
               } }
            />
         )}
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               data={ data }
               title='Quiz'
               setData={ setData }
            />
         )}
      </div>
   );
};

OnlineCourseCreatetion.propTypes = {
   goBack: PropTypes.func,
   step: PropTypes.number,
   onCreate: PropTypes.func,
   setStep: PropTypes.func,
   title: PropTypes.string,
   descriptionPlaceholder: PropTypes.string,
   inputName: PropTypes.string,
   inputdescription: PropTypes.string,
   img: PropTypes.string,
   title2: PropTypes.string,
   saveButtonTxt: PropTypes.string,
};

export default OnlineCourseCreatetion;
