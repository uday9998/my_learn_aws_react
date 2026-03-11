import React, { Fragment } from 'react';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import arrowIcon from 'assets/images/landings/chevron-down.png';
import PropTypes from 'prop-types';
import './index.scss';
import IconButton from 'components/elements/buttons/IconButton';
import SliceAndConnectText from 'utils/getSplitedText';

const SectionComponentsMenu = ({
   backToCurrentMenu, editableSection, showEditableComponent,
   toggleSectionComponent, addBullet, addTestimonial, deleteComponent,
}) => {
   const editableSectionProps = editableSection.checkout_section.props;
   
   // Filter components to only show specific ones
   const allowedComponents = ['Payment Details', 'Add promo code', 'Apply Button', 'Buy Button'];
   const filteredComponents = editableSection.checkout_components.filter(component => 
      allowedComponents.includes(component.name)
   );

   return (
      <Fragment>
         <div className='SectionComponents menu'>
            <div className='menu__top'>
               <IconButton
                  name='arrowLeftL'
                  onClick={ () => backToCurrentMenu() }
               />
               <Text
                  inner={ SliceAndConnectText(editableSection.checkout_section.name, 15) }
                  type={ TextType.regular148 }
                  size={ TextSize.medium }
               />
            </div>
            {editableSection && (
               <div>
                  {!editableSectionProps.disabled && (
                     <div>
                        <div
                           className='item'
                           role='presentation'
                           onClick={ e => {
                              if (document.getElementById(editableSection.checkout_section.slug).style.display === 'none' && document.getElementsByClassName('editorContainer_checkout')[0].clientHeight - e.clientY < 100) {
                                 document.getElementsByClassName('editorContainer_checkout')[0].scrollTop += 150;
                              }
                              if (document.getElementById(editableSection.checkout_section.slug).style.display === 'none') {
                                 document.getElementById(`arrow-for-${ editableSection.checkout_section.slug }`).classList.add('component_arrow__up');
                              } else {
                                 document.getElementById(`arrow-for-${ editableSection.checkout_section.slug }`).classList.remove('component_arrow__up');
                              }
                              toggleSectionComponent(e);
                           } }
                        >
                           {/* <div className='SectionComponents_name'>
                              <span className='component_name'>
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                    inner='Background'
                                 />
                              </span>
                              <div className='component_arrow' id={ `arrow-for-${ editableSection.checkout_section.slug }` }>
                                 <img src={ arrowIcon } alt='default' />
                              </div>
                           </div> */}
                        </div>  
                        <div
                           className='SectionComponent'
                           id={ editableSection.checkout_section.slug }
                           style={ { display: 'none' } }
                        >
                           {editableSection
                           && showEditableComponent(
                              editableSection.checkout_section,
                              -1,
                              0
                           )}
                        </div>
                     </div>
                  )}
                  { filteredComponents.map(
                     (component, i) => {
                        const componentProps = component.props;
                        const componentSubComponents = component.subcomponent;
                        // Find the original index in the unfiltered array for proper functionality
                        const originalIndex = editableSection.checkout_components.findIndex(
                           originalComponent => originalComponent.slug === component.slug
                        );
                        
                        return (
                           componentProps.deleted !== true && (
                              <Fragment key={ component.slug }>
                                 <div>
                                    <div
                                       className='item'
                                       role='presentation'
                                       onClick={ e => {
                                          toggleSectionComponent(e);
                                          if (document.getElementById(component.slug).style.display === 'block' && document.getElementsByClassName('editorContainer_checkout')[0].clientHeight - e.clientY <= 150) {
                                             document.getElementsByClassName('editorContainer_checkout')[0].scrollTop += 150;
                                          }
                                          if (document.getElementById(component.slug).style.display === 'block') {
                                             document.getElementById(`arrow-for-${ component.slug }`).classList.add('component_arrow__up');
                                          } else {
                                             document.getElementById(`arrow-for-${ component.slug }`).classList.remove('component_arrow__up');
                                          }
                                       } }
                                    >
                                       <div className='SectionComponents_name'>
                                          <span className='component_name'>
                                             <Text
                                                type={ TextType.regularDefault }
                                                size={ TextSize.small }
                                                inner={ component.name }
                                             />
                                          </span>
                                          <div className='component_arrow' id={ `arrow-for-${ component.slug }` }>
                                             <img src={ arrowIcon } alt='default' />
                                          </div>

                                       </div>
                                    </div>
                                    <div className='SectionComponent' id={ component.slug } style={ { display: 'none' } }>
                                       {editableSection
                                       && showEditableComponent(
                                          component,
                                          component.slug,
                                          originalIndex
                                       )}
                                       <div>
                                          {componentSubComponents && !!componentSubComponents.length
                                          && componentSubComponents.map((subComponent, j) => {
                                             return (
                                                subComponent.deleted !== true && (
                                                   <Fragment key={ subComponent.slug }>
                                                      <div
                                                         className='item'
                                                         role='presentation'
                                                         onClick={ e => {
                                                            if (document.getElementById(subComponent.slug).style.display === 'block' && document.getElementsByClassName('editorContainer_checkout')[0].clientHeight - e.clientY <= 150) {
                                                               document.getElementsByClassName('editorContainer_checkout')[0].scrollTop += 150;
                                                            }
                                                            if (document.getElementById(subComponent.slug).style.display === 'block') {
                                                               document.getElementById(`arrow-for-${ subComponent.slug }`).classList.add('component_arrow__up');
                                                            } else {
                                                               document.getElementById(`arrow-for-${ subComponent.slug }`).classList.remove('component_arrow__up');
                                                            }
                                                            toggleSectionComponent(e);
                                                         } }
                                                      >
                                                         <div className='SectionComponents_name'>
                                                            <span className='component_name'>
                                                               <Text
                                                                  type={ TextType.regularDefault }
                                                                  size={ TextSize.small }
                                                                  inner={ subComponent.name }
                                                               />
                                                            </span>
                                                            <div className='component_arrow' id={ `arrow-for-${ subComponent.slug }` }>
                                                               <img src={ arrowIcon } alt='default' />
                                                            </div>

                                                         </div>
                                                      </div>
                                                      <div className='SubSectionComponent' id={ subComponent.slug } style={ { display: 'none' } }>
                                                         {editableSection
                                                            && showEditableComponent(
                                                               subComponent,
                                                               subComponent.slug,
                                                               originalIndex,
                                                               j
                                                            )}
                                                      </div>

                                                   </Fragment>
                                                )
                                             );
                                          })}
                                          {component.type === 'bullets' && componentSubComponents.length < 6 && (
                                             <div className='m-t-exl flex justify-center'>
                                                <BaseButton
                                                   size={ btnSize.medium }
                                                   text='Add Bullet Point'
                                                   onClick={ () => addBullet(component.slug) }
                                                />
                                             </div>
                                          )}
                                          {component.type === 'testimonials' && componentSubComponents.length < 5 && (
                                             <div className='m-t-exl flex justify-center'>
                                                <BaseButton
                                                   size={ btnSize.medium }
                                                   text='Add Testimonial'
                                                   onClick={ () => addTestimonial(component.slug) }
                                                />
                                             </div>
                                          )}
                                       </div>
                                       {componentProps && componentProps.availableDelete && (
                                          <div className='m-t-exl flex justify-center'>
                                             <BaseButton
                                                theme={ btnTheme.error }
                                                size={ btnSize.medium }
                                                text={ `Delete ${ component.name }` }
                                                onClick={ () => deleteComponent(originalIndex) }
                                             />
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </Fragment>
                           )
                        );
                     }
                  )}
               </div>
            )}

         </div>
      </Fragment>
   );
};


SectionComponentsMenu.propTypes = {
   backToCurrentMenu: PropTypes.func,
   editableSection: PropTypes.object,
   showEditableComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   addBullet: PropTypes.func,
   addTestimonial: PropTypes.func,
   deleteComponent: PropTypes.func,
};

export default SectionComponentsMenu;