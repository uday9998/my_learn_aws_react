import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import SliceAndConnectText from 'utils/getSplitedText';
import SimpleStatus from 'components/elements/SimpleStatus';
import { uniqueId } from 'lodash';
import SortButton from 'components/elements/buttons/SortButton';

const MemberProfileCommunities = ({ communities, filterMember, member }) => {
   const [sortingVersion, setSortingVersion] = useState('Newest');
   const onSort = () => {
      const optionType = sortingVersion === 'Newest' ? 'newest' : 'oldest';
      filterMember(member.id, optionType, 'communities', () => {
         setSortingVersion(sortingVersion === 'Newest' ? 'Oldest' : 'Newest');
      });
   };
   const getPosts = (rooms) => {
      return rooms.reduce((prev, next) => {
         if (next.posts) {
            return prev + next.posts.length;
         }
         return prev;
      }, 0);
   };

   const sortOptions = {
      newest: 'Newest',
      oldest: 'Oldest',
   };


   return (
      <div className='member__profile__communities'>
         <div className='member__profile__communities__top'>
            <Text
               inner={ `Communities (${ communities.length })` }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            <SortButton
               type='first'
               options={ sortOptions }
               value={ sortingVersion === 'Newest' ? 'newest' : 'oldest' }
               onFilter={ (val) => onSort(val) }
            />
         </div>
         <div className='member__profile__communities__line' />
         <div className='member__profile__communities__table scroll'>
            <table>
               <thead>
                  <tr>
                     <th>
                        <Text
                           inner='Communities'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Status'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Owner'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Posts'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                     <th>
                        <Text
                           inner='Comments'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {communities.map((e) => {
                     return (
                        <tr key={ uniqueId() }>
                           <td>
                              <Text
                                 inner={ SliceAndConnectText(e.name, 15) }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 style={ { cursor: 'pointer', textDecoration: 'underline' } }
                              />
                           </td>
                           <td>
                              <SimpleStatus color='green' text={ e.pivot.user_type } />
                           </td>
                           <td>
                              {e.owner.id === member.id ? (
                                 <SimpleStatus color='navy' text='You' />
                              ) : (
                                 <Text
                                    inner={ SliceAndConnectText(e.owner.name, 10) }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                              )}
                           </td>
                           <td>
                              <Text
                                 inner={ getPosts(e.rooms) }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ e.comments.length }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                           </td>
                           {/* <td>
                              <Button
                                 text='More Info'
                                 onClick={ () => {} }
                                 theme={ themes.more }
                                 size={ btnSizes.small }
                              />
                           </td> */}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

MemberProfileCommunities.propTypes = {
   communities: PropTypes.array,
   member: PropTypes.object,
   filterMember: PropTypes.func,
};

export default MemberProfileCommunities;
