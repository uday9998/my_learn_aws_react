import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import TextInputRange from 'components/elements/form/TextInputRange';
import ColorInput from 'components/elements/form/ColorInput';
import './index.scss';


const ClassDescriptionEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color,
      index, subIndex, subofSubIndex, fontSize,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true, true);
      }
   }, [scroll]);


   return (
      <div className='textEditable' data-slug={ slug }>
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex) }
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
               onChange={ (value, name) => { changeProp(value, name, 'subOfSubComponent', index, subIndex, false, [], subofSubIndex); } }
            />
         </div>
      </div>
   );
};

ClassDescriptionEditable.defaultProps = {
};

ClassDescriptionEditable.propTypes = {
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   subofSubIndex: PropTypes.number,
   fontSize: PropTypes.string,

};

export default ClassDescriptionEditable;
