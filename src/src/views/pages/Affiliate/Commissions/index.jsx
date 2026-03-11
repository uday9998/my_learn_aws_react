import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Commission from './Commission';

const AffiliateCommissions = ({
   onNextPage, onPrevPage, commissions, handleChangeCommission,
}) => {
   return (
      <div className='affiliate__commissions'>
         <div className='affiliate__commissions__top'>
            <Text
               inner='2. Commissions'
               type={ types.medium160 }
               style={ { marginBottom: '4px' } }
               size={ sizes.xlarge }
            />
            <Text
               inner="What will be the affiliate's commission if the offer is sold through his link"
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
            <div className='affiliate__commissions__data'>
               {commissions.map((commission, index) => {
                  const {
                     id, courses, file,
                     is_course: isCourse, is_membership: isMembership,
                  } = commission;

                  const course = isCourse || isMembership ? courses[0] : null;
                  const imageUrl = course
                     ? course.communities?.file_id || course.thumbnail_image
                     : file?.src || 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png';

                  return (
                     <Commission
                        handleChangeCommission={ handleChangeCommission }
                        key={ id }
                        offer={ commission }
                        index={ index }
                        imageUrl={ imageUrl }
                     />
                  );
               })}
            </div>
         </div>
         <div className='affiliate__commissions__buttons'>
            <Button
               text='Previous'
               theme={ themes.secondary }
               onClick={ () => onPrevPage() }
            />
            <Button
               text='Next Page'
               onClick={ () => onNextPage() }
            />
         </div>
      </div>
   );
};

AffiliateCommissions.propTypes = {
   onNextPage: PropTypes.func,
   onPrevPage: PropTypes.func,
   commissions: PropTypes.array,
   handleChangeCommission: PropTypes.func,
};

export default AffiliateCommissions;
