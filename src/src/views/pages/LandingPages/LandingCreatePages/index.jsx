import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { IMAGES_BASE_URL } from 'utils/constants';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import image9 from 'assets/images/landings/preview__23__template__image.png';
import landing21 from 'assets/images/landings/landing21-small.jpeg';
// import LandingCreateVideo from './components/LandingCreatePageVideo';
import LandingCreateList from './components/LandingCreateList';

const landingsMock = [
   { id: 23, title: 'Spiritual Leader', img: image9 },
   { id: 21, title: 'Product Design Pro Hub', img: landing21 },
   { id: 22, title: 'Ballerina', img: `${ IMAGES_BASE_URL }landings/template10.webp` },
   { id: 14, title: 'Empire', img: `${ IMAGES_BASE_URL }landings/template2.webp` },
   { id: 15, title: 'Coastline', img: `${ IMAGES_BASE_URL }landings/template3.webp` },
   { id: 16, title: 'Resolve', img: `${ IMAGES_BASE_URL }landings/template4.webp` },
   { id: 17, title: 'Inspire', img: `${ IMAGES_BASE_URL }landings/template1.webp` },
   { id: 18, title: 'Alight', img: `${ IMAGES_BASE_URL }landings/template5.webp` },
   { id: 19, title: 'Shine', img: `${ IMAGES_BASE_URL }landings/template6.webp` },
   // { id: 20, title: 'Template7', img: `${ IMAGES_BASE_URL }landings/template7.webp` },
   // { id: 21, title: 'Template8', img: `${ IMAGES_BASE_URL }landings/template7.webp` },
];

const LandingCreatePages = ({
   createLanding,
   isMobile,
}) => {
   const history = useHistory();
   return (
      <div className='create__landing'>
         <div className='create__landing__top'>
            <Icon name='ArrowBackNew' onClick={ () => history.goBack() } />
            <Text
               inner='Create Landing Page'
               type={ types.regularDefaultSmall }
               size={ sizes.size_28 }
            />
         </div>
         {/* <LandingCreateVideo /> */}
         <LandingCreateList
            onSelect={ createLanding }
            landings={ landingsMock }
            isMobile={ isMobile }
         />
      </div>
   );
};

LandingCreatePages.propTypes = {
   createLanding: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default LandingCreatePages;
