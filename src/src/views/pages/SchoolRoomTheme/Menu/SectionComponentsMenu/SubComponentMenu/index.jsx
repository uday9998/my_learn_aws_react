import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const SliderComponentMenu = ({
   componentSubComponents, showEditableComponent, toggleSectionComponent,
   editableSection, i,
}) => {
   return (
      <div>
         {!!componentSubComponents && !!componentSubComponents.length
                  && componentSubComponents.map((subComponent, j) => {
                     return (
                        subComponent.deleted !== true && (

                           <Fragment key={ subComponent.slug }>
                              <div>
                                 <Fragment>
                                    <div
                                       className='item SectionComponents_name_dragable_item'
                                       role='presentation'
                                       onClick={ e => toggleSectionComponent(e) }
                                    >
                                       <Text
                                          inner={ subComponent.name }
                                          type={ types.regular148 }
                                          size={ sizes.medium }
                                       />
                                       <div className='component_arrow' id={ `arrow-for-${ i }` }>
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
                                       {!!subComponent.subcomponent && !!subComponent.subcomponent.length
                                                   && subComponent.subcomponent.map((classProps, k) => {
                                                      return (
                                                         classProps.deleted !== true && (
                                                            <Fragment key={ classProps.slug }>
                                                               <div
                                                                  className='item'
                                                                  role='presentation'
                                                                  onClick={ e => toggleSectionComponent(e) }
                                                               >
                                                                  <Text
                                                                     inner={ classProps.name }
                                                                     type={ types.regular148 }
                                                                     size={ sizes.medium }
                                                                  />
                                                                  <div className='component_arrow'>
                                                                     <IconNew name='SchoolRoomComponentDown' />
                                                                  </div>
                                                               </div>
                                                               <div className='SubSubSectionComponent' id={ classProps.slug } style={ { display: 'none' } }>
                                                                  {editableSection
                                                                  && showEditableComponent(
                                                                     classProps,
                                                                     classProps.slug,
                                                                     i,
                                                                     j,
                                                                     k
                                                                  )}
                                                               </div>
                                                            </Fragment>
                                                         )
                                                      );
                                                   })}
                                    </div>
                                 </Fragment>
                              </div>
                           </Fragment>
                        ));
                  })}

      </div>
   );
};

SliderComponentMenu.propTypes = {
   showEditableComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   editableSection: PropTypes.object,
   i: PropTypes.number,
   componentSubComponents: PropTypes.array,
};

export default SliderComponentMenu;
