import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import diff from 'utils/getDeff';
import isPrint from 'state/modules/designCourse/edit/Error';
import ACTIONS from './actions';
import reducer from './reducer';

const useForms = (forms, initialForm, addonActions = {}) => {
   const [activeForm, setActiveForm] = useState(initialForm);
   const [state, dispatch] = useReducer(reducer(addonActions), { stateReady: false });
   async function requestFormData(form) {
      dispatch(ACTIONS.formRequestStart(form));
      try {
         const { data } = await state[form].fetchAction();
         dispatch(ACTIONS.formRequestSuccess(form, data));
      } catch (err) {
         if (isPrint(`Failed to load data for ${ form }`)) {
            toast.error(`Failed to load data for ${ form }`);
         }
         dispatch(ACTIONS.formRequestFail(form));
      }
   }
   useEffect(() => {
      if (forms) {
         dispatch(ACTIONS.generateInitialState(forms));
      }
   }, [dispatch, forms]);
   useEffect(() => {
      if (initialForm && state.stateReady) {
         requestFormData(initialForm);
      }
   }, [initialForm, state.stateReady]);


   useEffect(() => {
      if (activeForm && state[activeForm] && !state[activeForm].loading && !state[activeForm].inited) {
         requestFormData(activeForm);
      }
   }, [activeForm]);

   const onChange = (target, key, value) => {
      dispatch(ACTIONS.inputChange(target, key, value));
   };

   const onCancel = (form) => {
      dispatch(ACTIONS.cancelChanges(form));
   };

   const onSaveCache = (form) => {
      dispatch(ACTIONS.saveDataToCache(form));
      if (document.querySelector('.settings-save')) {
         document.querySelector('.settings-save').removeAttribute('disabled');
      }
   };

   const onSave = (form, inputs, save, getFinalInputs) => {
      const inputsDiff = diff(state[form].cachedData, inputs);
      let finalInputs = {};
      if (typeof getFinalInputs === 'function') {
         finalInputs = getFinalInputs(inputsDiff);
      } else {
         finalInputs = inputsDiff;
      }
      if (Object.keys(finalInputs).length > 0) {
         // document.querySelector('.settings-save').setAttribute('disabled', 'disabled');
         save(finalInputs, () => onSaveCache(form));
      }
   };

   return {
      state,
      activeForm,
      setActiveForm,
      onChange,
      onCancel,
      dispatch,
      onSaveCache,
      onSave,
   };
};

export const FormsWrapper = ({ children, stateReady }) => {
   if (!stateReady) {
      return null;
   }
   return (
      <>
         {children}
      </>
   );
};

FormsWrapper.propTypes = {
   children: PropTypes.node,
   stateReady: PropTypes.bool,
};

export default useForms;
