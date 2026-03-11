import {
   getPlanCards, connectToPlan, changePlan, cancelPlan, updateCard,
} from 'api/AuthApi';
import * as action from 'state/modules/OldPlans/actions';
import { toast } from 'react-toastify';
import { customChangePlan } from 'utils/userMaven';
import isPrint from '../designCourse/edit/Error';

function waitDelay(delay) {
   if (!delay) return;
   // eslint-disable-next-line consistent-return
   return new Promise((resolve) => {
      setTimeout(resolve, delay);
   });
}

export const getPlansOperation = (delay) => {
   return async (dispatch) => {
      dispatch(action.getPlansStart());
      if (delay) window.location.reload();
      try {
         const {
            data,
         } = await getPlanCards();
         dispatch(action.getPlansCompleted(data));
      } catch (error) {
         dispatch(action.getPlansFailed(error && error.response && error.response.data));
         if (error && error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const updateCardOperation = (inputs) => {
   return async (dispatch) => {
      try {
         await updateCard(inputs);
         dispatch(action.setCardUpdateModalState(false));
         dispatch(action.setCardModalState(false));
         if (isPrint('Card Changed Successfully')) {
            toast.success('Card Changed Successfully');
         }
         window.location.reload();
      } catch (error) {
         dispatch(action.setCardUpdateModalState(false));

         const { response: { status, data: { message } = {} } = {} } = error;
         if (message === 'You can only upgrade your plan!') {
            dispatch(action.setCardModalState(false));
            document.querySelector('.hs-widget-logo-img').click();
         } else {
            dispatch(action.getPlansFailed(error.response.data));
            if (status !== 401) {
               if (isPrint(message)) {
                  toast.error(message);
               }
            }
         }
      }
   };
};

export const cancelPlanOperation = () => {
   return async (dispatch) => {
      try {
         await cancelPlan();
         dispatch(getPlansOperation());
         // dispatch(action.cancelPlan());
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const changePlanOperation = (plan, subscription) => {
   return async (dispatch) => {
      dispatch(action.setPlansModalStateStart());
      try {
         await changePlan(plan);
         customChangePlan(plan, subscription);
         dispatch(getPlansOperation(10000));
         dispatch(action.setPlansModalState(false));
         if (isPrint('Plan changed')) {
            toast.success('Plan changed');
         }
      } catch (error) {
         dispatch(action.setPlansModalStateFailed(error.response && error.response.data
            && error.response.data.errors && error.response.data.errors.plan_id));
         if (error.response && error.response.status) {
            if (error.response.status !== 401) {
               switch (error.response.status) {
                  case 400: {
                     if (isPrint(error.response.data)) {
                        toast.error(error.response.data);
                     }
                     break;
                  }
                  case 422: {
                     //  toast.error(error.response.data);
                     break;
                  }
                  default: {
                     if (isPrint('Something went wrong.')) {
                        toast.error('Something went wrong.');
                     }
                  }
               }
            }
         }
      }
   };
};

export const connectToPlanOperation = (plan) => {
   return async (dispatch) => {
      try {
         const data = await connectToPlan(plan);
         dispatch(action.connectToPlanCompleted(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
