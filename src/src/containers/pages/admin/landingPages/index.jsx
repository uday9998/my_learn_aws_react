import React, { useState } from 'react';
import LandingPages from 'views/pages/LandingPages';
import withLoading from 'utils/withLoading';
import { useHistory } from 'react-router';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getLandings,
   duplicateLanding as duplicateLandingAction,
   deleteLanding as deleteLandingAction,
   updateLandingsDetails as updateLandingDetailsAction,
   getLandingsByPage as getLandingsByPageAction,
   checkLandingAttached,
   multipleDuplicateLandings as multipleDuplicateLandingsAction,
   multipleDeleteLandings as multipleDeleteLandingsAction,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';

const LandingPagesLoading = withLoading(LandingPages);

const LandingPagesContainer = () => {
   const history = useHistory();


   const {
      data, loading, setData,
   } = useApiQuery(getLandings);

   const [duplicateLanding, { loading: loadingDuplicate }] = useSubmitForm(duplicateLandingAction, {
      successMessage: 'Landing has been duplicated.',
   });
   const [deleteLanding, { loading: loadingDelete }] = useSubmitForm(deleteLandingAction, {
      successMessage: 'Landing has been deleted.',
   });
   const [updateLandingDetails] = useSubmitForm(updateLandingDetailsAction, {
      successMessage: 'isPublished',
   });
   const [checkLandingAttachedToCourse, { loading: loadingAttached }] = useSubmitForm(checkLandingAttached);
   const [getLandingsByPage, { loading: loadingByPage }] = useSubmitForm(getLandingsByPageAction);

   const [searchIsActive, setSearchIsActive] = useState(false);
   const [isMultiSelect, setIsMultiSelect] = useState(false);
   const [checkedIds, setCheckedIds] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [selectedSorting, setSelectedSorting] = useState('publish');
   const duplicateLandingHandler = landingUrl => {
      duplicateLanding(landingUrl, (landingDuplicated) => {
         setData({ ...data, data: [landingDuplicated, ...data.data] });
      });
   };
   const screenWidth = useSelector(screenWidthSelector);

   const editLandingHandler = (landingUrl, landingName) => {
      history.push({
         pathname: `/admin/landings/${ landingUrl }/edit`,
         state: { landingName },
      });
   };

   // const deleteLandingHandler = (isAtacched) => {
   //    deleteLanding({ landingUrl: landingDelUrl, isAtacched }, () => {
   //       setData({ ...data, data: data.data.filter(({ url }) => url !== landingDelUrl) });
   //       if (data && data.data.length < 2) {
   //          history.push('/admin/landings/create');
   //       }
   //    });
   // };

   const handleDeleteLending = (landingUrl) => {
      checkLandingAttachedToCourse(landingUrl, (res) => {
         if (!(res && res.message && res.message === 'Attached')) {
            deleteLanding({ landingUrl, isAttached: true },
               () => setData({
                  ...data,
                  data: data.data.filter((landing) => landing.url !== landingUrl),
               }));
         } else {
            deleteLanding({ landingUrl, isAttached: false },
               () => setData({
                  ...data,
                  data: data.data.filter((landing) => landing.url !== landingUrl),
               }));
         }
      });
   };

   const detailsLandingHandler = landingUrl => {
      history.push(`/admin/landings/${ landingUrl }/settings`);
   };

   const updateLandingDetailsFunc = (landingUrl, isPublished) => {
      updateLandingDetails({ landingUrl, isPublished: isPublished ? 0 : 1 }, () => {
         const changedData = data && data.data.find(({ url }) => url === landingUrl);
         changedData.is_published = isPublished ? 0 : 1;
         setData(data);
      });
   };

   const updateLandingDetailsHandler = (landingUrl, isPublished) => {
      if (isPublished) {
         checkLandingAttachedToCourse(landingUrl, () => {
            updateLandingDetailsFunc(landingUrl, isPublished);
         });
      } else {
         updateLandingDetailsFunc(landingUrl, isPublished);
      }
   };

   const onPageChangeHandler = (pageInfo, search, sort) => {
      const { currentPage } = pageInfo;
      setSearchIsActive(search !== '');
      setSelectedSorting(sort);
      getLandingsByPage({ currentPage, searchValue: search, sortingValue: sort }, (filteredData) => {
         setData(filteredData);
         setCheckedIds([]);
      });
   };

   const getLandingsFilteredHandler = (search, sort) => {
      onPageChangeHandler(1, search, sort);
   };


   const checkActiveFields = () => {
      if (searchIsActive) {
         return true;
      }
      if (data && data.data.length > 0) {
         return true;
      }
      return false;
   };

   const [multipleDuplicateLandings, { loading: isLoadingMultipleDuplicate }] = useSubmitForm(multipleDuplicateLandingsAction, {
      successMessage: 'Landings have been duplicated.',
   });


   const [multipleDeleteLandings, { loading: isLoadingMultipleDelete }] = useSubmitForm(multipleDeleteLandingsAction, {
      successMessage: 'Landings have been deleted.',
   });


   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <AdminContainer.Content>
               <div className='landing'>
                  <HeaderTypeSecond
                     paddingTop={ 0 }
                     tooltip='Text'
                     title='Landing Pages'
                     isHaveBaseButton={ true }
                     // isHaveBaseButton={ checkActiveFields() }
                     // isHidenSearch={ !checkActiveFields() }
                     searchValue={ searchValue }
                     onChangeSearchValue={ (value) => {
                        setSearchValue(value);
                        getLandingsFilteredHandler(value, selectedSorting);
                     } }
                     buttonProps={ {
                        text: 'Create New Landing Page',
                        onClick: () => history.push('/admin/landings/create'),
                     } }
                     textSize={ screenWidth < 701 ? 'medium' : null }
                  />
                  <LandingPages
                     isLoading={
                        loading || loadingDelete || loadingDuplicate
                        || loadingByPage || loadingAttached || isLoadingMultipleDuplicate || isLoadingMultipleDelete
                     }
                     landings={ data && data.data }
                     pagination={ data }
                     onFilter={ (item) => getLandingsFilteredHandler(searchValue, item) }
                     duplicateLanding={ duplicateLandingHandler }
                     deleteLanding={ handleDeleteLending }
                     editLanding={ editLandingHandler }
                     setCheckedIds={ setCheckedIds }
                     checkedIds={ checkedIds }
                     isMultiSelect={ isMultiSelect }
                     selectedSorting={ selectedSorting }
                     setSelectedSorting={ setSelectedSorting }
                     setIsMultiSelect={ (bool) => {
                        setIsMultiSelect(bool);
                        setCheckedIds([]);
                     } }
                     detailsLanding={ detailsLandingHandler }
                     isEmpty={ !checkActiveFields() }
                     updateLandingDetails={ updateLandingDetailsHandler }
                     onPageChange={ onPageChangeHandler }
                     hanldeNewPages={ () => history.push('/admin/landings/create') }
                     searchIsActive={ searchIsActive }
                     multipleDuplicateLandings={ () => {
                        multipleDuplicateLandings(checkedIds, () => {
                           getLandingsFilteredHandler(searchValue, selectedSorting);
                           setIsMultiSelect(false);
                        });
                     } }
                     multipleDeleteLandings={ () => {
                        multipleDeleteLandings(checkedIds, () => {
                           setIsMultiSelect(false);
                           // setData({
                           //    ...data,
                           //    data: data.data.filter(item => !checkedIds.includes(item.url)),
                           // });
                           getLandingsFilteredHandler(searchValue, selectedSorting);
                        });
                     } }
                  />
               </div>
            </AdminContainer.Content>
         </AdminContainer>
      </>
   );

   // return (
   //    <Container>
   //       <Container.Header>
   //          <LandingHeader
   //             title='Pages'
   //             titleSize='large'
   //             isEditMode
   //             hanldeNewPages={ () => history.push('/admin/landings/create') }
   //             getLandingsFiltered={ getLandingsFilteredHandler }
   //             searchValue={ searchValue }
   //             setSearchValue={ setSearchValue }
   //          />
   //          <SiteHeaderMobile
   //             isLeftAction
   //             title='Pages'
   //             goToBack={ () => history.push('/admin') }
   //          />
   //       </Container.Header>
   //       <Container.Content>
   //          <LandingPagesLoading
   //             isLoading={ loading || loadingDelete || loadingDuplicate || loadingByPage || loadingAttached }
   //             landings={ data && data.data }
   //             pagination={ data }
   //             duplicateLanding={ duplicateLandingHandler }
   //             deleteLanding={ deleteLandingModalOpen }
   //             editLanding={ editLandingHandler }
   //             detailsLanding={ detailsLandingHandler }
   //             updateLandingDetails={ updateLandingDetailsHandler }
   //             onPageChange={ onPageChangeHandler }
   //             searchIsActive={ searchIsActive }
   //          />
   //       </Container.Content>
   //       {
   //          deleteLandingModalIsOpen && (
   //             <Modal
   //                blurColor='rgba(63, 79, 101, 0.6)'
   //                contentBgColor='#fff'
   //                contentPosition='center'
   //                closeOnClickOutside={ true }
   //                contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
   //                onClose={ () => setDeleteLandingModalIsOpen(false) }
   //             >
   //                <div>
   //                   <DeleteModalContent
   //                      onCancel={ () => setDeleteLandingModalIsOpen(false) }
   //                      onApprove={ () => { deleteLandingHandler(false); setDeleteLandingModalIsOpen(false); } }
   //                      title='Delete Landing'
   //                      content='Are you sure you want to delete this landing?'
   //                   />
   //                </div>
   //             </Modal>
   //          )
   //       }
   //       {
   //          attachedLandingModalIsOpen && (
   //             <Modal
   //                blurColor='rgba(63, 79, 101, 0.6)'
   //                contentBgColor='#fff'
   //                contentPosition='center'
   //                closeOnClickOutside={ true }
   //                contentWidth={ window.innerWidth >= 1024 ? '469px' : '300px' }
   //                onClose={ () => setAttachedLandingModalIsOpen(false) }
   //             >
   //                <div>
   //                   <DeleteModalContent
   //                      onCancel={ () => setAttachedLandingModalIsOpen(false) }
   //                      onApprove={ () => { deleteLandingHandler(true); setAttachedLandingModalIsOpen(false); } }
   //                      title='Delete This landing'
   //                      content='This landing page is connected with one of your courses. If you delete this landing page the course join button will automatically navigate to the checkout page. Are you sure you want to delete it?'
   //                   />
   //                </div>
   //             </Modal>
   //          )
   //       }
   //       {
   //          publishedLandingModalIsOpen && (
   //             <Modal
   //                blurColor='rgba(63, 79, 101, 0.6)'
   //                contentBgColor='#fff'
   //                contentPosition='center'
   //                closeOnClickOutside={ true }
   //                contentWidth={ window.innerWidth >= 1024 ? '341px' : '300px' }
   //                onClose={ () => setPublishedLandingModalIsOpen(false) }
   //             >
   //                <div>
   //                   <DeleteModalContent
   //                      onCancel={ () => setPublishedLandingModalIsOpen(false) }
   //                      onApprove={ () => { setPublishedLandingModalIsOpen(false); } }
   //                      isLandingDraftModalContent={ true }
   //                      title='Warning'
   //                      content='This landing page is connected with one of your courses. You can not unpublish it.'
   //                   />
   //                </div>
   //             </Modal>
   //          )
   //       }
   //    </Container>
   // );
};


export default LandingPagesContainer;
