import { useApiQuery } from 'utils/hooks/useQuery';
import { myAccountTags } from 'api';
import React from 'react';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import LoaderMini from 'components/elements/loaderMini';

const Tags = () => {
   const { data, loading } = useApiQuery(myAccountTags);

   return (
      <div className='my__account__communities'>
         {loading ? (
            <LoaderMini color='black' />
         ) : (
            <div className='tag__view'>
               <div className='tag__view__top'>
                  <Text
                     inner='Tags'
                     tyoe={ txtTypes.regular160 }
                     size={ txtSizes.xlarge }
                  />
               </div>
               <div className='tag__view__flex'>
                  {data?.page_data.length ? data?.page_data.map((tag) => {
                     return (
                        <div className='tag__view__tag' key={ uniqueId() }>
                           <Text
                              inner={ tag.name }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                     );
                  }) : (
                     <div className='tag__view__none'>
                        <Text
                           inner='No Tags Yet'
                           type={ txtTypes.regular148 }
                           style={ { color: '#727978', textAlign: 'center' } }
                           size={ txtSizes.medium }
                        />
                     </div>
                  )}
               </div>
            </div>
         )
         }
      </div>
   );
};

export default Tags;
