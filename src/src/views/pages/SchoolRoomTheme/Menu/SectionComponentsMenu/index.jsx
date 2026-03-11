/* eslint-disable max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconButton from 'components/elements/buttons/IconButton';
import SliceAndConnectText from 'utils/getSplitedText';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Switch from 'components/elements/switchNew';
import SliderComponentMenu from './SliderComponentMenu';
import SubComponentMenu from './SubComponentMenu';


const SectionComponentsMenu = ({
   backToCurrentMenu, editableSection, showEditableComponent,
   toggleSectionComponent, addClass, deleteClass, deleteComponent,
   addBullet, addLink, landing, changeProp, 
}) => {
   const editableSectionProps = editableSection.school_room_section.props;
   const sections = editableSection.school_room_components.filter(elements => {
      return elements.name === 'Banner' || elements.name === 'Slider';
   });

   return (
      <Fragment>
         <div className='SectionComponents menu'>
            <div className='menu__top'>
               <IconButton
                  name='arrowLeftL'
                  onClick={ () => backToCurrentMenu() }
               />
               <Text
                  inner={ SliceAndConnectText(editableSection.school_room_section.name, 15) }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
               {editableSectionProps.duplicated === 'hero' && (
                  <div style={ { marginLeft: 'auto' } }>
                     <Switch
                        value={ editableSection.school_room_section.props.school_slider_status }
                        onChange={ () => {
                           changeProp(!editableSection.school_room_section.props.school_slider_status, 'school_slider_status', 'section');
                        }
                        }
                        size='medium'
                     />
                  </div>
               )}
            </div>
            {editableSection && (
               <div>
                  {!editableSectionProps.disabled && editableSectionProps.duplicated !== 'above_content' && editableSectionProps.duplicated !== 'below_content'
                  && editableSectionProps.duplicated !== 'content'
                  && (
                     <div>
                        {editableSectionProps.duplicated !== 'main_background' && editableSectionProps.duplicated !== 'hero' && editableSectionProps.duplicated !== 'header' && (
                           <div
                              className='item'
                              role='presentation'
                              onClick={ e => toggleSectionComponent(e) }
                           >
                              <Text
                                 inner='Background'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                              />
                              <div className='component_arrow'>
                                 <IconNew name='SchoolRoomComponentDown' />
                              </div>

                           </div>
                        )}
                        {(editableSectionProps.duplicated === 'main_background' || editableSectionProps.duplicated === 'hero' || editableSectionProps.duplicated === 'header' || editableSectionProps.duplicated === 'footer') ? (
                           <div
                              id={ editableSection.school_room_section.slug }
                              className='OpenSectionComponent'
                              style={ { display: 'block' } }
                           >
                              {editableSection
                           && showEditableComponent(
                              editableSection.school_room_section,
                              -1,
                              0
                           )}
                           </div>
                        ) : (
                           <div
                              className='SectionComponent'
                              id={ editableSection.school_room_section.slug }
                              style={ { display: 'none' } }
                           >
                              {editableSection
                           && showEditableComponent(
                              editableSection.school_room_section,
                              -1,
                              0
                           )}
                           </div>
                        )}
                     </div>
                  )}
                  { editableSection.school_room_components.map(
                     (component, i) => {
                        const componentProps = component.props;
                        const componentSubComponents = component.subcomponent;
                        const isSliderOpen = component.type === 'slider' && editableSectionProps.duplicated === 'hero' && landing.school_slider_status;
                        return (
                           componentProps.deleted !== true
                           && component.name !== 'Privacy Policy'
                           && component.name !== 'Terms'
                           && component.name !== 'Links'
                            && (
                               <Fragment key={ component.slug }>
                                  <div>
                                     <div
                                        className={ `item ${ i }` }
                                        role='presentation'
                                        onClick={ e => {
                                           toggleSectionComponent(e);
                                           if (document.getElementById(`${ component.slug }`).style.display === 'block') {
                                              e.target.style.backgroundColor = '#E8F2F1';
                                              document.getElementById(`arrow-for-${ i }`).style.transform = 'rotate(-90deg)';
                                           } else {
                                              e.target.style.backgroundColor = 'inherit';
                                              document.getElementById(`arrow-for-${ i }`).style.transform = 'rotate(90deg)';
                                           }
                                           if (!isSliderOpen && document.getElementsByClassName('editorContainer_schoolroom')[0].clientHeight - document.getElementsByClassName(`item ${ i }`)[0].getBoundingClientRect().y < 100) {
                                              document.getElementsByClassName('editorContainer_schoolroom')[0].scrollTop = document.getElementsByClassName('editorContainer_schoolroom')[0].scrollTop + 300;
                                           }
                                        } }
                                     >
                                        {
                                           component.name === 'Hero Section' && !sections[0].props.school_banner_src && !sections[1].subcomponent.length ? (
                                              <>
                                                 <Text
                                                    inner={ component.name }
                                                    type={ types.regular148 }
                                                    size={ sizes.medium }
                                                 />
                                                 <div className='component_arrow' id={ `arrow-for-${ i }` }>
                                                    <IconNew name='SchoolRoomComponentDown' />
                                                 </div>
                                              </>
                                           ) : component.name !== 'Hero Section' ? (
                                              <>
                                                 <Text
                                                    inner={ component.name }
                                                    type={ types.regular148 }
                                                    size={ sizes.medium }
                                                 />
                                                 <div className='component_arrow' id={ `arrow-for-${ i }` }>
                                                    <IconNew name='SchoolRoomComponentDown' />
                                                 </div>
                                              </>
                                           ) : null
                                        }
                                     </div>
                                     <div
                                        className='SectionComponent'
                                        id={ component.slug }
                                        style={ isSliderOpen
                                           ? { display: 'block' } : { display: 'none' } }
                                     >
                                        {editableSection
                                       && showEditableComponent(
                                          component,
                                          component.slug,
                                          i
                                       )}
                                        <div>

                                           {component.type !== 'slider' && component.type !== 'FAQ'
                                          && componentSubComponents && !!componentSubComponents.length
                                                && componentSubComponents.map((subComponent, j) => {
                                                   if (subComponent.name !== 'Class Name') {
                                                      let isOpen = false;
                                                      if (subComponent.name === 'Secondary Button' || subComponent.name === 'Class Name Description'
                                                    || subComponent.name === 'Author' || subComponent.name === 'Offer Description') {
                                                         return null;
                                                      }
                                                      return (
                                                         subComponent.deleted !== true && (
                                                            <Fragment key={ subComponent.slug }>
                                                               <div
                                                                  className={ `item item-sub-${ subComponent.slug }` }
                                                                  role='presentation'
                                                                  onClick={ e => {
                                                                     toggleSectionComponent(e);
                                                                     // if (document.getElementById(`${ component.slug }`).style.display === 'block') {
                                                                     //    document.getElementById(`arrow-for-${ i }`).classList.add('component_arrow__up');
                                                                     // } else {
                                                                     //    document.getElementById(`arrow-for-${ i }`).classList.remove('component_arrow__up');
                                                                     // }
                                                                     isOpen = !isOpen;
                                                                     if (isOpen && document.getElementsByClassName('editorContainer_schoolroom')[0].clientHeight - document.getElementsByClassName(`item-sub-${ subComponent.slug }`)[0].getBoundingClientRect().y < 100) {
                                                                        document.getElementsByClassName('editorContainer_schoolroom')[0].scrollTop += 300;
                                                                     }
                                                                     if (isOpen) {
                                                                        e.target.style.backgroundColor = '#E8F2F1';
                                                                        document.getElementById(`for-sub-${ subComponent.slug }`).style.transform = 'rotate(-90deg)';
                                                                     } else {
                                                                        e.target.style.backgroundColor = 'inherit';
                                                                        document.getElementById(`for-sub-${ subComponent.slug }`).style.transform = 'rotate(90deg)';
                                                                     }
                                                                  } }
                                                               >
                                                                  <Text
                                                                     inner={ subComponent.name }
                                                                     type={ types.regular148 }
                                                                     size={ sizes.medium }
                                                                  />
                                                                  <div className='component_arrow' id={ `for-sub-${ subComponent.slug }` }>
                                                                     <IconNew name='SchoolRoomComponentDown' />
                                                                  </div>
                                                               </div>
                                                               <div className='SubSectionComponent' id={ subComponent.slug } style={ { display: 'none' } }>
                                                                  {editableSection
                                                                  && showEditableComponent(
                                                                     subComponent,
                                                                     subComponent.slug,
                                                                     i,
                                                                     j
                                                                  )}
                                                               </div>

                                                            </Fragment>
                                                         )
                                                      );
                                                   }
                                                   return null;
                                                })}
                                           {component.type === 'bullets' && componentSubComponents.length < 6 && (
                                              <div className='m-t-exl flex justify-center'>
                                                 <Button
                                                    theme={ themes.primary }
                                                    text='Add Bullet Point'
                                                    onClick={ () => addBullet(component.slug) }
                                                 />
                                              </div>
                                           )}

                                           {component.type === 'links' && componentSubComponents.length < 3 && (
                                              <div className='m-t-exl flex justify-center'>
                                                 <Button
                                                    theme={ themes.primary }
                                                    text='Add Link'
                                                    onClick={ () => addLink(component.slug) }
                                                 />
                                              </div>
                                           )}

                                           {component.type === 'slider'
                                          && (
                                             <SliderComponentMenu
                                                component={ component }
                                                componentSubComponents={ componentSubComponents }
                                                toggleSectionComponent={ toggleSectionComponent }
                                                showEditableComponent={ showEditableComponent }
                                                editableSection={ editableSection }
                                                i={ i }
                                                deleteClass={ deleteClass }
                                             />
                                          )
                                           }

                                           {component.type === 'FAQ'
                                          && (
                                             <SubComponentMenu
                                                componentSubComponents={ componentSubComponents }
                                                toggleSectionComponent={ toggleSectionComponent }
                                                showEditableComponent={ showEditableComponent }
                                                editableSection={ editableSection }
                                                i={ i }
                                             />
                                          )
                                           }
                                           {component.type === 'slider'
                                            && (
                                               <div className='m-t-exl flex justify-center'>
                                                  <Button
                                                     theme={ themes.secondary }
                                                     text='Add Product'
                                                     onClick={ () => addClass(component.slug, component.props.school_class_type) }
                                                  />
                                               </div>
                                            )}

                                           {/* {component.type === 'slider' && component.props.school_class_type === 'image'
                                           && componentSubComponents.filter(componentSubComponent => componentSubComponent.props.classType === 'image').length < 1
                                           && (
                                              <div className='m-t-exl flex justify-center'>
                                                 <Button
                                                    theme={ themes.secondary }
                                                    text='Add Offer'
                                                    onClick={ () => addClass(component.slug, component.props.school_class_type) }
                                                 />
                                              </div>
                                           )} */}

                                           {componentProps && componentProps.availableDelete && (
                                              <div className='m-t-exl flex justify-center'>
                                                 <Button
                                                    theme={ themes.red }
                                                    text={ component.name === 'Bullet Points' ? `Delete All ${ component.name }` : `Delete ${ component.name }` }
                                                    onClick={ () => deleteComponent(i) }
                                                 />
                                              </div>
                                           )}
                                        </div>
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
   addClass: PropTypes.func,
   deleteClass: PropTypes.func,
   deleteComponent: PropTypes.func,
   addBullet: PropTypes.func,
   addLink: PropTypes.func,
   landing: PropTypes.object,
   changeProp: PropTypes.func,
};

export default SectionComponentsMenu;
