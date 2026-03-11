import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import SchoolTheme1 from 'assets/images/schoolRoom/school-template1.png';
// import SchoolTheme1Old from 'assets/images/schoolRoom/school-template1old.png';
// import SchoolTheme1OldPreview from 'assets/images/schoolRoom/school-template1oldbig.png';
// import SchoolTheme2 from 'assets/images/schoolRoom/school-template2.png';
// import SchoolTheme1Preview from 'assets/images/schoolRoom/school-template1big.png';
// import SchoolTheme2Preview from 'assets/images/schoolRoom/school-template2big.png';
import template1Image from 'assets/images/schoolRoom/template1_image.png';
import template1ImageBig from 'assets/images/schoolRoom/template1_image_big.png';
import template2Image from 'assets/images/schoolRoom/template2_image.png';
import template2ImageBig from 'assets/images/schoolRoom/template2_image_big.jpg';
import template3Image from 'assets/images/schoolRoom/template3_image.png';
import template3ImageBig from 'assets/images/schoolRoom/template3_image_big.png';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import { useHistory } from 'react-router';
import './index.scss';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import IconButton from 'components/elements/buttons/IconButton';
import DropTriggle from 'components/elements/newDropTriggle';
import { useSelector } from 'react-redux';
import { portalTemplateTypeSelector } from 'state/modules/schoolRoom/selectors';
import { findTemplate } from 'utils/schoolRoom';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SchoolRoom = ({
   schoolRoomThemes,
   makeActiveSchoolRoomHandle,
   isMobile,
}) => {
   const { isMembership } = useSelector(portalTemplateTypeSelector);
   const location = useLocation();
   const [template, setTemplate] = useState([]);
   const history = useHistory();
   const siteInfo = useSelector(siteInfoSelector);
   const schoolRoomThemeActive = !!schoolRoomThemes.length
      && schoolRoomThemes.filter(schoolRoomTheme => schoolRoomTheme.is_active === 1)[0];

   const [activeViewTemplate, setActiveViewTemplate] = React.useState(schoolRoomThemeActive);
   const schoolRoomThemImgFunc = (themeName) => {
      let themeImg = template1Image;
      // let themeImg = SchoolTheme2;
      switch (themeName) {
         case 'template2': themeImg = template2Image;
            break;
         case 'template3': themeImg = template3Image;
            break;
         default:
      }
      return themeImg;
   };

   useEffect(() => {
      const locationState = location.state;
      const findedTemplate = findTemplate(schoolRoomThemes, isMembership || locationState?.portalName); 
      setTemplate(findedTemplate);
      if (isMembership || locationState?.portalName) {
         setActiveViewTemplate(findedTemplate[0]);
      } else {
         const findedActiveTemplate = findedTemplate.find(template => template.is_active);
         setActiveViewTemplate(findedActiveTemplate);
      }
   }, [isMembership]);

   const schoolRoomPreviewImgFunc = (themeName) => {
      let themeImg = template1ImageBig;
      switch (themeName) {
         case 'template2': themeImg = template2ImageBig;
            break;
         case 'template3': themeImg = template3ImageBig;
            break;
         default:
      }
      return themeImg;
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

   const goToSettings = () => {
      history.push(`/admin/portal/settings/${ activeViewTemplate.school_room_theme_name }/${ activeViewTemplate.id }`);
   };

   const applyLandingTemplate = () => {
      makeActiveSchoolRoomHandle(
         activeViewTemplate
      );
   };

   const editSchoolRoom = () => {
      // window.open(`/admin/portal/${ activeViewTemplate.school_room_theme_name }/${ activeViewTemplate.id }`, '_self');
      history.push(`/admin/portal/${ isMembership && template[0]?.school_room_theme_name ? template[0].school_room_theme_name : activeViewTemplate.school_room_theme_name }/${ isMembership && template[0]?.id ? template[0].id : activeViewTemplate.id }`);
      localStorage.setItem('templateName', isMembership ? template[0].school_room_theme_name : activeViewTemplate.school_room_theme_name);
   };

   // const handlePreview = () => {
   //    window.open(`/portal-preview/${ activeViewTemplate.school_room_theme_name }`, '_blank');
   // };

   const navigateToCustomCss = () => {
      history.push(`/admin/portal/customize/${ activeViewTemplate.id }`);
   };

   const navigateToOffers = () => {
      if (isMembership) {
         window.open('/portal/membership', '_blank');
      } else {
         window.open('/portal/onlinecourse', '_blank');
      }
   };

   const handlePreview = () => { 
      const win = window.open(`/temp-portal/${ isMembership ? template[0]?.school_room_theme_name : activeViewTemplate.school_room_theme_name }`, '_blank');
      const sections = siteInfo.all_school_room.find(template => template.school_room_theme_name === activeViewTemplate.school_room_theme_name).school_room_sections.sections;
      win.landing = activeViewTemplate;
      win.sections = sections;
      win.not__preview = true;
      localStorage.setItem('outPreview', 'outPreview');
      localStorage.setItem('templateName', isMembership ? template[0]?.school_room_theme_name : activeViewTemplate.school_room_theme_name);
   };

   const handleSetActiveTemplate = (e) => {
      if (!isMembership) {
         setActiveViewTemplate(e);
      }
   };

   return (
      <div className='schoolroom__templates'>
         <div className='schoolroom__templates__top'>
            <TextWithTooltip
               // tooltip='Tooltip'
               isIconRigth={ true }
               inner='Portal'
               type={ types.mediumTitle }
               size={ sizes.size_28 }
            />
            <div style={ { display: 'flex', gap: '12px' } }>
               {/* {schoolRoomThemeActive.id === activeViewTemplate.id && (
                  <>
                     <Button
                        text='Custom CSS'
                        onClick={ () => {
                           history.push(`/admin/portal/customize/${ activeViewTemplate.id }`);
                        } }
                     />
                  </>
               )} */}

               <div className='buttons__wrapper'>
                  <Button
                     text='Portal Settings'
                     onClick={ () => goToSettings() }
                  />
                  <DropTriggle
                     options={ [
                        {
                           name: 'Custom CSS',
                           onClick: navigateToCustomCss,
                        },
                        {
                           name: 'Visit Site',
                           onClick: navigateToOffers,
                        },
                     ] }
                  />
               </div>
            </div>
         </div>
         <div className='schoolroom__templates__bottom'>
            <div className='schoolroom__templates__bottom__left'>
               <div
                  className='schoolroom__templates__bottom__left__top'
               >
                  <Text
                     inner={ isMembership ? 'Portal Template' : 'Portal Templates' }
                     miniText={ !isMembership && schoolRoomThemes.length }
                     type={ types.regular160 }
                     size={ sizes.xlarge }
                  />
                  {
                     isMobile && (
                        <div className='schoolroom__templates__bottom__left__top__actions'>
                           <IconButton
                              name='CheckoutPreviewM'
                              onClick={ () => handlePreview() }
                           />
                           <Button
                              disabled={ schoolRoomThemeActive.id === activeViewTemplate.id }
                              text={ schoolRoomThemeActive.id === activeViewTemplate.id || isMembership ? 'Applied' : 'Apply' }
                              onClick={ () => applyLandingTemplate() }
                           />
                        </div>
                     )
                  }
               </div>
               <div className='schoolroom__templates__bottom__left__data'>
                  {template.map((e) => {
                     return (
                        <div
                           key={ e.id }
                           role='presentation'
                           onClick={ () => handleSetActiveTemplate(e) }
                           className={ `item${ activeViewTemplate.id === e.id || isMembership ? ' item_active' : '' }` }
                        >
                           <img src={ schoolRoomThemImgFunc(e.school_room_theme_name) } alt='' />
                           <div className='item__bottom'>
                              <CheckboxCircle
                                 label=''
                                 isChecked={ e.id === activeViewTemplate.id || isMembership }
                                 onCheck={ () => {} }
                              />
                              <Text
                                 inner={ schoolRoomThemTitleFunc(e.school_room_theme_name) }
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                                 style={ { color: activeViewTemplate.id === e.id || isMembership ? '#FFF' : '#131F1E' } }
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            {
               !isMobile && (
                  <div className='schoolroom__templates__bottom__right'>
                     <div className='schoolroom__templates__bottom__right__top'>
                        <Text
                           inner={ `${ schoolRoomThemTitleFunc(isMembership ? template[0]?.school_room_theme_name : activeViewTemplate.school_room_theme_name) }` }
                           type={ types.regular160 }
                           size={ sizes.xlarge }
                        />
                        <div className='right__top__actions'>
                           <IconButton
                              name='CheckoutEditM'
                              onClick={ () => editSchoolRoom() }
                           />
                           <IconButton
                              name='CheckoutPreviewM'
                              onClick={ () => handlePreview() }
                           />
                           <Button
                              disabled={ schoolRoomThemeActive.id === activeViewTemplate.id || isMembership }
                              text={ schoolRoomThemeActive.id === activeViewTemplate.id || isMembership ? 'Applied' : 'Apply' }
                              onClick={ () => applyLandingTemplate() }
                           />
                        </div>
                     </div>
                     <img width='100%' src={ schoolRoomPreviewImgFunc(isMembership && template[0]?.school_room_theme_name ? template[0]?.school_room_theme_name : activeViewTemplate.school_room_theme_name) } alt='' />
                  </div>
               )
            }
         </div>
      </div>
   );
};

SchoolRoom.propTypes = {
   schoolRoomThemes: PropTypes.array,
   makeActiveSchoolRoomHandle: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default SchoolRoom;
