import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
// import TagSelect from 'components/elements/TagMultiSelect';
import './index.scss';

const CreatePopupContent = ({
   inputs, onChange, errorMessages
   // tags, onCreateTag, labels, onCreateLabel,
}) => {
   const { titleFolder } = inputs;
   return (
      <div className='create__popup__content'>
         <div className='top'>
            <Text
               inner='Add Folder'
               type={ txtTypes.medium }
               size={ txtSizes.xxlarge }
            />
            <Text
               inner='We recommend creating folders to better manage your media files'
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
               style={ { color: '#727978', display: 'block', marginTop: '4px' } }
            />
         </div>
         <Input
            errorMessages={ errorMessages.name }
            value={ titleFolder }
            name='titleFolder'
            label='Folder Name'
            onChange={ onChange }
            placeholder='Name your folder for easy identification'
         />
         {/*  <Input
            label='Tag'
            helpText='optional'
            type='custom'
         >
            <TagSelect
               isHaveDetach={ true }
               onDetach={ (id) => onChange('tag', id, 'detach') }
               atachTag={ (id, tag) => onChange('tag', tag, 'attach') }
               onAttachTag={ (item) => onCreateTag(item.name) }
               values={ selectedTags }
               label='Tags'
               options={ tags }
               placeholder='Add your own tag or choose of the list'
            />
         </Input>
         <Input
            label='Label'
            helpText='optional'
            type='custom'
         >
            <TagSelect
               isHaveDetach={ true }
               onDetach={ (id) => onChange('label', id, 'detach') }
               atachTag={ (id, label) => onChange('label', label, 'attach') }
               onAttachTag={ (item) => onCreateLabel(item.name) }
               values={ selectedLabels }
               label='Labels'
               options={ labels }
               isNotTag={ true }
               placeholder='Add your own label or choose of the list'
            />
         </Input> */}
      </div>
   );
};

CreatePopupContent.propTypes = {
   // tags: PropTypes.array,
   inputs: PropTypes.object,
   // onCreateLabel: PropTypes.func,
   // labels: PropTypes.array,
   onChange: PropTypes.func,
   errorMessages: PropTypes.object,
   // onCreateTag: PropTypes.func,
};

export default CreatePopupContent;
