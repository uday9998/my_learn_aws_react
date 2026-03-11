import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const NewSection = ({
   sectionAdded, title, createSection, editSection, deleteSection, onChildClick,
}) => {
   const [sectionTitle, setSectionTitle] = useState(title);

   useEffect(() => {
      setSectionTitle(title);
   }, [title]);
   function handleChange(value, newSectionTitle) {
      setSectionTitle(value);
      onChildClick(value);
   }

   return (
      <ItemWrapper>
         {/* {handleClick(sectionTitle)} */}
         <div className='newSection'>
            <div className='newSection__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ (sectionTitle !== '' && sectionTitle) || 'New Section' }
                  style={ { 'marginBottom': '36px' } }

               />
               <TextInput
                  placeholder='e.g. My Section'
                  label='Section Title'
                  id='sectionInput'
                  name='sectionTitle'
                  value={ sectionTitle }
                  onChange={ (name, value) => handleChange(value, sectionTitle) }
               />
            </div>
            <div className='newSection__buttons'>
               {sectionAdded ? (
                  <BaseButton
                     theme={ buttonTheme.grey }
                     size={ buttonSizes.large }
                     text='Delete'
                     style={ { marginRight: 'auto' } }
                     onClick={ () => deleteSection() }
                  />
               ) : null}

               { sectionTitle === title ? null : (
                  <BaseButton
                     theme={ buttonTheme.grey }
                     size={ buttonSizes.large }
                     margin={ true }
                     text='Cancel'
                     onClick={ () => setSectionTitle(title) }
                  />
               )}


               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Save'
                  onClick={ () => {
                     if (sectionTitle) {
                        if (sectionAdded) {
                           editSection({
                              name: sectionTitle,
                           });
                        } else {
                           createSection(sectionTitle);
                        }
                     } else if (isPrint('Please add a section name')) {
                        toast.error('Please add a section name');
                     }
                  } }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

export default NewSection;


NewSection.propTypes = {
   sectionAdded: PropTypes.bool,
   title: PropTypes.string,
   createSection: PropTypes.func,
   editSection: PropTypes.func,
   deleteSection: PropTypes.func,
   onChildClick: PropTypes.func,
};

NewSection.defaultProps = {
   sectionAdded: false,
   title: '',
};
