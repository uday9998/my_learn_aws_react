/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Offers from 'views/pages/Offers';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as operations from 'state/modules/mainhub/operations';
import * as selectors from 'state/modules/mainhub/selectors';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   enrollMemberToFreeOffer,
   favoriteOffer, getOfferCourseLessons, getOfferCourses, getOffers, memberToggleLikeCourse,
   getOnlyPublishedCourses, getFrontCategory, getFrontCategorySearch, portalMenu,
   generateCheckoutToken,
} from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { DragDropContext } from 'react-beautiful-dnd';
import QueryParams from 'utils/QueryParams';
import Auth from 'utils/Auth';
import { loginStartOperation } from 'state/modules/login/operations';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { getLandingUrl } from 'utils/url';
import { cardBgColor } from 'utils/pageBuilder/schoolRoomColor';
import { findLandingTemplateData, findSchoolRoomData } from 'utils/getMainbgColor';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import getColor from 'utils/generateRGBColor';

export const applyScripts = (scripts) => {
   const frontScripts = Object.keys(scripts);
   if (frontScripts.length !== 0) {
      for (let item = 0; item < frontScripts.length; item++) {
         const i = frontScripts[item];
         // eslint-disable-next-line max-len
         const scriptWithSrc = scripts[i].match(/<script.*?src=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/g);
         const script = document.createElement('script');
         if (!scripts[i].includes('</script>')) {
            if (scripts[i].includes('https://') || scripts[i].includes('http://')) {
               script.src = `try {
                  ${ scripts[i] }
             0  } catch(e) {}`;
            } else {
               script.innerHTML = `try {
                  ${ scripts[i] }
               } catch(e) {}`;
            }
            const type = item.includes('footer') ? 'body' : 'header';
            document.querySelector(type).append(script);
         } else if (scripts[i].includes('</script>') && !scriptWithSrc) {
            let scriptContent = scripts[i].split(/<script.*?>/igm);
            scriptContent = scriptContent && scriptContent[1] && scriptContent[1].split('</script>') && scriptContent[1].split('</script>')[0];
            const type = i.includes('footer') ? 'body' : 'head';
            script.innerHTML = `try {
               ${ scriptContent }
            } catch(e) {}`;
            document.querySelector(type).append(script);
         } else if (scriptWithSrc) {
            let scriptContent = item.match(/src\s*=\s*"?(.+?)["|\s]/g);
            scriptContent = scriptContent && scriptContent[0] && scriptContent[0].split('src=') && scriptContent[0].split('src=')[1];
            scriptContent = scriptContent.replace(/['"]+/g, '');
            script.src = `try {
               ${ scriptContent }
            } catch(e) {}`;
            const type = scripts.includes('footer') ? 'body' : 'header';
            document.querySelector(type).append(script);
         }
      }
   }
};
export const OfferContext = React.createContext();

const OffersContainer = ({
   isEditor,
   site,
   user,
   getFrontScripts,
   sections,
   settings,
   showEditableComponent,
   deleteComponent,
   handleDeleteComponent,
   handleDuplicateComponent,
   changeProp,
   templateSettings,
   isPreview,
   auth,
   courseContainerProps,
   logout,
   login,
   globalBranding,
   goTo,
   closeEditor,
   previewMode,
   dragStart,
   match,
   addClass,
   toggleSectionComponent,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const history = useHistory();
   const location = useLocation();
   const { type: typeMembership } = useParams();
   const [filterData, setFilterData] = React.useState({
      search: '',
      filter: 'none',
      sortBy: 'recently',
      filterCategory: 'none',
      category_name: '',
   });
   const [isInited, setIsInited] = React.useState(false);
   const onClickElement = (e) => {
      if (isEditor && e.target?.className?.includes && !e.target?.className?.includes('hero_section_wrpper')) {
         showEditableComponent(e);
      }
   };
   // let primaryButton = site && site.landing_data[5].school_room_components[0].subcomponent[2].props;
   // if (site && site.landing_data[5].school_room_components[0].subcomponent[2].props
   //    && !site.landing_data[5].school_room_components[0].subcomponent[2].props.bgColor) {
   //    primaryButton = site && site.landing_data[5].school_room_components[0].subcomponent[3].props;
   // }
   // const secondaryButton = site && site.landing_data[5].school_room_components[0].subcomponent[3].props;

   // React.useEffect(() => {
   //    document.body.style.setProperty('--buttonBgcolor', activeSchoolRoomColor(site));
   //    document.body.style.setProperty('--textColor', primaryButton.color);
   //    document.body.style.setProperty('--secondaryButtonBgcolor', 'transparent');
   //    document.body.style.setProperty('--secondaryTextColor', activeSchoolRoomColor(site));
   // }, [site]);

   const isMembership = typeMembership === 'membership' || window.location.pathname.includes('membership') || window.location.search.includes('video=') 
   || window.location.search.includes('category=') || window.location.search.includes('playlist=');

   const template = isEditor || previewMode ? sections : isMembership ? site.membership.landing_data : site.landing_data;
   const [offers, setOffers] = React.useState(null);
   const [singleCategory, setSingleCategory] = React.useState({});
   const [singlePlaylist, setSinglePlaylist] = React.useState({});
   const [categorySearch, setCategorySearch] = React.useState('');
   const [portalMenuData, setPortalMenuData] = React.useState('');
   const [videoProgram, setVideoProgram] = React.useState(null);
   const [getCourses] = useSubmitForm(getOfferCourses);
   const [getCourseLessons, { loading: getCourseLessonsLoading }] = useSubmitForm(getOfferCourseLessons);
   const { data: products, loading: loadingProducts } = useApiQuery(
      getOnlyPublishedCourses);
   const [getPortalMenu, { loading: loadingPortalMenu }] = useSubmitForm(portalMenu);
   const [selectedOffer, setSelectedOffer] = React.useState(null);
   const [selectedOfferCourse, setSelectedOfferCourse] = React.useState(null);
   const [toggleFavorite] = useSubmitForm(favoriteOffer);
   const schoolRoomSettings = isEditor || isPreview ? settings : templateSettings || isMembership ? site.membership.active_school_room : site.active_school_room;
   const [get, { loading: loadingData }] = useSubmitForm(getOffers);
   const [getCategory, { loading: loadingCategoryData }] = useSubmitForm(getFrontCategory);
   const [getCategorySearch, { loading: loadingCategorySearch }] = useSubmitForm(getFrontCategorySearch);

   const [toggleCourseLike] = useSubmitForm(memberToggleLikeCourse);
   const [
      attachMemberToFreeOffer,
      { loading: isLoadingAttachMemberToFreeOffer },
   ] = useSubmitForm(enrollMemberToFreeOffer);
   const { landingId, landingType, templateId } = useParams();
   const neastedPreview = templateId ? true : isEditor;
   const templateData = findLandingTemplateData(siteInfo, landingId || templateId, neastedPreview, landingType, previewMode, isMembership);
   const [categories, setCategories] = React.useState([]);

   // Applying css variables and update it on change template data
   React.useEffect(() => {
      const cssVariablesList = {};
      // header
      const headerProps = template[1].school_room_section.props;

      // hero (banner)
      const heroProps = template[2].school_room_section.props;

      // offer card
      const offerCard = template[5].school_room_components[0];
      // footer
      const footer = template[7].school_room_section;
      cssVariablesList['--main-background-color'] = template[0].school_room_section.props.bgColor || templateData.school_bg_color;
      cssVariablesList['--header-background-color'] = headerProps.bgColor;
      cssVariablesList['--header-color'] = headerProps.color;
      cssVariablesList['--header-logo-height'] = `${ headerProps.logoHeigth || 30 }px`;
      cssVariablesList['--banner-opacity'] = heroProps.opacity;
      cssVariablesList['--banner-opacity-color'] = heroProps.opacity_color;
      cssVariablesList['--banner-height'] = heroProps.school_slider_height;
      cssVariablesList['--offer-card-background'] = offerCard.props.bgColor || cardBgColor(template[0].school_room_section.props.bgColor, true);
      cssVariablesList['--offer-card-name-color'] = offerCard.subcomponent[0].props.color || 'var(--textColor)';
      cssVariablesList['--footer-background'] = footer.props.bgColor;
      cssVariablesList['--settingsButtonColor'] = templateData.school_color;
      cssVariablesList['--newTextColor'] = templateData.school_text_color;
      cssVariablesList['--newTextColor70'] = templateData.school_text_color ? getColor(templateData.school_text_color, 0.7) : null;

      Object.keys(cssVariablesList).forEach(key => {
         document.body.style.setProperty(key, cssVariablesList[key]);
      });
   }, [template, siteInfo.all_school_room]);

   const getPortalMainData = (currentType) => {
      get(
         { query: `type=${ currentType === 'community' ? 1 : 0 }`, isMembership: currentType === 'membership' },
         (data) => {
            if (currentType === 'membership') {
               const cat = data.categories.sort((a, b) => {
                  return a.order - b.order;
               });
               setVideoProgram({ ...data, categories: cat });
               setCategories(cat);
               setOffers(data);
            } else {
               setOffers(data);
               setCategories(data.categories);
            }
         });
   };


   const onClickHeaderLink = (portalType) => {
      if (selectedOffer) {
         setSelectedOffer(null);
      }

      if (selectedOfferCourse) {
         setSelectedOfferCourse(null);
      }

      if (portalType === 'bundle' && offers && offers.data && !offers.data.length
      && filterData.search === '' && filterData.category_name === '') {
         history.push(`/portal/${ portalType }`);
         return;
      }
      setFilterData(
         {
            search: '',
            filter: 'none',
            sortBy: 'recently',
            filterCategory: 'none',
            category_name: '',
         }
      );

      history.push(`/portal/${ portalType }`);
      getPortalMainData(portalType);
   };


   const redirectMenu = (menu) => {
      if (isEditor) {
         if (window.location.pathname.includes('template1')) {
            getPortalMainData('membership');
         } else {
            getPortalMainData('onlinecourse');
         }
      } else if (menu[typeMembership]) {
         getPortalMainData(typeMembership);
      } else if (menu.membership || (!menu.community && !menu.bundle && !menu.onlinecourse)) {
         onClickHeaderLink('membership');
      } else if (menu.onlinecourse) {
         onClickHeaderLink('onlinecourse');
      } else if (menu.community) {
         onClickHeaderLink('community');
      } else if (menu.bundle) {
         onClickHeaderLink('bundle');
      }
   };

   const getPortalData = (menu) => {
      if (match && match.params && (match.params.link || match.params.playlistLink)) {
         getCategory({ link: match.params.link, playlistLink: match.params.playlistLink }, (res) => {
            setSingleCategory(res);
            if (match.params.playlistLink) {
               setSinglePlaylist(res);
            }
         });
      } else {
         redirectMenu(menu);
      }
   };


   const handlePortalMenu = () => {
      getPortalMenu({}, (res) => {
         setPortalMenuData(res);
         getPortalData(res);
      });
   };

   React.useEffect(() => {
      let templateName = null;
      if (window.location.pathname.includes('temp-portal') || isEditor) {
         templateName = localStorage.getItem('templateName');
      }  

      const findedSchoolRoom = templateName ? siteInfo.all_school_room.find(template => template.school_room_theme_name === templateName) : null;
      const selectedCourse = window.location.pathname.includes('bridge');
      if (!selectedCourse && !match?.path.includes('my-portals') && !window.location.pathname.includes('temp-portal')) {
         handlePortalMenu();
      } else if (window.location.pathname.includes('temp-portal')) {
         if (window.location.pathname.includes('template1')) {
            getPortalMainData('membership');
         } else {
            getPortalMainData('onlinecourse');
         }
      }
      const styleTag = document.createElement('style');
      const cssStrings = Object.keys(findedSchoolRoom ? findedSchoolRoom.css : schoolRoomSettings.css)
         .filter(key => key.includes('_css'))
         .map(key => {
            if (findedSchoolRoom) {
               return findedSchoolRoom.css[key].content;   
            } 
            return schoolRoomSettings.css[key].content;
         });

    
      const combinedCssString = cssStrings.join('\n');
      styleTag.innerHTML = combinedCssString;
      document.head.appendChild(styleTag);

      getFrontScripts();
      if (site.active_school_room && site.active_school_room.favicon) {
         document.querySelector("link[rel*='icon']").href = site.active_school_room.favicon;
      }

      return () => {
         if (document.head.contains(styleTag)) {
            document.head.removeChild(styleTag);
         }
      };
   }, [typeMembership]);


   const isFreeOffer = offer => {
      return offer.pricings ? offer.pricings.some((e) => e.pricing_type === 0) : true;
   };

   const handleChangeFilterData = (name, value, type) => {
      const newFilterData = {
         ...filterData,
         [name]: value,
         filterCategory: (name === 'filter' || name === 'category_name') ? type : filterData.filterCategory,
      };
      // get(`search=${ newFilterData.search || '' }&filter_by=${ newFilterData.filter }&sort_by=${ newFilterData.sortBy }&category_name=${ newFilterData.category_name }`, (data) => setOffers(data));
      // // Query with new Filter Data
      setFilterData(newFilterData);
      get(
         { query: `search=${ newFilterData.search || '' }&filter_by=${ newFilterData.filter }&sort_by=${ newFilterData.sortBy }&category_name=${ newFilterData.category_name }&type=${ typeMembership === 'community' ? 1 : 0 }`, isMembership: typeMembership === 'membership' },
         (data) => {
            if (typeMembership === 'membership') {
               const cat = data.categories.sort((a, b) => {
                  return a.order - b.order;
               });
               setVideoProgram({ ...data, categories: cat });
            } else {
               setOffers(data);
            }

            // if (!isEditor && data.length === 1) {
            //    QueryParams.setQueryParam('selectedOffer', data[0].plan.id);
            // }
         });
   };


   const handleFavorite = (offerId) => {
      if (!isEditor && !isPreview && auth) {
         toggleFavorite(offerId, (data) => {
            setOffers(offers.map((e) => {
               if (e.plan.id === offerId) {
                  return {
                     ...e,
                     plan: {
                        ...e.plan,
                        favorites: data === 1
                           ? e.plan.favorites.filter((f) => f.user_id !== auth.id)
                           : [...e.plan.favorites, data],
                     },
                  };
               }
               return e;
            }));
         });
      }
   };

   const checkIsFavorite = (offerId) => {
      // if (!auth) return false;
      // const currentOffer = offers.find(offer => offer.plan.id === offerId);

      // if (!currentOffer || !currentOffer.plan.favorites.length) return false;
      // const { plan: { favorites } } = currentOffer;
      // return Boolean(favorites.find(favorite => favorite.user_id === auth.id));
   };

   const handleExploerProduct = (id) => {
      getCourses(id, (data) => {
         setSelectedOffer({
            ...data,
            courses: { data: data.courses },
            isFree: isFreeOffer(data.plan),
         });
         QueryParams.setQueryParam('selectedOffer', id);
         const element = document.querySelector('.offer__explore');
         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
   };

   const goBackToOffers = () => {
      setSelectedOffer(null);
      QueryParams.deletQueryParam();
   };

   // const exlporeOfferCourse = (courseId) => {
   //    getCourseLessons(courseId, (data) => {
   //       QueryParams.setQueryParam('selectedOffer', selectedOffer.plan.id);
   //       QueryParams.setQueryParam('selectedCourse', courseId);

   //       setSelectedOfferCourse(data);
   //    });
   // };


   const exlporeOfferCourse = (course, categoryLink, lessonId, isPlaylist) => {
      if (course.type === '1' && categoryLink) {
         history.push(`/bridge/${ course.id }`);
         // QueryParams.setQueryParam('bridge', course.id);
         QueryParams.setQueryParam('video', lessonId);
         if (isPlaylist) {
            QueryParams.setQueryParam('playlist', isPlaylist);
         } else if (!isPlaylist) {
            QueryParams.setQueryParam('category', categoryLink || match.params.link);
         } 
         // setSelectedOfferCourse(course);
      } else {
         history.push(`/bridge/${ course.id }`);
         // QueryParams.setQueryParam('bridge', course.id);
         // setSelectedOfferCourse(course);
      }
   };

   const goBackToCourses = () => {
      if (QueryParams.get('isPreview')) {
         return;
      }
      if (selectedOfferCourse.type === '1') {
         history.push('/portal/membership');
      } else if (selectedOfferCourse.type === '0') {
         history.push('/portal/onlinecourse');
      }
      if (selectedOfferCourse.type === '2') {
         history.push('/portal/community');
      }
      setSelectedOfferCourse(null);
      // const ifExistOffers = typeMembership === 'membership' ? videoProgram : offers;
      // if (!ifExistOffers) {
      //    handlePortalMenu();
      // }
   };

   // for routing
   React.useEffect(() => {
      const selectedOffer = QueryParams.get('selectedOffer');
      const selectedCourse = window.location.pathname.includes('bridge');
      if (selectedCourse) {
         getCourseLessons(match.params.id, (courseData) => {
            if (Object.keys(courseData).length === 0) {
               window.location.href = '/portal/membership';
            }
            setSelectedOfferCourse(courseData);
            setIsInited(true);
         });
         return;
      }
      if (selectedOffer) {
         getCourses(selectedOffer, (data) => {
            setSelectedOffer({
               ...data,
               courses: { data: data.courses },
               isFree: isFreeOffer(data.plan),
            });
            if (selectedCourse) { // check if explored offer courses
               getCourseLessons(match.params.id, (courseData) => {
                  if (Object.keys(courseData).length === 0) {
                     window.location.href = '/portal/membership';
                  }
                  setSelectedOfferCourse(courseData);
                  setIsInited(true);
               });
               return;
            }
            setIsInited(true);
            const element = document.querySelector('.offer__explore');
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
         });
      }
      setIsInited(true);
   }, [QueryParams.get('selectedOffer'), window.location.pathname.includes('bridge')]);

   const handleToggleCourseLike = (id) => {
      toggleCourseLike(id, (data) => {
         setSelectedOffer({
            ...selectedOffer,
            courses: {
               data: selectedOffer.courses.data.map(item => {
                  if (item.id === id) {
                     return {
                        ...item,
                        liked: data !== 1,
                     };
                  }
                  return item;
               }),
            },
         });
      });
   };

   const goToCheckout = async (plan, course) => {
      let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ course?.checkout_url?.url || site.site_uuid }/0/${ plan.id }`;
      if (user && user.id) {
         const { data: checkoutToken } = await generateCheckoutToken({ planId: plan.id, pricingId: course.pricings[0].id });

         url = `${ process.env.REACT_APP_CHECKOUT_URL }${ course?.checkout_url?.url || site.site_uuid }/${ user.id }/${ plan.id }?jwt=${ checkoutToken }`;
      }
      if (plan.test_mode) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ plan.test_mode.token }/${ site.site_uuid }/0/${ plan.id }`;
      }
      window.open(url, '_blank');
   };

   const goToCheckoutFromCategory = (category) => {
      // let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ videoProgram?.offer?.checkout_url?.url || course?.checkout_url?.url || site.site_uuid }/0/${ planId }`;
      // if (user && user.id) {
      //    url = `${ process.env.REACT_APP_CHECKOUT_URL }${ videoProgram?.offer?.checkout_url?.url || course?.checkout_url?.url || site.site_uuid }/${ user.id }/${ planId }`;
      // }
      // window.open(url, '_blank');
      const membershipOffer = videoProgram?.offer;
      const defaultCourse = membershipOffer?.default_course ? membershipOffer.default_course[0] : null;
    
      const courseId = defaultCourse?.id || category.course_id;
    
      const isEnabledBridge = defaultCourse?.bridge_page?.enableBridge
        || category.bridge_page?.enableBridge
        || category.default_course?.bridge_page?.enableBridge;
    
      if (isEnabledBridge && !category.joined) {
         if (match.params.playlistLink) {
            exlporeOfferCourse(
               { id: courseId, type: '1' }, 
               category.link, 
               category.lessons?.[0]?.id,
               match.params.playlistLink
            );  
         } else {
            exlporeOfferCourse(
               { id: courseId, type: '1' }, 
               category.link, 
               category.lessons?.[0]?.id 
            );
         }
      } else if (category?.lessons?.[0]?.is_playlist) {
         history.push(`/programs/${ category.lessons[0].course_url }/playlists/${ category.lessons[0].link }`);
      } else if (match.params.playlistLink) {
         history.push(`/programs/${ category.course_url }/playlists/${ match.params.playlistLink }`);
      } else if (category.course_url) {
         history.push(`/programs/${ category.course_url }/${ category.link }`);
      } else if (category.lessons?.[0]) {
         history.push(`/programs/${ category.lessons[0].course_url }/${ category.link }`);
      }
   };

   const handleAttachMemberToFreeOffer = (planId, course, plan) => {
      if (course && ((course.joined && course.joined_status !== 3) || (plan && plan.joined))) {
         if (course.type === '2') {
            goTo(Router.route('FRONT_COMMUNITY').getCompiledPath({ id: course.community_id }));
         } else {
            goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
         }
         return;
      }
      attachMemberToFreeOffer(planId,
         (data) => {
            if (course) {
               if (course.type === '2') {
                  goTo(Router.route('FRONT_COMMUNITY').getCompiledPath({ id: course.community_id }));
               } else {
                  goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
               }
            } else {
               const splittedRedirectUrl = data.redirect_urls[0].course_url.split('/');
               const courseUrl = splittedRedirectUrl[splittedRedirectUrl.length - 1];
               goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: courseUrl }));
            }
         }
      );
   };

   const handleBuyOffer = (plan, course) => {
      if (plan && plan.publish_without_integrations) {
         return;
      }
      // if course
      if (plan.type && plan.type !== '2') {
         goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: plan.url }));
         return;
      } if (plan.type && plan.type === '2' && plan.community_id
       && plan.joined && plan.joined_status !== 3) {
         goTo(Router.route('FRONT_COMMUNITY').getCompiledPath({ id: course.community_id }));
      }
      // if (plan.active_landing_url) {
      //    const url = getLandingUrl(plan.active_landing_url);
      //    window.open(url, '_blank');
      //    return;
      // }

      // if 1 product bundle
      const isLogined = Boolean(user);
      if (isLogined && course && course.joined && course.joined_status !== 3) {
         if (course.type === '2') {
            goTo(Router.route('FRONT_COMMUNITY').getCompiledPath({ id: course.community_id }));
            return;
         }
         goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
         return;
      }
      const isAllPricingsFree = (plan && plan.pricings && plan.pricings.length && plan.pricings.length === 1
         && plan.pricings[0].pricing_type === 0);

      if (isAllPricingsFree) {
         if (!isLogined) {
            goTo(Router.route('LOGIN').getMask());
         } else {
            handleAttachMemberToFreeOffer(plan.id, course, plan);
         }
      } else {
         goToCheckout(plan, course);
      }
   };

   const handleClickCourseButton = (course, plan) => {
      const isAllPricingsFree = !plan.pricings.some(pricing => pricing.pricing_type !== 0);
      const isLogined = Boolean(user);
      const isCourseCommunity = course.type === '2';

      if (isLogined) {
         if (course.joined && course.joined_status !== 3) {
            if (isCourseCommunity) {
               goTo(Router.route('FRONT_COMMUNITY').getCompiledPath({ id: course.community_id }));
            } else {
               goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
            }
         } else if (isAllPricingsFree) {
            handleAttachMemberToFreeOffer(plan.id, course);
         } else if (isCourseCommunity) {
            goToCheckout(plan, course);
         } else {
            // exlporeOfferCourse(course.id);
            // goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
            const win = window.open(`${ Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }) }`);
            win.plan = plan;
         }
      } else if (isAllPricingsFree) {
         goTo(Router.route('LOGIN').getMask());
      } else if (isCourseCommunity) {
         goToCheckout(plan, course);
      } else {
         // exlporeOfferCourse(course.id);
         // goTo(Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }));
         const win = window.open(`${ Router.route('STUDENTS_ROOM').getCompiledPath({ id: course.url }) }`);
         win.plan = plan;
      }
   };
   // const getOffersCollectedById = () => {
   //    const restructuredData = {};
   //    if (offers && offers.length > 0) {
   //       offers.forEach(obj => {
   //          if (!restructuredData[obj.id]) {
   //             restructuredData[obj.id] = {
   //                id: obj.id, name: obj.name, order: obj.order, offers: [],
   //             };
   //          }
   //          if (!restructuredData[obj.id].offers.some(offer => offer.id === obj.plan.id)) {
   //             restructuredData[obj.id].offers.push(obj.plan);
   //          }
   //       });
   //    }

   //    return Object.values(restructuredData).sort((a, b) => a.order - b.order);
   // };


   const getOfferCategoriesSorted = () => {
      if (selectedOffer) {
         return selectedOffer.categories.sort((a, b) => a.order - b.order);
      }
   };


   const handleCategorySearch = (name, value) => {
      setCategorySearch(value);
      if (!!match && !!match.params && match.params.playlistLink) {
         const blocks = [...singlePlaylist.blocks];
         const filteredPlaylist = blocks.filter(
            (item) => item.lesson_name.toLowerCase().includes(value.toLowerCase()));
         setSingleCategory({ ...singleCategory, blocks: filteredPlaylist });
      } else {
         getCategorySearch(
            { link: match.params.link, search: value, playlistLink: match.params.playlistLink }, (res) => {
               setSingleCategory(res);
            });
      }
   };

   // useEffect(() => {
   //    if (isEditor) {
   //       ;
   //       if (window.location.pathname.includes('template1')) {
   //          getPortalMainData('membership');
   //       } else {
   //          getPortalMainData('onlinecourse');
   //       }
   //    } 
   // }, [isEditor]);

   return (
      <OfferContext.Provider value={ {
         site,
         user,
         filterData,
         handleChangeFilterData,
         data: typeMembership === 'membership' || window.location.pathname.includes('template1') ? videoProgram : offers,
         membershipOffer: videoProgram,
         template,
         schoolRoomSettings,
         isEditor,
         categories,
         onClickElement,
         handleDuplicateComponent,
         handleDeleteComponent,
         changeProp,
         deleteComponent,
         handleFavorite,
         uuid: site.site_uuid,
         isPreview,
         checkIsFavorite,
         selectedOffer,
         exploreOffer: (id) => handleExploerProduct(id),
         goBackToOffers,
         exploreCourse: exlporeOfferCourse,
         selectedOfferCourse,
         goBackToCourses,
         logout,
         isFreeOffer,
         login,
         globalBranding,
         handleToggleCourseLike,
         handleBuyOffer,
         handleClickCourseButton,
         selectedOfferCategories: getOfferCategoriesSorted(),
         closeEditor,
         products,
         onClickHeaderLink,
         type: window.location.pathname.includes('template1') ? 'membership' : typeMembership,
         dragStart,
         location,
         match,
         history,
         singleCategory,
         setSingleCategory,
         isCategoryFrontPage: !!match && !!match.params && (!!match.params.link || !!match.params.playlistLink),
         isPlaylistFrontPage: !!match && !!match.params && match.params.playlistLink,
         goToCheckoutFromCategory,
         categorySearch,
         handleCategorySearch,
         loadingCategorySearch,
         loadingData,
         loadingCategoryData,
         setSinglePlaylist,
         portalMenuData,
         viewMode: courseContainerProps?.viewMode,
         isPortal: !!location.pathname.includes('my-portals'),
         isBridgePage: window.location.pathname.includes('bridge'),
         handleAttachMemberToFreeOffer,
         typeMembership,
      } }
      >
         <ComponentProgress
            loading={
               !!match && !!match.params && (!!match.params.link || !!match.params.playlistLink) ? loadingCategoryData
                  : ((!match?.path.includes('my-portals') && !window.location.pathname.includes('bridge') && ((typeMembership === 'membership' || window.location.pathname.includes('template1')) ? videoProgram === null : offers === null)) || loadingPortalMenu || !isInited || isLoadingAttachMemberToFreeOffer || (window.location.pathname.includes('bridge') && getCourseLessonsLoading) || loadingProducts) }
         >
            {
               !isEditor ? (
                  <DragDropContext onDragEnd={ () => {} }>
                     <Offers />
                  </DragDropContext>
               ) : (
                  <Offers
                     addClass={ addClass }
                     toggleSectionComponent={ toggleSectionComponent }
                  />
               )
            }

         </ComponentProgress>
      </OfferContext.Provider>
   );
};

OffersContainer.propTypes = {
   site: PropTypes.object,
   user: PropTypes.object,
   getFrontScripts: PropTypes.func,
   // frontScripts: PropTypes.array,
   sections: PropTypes.array,
   isEditor: PropTypes.bool,
   deleteComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   addClass: PropTypes.func,
   settings: PropTypes.object,
   showEditableComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   changeProp: PropTypes.func,
   templateSettings: PropTypes.object,
   isPreview: PropTypes.bool,
   auth: PropTypes.object,
   courseContainerProps: PropTypes.object,
   logout: PropTypes.func,
   login: PropTypes.func,
   globalBranding: PropTypes.object,
   goTo: PropTypes.func,
   closeEditor: PropTypes.bool,
   previewMode: PropTypes.bool,
   dragStart: PropTypes.bool,
   match: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      site: siteInfoSelector(state),
      auth: authUserSelector(state),
      user: authUserSelector(state),
      // categories: selectors.categoriesListSelector(state),
      frontScripts: selectors.frontScriptsSelector(state),
   };
};


const mapDispatchToProps = (dispatch) => {
   return {
      getFrontScripts: async () => {
         await dispatch(operations.getFrontScriptsOperation());
      },
      logout: () => {
         const pathName = localStorage.getItem('isOnlineCourse');
         Auth.logout();
         if (pathName) {
            window.location = `/portal/${ pathName }`;
            localStorage.removeItem('isOnlineCourse');
         } else {
            window.location = '/portal/membership';
         }
      },
      login: (inputs) => {
         dispatch(loginStartOperation(inputs));
      },
      goTo: (location) => dispatch(push(location)),
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(OffersContainer);
