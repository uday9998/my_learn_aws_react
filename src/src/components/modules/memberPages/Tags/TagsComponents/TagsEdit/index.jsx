import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import TagSelect from 'components/elements/TagMultiSelect';

const TagsEdit = ({
   onAdd, tags, options, atachTag, isHaveDetach, detachTag,
}) => {
   return (
      <div className='tag__inputs'>
         <div className='tag__add'>
            <div className='tag__add__top'>
               <Text
                  inner='Tag'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />
            </div>
            <div className='tag__add__form'>
               <TagSelect
                  isHaveDetach={ isHaveDetach }
                  onDetach={ detachTag }
                  onAttachTag={ (option, isTrue) => onAdd(option, isTrue) }
                  values={ tags }
                  atachTag={ (id) => atachTag(id) }
                  options={ options }
                  placeholder='Select a Section'
               />
            </div>
         </div>
      </div>
   );
};

TagsEdit.propTypes = {
   options: PropTypes.array,
   tags: PropTypes.array,
   onAdd: PropTypes.func,
   atachTag: PropTypes.func,
   isHaveDetach: PropTypes.bool,
   detachTag: PropTypes.func,
};

export default TagsEdit;
