import React from 'react';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { myAccountCommunities } from 'api';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import LoaderMini from 'components/elements/loaderMini';
import Input from 'components/elements/inputNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';
import MyAccountCommunity from './Components/Community';
import { MyAccountContext } from 'containers/pages/member/account';

const MyCommuntities = () => {
   const { t } = React.useContext(MyAccountContext);
   const { data, setData, loading } = useApiQuery(myAccountCommunities, ['']);
   const [selectedCommunityId, setSelectedCommunityId] = React.useState(null);
   const [query] = useSubmitForm(myAccountCommunities);
   const [search, setSearch] = React.useState('');
   React.useEffect(() => {
      query(`search=${ search }`, (content) => setData(content));
   }, [search]);
   const getRoomPost = (rooms) => {
      const reduceCount = rooms.reduce((prev, next) => prev + next.posts.length, 0);
      return reduceCount;
   };
   if (selectedCommunityId) {
      return (
         <MyAccountCommunity
            goBackToList={ () => setSelectedCommunityId(null) }
            id={ selectedCommunityId }
         />
      );
   }
   return (
      <div className='my__account__communities'>
         {loading ? (
            <LoaderMini color='black' />
         ) : (
            <>

               <div className='my__account__communities__filter'>
                  <Input
                     type='search'
                     value={ search }
                     onChange={ (name, value) => setSearch(value) }
                     placeholder='Search'
                  />
               </div>
               {data.page_data.length > 0 ? (
                  <div className='my__account__communities__table'>
                     <table>
                        <thead>
                           <tr>
                              <th>
                                 <Text
                                    inner='Communities'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                    color='#131F1E'
                                 />
                              </th>
                              <th>
                                 <Text
                                    inner='Status'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                    color='#131F1E'
                                 />
                              </th>
                              <th>
                                 <Text
                                    inner='Owner'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                    color='#131F1E'
                                 />
                              </th>
                              <th>
                                 <Text
                                    inner='Posts'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                    color='#131F1E'
                                 />
                              </th>
                              <th>
                                 <Text
                                    inner='Comments'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                    color='#131F1E'
                                 />
                              </th>
                              <th />
                           </tr>
                        </thead>
                        <tbody>
                           {data.page_data.map((e) => {
                              return (
                                 <tr key={ e.id } role='presentation' onClick={ () => setSelectedCommunityId(e.id) }>
                                    <td>
                                       <Text
                                          inner={ e.name }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <SimpleStatus
                                          text='Member'
                                          color='green'
                                       />
                                    </td>
                                    <td>
                                       <Text
                                          inner={ e.owner ? e.owner.name : '' }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <Text
                                          inner={ getRoomPost(e.rooms) }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <Text
                                          inner={ e.comments ? e.comments.length : 0 }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <div style={ { width: '100%' } }>
                                          <BaseButton
                                             theme={ themes.more }
                                             text='More Info'
                                             style={ { marginLeft: 'auto' } }
                                             size='small'
                                          />
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <div className='my__account__communities__empty'>
                     <Text
                        inner='No Communities Yet'
                        type={ types.mediumLargeGrey }
                        size={ sizes.new_size_28 }
                        style={ { color: '#727978', margin: '0px auto' } }
                     />
                     <img src={ emptyState } alt='No Communities Yet' />
                  </div>
               )}
            </>
         )}
      </div>
   );
};

MyCommuntities.propTypes = {

};

export default MyCommuntities;
