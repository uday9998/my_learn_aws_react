import React from 'react';
import { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import './index.scss';
import ComponentProgress from 'components/modules/ComponentProgress';
import { useApiQuery } from 'utils/hooks/useQuery';
import { myAccountNotes } from 'api';
import MyAccountNotesView from './Components/NotesView';

const MyAccountNotesPage = () => {
   const { data, setData, loading } = useApiQuery(myAccountNotes, ['']);

   return (
      <div className='my__account__notes'>
         <ComponentProgress loading={ loading }>
            <div className='my__account__notes__content'>
               <div className='my__account__notes__right'>
                  <TextWithTooltip
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                     tooltip='asd'
                     isIconRigth={ true }
                     inner='Notes'
                  />
                  <MyAccountNotesView data={ data } setData={ setData } />
               </div>
            </div>
         </ComponentProgress>
      </div>
   );
};

MyAccountNotesPage.propTypes = {

};

export default MyAccountNotesPage;
