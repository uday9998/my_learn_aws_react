import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import { Link } from 'react-router-dom';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import DropButton from 'components/elements/buttons/DropButton';
// import ClickOutside from './OutsideClick/index.js';

// export const RightSide = ({
//    courseUrl, lessonId, handleCourseLive, disableLive, settingsData, authUser, headerPreviewCheckout, appUUID,
// }) => {
//    const [openPreview, setOpenPreview] = useState(false);
//    const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;
//    function openPopup() {
//       setOpenPreview(!openPreview);
//    }

//    const pricings = settingsData.pricings && settingsData.pricings.filter(pricing => pricing.price !== null);
//    return (
//       <div className='courseHeader__buttons'>
//          <div className='courseHeader__preview'>
//             {((courseUrl && lessonId) || settingsData.landing_url || (pricings && pricings.length !== 0)) && (
//                <div role='presentation' onClick={ () => openPopup() }>
//                   <BaseButton
//                      theme={ btnTheme.darkGreen }
//                      size={ btnSizes.large }
//                      text='Preview'
//                      margin={ true }
//                      onClick={ () => {} }
//                   />
//                   <div className='prev__icon'>
//                      <Icon name='TriangleSvg' style={ openPreview ? { transform: 'rotateY(180deg)' } : { transform: 'rotateY(0deg)' } } />
//                   </div>

//                </div>
//             )}
//             {openPreview && (
//                <ClickOutside onClick={ (e) => openPopup(e) }>
//                   <div className='courseHeader__preview__content'>

//                      { courseUrl && lessonId
//                      && (
//                         <div>
//                            <Link to={ `/programs/${ courseUrl }?lesson=${ lessonId }&preview=success` } target='_blank'>
//                               <Text
//                                  type={ TextType.normal }
//                                  size={ TextSize.extraSmall }
//                                  inner='Watch Room'
//                                  className='text-center'
//                               />
//                            </Link>
//                         </div>
//                      )}
//                      { settingsData.landing_url
//                         && (
//                            <div>
//                               <Link to={ `/p/${ settingsData.landing_url }` } target='_blank'>
//                                  <Text
//                                     type={ TextType.normal }
//                                     size={ TextSize.extraSmall }
//                                     inner='Landing Page'
//                                     className='text-center'
//                                  />
//                               </Link>
//                            </div>
//                         )}

//                      {pricings.length !== 0 && (
//                         <div>
//                            {pricings.length === 1
//                               ? (
//                                  <a href={ `${ checkoutUrl }${ appUUID }/0/${ settingsData.id }/${ pricings[0].id }` } target='_blank' rel='noopener noreferrer'>                                    <Text
//                                     type={ TextType.normal }
//                                     size={ TextSize.extraSmall }
//                                     inner='Checkout'
//                                     className='text-center'
//                                  />
//                                  </a>
//                               ) : (
//                                  <div role='presentation' onClick={ () => { headerPreviewCheckout(); openPopup(); } }>
//                                     <Text
//                                        type={ TextType.normal }
//                                        size={ TextSize.extraSmall }
//                                        inner='Checkout'
//                                        className='text-center'
//                                     />
//                                  </div>
//                               ) }
//                         </div>
//                      )}
//                   </div>
//                </ClickOutside>
//             )}
//          </div>
//          <div className='unpublish__btn'>
//             <div>
//                <BaseButton
//                   theme={ settingsData && settingsData.is_published === 1 ? btnTheme.darkRed : btnTheme.darkGreen }
//                   size={ btnSizes.large }
//                   text={ settingsData && settingsData.is_published === 1 ? 'Unpublish' : 'Publish' }
//                   onClick={ () => handleCourseLive() }
//                   disabled={ disableLive }
//                />
//             </div>
//          </div>


//       </div>
//    );
// };

export const CourseHeader = ({
   courseUrl, lessonId, courseName,
   settingsData, appUUID, goToBack, course,
}) => {
   const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;
   const pricings = (settingsData.pricings && settingsData.pricings.filter(pricing => pricing.price !== null)) || [];

   const getCheckoutUrl = () => {
      if (settingsData.test_mode) {
         return `${ checkoutUrl }test_mode/${ settingsData.test_mode.token }/${ settingsData.checkout_url?.url || appUUID }/0/${ settingsData.plan_id }`;
      }
      return `${ checkoutUrl }${ settingsData.checkout_url?.url || appUUID }/0/${ settingsData.plan_id }`;
   };

   const showCheckoutUrl = () => {
      const freePricing = settingsData.pricings && settingsData.pricings.length === 1
      && !!settingsData.pricings.filter(pr => pr.pricing_type === 0).length;
      if (!freePricing && !settingsData.publish_without_integrations && settingsData.is_published === 1) {
         return true;
      }
      return false;
   };
   // return (
   //    !isLoadingNew && (
   //       <SiteHeader
   //          style={ { paddingBottom: '0' } }
   //          title={ courseName || 'Design Class' }
   //          tooltip={ tooltip }
   //          tooltipresponsive={ tooltipresponsive }
   //          right={ (
   //             <RightSide
   //                handleCourseLive={ handleCourseLive }
   //                courseUrl={ courseUrl }
   //                lessonId={ lessonId }
   //                currentLesson={ currentLesson }
   //                disableLive={ disableLive }
   //                settingsData={ settingsData }
   //                authUser={ authUser }
   //                appUUID={ appUUID }
   //                headerPreviewCheckout={ headerPreviewCheckout }
   //             />
   //          ) }
   //          bottom={ (
   //             <div style={ { paddingTop: '19px' } }>
   //                <TabSwitch.Tab>
   //                   <NavBar
   //                      isMobile={ window.innerWidth < 1024 }
   //                      courseId={ courseId }
   //                   />
   //                </TabSwitch.Tab>
   //             </div>
   //          ) }
   //          hasArrow
   //       />
   //    )
   // );

   return (
      <div className='course__header'>
         <div className='course__header__left'>
            <div style={ { cursor: 'pointer' } } onClick={ () => goToBack() } role='presentation'>
               <Icon name='ArrowBackHeader' />
            </div>
            <Text
               inner={ courseName }
               type={ TextType.regularDefault }
               size={ TextSize.xlarge }
            />
         </div>
         {((courseUrl && lessonId) || settingsData.landing_url || (pricings && pricings.length !== 0)) && (
            <div className='course__header__right'>
               <DropButton
                  isArrowIcon={ true }
                  buttonProps={ {
                     iconName: 'ArrowBottomProgramM',
                     secondIcon: 'EyeProgramM',
                     text: 'Preview Product',
                  } }
               >
                  <div className='course__previews'>

                     { course.type !== '1' && !!courseUrl && !!lessonId
                     && (
                        <div className='course__previews__item'>
                           <div>
                              <Link to={ `/programs/${ courseUrl }?lesson=${ lessonId }&preview=success` } target='_blank'>
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                    inner='Watch Room'
                                 />
                              </Link>
                           </div>
                        </div>
                     )}
                     {course.type === '1'
                           && (
                              <div className='course__previews__item'>
                                 <div>
                                    <Link to='/portal/membership' target='_blank'>
                                       <Text
                                          type={ TextType.regularDefault }
                                          size={ TextSize.small }
                                          inner='Watch Room'
                                       />
                                    </Link>
                                 </div>
                              </div>
                           )
                     }

                     {/* { settingsData.landing_url
                        && (
                           <div className='course__previews__item'>
                              <Link to={ `/p/${ settingsData.landing_url }` } target='_blank'>
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                    inner='Landing Page'
                                 />
                              </Link>
                           </div>
                        )} */}
                     {showCheckoutUrl() && (
                        <div>
                           <div className='course__previews__item'>
                              <a href={ getCheckoutUrl() } target='_blank' rel='noopener noreferrer'>                                    
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                    inner='Checkout'
                                    className='text-center'
                                 />
                              </a>
                           </div>
                        </div>
                     )}
                  </div>
               </DropButton>
            </div>
         )}

      </div>
   );
};

CourseHeader.propTypes = {
   courseUrl: PropTypes.string,
   lessonId: PropTypes.number,
   courseName: PropTypes.string,
   settingsData: PropTypes.object,
   appUUID: PropTypes.string,
   goToBack: PropTypes.func,
   course: PropTypes.object,
};

// RightSide.propTypes = {
//    courseUrl: PropTypes.string,
//    lessonId: PropTypes.number,
//    handleCourseLive: PropTypes.func,
//    disableLive: PropTypes.bool,
//    settingsData: PropTypes.object,
//    authUser: PropTypes.object,
//    headerPreviewCheckout: PropTypes.func,
//    appUUID: PropTypes.string,
// };

// RightSide.defaultProps = {
//    disableLive: false,
//    headerPreviewCheckout: () => {},
// };
