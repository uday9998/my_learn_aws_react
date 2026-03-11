import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Select from 'components/elements/SelectNew';
import BuyButtonEditable from '../../../BuyProductEditable';


const ButtonEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, disabled, color, text,
      index, bgColor, href, blanked, fontSize,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft,
      paddingBottom, size, subIndex, isOfferButton, offers, publishedLandings, offersLandingList, setOffersLandingList,
   } = props;
   const [charectersLimit, setCharectersLimit] = useState(text && text.length);
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   const buttonBorder = [
      { label: 'Normal', value: 'none' },
      { label: 'Bordered', value: 'solid' },
      { label: 'Dotted', value: 'dotted' },
   ];

   const buttonSize = [
      { label: 'Extra Small', value: 'extsmall' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Medium-Large', value: 'medium-large' },
      { label: 'Large', value: 'large' },
   ];

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);
   if (isOfferButton) {
      return (
         <div className='buttonEditable' data-slug={ slug }>
            {text === 'Buy Product' && (
               <BuyButtonEditable
                  landings={ publishedLandings }
                  list={ offersLandingList }
                  setList={ setOffersLandingList }
                  offers={ offers }
               />
            )}
            {text !== 'Buy Product'
             && (
                <>
                   <div>
                      <ColorInput
                         label='Text Color'
                         name='color'
                         value={ color }
                         onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
                         isPageBuilder={ true }
                      />
                   </div>
                   <div className='m-t-m' />
                   <div>
                      <ColorInput
                         label='Background Color'
                         name='bgColor'
                         value={ bgColor }
                         onChange={ (key, value) => changeProp(value, 'bgColor', 'subcomponent', index, subIndex) }
                         isPageBuilder={ true }
                      />
                   </div>
                </>
             ) }
            {/* <div>
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
            </div> */}
         </div>
      );
   }
   return (
      <div className='buttonEditable' data-slug={ slug }>
         {/* <div>
            <Switch
               label='Show Button'
               checked={ visibility === true }
               name='visibility'
               onChange={ (name, value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div> */}
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
         <div>
            <Input
               label='Text'
               placeholder=''
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); setCharectersLimit(value.length); } }
               disabled={ disabled }
               maxlength='30'
            />
         </div>
         <div className='m-t-m' />
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
               isPageBuilder={ true }
            />
         </div>
         <div className='m-t-m' />
         <div>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'subcomponent', index, subIndex) }
               isPageBuilder={ true }
            />
         </div>
         <div className='m-t-m'>
            <Select
               label='Button Size'
               className=''
               type='select-medium'
               heading=''
               placeholder='Button Size'
               value={ size }
               onChange={ (name, value) => changeProp(value, 'size', 'subcomponent', index, subIndex) }
               options={ buttonSize }
            />
         </div>
         <div className='m-t-m'>
            <Select
               label='Button Border'
               className=''
               heading=''
               type='select-medium'
               placeholder='Button Border'
               value={ border }
               onChange={ (name, value) => changeProp(value, 'border', 'subcomponent', index, subIndex) }
               options={ buttonBorder }
            />
         </div>
         <div>
            <TextInputRange
               label='Border Radius (px)'
               type='range'
               leftText={ borderRadius }
               id={ `borderRadius-${ slug }` }
               min={ 0 }
               max={ 50 }
               name='borderRadius'
               value={ borderRadius }
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
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
         <div>
            <TextInputRange
               label='Width (px)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 80 }
               max={ 600 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         <div>
            <Select
               label='Align Button'
               className=''
               heading=''
               type='select-medium'
               placeholder='Align Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'subcomponent', index, subIndex) }
               options={ textAlignFlexOptions }
            />
         </div>
         <div className='m-t-m'>
            <Spacing
               top={ paddingTop }
               bottom={ paddingBottom }
               left={ paddingLeft }
               right={ paddingRight }
               changeProp={ changeProp }
               index={ index }
               subIndex={ subIndex }
               slug={ slug }
               componentType='subcomponent'
            />
         </div>
      </div>
   );
};

ButtonEditable.defaultProps = {
   // visibility: true,
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
};

ButtonEditable.propTypes = {
   disabled: PropTypes.bool,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   bgColor: PropTypes.string,
   blanked: PropTypes.bool,
   href: PropTypes.string,
   border: PropTypes.string,
   borderRadius: PropTypes.string,
   width: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   // visibility: PropTypes.bool,
   size: PropTypes.string,
   fontSize: PropTypes.string,
   subIndex: PropTypes.number,
   isOfferButton: PropTypes.bool,
   offers: PropTypes.array,
   publishedLandings: PropTypes.array,
   offersLandingList: PropTypes.object,
   setOffersLandingList: PropTypes.func,

};

export default ButtonEditable;
