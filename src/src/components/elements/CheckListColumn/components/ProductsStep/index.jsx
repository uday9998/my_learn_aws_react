import React from 'react';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import ProductCard from './components/ProductCard';

import './index.scss';

const ProductsStep = () => {
   return (
      <div className='products__wrapper'>
         <div className='products__title'>
            <Text 
               inner='What Type Of Product Would You Like To Create?'
               size={ sizes.xlarge }
            />
         </div>
         <div className='products__card__wrapper'>
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title='Video Membership'
               iconName='Program'
               subtitle='Create a video membership experience where your audience can access a library of your unique video'
            />
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title='Online Course'
               iconName='OnlineCourse'
               subtitle='Turn your expertise into a course that helps you connect with your audience and grow your business.'
            />
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title='Community'
               iconName='Community'
               subtitle='Build an area for your audience to share their common interests and connect with each other.'
            />
         </div>
      </div>
   );
};

export default ProductsStep;