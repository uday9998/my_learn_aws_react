import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import image1 from 'assets/images/landings/templates/1.png';
import image2 from 'assets/images/landings/templates/2.png';
import image3 from 'assets/images/landings/templates/3.png';
import image4 from 'assets/images/landings/templates/4.png';
import image5 from 'assets/images/landings/templates/5.png';
import image6 from 'assets/images/landings/templates/6.png';
import image7 from 'assets/images/landings/templates/7.png';
import image8 from 'assets/images/landings/landing21.jpg';
import image9 from 'assets/images/landings/templates/9.png';
import image10 from 'assets/images/landings/template_23.png';

const LandingCreateList = ({
   landings,
   onSelect,
   isMobile,
}) => {
   const [selectedTemplate, setSelectedTemplate] = useState(landings[0]);
   const images = {
      Inspire: image1,
      Empire: image2,
      Coastline: image3,
      Resolve: image4,
      Alight: image5,
      Shine: image6,
      Template7: image7,
      image8,
      Ballerina: image9,
      'Spiritual Leader': image10,
   };
   return (
      <div className='create__landing__bottom'>
         <div className='create__landing__bottom__left'>
            <div
               className='create__landing__bottom__left__top'
            >
               <Text
                  inner='Landing Page Templates'
                  miniText={ landings.length }
                  type={ types.regular160 }
                  size={ sizes.xlarge }
               />
               {
                  isMobile && (
                     <Button
                        onClick={ () => onSelect(selectedTemplate.id, selectedTemplate.title, selectedTemplate.img) }
                        text='Choose'
                        style={ { minHeight: '50px', minWidth: '80px' } }
                     />
                  )
               }
            </div>
            <div className='create__landing__bottom__left__list'>
               {landings.map((e) => {
                  return (
                     <div
                        key={ e.id }
                        onClick={ () => setSelectedTemplate(e) }
                        role='presentation'
                        className={ `${ e.id === selectedTemplate.id ? 'active ' : '' }create__landing__bottom__left__list__item` }
                     >
                        <div>
                           <img src={ e.img } alt='' />
                        </div>
                        <Text
                           inner={ e.title }
                           type={ types.regular148 }
                           size={ sizes.medium }
                           style={ { color: e.id === selectedTemplate.id ? '#fff ' : '#131F1E' } }
                        />
                     </div>
                  );
               })}
            </div>
         </div>
         {
            !isMobile && (
               <div className='create__landing__bottom__right'>
                  <div className='create__landing__bottom__right__top'>
                     <Text
                        inner={ `Preview ${ selectedTemplate.title }` }
                        type={ types.regular160 }
                        size={ sizes.xlarge }
                     />
                     <Button
                        onClick={ () => onSelect(selectedTemplate.id, selectedTemplate.title, selectedTemplate.img) }
                        text='Choose'
                        style={ { minHeight: '50px', minWidth: '80px' } }
                     />
                  </div>
                  {/* <iframe
                  title='preview'
                  src={ `${ window.location.origin }/template/${ selectedTemplate.id }/preview` }
                  frameBorder='0'
               /> */}
                  <img src={ selectedTemplate.title === 'Product Design Pro Hub' ? image8 : images[selectedTemplate.title] } className='create__landing__bottom__right__preview' alt='' />
               </div>
            )
         }
      </div>
   );
};

LandingCreateList.propTypes = {
   landings: PropTypes.array,
   onSelect: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default LandingCreateList;
