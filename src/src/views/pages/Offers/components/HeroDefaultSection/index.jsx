
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';

import './index.scss';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const HeroDefaultSection = ({
   heroData,
   onClickElement,
   addClass,
}) => {
   const [isAdedProduct, setIsAddedProduct] = useState(false);
   const { pathname } = useLocation();

   const handleAddProduct = () => {
      setIsAddedProduct(true);
   };

   return ( 
      <div
         style={ {
            marginTop: pathname.includes('template3') && '70px',
         } }
         className={ `hero_section_wrpper ${ heroData.school_room_section.slug }` }>
         {/* <div className='left_wrapper'>
            {
               subComp?.subcomponent.map((comp, index) => {
                  return (
                     !comp.type.includes('button') ? (
                        <Text 
                           { ...comp.props }
                           onClick={ onClick }
                           changeProp={ changeProp }
                           isPreview={ !isPreview }
                           disabled={ false }
                           index={ 2 }
                           subIndex={ index }
                           isSubcomponent={ true }
                           className={ !index ? 'title__text' : 'subtitle__text' }
                        />
                     ) : (
                        <Button
                           onClick={ onClick }
                           { ...comp.props }
                           isPortal={ true }
                           sectionIndex={ 2 }
                           index={ index }
                           isPreview={ !isPreview }
                           style={ {
                              marginTop: '32px',
                              // borderRadius: '12px',
                              fontWeight: 700,
                           } } />
                     )
                  );
               })
            }
         </div>
         <div className='image__wrapper'>
            <img src={ sliderDefaultImage } alt='hero' />
         </div> */}
         <BaseButton 
            text='Select featured product'
            style={ {
               borderRadius: '5px',
               background: 'rgb(233 233 233)',
               border: 'none',
               color: '#000',
            } }
            onClick={ (e) => {
               onClickElement(e);
               if (!isAdedProduct) {
                  addClass(heroData.school_room_components[1].slug, 'slider', 2);
                  localStorage.setItem('display', 'block');
               }
               handleAddProduct();
            } }
         />
         <Text 
            inner='The section is hidden from end-users untill you select a featured product'
            style={ {
               color: '#a2a4ae',
               fontWeight: 400,
               fontSize: '14px',
            } }
         />
      </div>
   );
};

HeroDefaultSection.propTypes = {
   heroData: PropTypes.object,
   onClickElement: PropTypes.func,
   addClass: PropTypes.func,
};

export default HeroDefaultSection;