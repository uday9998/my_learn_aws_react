import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Line from 'components/elements/Line';
import TagSelect from 'components/elements/TagMultiSelect';
import Switch from 'components/elements/switchNew';
import Select from 'components/elements/SelectNew';
import IconButton from 'components/elements/buttons/IconButton';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const AdvancedSettingsTop = ({
   tagOptions, selectedTags, terms, goToIntegrations, onChange, handleAddTag, integrations, selectedIntegration,
   authoresponderOptions, selectedAuthoresponderList, authoresponderListOptionsInProgress,
}) => {
   const onSelectTag = (id) => {
      const selectedTag = tagOptions.filter((e) => e.id === id)[0];
      onChange('tags', [
         ...selectedTags,
         selectedTag,
      ]);
   };
   const onDetachTag = (id) => {
      onChange('tags', selectedTags.filter((e) => e.id !== id));
   };
   const getActiveIntegrations = () => {
      if (!integrations.autoresponders) return [];
      return Object.keys(integrations.autoresponders).reduce((arr, key) => {
         arr.push({ label: integrations.autoresponders[key], value: integrations.autoresponders[key] });
         return arr;
      }, []);
   };

   function getAutoresponderListOptions(label, value) {
      if (!authoresponderOptions) return [];
      return authoresponderOptions.map(list => {
         return { label: list[label], value: `${ list[value] }_${ list[label] }` };
      });
   }

   const openPreview = () => {
      const win = window.open('/admin/settings#globalbranding', '_blank');
      win.legalPages = true;
      return win;
   };


   const showIntegrationList = () => {
      if (selectedIntegration === 'ConvertKit' || selectedIntegration === 'MailChimp'
          || selectedIntegration === 'ActiveCampaign' || selectedIntegration === 'AWeber') {
         return true;
      }
      return false;
   };

   return (
      <div className='plan__advanced__top'>
         {/* <div className='plan__advanced__top__title'>
            <Text
               inner='Payment Methods'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Set up and collect payment on this Plan with an of your connected providers'
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div> */}
         <div className='plan__advanced__top__bottom'>
            <div className='plan__advanced__top__bottom__block'>
               <div className='top'>
                  <Text
                     inner='Autoresponder'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Connect Miestro with your autoresponder to automatically add new customers to your lists.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               {getActiveIntegrations().length > 0 && (
                  <Select
                     options={ getActiveIntegrations() }
                     value={ selectedIntegration }
                     name='autoresponder'
                     type='select-medium'
                     label='Autoresponder Integrated'
                     placeholder='Choose option'
                     onChange={ onChange }
                     removeValue={ true }
                  />
               )}
               { !authoresponderListOptionsInProgress && showIntegrationList() && (
                  <Select
                     options={ getAutoresponderListOptions('name', 'id') }
                     value={ selectedAuthoresponderList }
                     name='list'
                     label='Choose From List'
                     type='select-medium'
                     placeholder='Choose option'
                     onChange={ onChange }
                  />
               )}
               {authoresponderListOptionsInProgress && (
                  <LoaderSpinner width={ 150 } heigth={ 150 } />
               )}
               <div>
                  <Button
                     text='Connect Integrations'
                     onClick={ () => goToIntegrations() }
                     theme={ themes.secondary }
                  />
               </div>
            </div>
            <Line />
            <div className='plan__advanced__top__bottom__block'>
               <div className='top'>
                  <Text
                     inner='Tags'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Create tags that will automatically added to new member accounts.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <TagSelect
                  options={ tagOptions }
                  values={ selectedTags || [] }
                  onAttachTag={ handleAddTag }
                  placeholder='Select tags'
                  isHaveDetach={ true }
                  onDetach={ onDetachTag }
                  atachTag={ onSelectTag }
               />
            </div>
            <Line />
            <div className='plan__advanced__top__bottom__terms'>
               <div className='plan__advanced__top__bottom__terms__top'>
                  <Text
                     inner='Terms & Conditions'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Switch
                     value={ terms }
                     size='medium'
                     onChange={ (value) => onChange('terms', value ? 1 : 0) }
                  />
                  {!!terms && (
                     <IconButton
                        name='eyeM'
                        title='preview'
                        onClick={ () => { openPreview(); } }
                     />
                  )}
               </div>
               <Text
                  inner='Require users to accept the Terms & Conditions to gain access to their account and personal information.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
         </div>
      </div>
   );
};

AdvancedSettingsTop.propTypes = {
   goToIntegrations: PropTypes.func,
   handleAddTag: PropTypes.func,
   tagOptions: PropTypes.array,
   integrations: PropTypes.func,
   selectedTags: PropTypes.array,
   onChange: PropTypes.func,
   terms: PropTypes.any,
   authoresponderOptions: PropTypes.array,
   selectedAuthoresponderList: PropTypes.any,
   selectedIntegration: PropTypes.any,
   authoresponderListOptionsInProgress: PropTypes.bool,
};

export default AdvancedSettingsTop;
