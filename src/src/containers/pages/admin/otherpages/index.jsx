import React from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getOtherPages } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import OtherPagesView from 'views/pages/OtherPages';
import { useHistory } from 'react-router-dom';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';

const OtherPages = () => {
   const [isReversedArray, setIsReversedArray] = React.useState(false);
   const { data, loading } = useApiQuery(getOtherPages);
   const pageTypes = isReversedArray ? ['signin', 'signup', '404'] : ['404', 'signup', 'signin'];
   const history = useHistory();
   const screenWidth = useSelector(screenWidthSelector);
   function getPageData() {
      if (data) {
         const keys = Object.keys(data);
         const arrayItems = keys.map((e) => data[e]);
         return { arrayItems, keys };
      }
      return {};
   }

   function openItem(type) {
      history.push(`/admin/other-pages/${ type }`);
   }


   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <ComponentProgress loading={ loading }>
               <AdminContainer.Content>
                  <HeaderTypeSecond
                     title='Other Pages'
                     tooltip='Other Pages'
                     isHaveBaseButton={ false }
                     isHidenSearch={ true }
                     paddingTop={ 0 }
                  />
                  <OtherPagesView
                     isReversedArray={ isReversedArray }
                     setIsReversedArray={ setIsReversedArray }
                     data={ getPageData() }
                     pages={ pageTypes }
                     openItem={ openItem }
                     isMobile={ screenWidth < 1024 }
                  />
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

OtherPages.propTypes = {

};

export default OtherPages;
