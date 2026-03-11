import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, {
   TYPES as textType,
   SIZES as textSizes,
} from 'components/elements/TextNew';
import withLoading from 'utils/withLoading';
import SimpleStatus from 'components/elements/SimpleStatus';
import Item from './Item';
import AddItem from './addItem';
import './index.scss';

const AddIcon = ({ onClick, style }) => {
   return (
      <div className='addIconWrapper'>
         <div role='presentation' onClick={ onClick }>
            <div className='addIconLine'> </div>
            <Icon name='AddAutomation' style={ style } />
         </div>
      </div>
   );
};
const ConditionalSplit = ({
   leftData,
   rightData,
   changeCurrentScratch,
   step,
   depth,
   id,
   delActionModalClick,
   conditionalIndex,
   tags,
   courses,
}) => {
   function actionContent(stepData) {
      let typeName = '';
      // eslint-disable-next-line max-len
      if (
         stepData.type
         && stepData.payload
         && (stepData.payload.value
            || stepData.payload.url
            || stepData.payload.tag_id
            || stepData.payload.course_id
            || (stepData.payload.match
               && stepData.payload.conditions
               && stepData.payload.conditions.length)
            || (stepData.payload.body && stepData.payload.subject))
      ) {
         let tagName = '';
         let courseName = '';
         if (stepData.payload.tag_id && tags) {
            tagName = tags.find(tag => tag.id === stepData.payload.tag_id);
            tagName = tagName && tagName.name;
         }
         if (stepData.payload.course_id && courses) {
            courseName = courses.find(
               course => course.id === stepData.payload.course_id
            );
            courseName = courseName && courseName.name;
         }
         switch (stepData.type) {
            case 'remove_tag':
               typeName = `Tag is ${ tagName }`;
               break;
            case 'tag':
               typeName = `Tag is ${ tagName }`;
               break;
            case 'webhook':
               typeName = `Send webhook to ${ stepData.payload.url }`;
               break;
            case 'condition':
               typeName = `Match ${ stepData.payload.match } conditions`;
               break;
            case 'email':
               typeName = 'Send email content';
               break;
            case 'wait':
               typeName = `After ${ stepData.payload.value } ${
                  stepData.payload.value === '1' || stepData.payload.value === 1
                     ? stepData.payload.type
                     : `${ stepData.payload.type }s`
               } `;
               break;
            case 'enroll_in':
               typeName = `Enroll in ${ courseName }`;
               break;
            default:
         }
      }

      return typeName;
   }

   function actionName(type) {
      let typeName = type;
      switch (type) {
         case 'remove_tag':
            typeName = 'Remove Tag';
            break;
         case 'tag':
            typeName = 'Add Tag';
            break;
         case 'email':
            typeName = 'Send Email';
            break;
         case 'webhook':
            typeName = 'Send Webhook';
            break;
         case 'enroll_in':
            typeName = 'Enroll In';
            break;
         default:
      }
      return typeName;
   }

   function mainStepLength() {
      let conditionId = id;
      if (!id) {
         conditionId = step.id;
      }
      if (depth === 1) {
         const conditionLeft1 = document.querySelector(
            `#conditionalSplitLeft${ conditionId }`
         ).offsetWidth;
         const conditionRight1 = document.querySelector(
            `#conditionalSplitRight${ conditionId }`
         ).offsetWidth;
         const addAutomationContent = document.querySelector(
            '#addAutomationContent'
         ).offsetWidth;
         const conditionMainWidth = conditionLeft1 + conditionRight1;
         if (addAutomationContent < conditionMainWidth) {
            document.querySelector(
               '#addAutomationContent'
            ).style.width = `${ conditionMainWidth }px`;
         }
      }
      const conditionLeft = document.querySelector(
         `#conditionalSplitLeft${ conditionId }`
      ).offsetHeight;
      const conditionRight = document.querySelector(
         `#conditionalSplitRight${ conditionId }`
      ).offsetHeight;
      if (conditionLeft > conditionRight) {
         let conditionRightAbs = conditionRight;
         if (conditionRight <= 61) {
            conditionRightAbs = conditionRight - 5;
         }
         document.querySelector(
            `#rightConditionalTopLine${ conditionId }`
         ).style.height = `${ conditionLeft - conditionRightAbs + 24 }px`;
      } else if (conditionLeft < conditionRight) {
         let conditionLeftAbs = conditionLeft;
         if (conditionLeft <= 61) {
            conditionLeftAbs = conditionLeft - 5;
         }

         document.querySelector(
            `#leftConditionalTopLine${ conditionId }`
         ).style.height = `${ conditionRight - conditionLeftAbs + 24 }px`;
      }
   }

   useEffect(() => {
      const changeConditionLength = setTimeout(() => {
         mainStepLength();
      }, 30);
      return () => clearTimeout(changeConditionLength);
   }, [leftData, rightData]);

   return (
      <div className='conditionalSplitWrapper'>
         <div className='conditionalSplitHeader'>
            <div className='conditionalTopLine'> </div>
         </div>
         <div className='conditionalSplitContent'>
            <div className='conditionalSplitLeftContent'>
               <div
                  className='conditionalSplitLeft'
                  id={ `conditionalSplitLeft${ id || step.id }` }
               >
                  <div className='leftIcon'>
                     <div className='conditionalTopLine'> </div>
                     <div className='conditionalSplitTypeContent'>
                        <SimpleStatus color='green' text='Yes' />
                     </div>
                     <div
                        className='yesIcon'
                        role='presentation'
                        onClick={ () => {
                           changeCurrentScratch(
                              'action',
                              'left',
                              step.id,
                              true,
                              depth,
                              id,
                              conditionalIndex
                           );
                        } }
                     >
                        <Icon name='AddAutomation' />
                     </div>
                  </div>
                  {leftData
                     && leftData.map((leftItem, index) => {
                        const leftDataId = index;
                        return (
                           <div className='w-full' key={ leftDataId }>
                              <div className='stepCardWrapper'>
                                 <div className='addIconLine'> </div>
                                 <Item
                                    icon={
                                       leftItem.type === 'remove_tag'
                                          ? 'RemoveTag'
                                          : leftItem.type
                                    }
                                    title={ actionName(leftItem.type) }
                                    content={ actionContent(leftItem) }
                                    onClick={ () => changeCurrentScratch(
                                       leftItem.type,
                                       'left',
                                       step.id,
                                       true,
                                       depth,
                                       leftItem.id,
                                       leftDataId
                                    )
                                    }
                                    delActionModalClick={ delActionModalClick }
                                    id={ leftItem.id }
                                    depth={ depth }
                                    stepId={ step.id }
                                 />
                              </div>
                              {leftItem.type === 'condition' ? (
                                 <ConditionalSplit
                                    leftData={
                                       leftItem.payload
                                       && leftItem.payload.yes_actions
                                    }
                                    rightData={
                                       leftItem.payload
                                       && leftItem.payload.no_actions
                                    }
                                    step={ step }
                                    id={ leftItem.id }
                                    depth={ depth + 1 }
                                    changeCurrentScratch={ changeCurrentScratch }
                                    delActionModalClick={ delActionModalClick }
                                    conditionalIndex={ leftDataId }
                                    tags={ tags }
                                    courses={ courses }
                                 />
                              ) : (
                                 <AddIcon
                                    onClick={ () => changeCurrentScratch(
                                       'action',
                                       'left',
                                       step.id,
                                       true,
                                       depth,
                                       leftItem.id,
                                       leftDataId
                                    )
                                    }
                                 />
                              )}
                           </div>
                        );
                     })}
               </div>
               <div className='leftIconEnd'>
                  <div
                     className='conditionalTopLine'
                     id={ `leftConditionalTopLine${ id || step.id }` }
                  >
                     {' '}
                  </div>
               </div>
            </div>
            <div className='conditionalSplitRightContent'>
               <div
                  className='conditionalSplitRight'
                  id={ `conditionalSplitRight${ id || step.id }` }
               >
                  <div className='rightIcon'>
                     <div className='conditionalTopLine'> </div>
                     <div className='conditionalSplitTypeContent'>
                        <SimpleStatus color='red' text='No' />
                     </div>
                     <div
                        className='noIcon'
                        role='presentation'
                        onClick={ () => {
                           changeCurrentScratch(
                              'action',
                              'right',
                              step.id,
                              true,
                              depth,
                              id,
                              conditionalIndex
                           );
                        } }
                     >
                        <Icon name='AddAutomation' />
                     </div>
                  </div>
                  {rightData
                     && rightData.map((rightItem, index) => {
                        const rightDataId = index;
                        return (
                           <div className='w-full' key={ rightDataId }>
                              <div className='stepCardWrapper'>
                                 <div className='addIconLine'> </div>
                                 <Item
                                    icon={
                                       rightItem.type === 'remove_tag'
                                          ? 'RemoveTag'
                                          : rightItem.type
                                    }
                                    title={ actionName(rightItem.type) }
                                    content={ actionContent(rightItem) }
                                    onClick={ () => changeCurrentScratch(
                                       rightItem.type,
                                       'right',
                                       step.id,
                                       true,
                                       depth,
                                       rightItem.id,
                                       rightDataId
                                    )
                                    }
                                    delActionModalClick={ delActionModalClick }
                                    id={ rightItem.id }
                                    depth={ depth }
                                    stepId={ step.id }
                                 />
                              </div>
                              {rightItem.type === 'condition' ? (
                                 <ConditionalSplit
                                    leftData={
                                       rightItem.payload
                                       && rightItem.payload.yes_actions
                                    }
                                    rightData={
                                       rightItem.payload
                                       && rightItem.payload.no_actions
                                    }
                                    step={ step }
                                    id={ rightItem.id }
                                    depth={ depth + 1 }
                                    changeCurrentScratch={ changeCurrentScratch }
                                    delActionModalClick={ delActionModalClick }
                                    conditionalIndex={ rightDataId }
                                    tags={ tags }
                                    courses={ courses }
                                 />
                              ) : (
                                 <AddIcon
                                    onClick={ () => changeCurrentScratch(
                                       'action',
                                       'right',
                                       step.id,
                                       true,
                                       depth,
                                       rightItem.id,
                                       rightDataId
                                    )
                                    }
                                 />
                              )}
                           </div>
                        );
                     })}
               </div>
               <div className='rightIconEnd'>
                  <div
                     className='conditionalTopLine'
                     id={ `rightConditionalTopLine${ id || step.id }` }
                  >
                     {' '}
                  </div>
               </div>
            </div>
         </div>
         <div className='conditionalSplitAddIcons conditionIcon'>
            <div className='conditionalTopLineGrey' />
            <div
               className='conditionIconPosition'
               role='presentation'
               onClick={ () => changeCurrentScratch(
                  'action',
                  '',
                  step.id,
                  true,
                  depth,
                  id,
                  conditionalIndex
               )
               }
            >
               <Icon name='AddAutomation' />
            </div>
         </div>
      </div>
   );
};

const StepLoading = withLoading('div');
const TriggerLoading = withLoading('div');

const AddAutomationContent = ({
   triggerData,
   stepData,
   changeCurrentScratch,
   delActionModalClick,
   delTriggerModalClick,
   getActionInProgress,
   tags,
   courses,
   currentAction,
   getTriggerInProgress,
}) => {
   const [styleLine, setStyleLine] = useState({});
   const length = triggerData.length;
   const stepLength = stepData.length;

   function calc(length1) {
      const Content = document.querySelector('.addTriggerContent');
      const Card = document.querySelector('.triggerCardWrapper');
      const ContentWidth = Content && Content.offsetWidth; // 630
      let cardWidth = Card && Card.offsetWidth; // 290

      if (
         length1
         && ContentWidth < length1 * cardWidth + cardWidth
         && length1 !== 4
      ) {
         cardWidth = ContentWidth / (length1 + 1);
      }
      let widthLine = 0;
      if (length1) {
         widthLine = cardWidth * length1;
         if (length1 === 4) {
            widthLine = cardWidth * (length1 - 1) + 35;
         }
      }
      setStyleLine({ width: `${ widthLine }px` });
   }
   useEffect(() => {
      const timer = setTimeout(() => {
         calc(triggerData.length);
      }, 30);
      return () => clearTimeout(timer);
   }, [triggerData]);

   function actionName(type) {
      let typeName = type;
      switch (type) {
         case 'remove_tag':
            typeName = 'Remove Tag';
            break;
         case 'tag':
            typeName = 'Add Tag';
            break;
         case 'email':
            typeName = 'Send Email';
            break;
         case 'webhook':
            typeName = 'Send Webhook';
            break;
         case 'enroll_in':
            typeName = 'Enroll In';
            break;
         default:
      }
      return typeName;
   }

   function triggerName(type) {
      let typeName = type;
      switch (type) {
         case 'enroll':
            typeName = 'Enrolled In';
            break;
         case 'tag':
            typeName = 'Tag Is Added';
            break;
         case 'purchase':
            typeName = 'Purchased';
            break;
         case 'course_complete':
            typeName = 'Course Complete';
            break;
         case 'quiz_completed':
            typeName = 'Quiz Complete';
            break;
         case 'affiliate_created':
            typeName = 'Affiliate signed up';
            break;
         default:
      }
      return typeName;
   }

   function triggerContent(trigger) {
      let typeName = '';
      if (trigger.type && (trigger.tag_id || trigger.course_id)) {
         let tagName = '';
         let courseName = '';
         if (trigger.tag_id && tags) {
            tagName = tags.find(tag => tag.id === trigger.tag_id);
            tagName = tagName && tagName.name;
         }
         if (trigger.course_id && courses) {
            courseName = courses.find(
               course => course.id === trigger.course_id
            );
            courseName = courseName && courseName.name;
         }
         switch (trigger.type) {
            case 'enroll':
               typeName = `Enrolled In ${ courseName }`;
               break;
            case 'tag':
               typeName = `Tag is ${ tagName }`;
               break;
            case 'purchase':
               typeName = `Purchased ${ courseName }`;
               break;
            case 'course_complete':
               typeName = `Class is ${ courseName }`;
               break;
            case 'quiz_completed':
               typeName = `Class is ${ courseName }`;
               break;
            case 'affiliate_created':
               typeName = `Affiliate is ${ courseName }`;
               break;
            default:
         }
      }

      return typeName;
   }

   function actionContent(step) {
      let typeName = '';
      // eslint-disable-next-line max-len
      if (
         step.type
         && step.payload
         && (step.payload.value
            || step.payload.url
            || step.payload.tag_id
            || step.payload.course_id
            || (step.payload.match
               && step.payload.conditions
               && step.payload.conditions.length)
            || (step.payload.body && step.payload.subject))
      ) {
         let tagName = '';
         let courseName = '';
         if (step.payload.tag_id && tags) {
            tagName = tags.find(tag => tag.id === step.payload.tag_id);
            tagName = tagName && tagName.name;
         }
         if (step.payload.course_id && courses) {
            courseName = courses.find(
               course => course.id === step.payload.course_id
            );
            courseName = courseName && courseName.name;
         }
         switch (step.type) {
            case 'remove_tag':
               typeName = `Tag is ${ tagName }`;
               break;
            case 'tag':
               typeName = `Tag is ${ tagName }`;
               break;
            case 'webhook':
               typeName = `Send Webhook to ${ step.payload.url }`;
               break;
            case 'condition':
               typeName = `Match ${ step.payload.match } conditions`;
               break;
            case 'email':
               typeName = 'Send email content';
               break;
            case 'wait':
               typeName = `After ${ step.payload.value } ${
                  step.payload.value === '1' || step.payload.value === 1
                     ? step.payload.type
                     : `${ step.payload.type }s`
               } `;
               break;
            case 'enroll_in':
               typeName = `Enroll in ${ courseName }`;
               break;
            default:
         }
      }

      return typeName;
   }

   const scrollToBottom = () => {
      if (currentAction.id) {
         document.querySelector(`#item-${ currentAction.id }`).scrollIntoView({ behavior: 'smooth' });
      }
   };

   useEffect(() => {
      const dd = setTimeout(() => {
         scrollToBottom();
      }, 30);
      return () => clearTimeout(dd);
   }, [stepData]);

   useEffect(() => {
      const dd = setTimeout(() => {
         const outerContent = document.getElementById('AutomationCreateContent')
            .offsetWidth;
         const innerContent = document.getElementById('addAutomationContent')
            .offsetWidth;
         document.getElementById('AutomationCreateContent').scrollLeft = (innerContent - outerContent) / 2;
      }, 30);

      return () => clearTimeout(dd);
   }, []);
   return (
      <TriggerLoading
         isLoading={ getTriggerInProgress }
         className='addAutomationContent'
         id='addAutomationContent'
      >
         <div className='addTriggerContent'>
            {triggerData
               && triggerData.map((trigger, i) => {
                  const j = i;
                  return (
                     <div className='triggerCardWrapper' key={ j }>
                        <Item
                           icon={
                              trigger.type === 'course_complete'
                                 ? 'enroll'
                                 : trigger.type
                           }
                           title={ triggerName(trigger.type) }
                           content={ triggerContent(trigger) }
                           onClick={ () => changeCurrentScratch(trigger.type, '', trigger.id)
                           }
                           type='trigger'
                           delTriggerModalClick={ delTriggerModalClick }
                           id={ trigger.id }
                        />
                     </div>
                  );
               })}
            {length < '4' && (
               <div
                  className='triggerCardWrapper'
                  // style={ styleCard }
               >
                  <AddItem onClick={ () => changeCurrentScratch('trigger') } />
               </div>
            )}
         </div>
         {length !== 0 && (
            <div className='trigger_line_wrapper'>
               <div style={ styleLine } className='trigger_line' />
            </div>
         )}
         <StepLoading
            isLoading={ getActionInProgress }
            className='addStepContent'
         >
            <AddIcon
               onClick={ () => changeCurrentScratch('action') }
               style={ !stepLength ? { cursor: 'pointer' } : {} }
            />
            <div className='w-full'>
               {stepData
                  && stepData.map((step, index) => {
                     const depth = 0;
                     return (
                        <div className='w-full' key={ step.id }>
                           <div className='stepCardWrapper'>
                              <div className='addIconLine'> </div>
                              <Item
                                 icon={
                                    step.type === 'remove_tag'
                                       ? 'RemoveTag'
                                       : step.type
                                 }
                                 title={ actionName(step.type) }
                                 content={ actionContent(step) }
                                 onClick={ () => changeCurrentScratch(
                                    step.type,
                                    '',
                                    step.id,
                                    true
                                 )
                                 }
                                 delActionModalClick={ delActionModalClick }
                                 id={ step.id }
                                 stepId={ step.id }
                              />
                           </div>
                           {step.type === 'condition' ? (
                              <ConditionalSplit
                                 leftData={
                                    step.payload && step.payload.yes_actions
                                 }
                                 rightData={
                                    step.payload && step.payload.no_actions
                                 }
                                 parent={ [] }
                                 step={ step }
                                 depth={ depth + 1 }
                                 changeCurrentScratch={ changeCurrentScratch }
                                 delActionModalClick={ delActionModalClick }
                                 conditionalIndex={ index }
                                 tags={ tags }
                                 courses={ courses }
                              />
                           ) : (
                              <AddIcon
                                 onClick={ () => changeCurrentScratch(
                                    'action',
                                    '',
                                    step.id,
                                    true,
                                    depth,
                                    0,
                                    index
                                 )
                                 }
                              />
                           )}
                        </div>
                     );
                  })}
            </div>
            <div className='conditionEnd'>
               <div className='conditionalTopLineGrey' />
               <div className='conditionEndContent'>
                  <Text
                     type={ textType.mediumLarge }
                     size={ textSizes.small }
                     inner='END OF AUTOMATION'
                     style={ { color: '#131F1E' } }
                  />
               </div>
            </div>
         </StepLoading>
      </TriggerLoading>
   );
};

ConditionalSplit.propTypes = {
   changeCurrentScratch: PropTypes.func,
   rightData: PropTypes.array,
   leftData: PropTypes.array,
   step: PropTypes.object,
   id: PropTypes.number,
   depth: PropTypes.number,
   delActionModalClick: PropTypes.func,
   conditionalIndex: PropTypes.number,
   tags: PropTypes.array,
   courses: PropTypes.array,
};

AddIcon.propTypes = {
   onClick: PropTypes.func,
   style: PropTypes.object,
};

AddAutomationContent.propTypes = {
   changeCurrentScratch: PropTypes.func,
   triggerData: PropTypes.array,
   stepData: PropTypes.array,
   delActionModalClick: PropTypes.func,
   delTriggerModalClick: PropTypes.func,
   getActionInProgress: PropTypes.bool,
   courses: PropTypes.array,
   tags: PropTypes.array,
   currentAction: PropTypes.object,
   getTriggerInProgress: PropTypes.bool,
};

export default AddAutomationContent;
