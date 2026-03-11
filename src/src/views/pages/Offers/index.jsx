import { OfferContext } from 'containers/pages/mixed/offers';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getContinueWatchingData, myAccountCourses } from 'api';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Slider from 'react-slick';
import SwipeToSlide from 'components/elements/SwipeToSlide';
import OffersByCategory from './components/OffersByCategory';
import OffersFilter from './components/OffersFilter';
import OffersFooter from './components/OffersFooter';
import OffersTop from './components/OffersTop';
// import SchoolRoomAboveContent from './components/AboveContent';
// import SchoolRoomBelowContent from './components/BelowContent';
import Section from '../SchoolRoomTheme/SchoolRoomComponents/Section';
import ExploreOffer from './components/ExploreOffer';
import OfferLessonsPage from './LessonPage';
import SchoolRoomAboveContent from './components/AboveContent';
import SchoolRoomBelowContent from './components/BelowContent';
import SingleCategoryHeader from './components/OffersByCategory/SingleCategoryHeader';
import PurchasedCourse from './liquidRenderer/components/PurchasedCourse';
import ContinueWatchingCard from './components/ContinueWatchingCard';

import './index.scss';


const Offers = ({
   addClass,
   toggleSectionComponent,
}) => {
   const {
      template, onClickElement, isEditor, selectedOffer, selectedOfferCourse, schoolRoomSettings,
      isCategoryFrontPage, singleCategory, goToCheckoutFromCategory, isBridgePage, data, isPortal,
      user, typeMembership, viewMode,
   } = React.useContext(OfferContext);
   const [isSeeAll, setIsSeeAll] = useState(false);
   const location = useLocation();
   const [coursesData, setCoursesData] = useState([]);
   const [sortedCourseData, setSortedCourseData] = useState([]);
   const [serachData, setSearchData] = useState('');
   const [templateName, setTemplateName] = useState('');
   // continueWatchingData
   const [getWatchingData] = useSubmitForm(getContinueWatchingData);
   const [continueWatchingData, setContinueWatchingData] = useState([]);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   const handleChangeSeeAll = (bool) => {
      setIsSeeAll(bool);
   };

   useEffect(() => {
      if (user) {
         getWatchingData({}, res => {
            setContinueWatchingData(prevState => {
               return [...prevState, ...res];
            });
         });
      }

      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      const templateName = localStorage.getItem('templateName');

      if (templateName && (window.location.pathname.includes('admin') || window.location.pathname.includes('temp-portal'))) {
         setTemplateName(templateName);
      }

      if (user) {
         const getCoursesData = async () => {
            const response = await myAccountCourses();
            setCoursesData(response?.data?.page_data);
            setSortedCourseData(response?.data?.page_data);
         };

         getCoursesData();
      }

      return () => {
         localStorage.removeItem('templateName');
      };
   }, []);

   const handlePortalSearch = (name, value) => {
      setSearchData(value);
   };

   useEffect(() => {
      if (serachData) {
         const filteredData = coursesData.filter(course => {
            return course.name.includes(serachData);
         });
         setSortedCourseData(filteredData);
      } else {
         setSortedCourseData(coursesData);
      }
   }, [serachData]);

   return (
      <Section
         slug={ template[0].school_room_section.slug }
         i={ 0 }
         onClick={ (e) => {
            onClickElement(e);
         } }
         item={ template[0] }
         isPreview={ !isEditor }
         className={ `offers${ isEditor ? ' offers__editor' : '' }` }
         dontMarkOnHover
      >
         <OffersTop addClass={ addClass } toggleSectionComponent={ toggleSectionComponent } />
         {!!isCategoryFrontPage && !isBridgePage && (
            <SingleCategoryHeader
               category={ singleCategory }
               goToCheckoutFromCategory={ goToCheckoutFromCategory } />
         )}
         {selectedOfferCourse && !isPortal ? (
            <OfferLessonsPage />
         ) : (
            <>
               {!isCategoryFrontPage && !isPortal && <SchoolRoomAboveContent />}
               {selectedOffer && !isCategoryFrontPage && !isPortal ? (
                  <ExploreOffer />
               ) : (
                  <section className='offers__container'>
                     <div className={ templateName && templateName === 'template3' ? 'container-active' : schoolRoomSettings.school_room_theme_name === 'template3' && !isCategoryFrontPage && !templateName ? 'container-active' : 'container' }>
                        <div
                           style={ {
                              justifyContent: (schoolRoomSettings.school_room_theme_name === 'template2' && location?.pathname.includes('onlinecourse') && !isSeeAll) || (templateName && templateName === 'template2' && !isSeeAll) ? 'space-between' : 'flex-end',
                           } }
                           className='filters__wrapper'>
                           {
                              (schoolRoomSettings.school_room_theme_name === 'template2' && location?.pathname.includes('onlinecourse') && !isPortal && !isSeeAll) || (templateName && templateName === 'template2' && !isSeeAll) ? (
                                 <Text
                                    inner={ `Includes ${ data.all_courses_count } Online Courses` }
                                    size={ sizes.new_size_28 }
                                    type={ types.bold700 }
                                    style={ {
                                       color: 'var(--textColor)',
                                    } }
                                 />
                              ) : null
                           }
                           {
                              isPortal && (
                                 <Text
                                    inner='Purchased Courses'
                                    size={ sizes.new_size_28 }
                                    type={ types.bold700 }
                                    style={ {
                                       color: 'var(--textColor)',
                                    } }
                                 />
                              )
                           }
                           <OffersFilter
                              serachData={ serachData }
                              portalSearch={ handlePortalSearch }
                           />
                        </div>
                        {
                           typeMembership === 'membership' && continueWatchingData?.length && user && !window.location.pathname.includes('playlists') ? (
                              <div className='continue__watching__wrapper'>
                                 <div className='title__wrapper'>
                                    <Text
                                       inner='Continue Watching'
                                       size={ sizes.xlarge_new_24 }
                                       style={ {
                                          color: 'var(--textColor)',
                                       } }
                                    />
                                 </div>
                                 {
                                    !isMobile ? (
                                       <SwipeToSlide
                                          courseCategoryColor='var(--memberButtonBgcolor)'
                                          viewMode={ viewMode || 'desktop' }
                                       >
                                          {
                                             continueWatchingData?.map(watchingData => {
                                                return <ContinueWatchingCard watchingData={ watchingData } />;
                                             })
                                          }
                                       </SwipeToSlide>
                                    ) : (
                                       <div className='continue__cards__wrapper'>
                                          {
                                             continueWatchingData?.map(watchingData => {
                                                return <ContinueWatchingCard watchingData={ watchingData } />;
                                             })
                                          }
                                       </div>
                                    )
                                 }

                              </div>
                           ) : null
                        }
                        {
                           !isPortal && <OffersByCategory handleChangeSeeAll={ handleChangeSeeAll } />
                        }

                     </div>
                  </section>
               )}
               {!isCategoryFrontPage && !isPortal && <SchoolRoomBelowContent />}

            </>
         )}
         {
            isPortal && (
               <div className='purchased__course__cards__wrapper'>
                  <PurchasedCourse
                     coursesData={ sortedCourseData }
                  />
               </div>
            )
         }
         <OffersFooter />
      </Section>
   );
};

Offers.propTypes = {
   addClass: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
};

export default Offers;
