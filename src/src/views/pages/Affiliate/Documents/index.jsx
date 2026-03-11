import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import OfferUploadItem from '../OfferUploadItem';

const AffiliateDocuments = ({
   offers, handleAddLink, onPrevPage, onDelete, onCreate, handleAddDocument, createLoading, isEdit,
}) => {
   return (
      <div className='affiliate__documents'>
         <div className='affiliate__documents__top'>
            <Text
               inner='4. Documents (Optional)'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='You also have the opportunity to share documents with partners, if necessary (Texts, Scripts)'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
         </div>
         {offers.map((offer) => {
            const {
               id, courses, file,
               is_course: isCourse, is_membership: isMembership,
            } = offer;

            const course = isCourse || isMembership ? courses[0] : null;
            const imageUrl = course
               ? course.communities?.file_id || course.thumbnail_image
               : file?.src || 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png';

            return (
               <OfferUploadItem
                  handleAddLink={ handleAddLink }
                  handleAddDocument={ handleAddDocument }
                  key={ id }
                  isDocument={ true }
                  offer={ offer }
                  onDelete={ onDelete }
                  imageUrl={ imageUrl }
               />
            );
         })}
         <div />
         <div className='affiliate__documents__buttons'>
            <Button
               text='Previous'
               theme={ themes.secondary }
               onClick={ () => onPrevPage() }
            />
            <Button
               text={ `${ isEdit ? 'Save' : 'Create' } Affiliate Program` }
               disabled={ createLoading }
               onClick={ () => onCreate() }
            />
         </div>
      </div>
   );
};

AffiliateDocuments.propTypes = {
   offers: PropTypes.array,
   onPrevPage: PropTypes.func,
   createLoading: PropTypes.bool,
   handleAddLink: PropTypes.func,
   onDelete: PropTypes.func,
   onCreate: PropTypes.func,
   handleAddDocument: PropTypes.func,
   isEdit: PropTypes.func,
};

export default AffiliateDocuments;
