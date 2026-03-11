import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { OfferContext } from 'containers/pages/mixed/offers';
import './index.scss';
import Icon from 'components/elements/Icon';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import Axios from 'axios';
import { getOffersByCategory, getNextPageOffersByCategory, getAllOffers } from 'api';

import LoaderSpinner from 'components/elements/LoaderSpiner';
import NotFound from '../NotFound';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SingleCategory from './SingleCategory';
import Category from './components/Category';

export function SampleNextArrow(props) {
   const { className, onClick } = props;
   return (
      <div
         className={ `${ className } mainSliderNext` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SliderRight'
         />
      </div>
   );
}

export function SamplePrevArrow(props) {
   const { className, onClick } = props;
   return (
      <div
         className={ `${ className } mainSliderPrev` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SliderLeft'
         />
      </div>
   );
}
const OffersByCategory = ({
   handleChangeSeeAll,
}) => {
   const [categoryData, setCategoryData] = useState({
      seeAll: false,
      category: {},
      nextPage: null,
      categoryId: null,
      loading: false,
   });

   const {
      data,
      schoolRoomSettings,
      template,
      onClickElement,
      isEditor,
      exploreOffer,
      filterData,
      handleBuyOffer,
      closeEditor,
      user,
      checkIsFavorite,
      handleFavorite,
      type,
      categorySearch,
      history,
      singleCategory,
      setSingleCategory,
      isCategoryFrontPage,
      loadingData,
      loadingCategorySearch,
      loadingCategoryData,
      isPlaylistFrontPage,
      setSinglePlaylist,
      viewMode,
      exploreCourse,
      membershipOffer,
   } = React.useContext(OfferContext);

   const [settings, setSettings] = React.useState({
      dots: false,
      arrows: true,
      infinite: true,
      nextArrow: <SampleNextArrow className='mainSliderNext' />,
      prevArrow: <SamplePrevArrow className='mainSliderPrev' />,
      speed: 500,
      slidesToShow: isEditor ? 3 : 4,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: true,
      responsive: [
      ],
   });
   const content = template[5];
   const contentIndex = 5;
   const contentItem = content.school_room_components[0];
   const mainBackgroundColor = template[0].school_room_section.props.bgColor;
   const [usdCurrency, setUsdCurrency] = React.useState(null);

   const handleResize = () => {
      const width = window.innerWidth;
      if (isEditor) {
         return null;
      }
      setSettings({ ...settings, slidesToShow: Math.floor(width / 318) });
      // setIsSlider(data.length > width / 318 - 1);
      //    if (width < 1250) {
      //    setIsSlider(data.length > 3);
      //    setSettings({ ...settings, slidesToShow: 3 });
      // }
      // if (width < 1500 && width > 1250) {
      //    setIsSlider(data.length > 3);
      //    setSettings({ ...settings, slidesToShow: 4 });
      // }
      // if (width > 1500 && width < 1700) {
      //    setIsSlider(data.length > 4);
      //    setSettings({ ...settings, slidesToShow: 5 });
      // }
      // if (width > 1800 && width < 1950) {
      //    setIsSlider(data.length > 4);
      //    setSettings({ ...settings, slidesToShow: 5 });
      // }
      // if (width > 1950 && width < 2300) {
      //    setIsSlider(data.length > 5);
      //    setSettings({ ...settings, slidesToShow: 6 });
      // }
      // if (width > 2300 && width < 2600) {
      //    setIsSlider(data.length > 6);
      //    setSettings({ ...settings, slidesToShow: 7 });
      // }
      // if (width > 2600 && width < 3000) {
      //    setIsSlider(data.length > 7);
      //    setSettings({ ...settings, slidesToShow: 8 });
      // }
      // if (width > 3000 && width < 3500) {
      //    setIsSlider(data.length > 8);
      //    setSettings({ ...settings, slidesToShow: 9 });
      // }
   };
   React.useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();

      Axios.get(
         'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
         .then(({ data: res }) => {
            setUsdCurrency(res.usd);
         });

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const handleSeeAll = async (category) => {
      setCategoryData(prevState => {
         return {
            ...prevState,
            loading: !prevState.loading,
         };
      });

      const { data } = category.id === 'bundles'
         ? await getAllOffers() : await getOffersByCategory(category.id);

      handleChangeSeeAll(!categoryData.seeAll);
      setCategoryData(prevState => {
         return {
            ...prevState,
            seeAll: !prevState.seeAll,
            category: {
               ...prevState.category,
               name: category.name,
               offers: [...data.data],
            },
            nextPage: data.next_page_url,
            categoryId: category.id,
            loading: !prevState.loading,
         };
      });
   };

   const handleSeeAllNew = (category) => {
      if (history.location.pathname.includes('membership')) {
         setSingleCategory(category);
         history.push(`/portal/membership/${ category.link }`);
      } else {
         handleSeeAll(category);
      }
   };

   const handleBack = () => {
      handleChangeSeeAll(!categoryData.seeAll);
      setCategoryData(prevState => {
         return {
            ...prevState,
            seeAll: !prevState.seeAll,
            category: {},
            nextPage: null,
            categoryId: null,
         };
      });
   };

   const handleScroll = async (e) => {
      if (categoryData.nextPage && e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
         const offers = await getNextPageOffersByCategory(categoryData.nextPage);
         setCategoryData(prevState => {
            return {
               ...prevState,
               category: {
                  ...prevState.category,
                  offers: [...prevState.category.offers, ...offers.data.data],
               },
               nextPage: !!offers.next_page_url,
            };
         });
      }
   };

   useEffect(() => {
      const scrollingElement = document.querySelector('#root');
      scrollingElement.addEventListener('scroll', handleScroll);

      return () => {
         scrollingElement.removeEventListener('scroll', handleScroll);
      };
   }, [categoryData.nextPage]);


   const handlePortalDataByTypes = () => {
      let dataWithOffers = {};
      if (type === 'bundle') {
         dataWithOffers = {
            ...data,
            categories: [
               !!data.offers.length && {
                  id: 'bundles',
                  name: 'Bundles',
                  courses: data.offers,
                  courses_count: data.offers_count,
               },
            ],
         };
      } else {
         dataWithOffers = { ...data };
      }
      return dataWithOffers;
   };

   const filterCategoryData = (category) => {
      return type === 'membership' ? {
         ...category,
         lessons: Array.isArray(category.lessons) ? category.lessons
            : Object.values(category.lessons),
      } : category;
   };

   return (
      <div
         className='offers__category'
      >

         {/* <Section
            item={ content }
            i={ contentIndex }
            isPreview={ !isEditor }
            onClick={ (e) => onClickElement(e) }
            slug={ content.school_room_section.slug }
         > */}
         {
            loadingData && <div className='offers__category__loader'><LoaderSpinner isPlayList={ true } /></div>
         }
         {!isCategoryFrontPage && filterData.search.length > 0
             && (data.length === 0 || (type === 'bundle' && data.offers && data.offers.length === 0)
            || (type !== 'bundle' && handlePortalDataByTypes().categories.length === 0)) && (
            <NotFound searchText={ filterData.search } />
         )}

         <div>
            {
               isCategoryFrontPage
                  && (
                     <SingleCategory
                        category={ singleCategory }
                        handleSeeAll={ handleSeeAllNew }
                        schoolRoomSettings={ schoolRoomSettings }
                        contentItem={ contentItem }
                        isEditor={ isEditor }
                        handleBuyOffer={ handleBuyOffer }
                        closeEditor={ closeEditor }
                        user={ user }
                        handleFavorite={ handleFavorite }
                        checkIsFavorite={ checkIsFavorite }
                        mainBackgroundColor={ mainBackgroundColor }
                        exploreOffer={ exploreOffer }
                        seeAll={ true }
                        categorySearch={ categorySearch }
                        loadingData={ loadingCategorySearch }
                        handleBack={ handleBack }
                        type={ type }
                        setSingleCategory={ setSingleCategory }
                        loadingCategoryData={ loadingCategoryData }
                        isPlaylistFrontPage={ isPlaylistFrontPage }
                        setSinglePlaylist={ setSinglePlaylist }
                        exploreCourse={ exploreCourse }
                        membershipOffer={ membershipOffer?.offer }
                     />
                  )
            }
            { !isCategoryFrontPage && (
               <>
                  {
                     categoryData.seeAll ? (
                        <Category
                           category={ categoryData.category }
                           handleSeeAll={ handleSeeAllNew }
                           schoolRoomSettings={ schoolRoomSettings }
                           contentItem={ contentItem }
                           isEditor={ isEditor }
                           usdCurrency={ usdCurrency }
                           handleBuyOffer={ handleBuyOffer }
                           closeEditor={ closeEditor }
                           user={ user }
                           handleFavorite={ handleFavorite }
                           checkIsFavorite={ checkIsFavorite }
                           mainBackgroundColor={ mainBackgroundColor }
                           exploreOffer={ exploreOffer }
                           seeAll={ categoryData.seeAll }
                           handleBack={ handleBack }
                           type={ type }
                           setSingleCategory={ setSingleCategory }
                           setSinglePlaylist={ setSinglePlaylist }
                           viewMode={ viewMode }
                           exploreCourse={ exploreCourse }
                           membershipOffer={ data?.offer }
                        />
                     ) : !!handlePortalDataByTypes().categories.length
                  && handlePortalDataByTypes().categories.map(category => (
                     <Category
                        key={ category.id }
                        category={ filterCategoryData(category) }
                        handleSeeAll={ handleSeeAllNew }
                        schoolRoomSettings={ schoolRoomSettings }
                        contentItem={ contentItem }
                        isEditor={ isEditor }
                        usdCurrency={ usdCurrency }
                        handleBuyOffer={ handleBuyOffer }
                        closeEditor={ closeEditor }
                        user={ user }
                        handleFavorite={ handleFavorite }
                        checkIsFavorite={ checkIsFavorite }
                        mainBackgroundColor={ mainBackgroundColor }
                        exploreOffer={ exploreOffer }
                        type={ type }
                        setSingleCategory={ setSingleCategory }
                        setSinglePlaylist={ setSinglePlaylist }
                        viewMode={ viewMode }
                        exploreCourse={ exploreCourse }
                        membershipOffer={ data?.offer }
                     />
                  ))
                  }
               </>
            )}
         </div>
         {/* </Section> */}
      </div>
   );
};

OffersByCategory.propTypes = {
   handleChangeSeeAll: PropTypes.func,
};
SamplePrevArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
};

SampleNextArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
};

export default OffersByCategory;
