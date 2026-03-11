/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import SectionEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section/Editable';
import Editor from 'views/pages/DesignCourse/CheckoutTemplate/Menu/Editor';
import CheckoutTheme from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutTheme';
import {
   BulletEl1, BulletEl2, Testimonial1, Testimonial2, slug,
} from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutSectionsDefaultTest';
import EditableComponents from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/EditableComponents';
import {
   getCheckoutLanding,
   updateCheckoutLanding,
} from 'api/AuthApi';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   Headline, Subheadline, Text, Bullet1, Bullet2, Button,
   Image, Video, CheckoutDividerData, CheckoutFaqData,
} from 'utils/pageBuilder/elements';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './index.scss';
import isPrint from 'state/modules/designCourse/edit/Error';
import { updateCourseSettings } from 'state/modules/designCourse/edit/actions';

//
import CheckoutHeader from './CheckoutHeader';

const CheckoutTemplate = ({
   course,
   location,
   landingId,
   customFieldsData,
   siteInfo,
   changeCourse,
   offerId,
   templateName,
}) => {
   const { data, loading: loadingSections, setData: setSections } = useApiQuery(
      getCheckoutLanding,
      [{ offerId, landingId }]
   );
   const sections = data && data.sections;

   const [viewMode, setViewMode] = useState('');
   const [activeMenu, setActiveMenu] = useState('sections');
   const [editableSection, setEditableSection] = useState(null);
   const [sectionsSubMenu, setSectionsSubMenu] = useState(false);
   const [menuVisible, setMenuVisible] = useState(true);
   const [undo, setUndo] = useState([]);
   const [redo, setRedo] = useState([]);
   const [currentSidebarComponent, setCurrentSidebarComponent] = useState('');
   const [currentSidebarMainComponent, setCurrentSidebarMainComponent] = useState('');
   const [editableSectionOrder, setEditableSectionOrder] = useState(null);
   const [updateCheckoutLandingFunc, { loading }] = useSubmitForm(updateCheckoutLanding, {
      successMessage: 'Checkout has been saved.',
   });
   const [getCheckoutLandingFunc] = useSubmitForm(getCheckoutLanding);

   const [courseTemplate, setCourseTemplate] = useState(JSON.parse(JSON.stringify(course)));
   const [stringifyData, setStringifyData] = useState('');
   const history = useHistory();

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
      }
      let sectionId;
      if (e.target.closest('.Section')) {
         sectionId = e.target.closest('.Section').dataset.slug;
         let currentSidebarComponentId;
         let currentSidebarMainComponentId;

         if (e.target.closest('.mark')) {
            currentSidebarComponentId = e.target.closest('.mark').dataset.slug;
         }

         if (e.target.closest('.bullets')) {
            currentSidebarMainComponentId = e.target.closest('.bullets').dataset.slug;
         }
         if (e.target.closest('.testimonials')) {
            currentSidebarMainComponentId = e.target.closest('.testimonials').dataset.slug;
         }

         sections.forEach((section, order) => {
            if (section.checkout_section.slug === sectionId) {
               setEditableSection(sections[order]);
               setEditableSectionOrder(order);
               setSectionsSubMenu(true);
               setCurrentSidebarComponent(currentSidebarComponentId);
               setCurrentSidebarMainComponent(currentSidebarMainComponentId);
               setTimeout(() => {
                  setCurrentSidebarComponent('');
                  setCurrentSidebarMainComponent('');
               }, 1200);
            }
         });
      }
   };

   const toggleSectionComponent = e => {
      e.preventDefault();
      if (e.target.closest('.item')) {
         const sectionCurrentComponent = e.target.closest('.item').nextSibling;
         if (sectionCurrentComponent.style.display === 'none') {
            sectionCurrentComponent.style.display = 'block';
            if (e.target.children && e.target.children[1]) {
               e.target.children[1].classList.add('component_arrow__up');
            }
         } else {
            sectionCurrentComponent.style.display = 'none';
            if (e.target.children && e.target.children[1]) {
               e.target.children[1].classList.remove('component_arrow__up');
            }
         }
      }
   };
   const undoTheme = () => {
      if (undo.length > 0) {
         setRedo([
            ...redo,
            [JSON.stringify(sections), JSON.stringify(courseTemplate)],
         ]);
         setSections({
            ...data,
            sections: [
               ...JSON.parse(undo[undo.length - 1][0]),
            ],
         });
         setCourseTemplate({
            ...JSON.parse(undo[undo.length - 1][1]),
         });
         setEditableSection(JSON.parse(undo[undo.length - 1][0])[editableSectionOrder]);
         setUndo([
            ...undo.filter((e) => undo.indexOf(e) !== undo.length - 1),
         ]);
      } else if (isPrint('Nothing to undo')) {
         toast.error('Nothing to undo');
      }
   };
   const redoTheme = () => {
      if (redo.length > 0) {
         setUndo([
            ...undo,
            [JSON.stringify(sections), JSON.stringify(courseTemplate)],
         ]);
         setSections({
            ...data,
            sections: [
               ...JSON.parse(redo[redo.length - 1][0]),
            ],
         });
         setCourseTemplate({
            ...JSON.parse(redo[redo.length - 1][1]),
         });
         setEditableSection(JSON.parse(redo[redo.length - 1][0])[editableSectionOrder]);
         setRedo([
            ...redo.filter((e) => redo.indexOf(e) !== redo.length - 1),
         ]);
      } else if (isPrint('Nothing to redo')) {
         toast.error('Nothing to redo');
      }
   };

   const changeProp = (value, propsName, type, currentIndex, currentSubIndex, isCourse) => {
      const a = [JSON.stringify(sections), JSON.stringify(courseTemplate)];
      const sectionChangeValue = [...sections];

      if (editableSectionOrder !== null) {
         if (type === 'section') {
            sectionChangeValue[editableSectionOrder].checkout_section.props[propsName] = value;
         } else if (type === 'component') {
            if (isCourse) {
               changeCourse({
                  ...course,
                  [propsName]: value,
               });
               setCourseTemplate({
                  ...courseTemplate,
                  [propsName]: value,
               });
            } else {
               sectionChangeValue[editableSectionOrder].checkout_components[currentIndex].props[propsName] = value;
            }
         } else if (type === 'subcomponent') {
            sectionChangeValue[editableSectionOrder].checkout_components[currentIndex].subcomponent[currentSubIndex].props[propsName] = value;
         }
         undo.push(a);
         setSections({
            ...data,
            sections: [
               ...sectionChangeValue,
            ],
         });
      }
   };
   const deleteBullet = (currentIndex, currentSubIndex) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      const bullets = sectionChangeValue[editableSectionOrder].checkout_components[currentIndex].subcomponent;
      bullets.splice(currentSubIndex, 1);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const deleteTestimonial = (currentIndex, currentSubIndex) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      const testimonials = sectionChangeValue[editableSectionOrder].checkout_components[currentIndex].subcomponent;
      testimonials.splice(currentSubIndex, 1);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const addTestimonial = (componentSlug) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      const testimonials = sectionChangeValue[editableSectionOrder].checkout_components.filter(component => component.slug === componentSlug)[0].subcomponent;
      const testimonialsLength = testimonials.length;
      const testimonial = (location === '#checkout/template2' || location === '#checkout/template3') ? Testimonial2(slug) : Testimonial1(slug);
      testimonials.splice(testimonialsLength, 0, testimonial);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const addBullet = (componentSlug) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      const bullets = sectionChangeValue[editableSectionOrder].checkout_components.filter(component => component.slug === componentSlug)[0].subcomponent;
      const bulletsLength = bullets.length;
      const bullet = (location === '#checkout/template2' || location === '#checkout/template3') ? BulletEl2(slug) : BulletEl1(slug);
      bullets.splice(bulletsLength, 0, bullet);
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const deleteComponent = (currentIndex, sectionIndex) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].checkout_components;
         components[currentIndex].props.deleted = true;
      } else {
         const components = sectionChangeValue[editableSectionOrder].checkout_components;
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
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];
      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].checkout_components;
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
         sectionChangeValue[sectionIndex].checkout_components.splice(currentIndex + 1, 0, duplicatedComponent);
      }
      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const handleDeleteComponent = (currentIndex, sectionIndex) => {
      undo.push([JSON.stringify(sections), JSON.stringify(courseTemplate)]);
      const sectionChangeValue = [...sections];

      if (sectionIndex !== undefined) {
         const components = sectionChangeValue[sectionIndex].checkout_components;
         components[currentIndex].props.deleted = true;
      }

      setSections({
         ...data,
         sections: [
            ...sectionChangeValue,
         ],
      });
   };

   const saveCheckout = (isExit) => {
      updateCheckoutLandingFunc({ offerId: course.id, landingId, sections: data }, (res) => {
         if (isExit) {
            history.push(`/admin/bundles/${ offerId }/edit#checkout`);
            return;
         }

         getCheckoutLandingFunc({ offerId, landingId }, (res) => {
            setSections(res);

            const sections = res?.sections;

            if (!editableSection) return;

            setEditableSection(prev => {
               const currentEditableSection = sections.find(section => section.checkout_section.slug === prev.checkout_section.slug);

               return currentEditableSection;
            });
         });
      });
      // if (course.name) {
      //    updateCheckoutLandingFunc({ offerId: course.id, landingId, sections: data }, (res) => {
      //       setSections({
      //          ...data,
      //          sections: [
      //             ...res.sections,
      //          ],
      //       });
      //       ;
      //       if (isExit) {
      //          history.push(`/admin/courses/${ course.id }/edit#checkout`);
      //       }
      //    });
      //    updateCourse({
      //       id: courseTemplate.id,
      //       inputs: {
      //          name: courseTemplate.name,
      //          thumbnail_image: courseTemplate.thumbnail_image,
      //       },
      //    }, () => {
      //    });
      //    updateCourseSettingsAction({
      //       name: courseTemplate.name,
      //       thumbnail_image: courseTemplate.thumbnail_image,
      //    });
      // } else {
      //    toast.error('Please add name of course');
      // }
   };

   const updateTempCheckout = () => {
      const tempName = location.split('/')[1];

      if (tempName) {
         window.open(`/temp-checkout/${ tempName }/${ offerId }/${ landingId }`, '_blank');

         const previewData = { sections, course };
         localStorage.setItem('previewData', JSON.stringify(previewData));
      }
   };

   const getNewElementData = (componentType) => {
      let newElementDataCaller = Text;
      switch (componentType) {
         case 'Headline': newElementDataCaller = Headline;
            break;
         case 'Subheadline': newElementDataCaller = Subheadline;
            break;
         case 'Text': newElementDataCaller = Text;
            break;
         case 'Bullet': newElementDataCaller = Bullet1;
            break;
         case 'Button': newElementDataCaller = Button;
            break;
         case 'Image': newElementDataCaller = Image;
            break;
         case 'Video': newElementDataCaller = Video;
            break;
         case 'Divider': newElementDataCaller = CheckoutDividerData;
            break;
         case 'FAQ': newElementDataCaller = CheckoutFaqData;
            break;
         default:
      }
      if (location === '#checkout/template2' && componentType === 'Bullet') {
         newElementDataCaller = Bullet2;
      }
      if (location === '#checkout/template3' && componentType === 'Bullet') {
         newElementDataCaller = Bullet2;
      }

      return newElementDataCaller();
   };

   const handleElementOnDragEnd = (result) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      if (destination.droppableId === 'newElements') return;

      const { 0: draggedId, 1: componentType } = draggableId.split('_');

      if (componentType === 'logo') {
         if (isPrint("This element can't be moved to another area.")) {
            toast.error("This element can't be moved to another area.");
         }
         return;
      }

      const stringifiedSection = JSON.stringify(sections);
      const newSection = JSON.parse(stringifiedSection);

      let draggedComponent = null;

      if (source.droppableId === 'newElements') {
         // for new element draggedId is componentType
         draggedComponent = getNewElementData(draggedId);
      } else {
         const sourceSection = newSection.find((section) => section.checkout_section.slug === source.droppableId);

         draggedComponent = sourceSection.checkout_components.find(component => component.slug === draggedId);

         if (draggedComponent) {
            sourceSection.checkout_components.splice(source.index, 1);
         }
      }

      if (!draggedComponent) return;

      const destinationSection = newSection.find((section) => section.checkout_section.slug === destination.droppableId);

      destinationSection.checkout_components.splice(destination.index, 0, draggedComponent);
      destinationSection.checkout_components.forEach((component, i) => { component.props.order = i; });

      undo.push([stringifiedSection, JSON.stringify(courseTemplate)]);
      setSections({
         ...data,
         sections: [...newSection],
      });
   };

   const backToCurrentMenu = () => {
      setSectionsSubMenu(false);
      setMenuVisible(true);
      setEditableSection(null);
   };

   const showEditableComponent = (component, key, index, subIndex) => {
      let Component;
      if (key === -1) {
         Component = SectionEditable;
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
               scroll={ component.slug === currentSidebarComponent || component.slug === currentSidebarMainComponent }
               toggleSidebar={ () => setMenuVisible(true) }
               menuVisible={ menuVisible }
               changeProp={ changeProp }
               index={ index }
               subIndex={ subIndex }
               deleteBullet={ deleteBullet }
               deleteTestimonial={ deleteTestimonial }
               course={ courseTemplate }
               siteInfo={ siteInfo }
               templateName={ templateName }
            />
         </div>
      );
   };

   return (
      !loadingSections && data && (
         <DragDropContext onDragEnd={ handleElementOnDragEnd }>
            <div className='checkout'>
               <CheckoutHeader
                  undo={ undoTheme }
                  redo={ redoTheme }
                  viewMode={ viewMode }
                  setViewMode={ setViewMode }
                  saveCheckout={ saveCheckout }
                  updateTempCheckout={ updateTempCheckout }
                  stringifyData={ stringifyData }
                  sections={ JSON.stringify(sections) }
               />
               <div className='d-checkout w-full'>
                  <Editor
                     editableSection={ editableSection }
                     sectionsSubMenu={ sectionsSubMenu }
                     backToCurrentMenu={ backToCurrentMenu }
                     showEditableComponent={ showEditableComponent }
                     toggleSectionComponent={ toggleSectionComponent }
                     addBullet={ addBullet }
                     addTestimonial={ addTestimonial }
                     sections={ sections }
                     showSection={ showSection }
                     setActiveMenu={ setActiveMenu }
                     activeMenu={ activeMenu }
                     deleteComponent={ deleteComponent }
                  />
                  <CheckoutTheme
                     undo={ undoTheme }
                     redo={ redoTheme }
                     sections={ sections }
                     showSection={ showSection }
                     saveCheckout={ saveCheckout }
                     toggleSectionComponent={ toggleSectionComponent }
                     showEditableComponent={ showEditableComponent }
                     loading={ loading }
                     editableSectionFunc={ editableSectionFunc }
                     course={ courseTemplate }
                     templateName={ templateName }
                     setActiveMenu={ setActiveMenu }
                     updateTempCheckout={ updateTempCheckout }
                     customFieldsData={ customFieldsData }
                     deleteComponent={ deleteComponent }
                     viewMode={ viewMode }
                     setViewMode={ setViewMode }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
               </div>
            </div>
         </DragDropContext>
      )
   );
};

CheckoutTemplate.propTypes = {
   course: PropTypes.object,
   location: PropTypes.string,
   customFieldsData: PropTypes.object,
   siteInfo: PropTypes.object,
   offerId: PropTypes.number,
   templateName: PropTypes.string,
   landingId: PropTypes.number,
   changeCourse: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      updateCourseSettingsAction: (settings) => {
         dispatch(updateCourseSettings(settings));
      },

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutTemplate);
