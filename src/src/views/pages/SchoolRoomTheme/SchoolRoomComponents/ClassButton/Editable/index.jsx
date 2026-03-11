import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import { schoolDefaultColor } from 'utils/pageBuilder/schoolRoomColor';
import './index.scss';


const ClassButtonEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, fontSize, bgColor,
      index, subIndex, subofSubIndex, landing,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true, true);
      }
   }, [scroll]);


   const classButtonBgColor = bgColor || ((landing && landing.school_color)
   || schoolDefaultColor(landing.school_room_theme_name));

   return (
      <div className='textEditable' data-slug={ slug }>
         <div className='m-b-m'>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex) }
               isPageBuilder={ true }
            />
         </div>
         <div className='m-b-m'>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ classButtonBgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex) }
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
               max={ 30 }
               name='fontSize'
               value={ fontSize }
               onChange={ (value, name) => { changeProp(value, name, 'subOfSubComponent', index, subIndex, false, [], subofSubIndex); } }
            />
         </div>
      </div>
   );
};

ClassButtonEditable.defaultProps = {
};

ClassButtonEditable.propTypes = {
   fontSize: PropTypes.string,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   bgColor: PropTypes.string,
   landing: PropTypes.object,
   subIndex: PropTypes.number,
   subofSubIndex: PropTypes.number,
};

export default ClassButtonEditable;
