/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import Select from 'components/elements/SelectNew';
import { getThemeFonts } from 'utils/StaticData';
import './index.scss';


const LogoEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, fontSize,
      index, paddingTop, paddingBottom, paddingLeft, paddingRight, fontFamily, lineHeight,
      justifyContent, siteInfo,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   return (
      <div className='logoEditable' data-slug={ slug }>
         {!siteInfo.active_school_room.school_logo
         && (
            <>
               <div>
                  <ColorInput
                     label='Text Color'
                     name='color'
                     value={ color }
                     onChange={ (key, value) => changeProp(value, 'color', 'component', index) }
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
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
               <div>
                  <Select
                     label='Font Family'
                     className=''
                     heading=''
                     type='select-medium'
                     placeholder='Font Family'
                     value={ fontFamily }
                     onChange={ (name, value) => changeProp(value, 'fontFamily', 'component', index) }
                     options={ getThemeFonts() }
                     fontStyles={ true }
                  />
               </div>
               <div>
                  <TextInputRange
                     label='Line Height'
                     type='range'
                     leftText={ lineHeight }
                     id={ `line-${ slug }` }
                     min={ 1 }
                     max={ 6 }
                     step='0.1'
                     name='lineHeight'
                     value={ lineHeight }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
            </>
         )}
         <div>
            <Select
               label='Align Content'
               className=''
               heading=''
               type='select-medium'
               placeholder='Align Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
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
               slug={ slug }
            />
         </div>
      </div>
   );
};

LogoEditable.defaultProps = {
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   fontFamily: 'Avenir Next',
   lineHeight: '1',
   justifyContent: 'center',
};

LogoEditable.propTypes = {
   fontSize: PropTypes.string,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   fontFamily: PropTypes.string,
   lineHeight: PropTypes.string,
   justifyContent: PropTypes.string,
   siteInfo: PropTypes.object,
};

export default LogoEditable;
