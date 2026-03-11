import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import {
   sortableHandle,
} from 'react-sortable-hoc';
import Select from 'components/elements/SelectNew';
import TextInput from 'components/elements/inputNew';
import ColorInput from 'components/elements/form/ColorInput';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { checkLink } from 'utils/checkLink.js';
import './index.scss';
import TextInputRange from 'components/elements/form/TextInputRange';

const DragHandle = sortableHandle(() => (
   <IconNew name='dragS' />
));

const CustomLinkContent = ({
   customItem, deleteCustomLink, customLinks, setCustomLinks,
}) => {
   const target = [
      {
         label: 'Open in a new window/tab', value: '_blank',
      },
      {
         label: 'Open in same window/tab', value: '_self',
      },

   ];

   const [item, setItem] = useState(customItem);


   const onInternalChange = (name, value) => {
      setItem({
         ...customItem,
         [name]: value,
      });
      let changableLink;
      if (item.id) {
         changableLink = customLinks.custom_links.items.filter(link => link.id === item.id);
      }
      changableLink = customLinks.custom_links.items.filter(link => link.slug === item.slug);
      if (changableLink && changableLink[0]) {
         changableLink[0][name] = value;
      }
      setCustomLinks(customLinks);
   };


   return (
      <div
         className='customLink'
      >
         <div
            className='customLink__title_content'
         >
            <div>
               <DragHandle />
            </div>
            <div className='customLinks__createModal'>
               <div className='createModal__content'>
                  <div className='m-t-m createModal__select'>
                     <div className='m-t-m'>
                        <TextInput
                           placeholder=''
                           label='Title'
                           type='text'
                           name='text'
                           rightLabel={ `${ item.text ? item.text.length : 0 }/16` }
                           value={ item.text }
                           onChange={ (name, value) => {
                              if (value.length <= 16) {
                                 onInternalChange(name, value);
                              } else if (isPrint('You are reached the character limit')) {
                                 toast.error('You are reached the character limit');
                              }
                           } }
                        />
                     </div>
                     <div className='m-t-m'>
                        <TextInput
                           placeholder=''
                           label='URL Link'
                           type='text'
                           name='href'
                           value={ item.href }
                           onChange={ (name, value) => onInternalChange(name, value) }
                        />
                     </div>
                  </div>

                  <div className='m-t-m createModal__select'>
                     <div>
                        <Select
                           label='Target'
                           placeholder='Open in a new window/tab'
                           iconColor='#3f4f65'
                           name='target'
                           value={ item.target }
                           options={ target }
                           onChange={ onInternalChange }
                        />
                     </div>
                     <div className='m-l-m'>
                        <ColorInput
                           label='Text Color'
                           name='color'
                           value={ item.color || '#34495e' }
                           onChange={ onInternalChange }
                           withIcon
                           left={ true }
                           isPageBuilder={ true }
                           isSettings={ true }
                        />

                     </div>
                  </div>
                  <div className='m-t-m createModal__select'>
                     <div />
                     <div className='m-l-m'>
                        <TextInputRange
                           label='Font Size (px)'
                           type='range'
                           leftText={ item.fontSize || 14 }
                           min={ 5 }
                           max={ 25 }
                           name='fontSize'
                           value={ item.fontSize || 14 }
                           onChange={ (val, name) => onInternalChange(name, val) }
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='customLink__actions'>
            <div
               className='customLink__edit'
               role='presentation'
               onClick={ () => {
                  window.open(checkLink(item.href), '_blank');
               } }
            >
               <IconNew name='ExternalLinkM' />
            </div>
            <div
               className='customLink__delete'
               role='presentation'
               onClick={ () => deleteCustomLink(item.id, item.slug) }
            >
               <IconNew name='TrashSettingsM' />
            </div>
         </div>
      </div>
   );
};

CustomLinkContent.propTypes = {
   deleteCustomLink: PropTypes.func,
   items: PropTypes.array,
   customItem: PropTypes.object,
   customLinks: PropTypes.object,
   setCustomLinks: PropTypes.func,
};

CustomLinkContent.defaultProps = {

};

export default CustomLinkContent;
