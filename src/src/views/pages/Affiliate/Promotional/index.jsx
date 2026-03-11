import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Info from 'components/elements/messages/info';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import OfferUploadItem from '../OfferUploadItem';

const AffiliatePromotional = ({
   offers, handleAddLink, handleAddPromotion, onPrevPage, onNextPage, onDelete,
}) => {
   return (
      <div className='affiliate__promotional'>
         <div className='affiliate__promotional__top'>
            <Text
               inner='3. Promotional Materials'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='Equip your affiliates with materials to promote your products (Banners, Covers, Explainer videos, etc.)'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
         </div>
         <Info
            title='Promotional materials can be shared in various ways: zip files, image files, external links, or shared media library.'
            isHaveCancel={ false }
         />
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
                  handleAddPromotion={ handleAddPromotion }
                  key={ id }
                  offer={ offer }
                  onDelete={ onDelete }
                  imageUrl={imageUrl}
               />
            );
         })}
         <div />
         <div className='affiliate__promotional__buttons'>
            <Button
               text='Previous'
               theme={ themes.secondary }
               onClick={ () => onPrevPage() }
            />
            <Button
               text='Next Step'
               onClick={ () => onNextPage() }
            />
         </div>
      </div>
   );
};

AffiliatePromotional.propTypes = {
   onNextPage: PropTypes.func,
   offers: PropTypes.array,
   onPrevPage: PropTypes.func,
   handleAddLink: PropTypes.func,
   handleAddPromotion: PropTypes.func,
   onDelete: PropTypes.func,
};

export default AffiliatePromotional;
