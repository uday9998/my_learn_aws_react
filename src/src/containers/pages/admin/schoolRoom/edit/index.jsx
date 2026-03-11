/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SectionEditable from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section/Editable';
import JoinEditable from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Join/Editable';
import EditableComponents from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/EditableComponents';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { siteInfoSelector } from 'state/modules/common/selectors';
import SchoolRoomTheme from 'views/pages/SchoolRoomTheme';
import {
   getSchoolRoomLanding, updateSchoolRoomLanding, getAllFrontCourses, updateSchoolRoomLandingSettings,
   getSchoolRoomLandingSettings, getPublishedLandings, updatActiveLandingUrl, updateIsActiveCustomUrl, getOnlyPublishedCourses,
   getGlobalBranding, updateGlobalBranding,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import withLoading from 'utils/withLoading';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import SiteHeader from 'views/layout/SiteHeader';
import Editor from 'views/pages/SchoolRoomTheme/Menu/Editor';
import {
   slug, DefaultClass,
} from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassComponent';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';
import {
   Text, Image, Video, Headline, Subheadline, Bullet1, Button, BulletEl, DividerData, FAQ, CustomCode, Banner,
   CallToAction, VideoSection, CountDown, LinkEl,
} from 'utils/pageBuilder/elements';
import isPrint from 'state/modules/designCourse/edit/Error';
import AdminContainer from 'views/layout/AdminContainer';
import ComponentProgress from 'components/modules/ComponentProgress';
import { SchoolRoomThemeHeader } from 'views/pages/SchoolRoomTheme/Header';
import { updatePortalSections } from 'state/modules/common/actions';


// import highlightSidebar from 'utils/pageBuilder/highlightSidebar';

const SchoolRoomLoading = withLoading('div');

const SchoolRoomEditContainer = (props) => {
   const dispatch = useDispatch();
   const siteInfo = useSelector(siteInfoSelector);
   const { match, match: { params: { landingType, landingId } } } = props;
   const { data, loading: loadingSections, setData: setSections } = useApiQuery(
      getSchoolRoomLanding, [{ landingId }]);
   const { data: offers, loading: loadingOffers, setDate: setOffers } = useApiQuery(
      getOnlyPublishedCourses);
   const { data: publishedLandings, loading: loadingLandings } = useApiQuery(
      getPublishedLandings);
   const sections = data && data.sections;
   const { data: schoolRoomTheme, loading, setData: setschoolRoomTheme } = useApiQuery(getSchoolRoomLandingSettings, [landingId]);
   const { data: globalBranding, loadingBranding, setData: setGlobalBranding } = useApiQuery(getGlobalBranding);
   const [updateGlobalBrandingFunc, { loading: updateLoading }] = useSubmitForm(updateGlobalBranding);
   const [updateSchoolRoomSettings, { loading: loadingSchoolRoomLandingSettings }] = useSubmitForm(updateSchoolRoomLandingSettings);
   const history = useHistory();
   const [viewMode, setViewMode] = useState('');
   const [activeMenu, setActiveMenu] = useState('sections');
   const [editableSection, setEditableSection] = useState(null);
   const [sectionsSubMenu, setSectionsSubMenu] = useState(false);
   const [undo, setUndo] = useState([]);
   const [redo, setRedo] = useState([]);
   const [menuVisible, setMenuVisible] = useState(true);
   const [addSectionMenu, setAddSectionMenu] = useState(false);
   const [currentSidebarComponent, setCurrentSidebarComponent] = useState('');
   const [currentSidebarMainComponent, setCurrentSidebarMainComponent] = useState('');
   const [currentSidebarMainSubComponent, setCurrentSidebarMainSubComponent] = useState('');
   const [editableSectionOrder, setEditableSectionOrder] = useState(null);
   const [updateSchoolRoomLandingFunc, { loading: loadingSchoolRoomSave }] = useSubmitForm(updateSchoolRoomLanding, {
      successMessage: 'Portal has been saved.',
   });
   const [updatActiveLandingUrlFunc] = useSubmitForm(updatActiveLandingUrl);
   const [updateIsActiveCustomUrlFunc] = useSubmitForm(updateIsActiveCustomUrl);

   const [editableClass, setEditableClass] = useState({
      isChanged: false,
      currentSlug: 0,
   });
   const [selectedClass, setSelectedClass] = useState('');
   const [openJoinButton, setOpenJoinButton] = useState(false);
   const [goTo, setGoTo] = useState('go_to_checkout');
   const [courseLandingList, setCourseLandingList] = useState({});
   const [offersLandingList, setOffersLandingList] = useState({});
   const [courseIsCustomUrlList, setCourseIsCustomUrlList] = useState({});
   const [dragStart, setDragStart] = useState(false);
   React.useEffect(() => {
      if (!loadingOffers) {
         const newList = {};
         offers.forEach((e) => {
            newList[e.id] = e.active_landing_url;
         });
         setOffersLandingList(newList);
      }
   }, [loadingOffers]);
   const showSection = (order, sectionId) => {
      setEditableSection(sections[order]);
      setSectionsSubMenu(!sectionsSubMenu);
      setEditableSectionOrder(order);
      const selectedSection = document.querySelector(`#right_container #${ sectionId }`);
      if (selectedSection) {
         selectedSection.scrollIntoView({ behavior: 'smooth' });
      } else {
      }
   };

   const editableSectionFunc = e => {
      e.preventDefault();
      if (activeMenu !== 'sections') {
         setActiveMenu('sections');
         setOpenJoinButton(false);
      }
      let sectionId;
      if (e.target.closest('.Section')) {
         sectionId = e.target.closest('.Section').dataset.slug;
         let currentSidebarComponentId;
         let currentSidebarMainComponentId;
         let currentSidebarMainSubComponentId;
         if (e.target.closest('.mark')) {
            currentSidebarComponentId = e.target.closest('.mark').dataset
               .slug;
         }
         if (e.target.closest('.bullets')) {
            currentSidebarMainComponentId = e.target.closest('.bullets').dataset
               .slug;
         }
         if (e.target.closest('.links')) {
            currentSidebarMainComponentId = e.target.closest('.links').dataset
               .slug;
         }
         if (e.target.closest('.testimonials')) {
            currentSidebarMainComponentId = e.target.closest('.testimonials').dataset
               .slug;
         }
         if (e.target.closest('.banner')) {
            currentSidebarMainComponentId = e.target.closest('.banner').dataset
               .slug;
         }
         if (e.target.closest('.school_room_slider')) {
            currentSidebarMainComponentId = e.target.closest('.school_room_slider').dataset
               .slug;
         }
         if (e.target.closest('.customcode_section_content')) {
            currentSidebarMainComponentId = e.target.closest('.customcode_section_content').dataset
               .slug;
         }
         if (e.target.closest('.faq_section_content')) {
            currentSidebarMainComponentId = e.target.closest('.faq_section_content').dataset
               .slug;
         }
         if (e.target.closest('.calltoaction_content')) {
            currentSidebarMainComponentId = e.target.closest('.calltoaction_content').dataset
               .slug;
         }
         if (e.target.closest('.video_content')) {
            currentSidebarMainComponentId = e.target.closest('.video_content').dataset
               .slug;
         }
         if (e.target.closest('.countdown_section_content')) {
            currentSidebarMainComponentId = e.target.closest('.countdown_section_content').dataset
               .slug;
         }
         if (e.target.closest('.classCard')) {
            currentSidebarMainComponentId = e.target.closest('.classCard').dataset
               .slug;
         }
         if (e.target.closest('.question_section_content')) {
            currentSidebarMainSubComponentId = e.target.closest('.question_section_content').dataset
               .slug;
         }
         if (e.target.closest('.slider_class')) {
            currentSidebarMainSubComponentId = e.target.closest('.slider_class').dataset
               .slug;
         }


         sections.forEach((section, order) => {
            if (section.school_room_section.slug === sectionId) {
               setEditableSection(sections[order]);
               setEditableSectionOrder(order);
               setSectionsSubMenu(true);
               setCurrentSidebarComponent(currentSidebarComponentId);
               setCurrentSidebarMainComponent(currentSidebarMainComponentId);
               setCurrentSidebarMainSubComponent(currentSidebarMainSubComponentId);
               setTimeout(() => {
                  setCurrentSidebarComponent('');
                  setCurrentSidebarMainComponent('');
                  setCurrentSidebarMainSubComponent('');
               }, 1200);
            }
         });
      }
   };

   const toggleSectionComponent = (e) => {
      e.preventDefault();

      if (e?.target?.closest('.item')) {
         const section = e.target.closest('.item');
         const sectionCurrentComponent = e.target.closest('.item').nextSibling;
         if (sectionCurrentComponent.style.display === 'none') {
            section.style.backgroundColor = '#E8F2F1';
            sectionCurrentComponent.style.display = 'block';
            section.children[0].style.background = 'inherit';
            if (section.children && section.children[1]) {
               section.children[1].style.transform = 'rotate(-90deg)';
            }
         } else {
            section.style.backgroundColor = 'inherit';
            sectionCurrentComponent.style.display = 'none';
            section.children[0].style.background = 'inherit';
            if (section.children && section.children[1]) {
               section.children[1].style.transform = 'rotate(90deg)';
            }
         }
      } 
   };
   const backToCurrentMenu = () => {
      setSectionsSubMenu(false);
      setMenuVisible(true);
      setEditableSection(null);
      setOpenJoinButton(false);
      setGoTo('go_to_checkout');
      setSelectedClass('');
   };

   const undoTheme = () => {
      if (undo.length > 0) {
         redo.push(JSON.stringify(sections));
         const newSections = {
            ...data,
            sections: [
               ...(JSON.parse(undo[undo.length - 1])),
            ],
         };
         setSections(newSections);
         // setEditableSection(JSON.parse(undo[undo.length - 1])[editableSectionOrder]);
         setEditableSection(newSections.sections[editableSectionOrder]);
         setUndo(prev => {
            return [
               ...prev.slice(0, prev.length - 1),
            ];
         });
      } else if (isPrint('Nothing to undo')) {
         toast.error('Nothing to undo');
      }
   };

   const redoTheme = () => {
      if (redo.length > 0) {
         undo.push(JSON.stringify(sections));
         const newSections = {
            ...data,
            sections: [
               ...JSON.parse(redo[redo.length - 1]),
            ],
         };
         setSections(newSections);
         // setEditableSection(JSON.parse(redo[redo.length - 1])[editableSectionOrder]);
         setEditableSection(newSections.sections[editableSectionOrder]);
         undo.push(redo[redo.length - 1]);
         setRedo(prev => {
            return [
               ...prev.slice(0, prev.length - 1),
            ];
         });
      } else if (isPrint('Nothing to redo')) {
         toast.error('Nothing to redo');
      }
   };

   const getBackgroundTypeSection = (propsName, value) => {
      switch (propsName) {
         case 'bgImgSrc':
            if (!value) {
               return 'color';
            }
            return 'image';
         case 'bgColor':
            return 'color';
         default:
            return '';
      }
   };

   const changeProp = (value, propsName, type, currentIndex, currentSubIndex, isClass, offer, currentSubofSubIndex) => {
      const sectionChangeValue = [...sections];
      // if (propsName === 'school_slider_status' && value) {
      //    highlightSidebar(sectionChangeValue[2].school_room_components[1].slug, setMenuVisible(true), menuVisible);
      // }
      undo.push(JSON.stringify(sections));
      if (propsName === 'school_logo') {
         setGlobalBranding({
            ...globalBranding,
            'school_logo': value,
         });
      } else if (type === 'section') {
         if (propsName === 'school_slider_status') {
            sectionChangeValue[2].school_room_section.props[propsName] = value;
         } else if (editableSectionOrder !== null) {
            sectionChangeValue[editableSectionOrder].school_room_section.props.background_type = getBackgroundTypeSection(propsName, value);
            sectionChangeValue[editableSectionOrder].school_room_section.props[propsName] = value;
         }
      } else if (type === 'component' && editableSectionOrder !== null) {
         sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].props[propsName] = value;
      } else if (type === 'subcomponent' && editableSectionOrder !== null) {
         sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent[currentSubIndex].props[propsName] = value;
      } else if (type === 'subOfSubComponent' && editableSectionOrder !== null) {
         sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent[currentSubIndex].subcomponent[currentSubofSubIndex].props[propsName] = value;
      }
      // if (isClass && propsName === 'product_id') {
      //    sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent[currentSubIndex].offer = offer;
      // }

      if ((currentIndex || currentIndex === 0) && editableSectionOrder !== null && (sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].type === 'slider'
         || sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].type === 'banner')) {
         if (sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].type === 'banner') {
            setEditableClass({
               isChanged: true,
               currentSlug: sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].slug,
            });
         } else if (currentSubIndex !== undefined) {
            setEditableClass({
               isChanged: true,
               currentSlug: sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent[currentSubIndex].slug,
            });
         }
      }
      // if (type === 'slider') {
      //    setschoolRoomTheme({
      //       ...schoolRoomTheme,
      //       [propsName]: value,
      //    });
      // }
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };


   const saveSchoolRoom = (isExit) => {
      let sliderCourses = [];
      if (!!data.sections[2].school_room_components[1].subcomponent && data.sections[2].school_room_components[1].subcomponent.length) {
         sliderCourses = data.sections[2].school_room_components[1].subcomponent.filter((course) => !!course.props.product_id === true);
      }
      data.sections[2].school_room_components[1].subcomponent = sliderCourses;
      // const sliderStatus = schoolRoomTheme.school_slider_status;
      updateGlobalBrandingFunc(globalBranding);
      updatActiveLandingUrlFunc({ data: offersLandingList });
      updateIsActiveCustomUrlFunc({ data: courseIsCustomUrlList });
      // updateSchoolRoomSettings({ landingId, data: { school_slider_status: sliderStatus } });
      updateSchoolRoomLandingFunc({ landingId, sections: data }, (res) => {
         dispatch(updatePortalSections({
            ...data,
            sections: [
               ...res.sections,
            ],
         }));
         setSections({
            ...data,
            sections: [
               ...res.sections,
            ],
         });
         backToCurrentMenu();

         if (isExit) {
            history.push('/admin/portal');
         }
      });
   };

   const addClass = (componentSlug, classType, customOrder) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const slider = sectionChangeValue[editableSectionOrder || customOrder].school_room_components.filter(component => component.slug
         === componentSlug)[0].subcomponent;
      const sliderLength = slider.length;
      const ClassTemplate = DefaultClass;

      // if (landingType === 'template2') {
      //    ClassTemplate = Class2;
      // } else if (landingType === 'template3') {
      //    ClassTemplate = Class3;
      // }
      // if (landingType === 'template1') {
      //    ClassTemplate = OldDefaultClass;
      // }
      // if (landingType === 'template2') {
      //    ClassTemplate = Class2;
      // } else if (landingType === 'template3') {
      //    ClassTemplate = Class3;
      // }
      slider.splice(sliderLength, 0, ClassTemplate(slug, classType));
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const deleteClass = (currentIndex, currentSubIndex) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const slider = sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent;
      slider.splice(currentSubIndex, 1);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };


   const deleteComponent = (currentIndex, sectionIndex) => {
      undo.push(JSON.stringify(sections));

      const sectionChangeValue = [...sections];
      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].school_room_components;
         components[currentIndex].props.deleted = true;
      } else {
         const components = sectionChangeValue[editableSectionOrder].school_room_components;
         components[currentIndex].props.deleted = true;
      }
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const handleDuplicateComponent = (currentIndex, sectionIndex) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].school_room_components;
         const randomSlug = `miestro-${ new Date().getTime() }${ Math.floor(Math.random() * 10000) }`;
         const currentComponent = JSON.parse(JSON.stringify(components[currentIndex]));
         const duplicatedComponent = {
            slug: randomSlug,
            type: currentComponent.type,
            name: currentComponent.name,
            props: currentComponent.props,
         };
         if (currentComponent.subcomponent) {
            duplicatedComponent.subcomponent = currentComponent.subcomponent;
         }
         sectionChangeValue[sectionIndex].school_room_components.splice(currentIndex + 1, 0, duplicatedComponent);
      }
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const handleDeleteComponent = (currentIndex, sectionIndex) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].school_room_components;
         components[currentIndex].props.deleted = true;
      }
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const addBullet = (componentSlug) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const bullets = sectionChangeValue[editableSectionOrder].school_room_components.filter(component => component.slug === componentSlug)[0].subcomponent;
      const bulletsLength = bullets.length;
      const bullet = BulletEl(slug);
      bullets.splice(bulletsLength, 0, bullet);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const deleteBullet = (currentIndex, currentSubIndex) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const bullets = sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent;
      bullets.splice(currentSubIndex, 1);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const addLink = (componentSlug) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const links = sectionChangeValue[editableSectionOrder].school_room_components.filter(component => component.slug === componentSlug)[0].subcomponent;
      const linksLength = links.length;
      const link = LinkEl(slug);
      links.splice(linksLength, 0, link);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const deleteLink = (currentIndex, currentSubIndex) => {
      undo.push(JSON.stringify(sections));
      const sectionChangeValue = [...sections];
      const links = sectionChangeValue[editableSectionOrder].school_room_components[currentIndex].subcomponent;
      links.splice(currentSubIndex, 1);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };


   const showEditableComponent = (component, key, index, subIndex, subofSubIndex) => {
      let Component;
      if (key === -1) {
         Component = SectionEditable;
      } else if (key === 'join') {
         Component = JoinEditable;
      } else {
         Component = EditableComponents(component.type);
      }
      return (
         <div>
            <Component
               { ...component.props }
               section={ editableSectionOrder }
               slug={ component.slug }
               key={ key }
               scroll={ component.slug === currentSidebarComponent || component.slug === currentSidebarMainComponent
                  || component.slug === currentSidebarMainSubComponent }
               toggleSidebar={ () => setMenuVisible(true) }
               menuVisible={ menuVisible }
               globalBranding={ globalBranding }
               changeProp={ changeProp }
               index={ index }
               subIndex={ subIndex }
               subofSubIndex={ subofSubIndex }
               deleteBullet={ deleteBullet }
               deleteLink={ deleteLink }
               deleteTestimonial={ () => { } }
               offers={ offers }
               deleteClass={ deleteClass }
               offers1={ offers }
               title='Banner Title'
               landing={ schoolRoomTheme }
               slider={ sections[2].school_room_components[1] }
               selectedClass={ selectedClass }
               setSelectedClass={ setSelectedClass }
               goTo={ goTo }
               setGoTo={ setGoTo }
               publishedLandings={ publishedLandings }
               courseLandingList={ courseLandingList }
               offersLandingList={ offersLandingList }
               setOffersLandingList={ setOffersLandingList }
               setCourseLandingList={ setCourseLandingList }
               setCourses={ setOffers }
               courseIsCustomUrlList={ courseIsCustomUrlList }
               setCourseIsCustomUrlList={ setCourseIsCustomUrlList }
            />
         </div>
      );
   };

   const handleElementOnDragEnd = (result) => {
      setDragStart(false);
      undo.push(JSON.stringify(sections));
      const { source, destination, draggableId } = result;
      if (!destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }

      if (destination && destination.droppableId === 'sliderComponent') {
         const sliderCourses = data.sections[2].school_room_components[1].subcomponent;

         let draggableComponent;
         if (destination.droppableId === 'sliderComponent') {
            sliderCourses.forEach((component) => {
               if (component.slug === draggableId) {
                  draggableComponent = component;
               }
            });
            sliderCourses.splice(source.index, 1);
            sliderCourses.splice(destination.index, 0, draggableComponent);
            setSections(data);
         }
         return;
      }

      if (destination && destination.droppableId === 'newElements') {
         return;
      }
      if (destination && destination.droppableId !== source.droppableId && source.droppableId !== 'newElements') {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      const newSections = [...sections];
      const currentSection = newSections.filter((section) => section.school_room_section.slug === destination.droppableId)[0];
      let draggableComponent;
      currentSection.school_room_components.forEach((component) => {
         if (component.slug === draggableId) {
            draggableComponent = component;
         }
      });
      if (source.droppableId !== 'newElements') {
         currentSection.school_room_components.splice(source.index, 1);
         currentSection.school_room_components.splice(destination.index, 0, draggableComponent);
      } else {
         let componentType = Text;
         switch (draggableId) {
            case 'Headline': componentType = Headline();
               break;
            case 'Subheadline': componentType = Subheadline();
               break;
            case 'Text': componentType = Text();
               break;
            case 'Bullet': componentType = Bullet1();
               break;
            case 'Button': componentType = Button();
               break;
            case 'Image': componentType = Image();
               break;
            case 'Video': componentType = Video();
               break;
            case 'Divider': componentType = DividerData(slug);
               break;
            case 'FAQ': componentType = FAQ(slug);
               break;
            case 'CallToAction': componentType = CallToAction(slug);
               break;
            case 'CustomCode': componentType = CustomCode(slug);
               break;
            case 'Banner': componentType = Banner(slug);
               break;
            case 'CountDown': componentType = CountDown(slug);
               break;
            case 'VideoSection': componentType = VideoSection(slug);
               break;
            default:
         }

         currentSection.school_room_components.splice(destination.index, 0, componentType);
      }
      currentSection.school_room_components.forEach((component, i) => {
         const orderedComponent = component;
         orderedComponent.props.order = i;
      });
      setSections({
         ...data,
         sections: [
            ...newSections,
         ],
      });
   };
   const handleElementSchoolRoomOnDragEnd = () => { };

   const updateTempSchoolRoom = () => {
      const win = window.open(`/temp-portal/${ landingId }`, '_blank');
      win.sections = sections;
      win.offers = offers;
      win.landing = schoolRoomTheme;
   };
   const handleJoin = (e, courseId, activeLandingUrl, isCustomUrl) => {
      e.stopPropagation();
      setSelectedClass(courseId);
      setEditableSection(sections[4]);
      setSectionsSubMenu(true);
      setOpenJoinButton(true);
      if ((Object.keys(courseIsCustomUrlList).length === 0 && isCustomUrl) || courseIsCustomUrlList[courseId]) {
         setGoTo('custom_url');
      } else if (Object.keys(courseLandingList).length === 0 && activeLandingUrl) {
         setGoTo('go_to_landing');
      } else if (courseLandingList[courseId]) {
         setGoTo('go_to_landing');
      } else {
         setGoTo('go_to_checkout');
      }
   };
   const schoolRoomThemTitleFunc = (themeName) => {
      let themeTitle = 'Spiritual leader';
      switch (themeName) {
         case 'template2': themeTitle = 'Ballerina';
            break;
         case 'template3': themeTitle = 'Yoga';
            break;
         default:
      }
      return themeTitle;
   };
   const onDragStart = () => {
      setDragStart(true);
   };

   const userAgent = navigator.userAgent.toLowerCase();
   return (
      <AdminContainer>
         <ComponentProgress loading={ loadingSections || loadingOffers || loading || loadingLandings || loadingBranding }>
            <div 
               style={ {
                  marginTop: userAgent.includes('safari') && !userAgent.includes('chrome') ? 0 : '73px',
               } } 
               className='schoolroom__editor'
            >

               <DragDropContext onDragEnd={ handleElementOnDragEnd } onDragStart={ onDragStart }>
                  <SchoolRoomThemeHeader
                     undo={ undoTheme }
                     redo={ redoTheme }
                     viewMode={ viewMode }
                     setViewMode={ setViewMode }
                     save={ saveSchoolRoom }
                     templateName={ schoolRoomTheme ? schoolRoomThemTitleFunc(schoolRoomTheme.school_room_theme_name) : '' }
                     updateTempSchoolRoom={ updateTempSchoolRoom }
                     sections={ sections }
                  />
                  <Editor
                     editableSection={ editableSection }
                     sectionsSubMenu={ sectionsSubMenu }
                     backToCurrentMenu={ backToCurrentMenu }
                     showEditableComponent={ showEditableComponent }
                     toggleSectionComponent={ toggleSectionComponent }
                     addBullet={ addBullet }
                     addTestimonial={ () => { } }
                     addClass={ addClass }
                     changeProp={ changeProp }
                     sections={ sections }
                     showSection={ showSection }
                     setActiveMenu={ setActiveMenu }
                     activeMenu={ activeMenu }
                     deleteComponent={ deleteComponent }
                     deleteClass={ deleteClass }
                     addSectionMenu={ addSectionMenu }
                     setAddSectionMenu={ setAddSectionMenu }
                     addLink={ addLink }
                     landing={ schoolRoomTheme }
                     globalBranding={ globalBranding }
                     openJoinButton={ openJoinButton }
                     setOpenJoinButton={ setOpenJoinButton }
                  />
                  <SchoolRoomTheme
                     sections={ sections }
                     dragStart={ dragStart }
                     globalBranding={ globalBranding }
                     showSection={ showSection }
                     undo={ undoTheme }
                     redo={ redoTheme }
                     saveSchoolRoom={ saveSchoolRoom }
                     toggleSectionComponent={ toggleSectionComponent }
                     showEditableComponent={ showEditableComponent }
                     offers={ offers }
                     handleElementOnDragEnd={ handleElementOnDragEnd }
                     loading={ loadingSchoolRoomLandingSettings || loadingSchoolRoomSave }
                     editableSectionFunc={ editableSectionFunc }
                     // course={ course }
                     setActiveMenu={ setActiveMenu }
                     updateTempSchoolRoom={ updateTempSchoolRoom }
                     handleElementSchoolRoomOnDragEnd={ handleElementSchoolRoomOnDragEnd }
                     landing={ schoolRoomTheme }
                     deleteComponent={ deleteComponent }
                     editableClass={ editableClass }
                     viewMode={ viewMode }
                     setViewMode={ setViewMode }
                     changeProp={ changeProp }
                     handleJoin={ handleJoin }
                     openJoinButton={ openJoinButton }
                     setOpenJoinButton={ setOpenJoinButton }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     handleDeleteComponent={ handleDeleteComponent }
                     match={ match }
                     addClass={ addClass }
                  />
               </DragDropContext>
            </div>
         </ComponentProgress>
      </AdminContainer>
   );
};

SchoolRoomEditContainer.propTypes = {
   match: PropTypes.object,
};


export default SchoolRoomEditContainer;
