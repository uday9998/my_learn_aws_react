import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import SortButton from 'components/elements/buttons/SortButton';

const MemberProfileComments = ({ comments, member, filterMember }) => {
   const [sortingVersion, setSortingVersion] = useState('newest');
   const onSort = (type) => {
      const optionType = type;
      filterMember(member.id, optionType, 'comments', () => {
         setSortingVersion(type);
      });
   };
   const sortOptions = {
      newest: 'Newest',
      oldest: 'Oldest',
   };


   return (
      <div className='member__profile__comments'>
         <div className='member__profile__comments__top'>
            <Text
               inner={ `Comments (${ comments.length })` }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            <SortButton
               type='first'
               options={ sortOptions }
               value={ sortingVersion }
               onFilter={ (val) => onSort(val) }
            />
         </div>
         <div className='member__profile__comments__line' />
         <div className='member__profile__comments__view'>
            {comments.map((comment) => {
               return (
                  <div className='member__profile__comments__item'>
                     <div className='member__profile__comments__item__top'>
                        <div className='left'>
                           <img src={ member.picture_src || member.picture_full_src } alt='' />
                        </div>
                        <div className='right'>
                           <Text
                              inner={ member.name }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                           <Text
                              style={ { color: '#727978' } }
                              inner={ moment(comment.created_at).format('MMM D / LT ') }
                              type={ types.regularLarge }
                              size={ sizes.xsmall }
                           />
                        </div>
                     </div>
                     <Text
                        inner={ comment.text }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
               );
            })}
         </div>
      </div>
   );
};

MemberProfileComments.propTypes = {
   comments: PropTypes.array,
   filterMember: PropTypes.func,
   member: PropTypes.object,
};

export default MemberProfileComments;
