/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import './index.scss';
import Input from 'components/elements/inputNew';
import InlineEditor from 'components/modules/InlineEditor';
import Button, { THEMES as themes, SIZES as sizes } from 'components/elements/buttons/BaseButtonNew';


const BulletEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, text,
      index, deleteBullet, font_size, subIndex,
   } = props;

   const [charectersLimitBullet, setCharectersLimitBullet] = useState(text && text.length);

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);


   return (
      <div className='bulletEditable' data-slug={ slug }>
         <div>
            <Input
               label='Text'
               placeholder=''
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); setCharectersLimitBullet(value.length); } }
               disabled={ true }
               maxlength='unset'
               isDiv={ true }
               // isDisabledHtmlText={ true }
               inputTextColor='#131F1E'
               newBorderColor='#e7e9e9'
            />
         </div>
         <div className='m-t-m'>
            <div>
               <ColorInput
                  label='Bullet Color'
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
                  leftText={ font_size }
                  id={ `font-${ slug }` }
                  min={ 5 }
                  max={ 60 }
                  name='font_size'
                  value={ font_size }
                  onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
               />
            </div>
         </div>
         <div className='m-t-exl flex justify-center'>
            <Button
               theme={ themes.red }
               size={ sizes.medium }
               text='Delete'
               onClick={ () => deleteBullet(index, subIndex) }
            />
         </div>
      </div>
   );
};

BulletEditable.defaultProps = {

};

BulletEditable.propTypes = {
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   deleteBullet: PropTypes.func,
   font_size: PropTypes.any,
   subIndex: PropTypes.number,
};

export default BulletEditable;
