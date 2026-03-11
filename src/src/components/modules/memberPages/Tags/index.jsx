import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TagsEdit from './TagsComponents/TagsEdit';
import TagView from './TagsComponents/TagView';

const MemberTagPage = ({
   currentMember, addTag, atachTag, detachTag,
}) => {
   return (
      <div className='member__tags'>
         <TagsEdit
            onAdd={ (inputs, isNew) => addTag(currentMember.id, inputs, isNew) }
            isFirstTag={ currentMember.tags && currentMember.tags.length }
            tags={ currentMember.tags }
            options={ currentMember.allTags }
            atachTag={ (id) => atachTag(currentMember.id, id) }
         />
         <TagView tags={ currentMember.tags } onDelete={ (id) => detachTag(currentMember.id, id) } />
      </div>
   );
};

MemberTagPage.propTypes = {
   addTag: PropTypes.func,
   currentMember: PropTypes.object,
   atachTag: PropTypes.func,
   detachTag: PropTypes.func,
};

export default MemberTagPage;
