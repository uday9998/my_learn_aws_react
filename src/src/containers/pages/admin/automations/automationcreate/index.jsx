/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import AutomationCreate from 'views/pages/Automations/AutomationCreate';
import * as selectors from 'state/modules/automation/selectors';
import * as operations from 'state/modules/automation/operations';
import PropTypes from 'prop-types';
import {
   setInput as setInputAction,
   setConditionInput as setConditionInputAction,
   chooseTrigger as chooseTriggerAction,
   chooseAction as chooseActionAction,
   addCondition as addConditionAction,
   deleteCondition as deleteConditionAction,
   changeCondition as changeConditionAction,
} from 'state/modules/automation/actions';
import withLoading from 'utils/withLoading';
import AutomationHeader from 'views/pages/Automations/AutomationHeader';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

const ContainerLoading = withLoading(Container);

class AutomationCreateContainer extends Component {
   static propTypes = {
      getAllSortedCourses: PropTypes.func,
      getTags: PropTypes.func,
      courses: PropTypes.array,
      tags: PropTypes.array,
      getCoursesInProgress: PropTypes.bool,
      setInput: PropTypes.func,
      triggers: PropTypes.object,
      getAutomation: PropTypes.func,
      match: PropTypes.object,
      automation: PropTypes.object,
      updateAutomation: PropTypes.func,
      getAutomationInProgress: PropTypes.bool,
      saveTrigger: PropTypes.func,
      addTrigger: PropTypes.func,
      currentTrigger: PropTypes.object,
      chooseTrigger: PropTypes.func,
      addAction: PropTypes.func,
      saveAction: PropTypes.func,
      chooseAction: PropTypes.func,
      currentAction: PropTypes.object,
      setConditionInput: PropTypes.func,
      deleteAction: PropTypes.func,
      addCondition: PropTypes.func,
      conditions: PropTypes.array,
      deleteCondition: PropTypes.func,
      changeCondition: PropTypes.func,
      deleteTrigger: PropTypes.func,
      getActionInProgress: PropTypes.bool,
      getTriggerInProgress: PropTypes.bool,
      getAllSortedMembers: PropTypes.func,
      getallMembersInProgress: PropTypes.bool,
      members: PropTypes.any,
      getAllCoupons: PropTypes.func,
      coupons: PropTypes.array,
      getAllQuizzes: PropTypes.func,
      getallQuizzesInProgress: PropTypes.bool,
      quizzes: PropTypes.array,
   };

   constructor() {
      super();
      this.state = {
         currentScratch: '',
         position: '',
         triggerData: [],
         stepData: [],
         stepId: 0,
         actionId: 0,
         currentActionId: 0,
         actionIndex: 0,
         depth: 0,
         addTriggerData: [
            {
               id: 1,
               type: 'enroll',
               icon: 'enroll',
               title: 'Enrolled In',
               content: 'This automation begins when a member enrolls in a training either from being manually added or purchasing a training.',
            },
            {
               id: 2,
               type: 'tag',
               icon: 'tag',
               title: 'Tag Is Added',
               content: 'This automation begins when a tag is specifically added to a member.',
            },
            {
               id: 3,
               type: 'purchase',
               icon: 'purchase',
               title: 'Purchased',
               content: 'This automation begins when a member purchases your training.',
            },
            {
               id: 4,
               type: 'course_complete',
               icon: 'enroll',
               title: 'Class Complete',
               content: 'This automation begins when a member completes your training.',
            },
            {
               id: 5,
               type: 'quiz_completed',
               icon: 'enroll',
               title: 'Quiz Complete',
               content: 'This automation begins when a member completes your quiz.',
            },
            {
               id: 6,
               type: 'affiliate_created',
               icon: 'enroll',
               title: 'Affiliate signed up',
               content: 'This automation begins when a affiliate signed up .',
            },
         ],
         actionData: [
            {
               id: 2,
               type: 'email',
               icon: 'email',
               title: 'Send Email',
               content: 'Send email content',
            },
            {
               id: 3,
               type: 'addTag',
               icon: 'tag',
               title: 'Add Tag',
               content: 'Automation when a tag is added to a member of your program',
            },
            {
               id: 6,
               type: 'remove_tag',
               icon: 'RemoveTag',
               title: 'Remove Tag',
               content: 'Automation removes a tag from your program',
            },
            {
               id: 5,
               type: 'webhook',
               icon: 'webhook',
               title: 'Send Webhook',
               content: 'Using this automation you can pass member information using webhooks',
            },
            {
               id: 7,
               type: 'enroll_in',
               icon: 'enroll',
               title: 'Enroll In',
               content: 'Automation when a class is added to a member of your program',
            },
         ],

         timeingData: [
            {
               id: 1,
               type: 'wait',
               icon: 'wait',
               title: 'Wait',
               content: 'Wait for a period of time based in between actions',
            },
         ],

         logicData: [
            {
               id: 4,
               type: 'condition',
               icon: 'condition',
               title: 'Conditional',
               content: 'This automation is based if conditions are matched and help them follow a specific path',
            },
         ],
      };
   }

   componentDidMount() {
      const {
         getAutomation, match, getTags, getAllSortedCourses, getAllSortedMembers, getAllCoupons,
         getAllQuizzes,
      } = this.props;
      const id = match.params.id;
      getTags();
      getAllSortedCourses(1);
      getAllQuizzes();
      getAllSortedMembers();
      getAllCoupons();
      getAutomation(id);
      this.setState({ currentScratch: '' });
   }

   handleInputChange = (name, value, target) => {
      const { setInput } = this.props;
      setInput(name, value, target);
   }

   handleConditionInputChange = (name, value, target) => {
      const { setConditionInput } = this.props;
      setConditionInput(name, value, target);
   }

   handleStatusInputChange = (name, value, target) => {
      const { setInput, updateAutomation, match } = this.props;
      const id = match.params.id;
      setInput(name, value, target);
      updateAutomation(id, { [name]: value });
   }

   handleNameInputChange = (name, value, target) => {
      const {
         setInput, updateAutomation, match, automation,
      } = this.props;
      const id = match.params.id;
      if (name === 'name') {
         setInput(name, value, target);
      }
      if (name === 'save') {
         updateAutomation(id, { name: automation.name });
      }
   }


   addTrigger = async (data) => {
      const {
         addTrigger, automation,
      } = this.props;
      this.setState({ currentScratch: '' });
      await addTrigger(automation.id, { type: data.type }, (res) => {
         this.changeCurrentScratch(data.type, '', res.id);
      });
   }

   addStep = (type) => {
      this.setState({ currentScratch: type });
   }

   changeCurrentScratch = (type, position, id, isAction, depth, actionId, actionIndex) => {
      const {
         chooseAction, chooseTrigger,
      } = this.props;

      if (type === 'enroll' || type === 'course_complete' || type === 'purchase' || (type === 'tag' && !isAction)) {
         chooseTrigger(id);
      } else if (isAction && type !== 'action') {
         chooseAction(id, actionId);
      }
      let cardPosition = '';
      if (position) {
         cardPosition = position;
      }
      if (isAction && type === 'tag') {
         this.setState({
            currentScratch: 'addTag', position: cardPosition, stepId: id, actionId, depth, actionIndex,
         });
      } else {
         this.setState({
            currentScratch: type, position: cardPosition, stepId: id, actionId, depth, actionIndex,
         });
      }
   }

   saveTrigger = async (inputs) => {
      const { saveTrigger, automation } = this.props;
      this.setState({ currentScratch: '' });
      await saveTrigger(automation.id, inputs);
   }

   saveAction = (inputs) => {
      const { saveAction, automation, currentAction } = this.props;
      const { stepId, actionId, actionIndex } = this.state;
      if (actionId) {
         const copyCondition = automation.actions.filter((action) => action.id === stepId)[0];
         const currentConditionAction = { ...copyCondition };
         const addIdCondition = (conditionObj) => {
            if (conditionObj.yes_actions) {
               conditionObj.yes_actions.map(yes_action => {
                  if (yes_action.id === actionId) {
                     yes_action.payload = inputs;
                  }
                  // delete yes_action.id;
                  if (yes_action.type === 'condition') {
                     return addIdCondition(yes_action.payload);
                  }
                  return (
                     yes_action
                  );
               });
            }
            if (conditionObj.no_actions) {
               conditionObj.no_actions.map(no_action => {
                  if (no_action.id === actionId) {
                     no_action.payload = inputs;
                  }
                  // delete no_action.id;
                  if (no_action.type === 'condition') {
                     return addIdCondition(no_action.payload);
                  }
                  return (
                     no_action
                  );
               });
            }
         };
         addIdCondition(currentConditionAction.payload);
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         saveAction(automation.id, currentConditionAction, actionId, false, actionIds, actionIndex);
      } else if (inputs.type === 'condition') {
         const copyCondition = automation.actions.filter((action) => action.id === stepId)[0];
         inputs.payload && inputs.payload.conditions.map(condition => {
            // delete condition.id;
            return (
               condition
            );
         });
         copyCondition.payload.conditions = inputs.payload.conditions;
         copyCondition.payload.match = inputs.payload.match;
         copyCondition.payload = { ...copyCondition.payload };
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         saveAction(automation.id, copyCondition, 0, false, actionIds, actionIndex);
      } else {
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         saveAction(automation.id, inputs, 0, false, actionIds, actionIndex);
      }
      this.setState({
         currentScratch: '', currentActionId: currentAction.id,
      });
   }

   closeCurrentScratch = () => {
      this.setState({ currentScratch: '' });
   }

   addAction = async (currenttype) => {
      const {
         addAction, automation, saveAction,
      } = this.props;
      const {
         position, stepId, actionId, depth, actionIndex,
      } = this.state;
      let type = currenttype;
      if (type === 'addTag') {
         type = 'tag';
      }
      const newAction = { type, payload: {}, id: new Date().getTime() + Math.floor(Math.random() * 10000) };
      // const newActionWithId = { type, payload: {}, id: new Date().getTime() + Math.floor(Math.random() * 10000) };

      if (position) {
         let currentConditionAction = {};
         let updateCurrentCondition = {};
         let action_type = 'yes_actions';
         if (position === 'right') {
            action_type = 'no_actions';
         }
         if (depth < 2) {
            currentConditionAction = automation.actions.filter((action) => action.id === stepId)[0];
            if (actionId) {
               const insert = (arr, index, newItem) => [
                  ...arr.slice(0, index),
                  newItem,
                  ...arr.slice(index),
               ];
               const addNewAction = insert(currentConditionAction.payload[action_type], actionIndex + 1, newAction);
               updateCurrentCondition = {
                  ...currentConditionAction,
                  payload: {
                     ...currentConditionAction.payload,
                     [action_type]: currentConditionAction.payload[action_type]
                        ? addNewAction : [
                           newAction,
                        ],
                  },
               };
            } else {
               updateCurrentCondition = {
                  ...currentConditionAction,
                  payload: {
                     ...currentConditionAction.payload,
                     [action_type]: currentConditionAction.payload[action_type] ? [
                        newAction,
                        ...currentConditionAction.payload[action_type],
                     ] : [
                        newAction,
                     ],
                  },
               };
            }
            const actionIds = automation.actions.map(action => {
               return (action.id);
            });
            this.setState({ currentScratch: '', currentActionId: newAction.id });
            await saveAction(automation.id, updateCurrentCondition, 0, false, actionIds, actionIndex, newAction);
            this.changeCurrentScratch(type, position, stepId, true, depth, newAction.id);
         }
         if (depth >= 2) {
            const copyCondition = automation.actions.filter((action) => action.id === stepId)[0];
            const updatedConditionAction = { ...copyCondition };
            const insert = (arr, index, newItem) => [
               ...arr.slice(0, index),
               newItem,
               ...arr.slice(index),
            ];
            const addIdCondition = (conditionObj) => {
               if (conditionObj.yes_actions) {
                  conditionObj.yes_actions.map(yes_action => {
                     if (yes_action.id === actionId) {
                        if (yes_action.type === 'condition') {
                           yes_action.payload = {
                              ...yes_action.payload,
                              [action_type]: yes_action.payload[action_type]
                                 ? insert(yes_action.payload[action_type], actionIndex + 1, newAction) : [
                                    newAction,
                                 ],
                           };
                        } else {
                           conditionObj.yes_actions = insert(conditionObj.yes_actions, actionIndex + 1, newAction);
                        }
                     }
                     if (yes_action.type === 'condition') {
                        return addIdCondition(yes_action.payload);
                     }
                     return (
                        yes_action
                     );
                  });
               }
               if (conditionObj.no_actions) {
                  conditionObj.no_actions.map(no_action => {
                     if (no_action.id === actionId) {
                        if (no_action.type === 'condition') {
                           no_action.payload = {
                              ...no_action.payload,
                              [action_type]: no_action.payload[action_type] ? insert(no_action.payload[action_type], actionIndex + 1, newAction) : [
                                 newAction,
                              ],
                           };
                        } else {
                           conditionObj.no_actions = insert(conditionObj.no_actions, actionIndex + 1, newAction);
                        }
                     }
                     if (no_action.type === 'condition') {
                        return addIdCondition(no_action.payload);
                     }
                     return (
                        no_action
                     );
                  });
               }
            };
            addIdCondition(updatedConditionAction.payload);
            const actionIds = automation.actions.map(action => {
               return (action.id);
            });
            this.setState({ currentScratch: '', currentActionId: newAction.id });
            await saveAction(automation.id, updatedConditionAction, actionId, false, actionIds, actionIndex, newAction);
            this.changeCurrentScratch(type, position, stepId, true, depth, newAction.id);
         }
      } else if (depth >= 2) {
         const copyCondition = automation.actions.filter((action) => action.id === stepId)[0];
         const updatedConditionAction = { ...copyCondition };
         const insert = (arr, index, newItem) => [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index),
         ];
         const addIdCondition = (conditionObj) => {
            if (conditionObj.yes_actions) {
               conditionObj.yes_actions.map(yes_action => {
                  if (yes_action.id === actionId) {
                     conditionObj.yes_actions = insert(conditionObj.yes_actions, actionIndex + 1, newAction);
                  }
                  if (yes_action.type === 'condition') {
                     return addIdCondition(yes_action.payload);
                  }
                  return (
                     yes_action
                  );
               });
            }
            if (conditionObj.no_actions) {
               conditionObj.no_actions.map(no_action => {
                  if (no_action.id === actionId) {
                     conditionObj.no_actions = insert(conditionObj.no_actions, actionIndex + 1, newAction);
                  }
                  if (no_action.type === 'condition') {
                     return addIdCondition(no_action.payload);
                  }
                  return (
                     no_action
                  );
               });
            }
         };
         addIdCondition(updatedConditionAction.payload);
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         this.setState({ currentScratch: '', currentActionId: newAction.id });
         await saveAction(automation.id, updatedConditionAction, actionId, false, actionIds, actionIndex, newAction);
         this.changeCurrentScratch(type, position, stepId, true, depth, newAction.id);
      } else {
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         this.setState({ currentScratch: '' });
         await addAction(automation.id, { type, payload: {} }, actionIds, actionIndex);
         const { currentAction } = this.props;
         this.setState({ currentActionId: currentAction.id });
         this.changeCurrentScratch(type, position, currentAction.id, true);
      }
   }

   handleDeleteAction = (actionId, depth, stepId) => {
      const {
         automation, deleteAction, saveAction,
      } = this.props;
      const { actionIndex } = this.state;
      if (depth && depth > 0) {
         const copyCondition = automation.actions.filter((action) => action.id === stepId)[0];
         const currentConditionAction = { ...copyCondition };
         const addIdCondition = (conditionObj) => {
            if (conditionObj.yes_actions) {
               conditionObj.yes_actions.map((yes_action, index) => {
                  if (yes_action.id === actionId) {
                     conditionObj.yes_actions.splice(index, 1);
                  } else {
                     // delete yes_action.id;
                  }

                  if (yes_action.type === 'condition') {
                     return addIdCondition(yes_action.payload);
                  }
                  return (
                     yes_action
                  );
               });
            }
            if (conditionObj.no_actions) {
               conditionObj.no_actions.map((no_action, index) => {
                  if (no_action.id === actionId) {
                     conditionObj.no_actions.splice(index, 1);
                  } else {
                     // delete no_action.id;
                  }

                  if (no_action.type === 'condition') {
                     return addIdCondition(no_action.payload);
                  }
                  return (
                     no_action
                  );
               });
            }
         };
         addIdCondition(currentConditionAction.payload);
         const actionIds = automation.actions.map(action => {
            return (action.id);
         });
         saveAction(automation.id, currentConditionAction, actionId, true, actionIds, actionIndex);
      } else {
         deleteAction(automation.id, actionId);
      }

      this.setState({ currentScratch: '' });
   }

   handleDeleteTrigger = (triggerId) => {
      const {
         automation, deleteTrigger,
      } = this.props;
      this.setState({ currentScratch: '' });
      deleteTrigger(automation.id, triggerId);
   }

   changeCondition = (name, value, id) => {
      const { changeCondition } = this.props;
      changeCondition(name, value, id);
   }

   render() {
      const {
         currentScratch,
         triggerData,
         addTriggerData,
         stepData,
         actionData,
         timeingData,
         logicData,
         position,
         actionPosition,
         currentActionId,
      } = this.state;
      const {
         courses, tags, getCoursesInProgress, triggers, automation,
         getAutomationInProgress, currentTrigger, chooseTrigger, conditions,
         addCondition, deleteCondition,
         currentAction, getActionInProgress, getTriggerInProgress,
         getallMembersInProgress, members, coupons,
         quizzes, getallQuizzesInProgress,
      } = this.props;

      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <ContainerLoading isLoading={ getAutomationInProgress }>
               <div className='automation__create'>
                  <AutomationHeader
                     templateName={ automation.name }
                     handleNameInputChange={ this.handleNameInputChange }
                     status={ automation.status }
                     changeStatus={ this.handleStatusInputChange }
                  />
                  <AutomationCreate
                     currentScratch={ currentScratch }
                     triggerData={ triggerData }
                     addTriggerData={ addTriggerData }
                     actionData={ actionData }
                     timeingData={ timeingData }
                     logicData={ logicData }
                     stepData={ stepData }
                     addStep={ this.addStep }
                     addTrigger={ this.addTrigger }
                     changeCurrentScratch={ this.changeCurrentScratch }
                     addAction={ this.addAction }
                     closeCurrentScratch={ this.closeCurrentScratch }
                     courses={ courses }
                     tags={ tags }
                     getCoursesInProgress={ getCoursesInProgress }
                     handleInputChange={ this.handleInputChange }
                     triggers={ triggers }
                     automation={ automation }
                     handleStatusInputChange={ this.handleStatusInputChange }
                     handleNameInputChange={ this.handleNameInputChange }
                     saveTrigger={ this.saveTrigger }
                     currentTrigger={ currentTrigger }
                     chooseTrigger={ chooseTrigger }
                     saveAction={ this.saveAction }
                     currentAction={ currentAction }
                     handleConditionInputChange={ this.handleConditionInputChange }
                     position={ position }
                     actionPosition={ actionPosition }
                     handleDeleteAction={ this.handleDeleteAction }
                     conditions={ conditions }
                     addCondition={ addCondition }
                     deleteCondition={ deleteCondition }
                     changeCondition={ this.changeCondition }
                     handleDeleteTrigger={ this.handleDeleteTrigger }
                     getActionInProgress={ getActionInProgress }
                     actionCurrent={ currentActionId }
                     getTriggerInProgress={ getTriggerInProgress }
                     members={ members }
                     getallMembersInProgress={ getallMembersInProgress }
                     coupons={ coupons }
                     quizzes={ quizzes }
                     getallQuizzesInProgress={ getallQuizzesInProgress }
                  />
               </div>
            </ContainerLoading>
         </>
      );
      // return (
      //    <ContainerLoading isLoading={ getAutomationInProgress }>
      //       <Container.Header>
      //          <AutomationCreateHeader
      //             goTo={ () => {} }
      //             goToBack={ () => {} }
      //             tooltip=''
      //          />
      //       </Container.Header>
      //       <Container.Content>
      //          {!getAutomationInProgress && (
      //             <AutomationCreate
      //                currentScratch={ currentScratch }
      //                triggerData={ triggerData }
      //                addTriggerData={ addTriggerData }
      //                actionData={ actionData }
      //                timeingData={ timeingData }
      //                logicData={ logicData }
      //                stepData={ stepData }
      //                addStep={ this.addStep }
      //                addTrigger={ this.addTrigger }
      //                changeCurrentScratch={ this.changeCurrentScratch }
      //                addAction={ this.addAction }
      //                closeCurrentScratch={ this.closeCurrentScratch }
      //                courses={ courses }
      //                tags={ tags }
      //                getCoursesInProgress={ getCoursesInProgress }
      //                handleInputChange={ this.handleInputChange }
      //                triggers={ triggers }
      //                automation={ automation }
      //                handleStatusInputChange={ this.handleStatusInputChange }
      //                handleNameInputChange={ this.handleNameInputChange }
      //                saveTrigger={ this.saveTrigger }
      //                currentTrigger={ currentTrigger }
      //                chooseTrigger={ chooseTrigger }
      //                saveAction={ this.saveAction }
      //                currentAction={ currentAction }
      //                handleConditionInputChange={ this.handleConditionInputChange }
      //                position={ position }
      //                actionPosition={ actionPosition }
      //                handleDeleteAction={ this.handleDeleteAction }
      //                conditions={ conditions }
      //                addCondition={ addCondition }
      //                deleteCondition={ deleteCondition }
      //                changeCondition={ this.changeCondition }
      //                handleDeleteTrigger={ this.handleDeleteTrigger }
      //                getActionInProgress={ getActionInProgress }
      //                actionCurrent={ currentActionId }
      //                getTriggerInProgress={ getTriggerInProgress }
      //                members={ members }
      //                getallMembersInProgress={ getallMembersInProgress }
      //                coupons={ coupons }
      //             />
      //          )}
      //       </Container.Content>
      //    </ContainerLoading>
      // );
   }
}

const mapStateToProps = (state) => {
   return {
      courses: selectors.coursesSelector(state),
      tags: selectors.tagsSelector(state),
      getCoursesInProgress: selectors.getCoursesInProgressSelector(state),
      triggers: selectors.triggersSelector(state),
      automation: selectors.automationSelector(state),
      getAutomationInProgress: selectors.getAutomationInProgressSelector(state),
      currentTrigger: selectors.currentTriggerSelector(state),
      currentAction: selectors.currentActionSelector(state),
      conditions: selectors.conditionsSelector(state),
      getActionInProgress: selectors.getActionInProgressSelector(state),
      getTriggerInProgress: selectors.getTriggerInProgressSelector(state),
      members: selectors.membersSelector(state),
      getallMembersInProgress: selectors.getallMembersInProgressSelector(state),
      coupons: selectors.couponsSelector(state),
      getallQuizzesInProgress: selectors.getallQuizzesInProgressSelector(state),
      quizzes: selectors.quizzesSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getAllSortedCourses: (isOnline) => {
         dispatch(operations.getAllSortedCoursesOperation(isOnline));
      },
      getTags: () => {
         dispatch(operations.getTagsOperation());
      },
      getAllSortedMembers: () => {
         dispatch(operations.getAllSortedMembersOperation());
      },
      getAllQuizzes: () => {
         dispatch(operations.getAllQuizzesOperation());
      },
      getAllCoupons: () => {
         dispatch(operations.getAllCouponsOperation());
      },
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      setConditionInput: (key, value, target) => {
         dispatch(setConditionInputAction(key, value, target));
      },
      chooseTrigger: (id) => {
         dispatch(chooseTriggerAction(id));
      },
      chooseAction: (id, actionId) => {
         dispatch(chooseActionAction(id, actionId));
      },
      getAutomation: (id) => {
         dispatch(operations.getAutomationOperation(id));
      },
      updateAutomation: (id, inputs) => {
         dispatch(operations.updateAutomationOperation(id, inputs));
      },
      addTrigger: async (id, inputs, callback) => {
         await dispatch(operations.addTriggerOperation(id, inputs, callback));
      },
      saveTrigger: async (id, inputs) => {
         await dispatch(operations.saveTriggerOperation(id, inputs));
      },
      addAction: async (id, inputs, actionIds, actionIndex) => {
         await dispatch(operations.addActionOperation(id, inputs, actionIds, actionIndex));
      },
      saveAction: async (id, inputs, actionId, isDelete, actionIds, actionIndex, newAction) => {
         await dispatch(operations.saveActionOperation(id, inputs, actionId, isDelete, actionIds, actionIndex, newAction));
      },
      deleteAction: (id, actionId) => {
         dispatch(operations.deleteActionOperation(id, actionId));
      },
      deleteTrigger: (id, triggerId) => {
         dispatch(operations.deleteTriggerOperation(id, triggerId));
      },
      addCondition: () => {
         dispatch(addConditionAction());
      },
      deleteCondition: (id) => {
         dispatch(deleteConditionAction(id));
      },
      changeCondition: (key, value, id) => {
         dispatch(changeConditionAction(key, value, id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomationCreateContainer);
