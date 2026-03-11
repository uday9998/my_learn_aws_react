/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCodeModal from './CustomCodeModal';

const CustomCodeTextEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, text, index
   } = props;

   const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);

   const closeCodeModal = () => setIsCodeModalOpen(false);

   return (
      <>
         <div className='customCode__editable' data-slug={ slug }>
            <input
               onClick={() => setIsCodeModalOpen(true)}
               className='customCode_input'
               placeholder='Custom Code'
               value={ text }
               readOnly
            />
         </div>
         {
            isCodeModalOpen && <CustomCodeModal slug={slug} changeProp={changeProp} oldCode={text} index={index} closeModal={closeCodeModal} />
         }
      </>
   );
};

CustomCodeTextEditable.defaultProps = {

};

CustomCodeTextEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
};

export default CustomCodeTextEditable;
