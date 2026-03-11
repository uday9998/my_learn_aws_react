import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import moment from 'moment';

const ClassProgressMember = ({ member }) => {
   return (
      <div className='class__progress__member__wrapper'>
         <div className='class__progress__member__wrapper__background' />
         <div className='class__progress__member__wrapper__info'>
            <img className='class__progress__member__wrapper__info__image' src={ member.picture_full_src } alt='member' />
            <div className='class__progress__member__wrapper__info__text'>
               <div className='left'>
                  <Text inner={ member.name } type={ txtTypes.medium } size={ txtSizes.xxlarge } />
                  <Text inner={ member.email } type={ txtTypes.regular148 } size={ txtSizes.medium } />
               </div>
               <div className='right'>
                  <Text inner='Last Login' type={ txtTypes.regularLarge } size={ txtSizes.xsmall } />
                  <Text inner={ member.last_activty ? moment(member.last_activty, 'DD/MM/YY').format('MMMM DD, YYYY') : '-' } type={ txtTypes.regularLarge } size={ txtSizes.large } />
               </div>
            </div>
         </div>
      </div>
   );
};

ClassProgressMember.propTypes = {
   member: PropTypes.object,
};

export default ClassProgressMember;
