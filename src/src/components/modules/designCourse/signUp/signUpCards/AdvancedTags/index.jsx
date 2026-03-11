/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import TagsEngine from 'components/modules/categoryTagEngine/TagsEngineContainer';
import './index.scss';

const AdvancedTags = (
   { signUp: { advanced: { selectedTags } = {} } = {}, detachTag, attachTag }
) => {
   return (
      <div className='advancedTags'>
         <div className='tags'>
            <TagsEngine
               attachedValues={ selectedTags }
               onAttach={ value => attachTag(value) }
               onDetach={ (id) => detachTag(id) }
               label='Product Tags'
               onCreateCompleted={ tag => {
                  attachTag(tag.id);
               } }
               onRemoveCompleted={ id => {
                  detachTag(id);
               } }
            />
         </div>
      </div>
   );
};

AdvancedTags.propTypes = {
   signUp: PropTypes.object,
   detachTag: PropTypes.func,
   attachTag: PropTypes.func,
};

export default AdvancedTags;
