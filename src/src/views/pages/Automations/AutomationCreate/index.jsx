import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import AddAutomationContent from 'components/modules/automation/AddAutomationContent';
import Trigger from 'components/modules/automation/Trigger';
import RemoveTrigger from 'components/modules/automation/RemoveTrigger';
import SendEmail from 'components/modules/automation/SendEmail';
import Wait from 'components/modules/automation/Wait';
import Webhook from 'components/modules/automation/Webhook';
import Enrolled from 'components/modules/automation/Triggers/Enrolled';
import EnrolledIn from 'components/modules/automation/EnrolledIn';
import CourseCompleted from 'components/modules/automation/Triggers/CourseCompleted';
import QuizCompleted from 'components/modules/automation/Triggers/QuizCompleted';
import Purchased from 'components/modules/automation/Triggers/Purchased';
import TagisAdded from 'components/modules/automation/Triggers/TagisAdded';
import AddTag from 'components/modules/automation/AddTag';
import RemoveTag from 'components/modules/automation/RemoveTag';
import Action from 'components/modules/automation/Action';
import Conditions from 'components/modules/automation/Conditions';
import withLoading from 'utils/withLoading';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import EmailModal from '../EmailModal';


const PurchasedLoading = withLoading(Purchased);
const EnrolledLoading = withLoading(Enrolled);
const CourseCompletedLoading = withLoading(CourseCompleted);
const QuizCompletedLoading = withLoading(QuizCompleted);
const TagisAddedLoading = withLoading(TagisAdded);
const AddTagLoading = withLoading(AddTag);
const RemoveTagLoading = withLoading(RemoveTag);

const AutomationCreate = ({
   currentScratch,
   addTriggerData,
   actionData,
   timeingData,
   logicData,
   addStep,
   addTrigger,
   changeCurrentScratch,
   addAction,
   closeCurrentScratch,
   courses,
   tags,
   getCoursesInProgress,
   handleInputChange,
   automation,
   handleStatusInputChange,
   handleNameInputChange,
   saveTrigger,
   currentTrigger,
   chooseTrigger,
   saveAction,
   currentAction,
   handleConditionInputChange,
   position,
   handleDeleteAction,
   conditions,
   addCondition,
   deleteCondition,
   changeCondition,
   handleDeleteTrigger,
   getActionInProgress,
   getTriggerInProgress,
   getallMembersInProgress,
   members,
   coupons,
   quizzes,
   getallQuizzesInProgress,
}) => {
   const [deleteActionModalIsOpen, setDeleteActionModalIsOpen] = useState(false);
   const [deleteTriggerModalIsOpen, setDeleteTriggerModalIsOpen] = useState(false);
   const [actionId, setActionId] = useState(0);
   const [actionDepth, setActionDepth] = useState(0);
   const [stepnId, setStepnId] = useState(0);
   const [triggerId, setTriggerId] = useState(0);

   const messagesEndRef = useRef(null);

   const delActionModalClick = (id, depth, stepId) => {
      setActionId(id);
      setActionDepth(depth);
      setStepnId(stepId);
      setDeleteActionModalIsOpen(true);
   };

   const delActionModalApproveClick = () => {
      handleDeleteAction(actionId, actionDepth, stepnId);
      setDeleteActionModalIsOpen(false);
   };

   const delTriggerModalClick = (id) => {
      setTriggerId(id);
      setDeleteTriggerModalIsOpen(true);
   };

   const delTriggerModalApproveClick = () => {
      handleDeleteTrigger(triggerId);
      setDeleteTriggerModalIsOpen(false);
   };

   const scrollToBottom = () => {
      // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
   };

   useEffect(scrollToBottom, [automation]);
   return (
      <div className='AutomationCreate'>
         {/* <CreateAutomationName
            automation={ automation }
            handleNameInputChange={ handleNameInputChange }
            handleStatusInputChange={ handleStatusInputChange }
         /> */}
         <div className='AutomationCreateContent' id='AutomationCreateContent'>
            <AddAutomationContent
               currentScratch={ currentScratch }
               triggerData={ automation.triggers }
               stepData={ automation.actions }
               addStep={ addStep }
               addTrigger={ addTrigger }
               changeCurrentScratch={ changeCurrentScratch }
               chooseTrigger={ chooseTrigger }
               delActionModalClick={ delActionModalClick }
               delTriggerModalClick={ delTriggerModalClick }
               getActionInProgress={ getActionInProgress }
               courses={ courses }
               tags={ tags }
               currentAction={ currentAction }
               getTriggerInProgress={ getTriggerInProgress }
            />
            <div className='AutomationRightContent' style={ currentScratch && (currentScratch === 'trigger' || currentScratch === 'action') ? { 'top': '72px', 'maxHeight': '100vh', display: 'block' } : { display: 'none' } }>
               {
                  currentScratch === 'trigger' && (
                     <ClickOutside onClick={ () => changeCurrentScratch('') }>
                        <div>
                           <Trigger
                              addTriggerData={ addTriggerData }
                              addTrigger={ addTrigger }
                           />
                        </div>
                     </ClickOutside>
                  )
               }
               {
                  currentScratch === 'action' && (
                     <ClickOutside onClick={ () => changeCurrentScratch('') }>
                        <div>
                           <Action
                              actionData={ actionData }
                              timeingData={ timeingData }
                              logicData={ logicData }
                              addAction={ addAction }
                           />
                        </div>
                     </ClickOutside>
                  )
               }


               {
                  currentScratch === 'remove-trigger' && (
                     <RemoveTrigger />
                  )
               }
            </div>
            {
               currentScratch === 'wait' && (
                  <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                     <Wait
                        onClose={ closeCurrentScratch }
                        saveAction={ saveAction }
                        currentAction={ currentAction }
                        handleInputChange={ handleInputChange }
                        position={ position }
                     />
                  </ModalNew>
               )
            }
            {
               currentScratch === 'webhook' && (
                  <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                     <Webhook
                        onClose={ closeCurrentScratch }
                        saveAction={ saveAction }
                        currentAction={ currentAction }
                        handleInputChange={ handleInputChange }
                        position={ position }
                     />
                  </ModalNew>
               )
            }

            { currentScratch === 'tag' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <TagisAddedLoading
                     onClose={ closeCurrentScratch }
                     tags={ tags }
                     isLoading={ getCoursesInProgress }
                     currentTrigger={ currentTrigger }
                     handleInputChange={ handleInputChange }
                     saveTrigger={ saveTrigger }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'purchase' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <PurchasedLoading
                     isLoading={ getCoursesInProgress }
                     onClose={ closeCurrentScratch }
                     courses={ courses }
                     currentTrigger={ currentTrigger }
                     handleInputChange={ handleInputChange }
                     saveTrigger={ saveTrigger }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'course_complete' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <CourseCompletedLoading
                     onClose={ closeCurrentScratch }
                     courses={ courses }
                     isLoading={ getCoursesInProgress }
                     handleInputChange={ handleInputChange }
                     currentTrigger={ currentTrigger }
                     saveTrigger={ saveTrigger }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'quiz_completed' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <QuizCompletedLoading
                     onClose={ closeCurrentScratch }
                     isLoading={ getallQuizzesInProgress }
                     courses={ courses }
                     quizzes={ quizzes }
                     handleInputChange={ handleInputChange }
                     currentTrigger={ currentTrigger }
                     saveTrigger={ saveTrigger }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'enroll' && (
               <ModalNew onCloseModal={ () => closeCurrentScratch() }>
                  <EnrolledLoading
                     onClose={ closeCurrentScratch }
                     courses={ courses }
                     isLoading={ getCoursesInProgress }
                     handleInputChange={ handleInputChange }
                     currentTrigger={ currentTrigger }
                     saveTrigger={ saveTrigger }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'enroll_in' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <EnrolledIn
                     onClose={ closeCurrentScratch }
                     courses={ courses }
                     handleInputChange={ handleInputChange }
                     currentAction={ currentAction }
                     saveAction={ saveAction }
                     position={ position }
                  />
               </ModalNew>
            )}
            {
               currentScratch === 'email' && (
                  <EmailModal
                     onClose={ changeCurrentScratch }
                  >
                     <SendEmail
                        onClose={ closeCurrentScratch }
                        saveAction={ saveAction }
                        currentAction={ currentAction }
                        handleInputChange={ handleInputChange }
                        position={ position }
                        fromEmail={ automation && automation.fromEmail }
                     />
                  </EmailModal>
               )
            }
            { currentScratch === 'addTag' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <AddTagLoading
                     onClose={ closeCurrentScratch }
                     tags={ tags }
                     isLoading={ getCoursesInProgress }
                     saveAction={ saveAction }
                     currentAction={ currentAction }
                     handleInputChange={ handleInputChange }
                     position={ position }
                  />
               </ModalNew>
            )
            }
            { currentScratch === 'remove_tag' && (
               <ModalNew onCloseModal={ () => changeCurrentScratch('') }>
                  <RemoveTagLoading
                     onClose={ closeCurrentScratch }
                     tags={ tags }
                     isLoading={ getCoursesInProgress }
                     saveAction={ saveAction }
                     currentAction={ currentAction }
                     handleInputChange={ handleInputChange }
                     position={ position }
                  />
               </ModalNew>
            )
            }
            {
               currentScratch === 'condition' && (
                  <ModalNew onCloseModal={ () => closeCurrentScratch() }>
                     <Conditions
                        closeCurrentScratch={ closeCurrentScratch }
                        saveAction={ saveAction }
                        currentAction={ currentAction }
                        handleConditionInputChange={ handleConditionInputChange }
                        conditions={ conditions }
                        addCondition={ addCondition }
                        deleteCondition={ deleteCondition }
                        changeCondition={ changeCondition }
                        position={ position }
                        courses={ courses }
                        getallMembersInProgress={ getallMembersInProgress }
                        members={ members }
                        coupons={ coupons }
                     />
                  </ModalNew>
               )
            }
            {
               deleteActionModalIsOpen && (
                  <DeleteModal
                     title='Delete Action'
                     maxWidth={ 414 }
                     description='Are you sure you want to delete this action?'
                     deleteText='Delete'
                     onCancel={ () => setDeleteActionModalIsOpen(false) }
                     onDelete={ () => delActionModalApproveClick() }
                  />
               )
            }
            {
               deleteTriggerModalIsOpen && (
                  <DeleteModal
                     title='Delete Trigger'
                     maxWidth={ 414 }
                     description='Are you sure you want to delete this trigger?'
                     deleteText='Delete'
                     onCancel={ () => setDeleteTriggerModalIsOpen(false) }
                     onDelete={ () => delTriggerModalApproveClick() }
                  />
               )
            }
         </div>
         <div ref={ messagesEndRef } />
      </div>
   );
};

AutomationCreate.propTypes = {
   changeCurrentScratch: PropTypes.func,
   addStep: PropTypes.func,
   addTrigger: PropTypes.func,
   addAction: PropTypes.func,
   addTriggerData: PropTypes.array,
   actionData: PropTypes.array,
   timeingData: PropTypes.array,
   logicData: PropTypes.array,
   currentScratch: PropTypes.string,
   closeCurrentScratch: PropTypes.func,
   courses: PropTypes.array,
   tags: PropTypes.array,
   getCoursesInProgress: PropTypes.bool,
   handleInputChange: PropTypes.func,
   triggers: PropTypes.object,
   automation: PropTypes.object,
   handleStatusInputChange: PropTypes.func,
   handleNameInputChange: PropTypes.func,
   saveTrigger: PropTypes.func,
   currentTrigger: PropTypes.object,
   chooseTrigger: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleConditionInputChange: PropTypes.func,
   position: PropTypes.string,
   handleDeleteAction: PropTypes.func,
   conditions: PropTypes.array,
   addCondition: PropTypes.func,
   deleteCondition: PropTypes.func,
   changeCondition: PropTypes.func,
   handleDeleteTrigger: PropTypes.func,
   getActionInProgress: PropTypes.bool,
   getTriggerInProgress: PropTypes.bool,
   getallMembersInProgress: PropTypes.bool,
   members: PropTypes.any,
   coupons: PropTypes.array,
   quizzes: PropTypes.array,
   getallQuizzesInProgress: PropTypes.bool,
};

export default AutomationCreate;
