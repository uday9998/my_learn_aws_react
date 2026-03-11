import React from 'react';
import BuilderCard from 'components/modules/designCourse/pageBuilder/BuilderCard';
import './index.mob.scss';
import img1 from 'assets/images/pageBuilder/img1.png';
import img2 from 'assets/images/pageBuilder/img2.png';
import img3 from 'assets/images/pageBuilder/img3.png';
import img4 from 'assets/images/pageBuilder/img4.png';
import img5 from 'assets/images/pageBuilder/img5.png';
import img6 from 'assets/images/pageBuilder/img6.png';
import img7 from 'assets/images/pageBuilder/img7.png';
import img8 from 'assets/images/pageBuilder/img8.png';
import img9 from 'assets/images/pageBuilder/img9.png';


const images = [
   img1, img2, img3, img4, img5, img6, img7, img8, img9,
];

const PageBuilder = () => {
   return (
      <div className='mob-pageBuilder'>
         {images.map((image, i) => {
            return (
               // eslint-disable-next-line react/no-array-index-key
               <div className='m-t-exl' key={ i }>
                  <BuilderCard
                     imgSrc={ image }
                     focused={ i === 0 }
                  />
               </div>
            );
         })}
      </div>
   );
};

export default PageBuilder;
