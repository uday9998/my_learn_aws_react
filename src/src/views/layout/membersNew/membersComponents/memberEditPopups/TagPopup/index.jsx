import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import TagSelect from 'components/elements/TagMultiSelect';
import './index.scss';

const MemberEditTagPopup = ({
   tagsValues, tags, onAdd, onRemove, onAttachTag,
}) => {
   return (
      <div className='member__more__tag'>
         <Text
            inner='Add Tag'
            type={ txtTypes.medium }
            size={ txtSizes.xxlarge }
         />
         <div className='member__more__tag__select'>
            <Text
               inner='Tag'
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
            />
            <TagSelect
               isHaveDetach={ true }
               onDetach={ (id) => onRemove(id) }
               atachTag={ (id, tag) => onAdd(tag) }
               onAttachTag={ (inputs) => onAttachTag({ label: inputs.name }) }
               values={ tagsValues }
               options={ tags }
               placeholder='Select a Tag'
            />
         </div>
      </div>
   );
};

MemberEditTagPopup.propTypes = {
   tags: PropTypes.array,
   onRemove: PropTypes.func,
   tagsValues: PropTypes.array,
   onAdd: PropTypes.func,
   onAttachTag: PropTypes.func,
};

export default MemberEditTagPopup;
