import React from 'react';
import Input from 'components/elements/inputNew';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import DropTriggle from 'components/elements/newDropTriggle';
import SimpleStatus from 'components/elements/SimpleStatus';
import { useApiQuery } from 'utils/hooks/useQuery';
import { myAccountCertificates } from 'api';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { onDownload } from 'utils/mediaLibrary';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { certificateLandingsImgs } from 'utils/certificateLandings';
import { MyAccountContext } from 'containers/pages/member/account';

const MyAccountCertificates = () => {
   const { t } = React.useContext(MyAccountContext);
   const [search, setSearch] = React.useState('');
   const { data, setData, loading } = useApiQuery(myAccountCertificates);
   const [query] = useSubmitForm(myAccountCertificates);
   React.useEffect(() => {
      query(`search=${ search }`, (filtered) => setData(filtered));
   }, [search]);
   return (
      <div className='my__account__certificates'>
         {loading && (
            <LoaderSpinner />
         )}
         <div className='my__account__certificates__filter'>
            <Input
               type='search'
               value={ search }
               onChange={ (name, value) => setSearch(value) }
               placeholder='Search'
            />
         </div>
         {!loading && (
            <div className='my__account__certificates__content'>
               {data.user_data.certificates.map((e) => {
                  return (
                     <div className='my__account__certificate' key={ e.token }>
                        { e.course_certificate && <img src={ certificateLandingsImgs[e.course_certificate.template_slug] } alt='' />}
                        <div className='my__account__certificate__bottom'>
                           <div className='my__account__certificate__bottom__title'>
                              <Text
                                 inner={ e.course_certificate?.name || '' }
                                 type={ types.medium153 }
                                 size={ sizes.large }
                              />        
                              <DropTriggle
                                 options={ [{
                                    name: 'Save as PDF', iconName: 'PDFMyAccountM', onClick: () => onDownload(e.certificate_src, e.course_certificate?.name),
                                 }] }
                              />
                           </div>
                           <SimpleStatus
                              text={ e.course_name }
                              color='red'
                           />
                        </div>
                     </div>
                  );
               })}
               {data.user_data.certificates.length === 0 && (
                  <div className='my__account__certificates__empty'>
                     <Text
                        inner='No Certificates Yet'
                        type={ types.mediumLargeGrey }
                        size={ sizes.new_size_28 }
                        style={ { color: '#727978', margin: '0px auto' } }
                     />
                     <img src={ emptyState } alt='No Certificates Yet' />
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

MyAccountCertificates.propTypes = {

};

export default MyAccountCertificates;
