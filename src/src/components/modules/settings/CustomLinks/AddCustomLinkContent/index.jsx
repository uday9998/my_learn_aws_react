import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
// import SortButton from 'components/elements/buttons/SortButton';
import TextInput from 'components/elements/inputNew';
import ColorInput from 'components/elements/form/ColorInput';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import { isLocalhost } from 'utils/Helpers';
import './index.scss';

const AddCustomLinkContent = ({
   customItem, setAddItem,
   handleCreateCustomLink, updateCustomLink, setUpdateItem,
   resetCustomLink, getHrefName, loading, header,
}) => {
   const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');

   const apiUrl = (isLocalhost()) ? process.env.REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);


   let links = [
      {
         label: 'Custom Link', value: 'custom',
      },
      {
         label: 'Offer Page', value: `${ apiUrl }/offers`,
      },
      {
         label: 'Portal', value: `${ apiUrl }/my-account`,
      },
      // {
      //    label: 'My Saved Courses', value: `${ apiUrl }/my-account#saved`,
      // },
      {
         label: 'Terms of Use', value: `${ apiUrl }/terms`,
      },
      {
         label: 'Privacy Policy', value: `${ apiUrl }/privacy`,
      },

   ];
   if (header) {
      links = [
         {
            label: 'Custom Link', value: 'custom',
         },
         {
            label: 'Offer Page', value: `${ apiUrl }/offers`,
         },
         {
            label: 'Portal', value: `${ apiUrl }/my-account`,
         },
         // {
         //    label: 'My Saved Courses', value: `${ apiUrl }/my-account#saved`,
         // },
      ];
   }

   const [item, setItem] = useState(customItem);
   const [isCustomLink, setIsCustomLink] = useState(false);

   useEffect(() => {
      if (!!getHrefName
          && !(getHrefName(customItem.href) === 'Offer Page'
          || getHrefName(customItem.href) === 'Portal'
          || getHrefName(customItem.href) === 'My Saved Courses'
          || getHrefName(customItem.href) === 'Terms of Use'
          || getHrefName(customItem.href) === 'Privacy Policy')) {
         setIsCustomLink(true);
      }
   }, []);

   const onInternalChange = (name, value) => {
      if (name === 'href' && value === 'custom') {
         setIsCustomLink(true);
         setItem({
            ...item,
            href: '',
         });
         return;
      }

      setItem({
         ...item,
         [name]: value,
      });
   };

   const saveCustomLink = (item) => {
      if (updateCustomLink) {
         updateCustomLink(item, () => {
            setUpdateItem(false);
         });
      } else {
         handleCreateCustomLink(item, () => {
            setAddItem(false);
         });
      }
   };

   const closeCustomLink = () => {
      setIsCustomLink(false);
      setItem({
         ...item,
         href: '',
      });
   };

   return (
      <div
         className='customLink'
      >
         <div
            className='customLink__title_content'
         >
            <div className='customLinks__createModal'>
               <div className='createModal__content'>
                  <div>
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
                           {isCustomLink && (
                              <div className='customLinks__createModal__link'>
                                 <TextInput
                                    placeholder=''
                                    label='URL Link'
                                    type='text'
                                    name='href'
                                    value={ item.href }
                                    onChange={ (name, value) => onInternalChange(name, value) }
                                 />
                                 <IconButton
                                    onClick={ () => closeCustomLink() }
                                    name='CloseLinkM'
                                    wBorder={ true }
                                    theme={ iconThemes.inherit }
                                    title=''
                                    className='customLinks__createModal__close'
                                 />
                              </div>
                           ) }
                           {!isCustomLink && (
                              <div>
                                 <Select
                                    label='URL Link'
                                    placeholder='Select option'
                                    iconColor='#3f4f65'
                                    name='href'
                                    value={ item.href }
                                    options={ links }
                                    onChange={ onInternalChange }
                                 />
                              </div>
                           )}
                        </div>
                        <div className='createModal__select__btns'>
                           <BaseButton
                              theme={ btnTheme.secondary }
                              size={ btnSize.large }
                              text='Save Changes'
                              disabled={ !(item.href && item.text.trim()) || loading === true }
                              iconName=''
                              onClick={ () => saveCustomLink(item) }
                           />
                           <IconButton
                              onClick={ () => resetCustomLink() }
                              name='CloseLinkM'
                              wBorder={ true }
                              theme={ iconThemes.inherit }
                              title=''
                           />
                        </div>
                        {/* <div
                           className='customLinks__createModal__close'
                           role='presentation'
                           onClick={ () => resetCustomLink() }>
                           <IconNew name='CloseLinkM' />
                        </div> */}
                     </div>

                     <div className='m-t-m createModal__select'>
                        <div>
                           <ColorInput
                              label='Text Color'
                              name='color'
                              value={ item.color || null }
                              onChange={ onInternalChange }
                              withIcon
                              left={ true }
                              isPageBuilder={ true }
                              isSettings={ true }
                           />

                        </div>
                        <div style={ { position: 'relative', top: '-14px' } }>
                           {/* <Text
                              inner='Additional Link Settings'
                              type={ types.regularDefault }
                              size={ sizes.small14 }
                           /> */}
                           <Switch
                              label='Open in a new tab'
                              positionText='left'
                              checked={ item.target === '_blank' ? 1 : 0 }
                              value={ item.target === '_blank' ? 1 : 0 }
                              name='target'
                              size='medium'
                              onChange={ (value) => onInternalChange('target', value ? '_blank' : '_self') }
                              isCommentPage={ true }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

AddCustomLinkContent.defaultProps = {
   getHrefName: () => {},
};

AddCustomLinkContent.propTypes = {
   customItem: PropTypes.object,
   setAddItem: PropTypes.func,
   handleCreateCustomLink: PropTypes.func,
   updateCustomLink: PropTypes.func,
   setUpdateItem: PropTypes.func,
   resetCustomLink: PropTypes.func,
   getHrefName: PropTypes.func,
   loading: PropTypes.bool,
   header: PropTypes.bool,
};

AddCustomLinkContent.defaultProps = {

};

export default AddCustomLinkContent;
