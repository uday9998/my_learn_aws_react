import React from 'react';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import ProductCard from './ProductCard';

import './AddContentStep.scss';

const AddContentStep = () => {
   return (
      <div className='products__wrapper'>
         <div className='products__title'>
            <Text 
               inner='What Type Of Content Would You Like To Create?'
               size={sizes.xlarge}
            />
         </div>
         <div className='products__card__wrapper'>
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title=''
               iconName='Video'
               subtitle='Video Membership, Upload videos your members can watch. Perfect for tutorials, lectures, and demonstrations.'
               path='/admin/programs/create'
            />
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title=''
               iconName='OnlineCourse'
               subtitle='Online Course, Turn your expertise into a structured course with lessons, modules, and assessments.'
               path='/admin/programs/create'
            />
            <ProductCard
               buttonIconName='StartBuildingRight'
               buttonInner='Start Building'
               title=''
               iconName='Community'
               subtitle='Community, Create discussions, announcements, and other content to engage your community members.'
               path='/admin/programs/create'
            />
         </div>
      </div>
   );
};

export default AddContentStep;