import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Icon from 'components/elements/Icon';
import LoaderMini from 'components/elements/loaderMini';

const ClassProgressTopUsers = ({ data }) => {
   const GetMedalUser = (user) => {
      switch (data.top_students.indexOf(user) + 1) {
         case 1:
            return 'Golden';
         case 2:
            return 'Silver';
         case 3:
            return 'Bronze';
         default:
            return '';
      }
   };

   return (
      <div className='class__progress__users'>
         <div className='class__progress__users__wrapper'>
            <div className='class__progress__users__top'>
               <Text inner='Top 10 Students' type={ txtTypes.regularDefault } size={ txtSizes.medium } />
            </div>
            <div className='class__progress__users__list'>
               {data !== 'procesed' && !!data.top_students && !!data.top_students.length && data.top_students.map((e) => {
                  return (
                     <div className='class__progress__users__user' key={ e.user.id }>
                        <div className='class__progress__users__user__left'>
                           <Text
                              inner={ data.top_students.indexOf(e) + 1 }
                              type={ txtTypes.mediumSmall }
                              size={ txtSizes.xsmall }
                           />
                           <img src={ e.user.picture_full_src } alt='' />
                           <Text inner={ e.user.name } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        </div>
                        <div className='class__progress__users__user__right'>
                           <Icon name={ GetMedalUser(e) } />
                        </div>
                     </div>
                  );
               })}
               {data !== 'procesed' && !!data.top_students && !data.top_students.length && (
                  <div className='class__progress__no_student'>
                     <Text
                        inner='No top student yet'
                        type={ txtTypes.mediumSmall }
                        size={ txtSizes.small }
                     />
                  </div>
               )}
               {data === 'procesed'
                     && (
                        <div className='class__progress__chart__loader'>
                           <LoaderMini color='#131f1e' />
                        </div>
                     )
               }
            </div>
         </div>
      </div>
   );
};

ClassProgressTopUsers.propTypes = {
   data: PropTypes.object,
};


export default ClassProgressTopUsers;
