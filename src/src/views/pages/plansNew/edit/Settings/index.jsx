import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import AdvancedSettingsTop from './components/SettingsTop';
import AdvancedSeo from './components/Seo';
import AdvancedCustomFields from './components/CustomFields';

const PlanAdvancedSettings = ({
   plan, onChange, goToIntegrations, handleAddTag, addCustomField, deleteCustomField, authoresponderOptions, authoresponderListOptionsInProgress,
}) => {
   const handleInputChange = (name, value) => {
      const newInputs = {
         ...(plan.setting || {}),
         [name]: value,
      };
      onChange('setting', newInputs, name === 'autoresponder');
   };
   return (
      <div className='plan__advanced'>
         <AdvancedSettingsTop
            goToIntegrations={ goToIntegrations }
            tagOptions={ plan.tags }
            handleAddTag={ handleAddTag }
            authoresponderOptions={ authoresponderOptions }
            onChange={ handleInputChange }
            integrations={ plan.integrations }
            terms={ plan.setting.terms }
            selectedIntegration={ plan.setting.autoresponder }
            selectedAuthoresponderList={ plan.setting.list }
            selectedTags={ plan.setting.tags || [] }
            authoresponderListOptionsInProgress={ authoresponderListOptionsInProgress }
         />
         <AdvancedCustomFields
            items={ plan.fields }
            checkedIds={ plan.setting.custom_fields || [] }
            onChange={ handleInputChange }
            deleteCustomField={ deleteCustomField }
            addCustomField={ addCustomField }
         />
         <AdvancedSeo
            settings={ plan.setting }
            onChange={ handleInputChange }
         />
      </div>
   );
};

PlanAdvancedSettings.propTypes = {
   goToIntegrations: PropTypes.func,
   plan: PropTypes.object,
   addCustomField: PropTypes.func,
   handleAddTag: PropTypes.func,
   onChange: PropTypes.func,
   deleteCustomField: PropTypes.func,
   authoresponderOptions: PropTypes.object,
   authoresponderListOptionsInProgress: PropTypes.bool,
};

export default PlanAdvancedSettings;
