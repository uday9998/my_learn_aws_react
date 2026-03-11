/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';


const ImportMembersModalContent = ({ setImportMembersModalOpen, handleUploadCSVClick }) => {
   const downloadSampleClick = () => {
      const csv = 'Name,E-Mail,Role,Class name1,Class name2,Class name3,Class name4,Class name5\n';
      const hiddenElement = document.createElement('a');
      hiddenElement.href = `data:text/csv;charset=utf-8,${ encodeURI(csv) }`;
      hiddenElement.target = '_blank';
      hiddenElement.download = 'sample.csv';
      hiddenElement.click();
      setImportMembersModalOpen(false);
   };
   const handleUploadCSVClickAndCloseModal = (event) => {
      event.stopPropagation();
      event.preventDefault();
      handleUploadCSVClick(event);
      setImportMembersModalOpen(false);
   };
   return (
      <div className='ImportMemberModal createDomain'>
         <div
            className='createDomain__close'
            role='presentation'
            onClick={ () => setImportMembersModalOpen(false) }
         >
            <Icon name='CloseXNew' />
         </div>
         <div className='createDomain__body'>
            <div className='createDomain__header'>
               <Text
                  type={ TextType.large }
                  size={ TextSize.large }
                  inner='Bulk Import'
               />
            </div>
            <div>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small }
                  inner=' Download csv sample, fill and upload'
               />

            </div>
            <div className='updatecard__btns'>
               <div>
                  <BaseButton
                     size={ btnSize.large }
                     text='Download Sample'
                     onClick={ () => downloadSampleClick() }
                  />
               </div>
               <div className='uploadCSV_btn'>
                  { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                  <label htmlFor='fileupload' className='customFileUpload'>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.normal }
                        inner='Upload CSV'
                        color='#fff'
                     />
                     <input id='fileupload' type='file' name='file' onChange={ (event) => handleUploadCSVClickAndCloseModal(event) } />
                  </label>

                  {/* <BaseButton
                     size={ btnSize.large }
                     text='Upload CSV'
                  /> */}

               </div>
            </div>
         </div>
      </div>
   );
};

ImportMembersModalContent.propTypes = {
   setImportMembersModalOpen: PropTypes.func,
   handleUploadCSVClick: PropTypes.func,

};


export default ImportMembersModalContent;
