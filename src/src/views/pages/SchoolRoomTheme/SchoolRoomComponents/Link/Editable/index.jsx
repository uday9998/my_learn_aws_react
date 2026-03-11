/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import './index.scss';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';


const LinkEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, disabled, color, text,
      index, deleteLink, fontSize, subIndex, blanked, href, visibility,
   } = props;

   const [charectersLimitBullet, setCharectersLimitBullet] = useState(text && text.length);

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);
   return (
      <div className='LinkEditable' data-slug={ slug }>
         <div>
            <Switch
               label='Show Link'
               value={ visibility === true }
               positionText='left'
               size='medium'
               name='visibility'
               onChange={ (value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div>
         <div className='m-t-m'>
            <Input
               label='Text'
               placeholder=''
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); setCharectersLimitBullet(value.length); } }
               disabled={ disabled }
               maxlength='16'
               rightLabel={ `${ charectersLimitBullet }/16` }
            />
         </div>
         <div className='m-t-m'>
            <Input
               label='Custom URL'
               placeholder='https://miestro.com'
               id={ `custom-${ slug }` }
               name='text'
               value={ href }
               onChange={ (key, value) => { changeProp(value, 'href', 'subcomponent', index, subIndex); } }
               maxLength='50'
            />
         </div>
         <div className='buttonEditable-blanked'>
            <CheckBox
               label='Open in new window'
               filled
               onChange={ (name, value) => changeProp(value, 'blanked', 'subcomponent', index, subIndex) }
               name='blanked'
               checked={ blanked }
            />
         </div>
         <div className='m-t-m' />
         <div className='m-t-m'>
            <div>
               <ColorInput
                  label='Color'
                  name='color'
                  value={ color }
                  onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
                  isPageBuilder={ true }
               />
            </div>
            <div>
               <TextInputRange
                  label='Font Size'
                  type='range'
                  leftText={ fontSize }
                  id={ `font-${ slug }` }
                  min={ 5 }
                  max={ 60 }
                  name='fontSize'
                  value={ fontSize }
                  onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
               />
            </div>
         </div>
         <div className='m-t-exl flex justify-center'>
            <Button
               theme={ themes.red }
               text='Delete'
               onClick={ () => deleteLink(index, subIndex) }
            />
         </div>
      </div>
   );
};

LinkEditable.defaultProps = {

};

LinkEditable.propTypes = {
   disabled: PropTypes.bool,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   deleteLink: PropTypes.func,
   fontSize: PropTypes.any,
   subIndex: PropTypes.number,
   blanked: PropTypes.bool,
   href: PropTypes.string,
   visibility: PropTypes.bool,
};

export default LinkEditable;
