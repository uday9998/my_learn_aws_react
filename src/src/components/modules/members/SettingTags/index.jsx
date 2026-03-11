import React from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import TagsEngine from 'components/modules/categoryTagEngine/TagsEngineContainer';
import { updateCurrentMemberTags } from 'state/modules/members/actions';

import PropTypes from 'prop-types';
import { attachTagToMember } from 'api';

const SettingTags = ({
   currentMember, atachTag, detachTag,
}) => {
   return (
      <DynamicWrapper
         isOpen={ false }
         hasTooltip={ true }
         title='Tags'
         borderColor='#cddaf1'
      >
         <div className='settingTags'>
            <TagsEngine
               attachedValues={ currentMember.tags }
               onAttach={ value => atachTag(currentMember.id, value) }
               onDetach={ (id) => detachTag(currentMember.id, id) }
               label='Tags'
               updateItem={ updateCurrentMemberTags }
               onCreateCompleted={ tag => {
                  atachTag(currentMember.id, tag.id);
               } }
               onRemoveCompleted={ id => {
                  detachTag(currentMember.id, id);
               } }
               isMemberTags
            />

         </div>
      </DynamicWrapper>
   );
};

SettingTags.propTypes = {
   currentMember: PropTypes.object,
   tags: PropTypes.array,
   atachTag: PropTypes.func,
   detachTag: PropTypes.func,
};

export default SettingTags;
