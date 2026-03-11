/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Switch from 'components/elements/switchNew';
// import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import InlineEditor from 'components/modules/InlineEditor';

const BannerTitleEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color,
      index, paddingTop, paddingBottom, paddingLeft, paddingRight, subIndex,
      justifyContent, alignItems, visibility, text, disabled,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);

   const AlignItemsFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   const JustifyContentFlexOptions = [
      { label: 'Up', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Down', value: 'flex-end' },
   ];

   return (
      <div className='textEditable' data-slug={ slug }>
         <div className='m-b-m'>
            <Switch
               label='Show Title'
               value={ visibility === true }
               name='visibility'
               size='medium'
               positionText='left'
               onChange={ (value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div>
         {!disabled && (
            <div className='m-b-m'>
               {/* <Input
                  label='Text'
                  placeholder=''
                  id={ `text-${ slug }` }
                  name='text'
                  value={ text }
                  onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); } }
                  disabled={ true }
                  isDiv={ true }
               /> */}
               <InlineEditor
                  text={ text }
                  slug={ slug }
                  changeProp={ changeProp }
                  index={ index }
                  subIndex={ subIndex }
                  // sectionIndex={ sectionIndex }
                  isSubcomponent={ true }
                  fromEditable={ true }
               />
            </div>
         )}
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
               isPageBuilder={ true }
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
               unit='vw'
               min={ 0 }
               max={ 40 }
            />
         </div>
         <div className='m-b-m'>
            <Select
               label='Align Items'
               className=''
               type='select-medium'
               heading=''
               placeholder='Align Items'
               value={ alignItems }
               onChange={ (name, value) => changeProp(value, 'alignItems', 'subcomponent', index, subIndex) }
               options={ AlignItemsFlexOptions }
            />
         </div>
         <div>
            <Select
               label='Justify Content'
               className=''
               heading=''
               type='select-medium'
               placeholder='Justify Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'subcomponent', index, subIndex) }
               options={ JustifyContentFlexOptions }
            />
         </div>
      </div>
   );
};

BannerTitleEditable.defaultProps = {
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   justifyContent: 'flex-start',
};

BannerTitleEditable.propTypes = {
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   subIndex: PropTypes.number,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   visibility: PropTypes.bool,
   text: PropTypes.string,
   disabled: PropTypes.bool,
};

export default BannerTitleEditable;
