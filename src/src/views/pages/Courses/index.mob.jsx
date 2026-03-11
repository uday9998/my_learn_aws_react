import React from 'react';
import './index.mob.scss';
import BaseButton, { THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';
import AddNewCourse from 'components/modules/courses/AddNewCourse';
import CourseCard from 'components/modules/courses/CourseCard';
import img1 from 'assets/images/mobile/library.png';
import img2 from 'assets/images/mobile/fb.png';
import img3 from 'assets/images/mobile/test.png';
import img4 from 'assets/images/mobile/ui.png';


const Courses = () => {
   return (
      <div className='mob-courses-page w-full'>
         <TextInput
            placeholder='Search For Classes'
            icon='Search'
         />
         <div className='m-t-m m-b-exl'>
            <BaseButton
               theme={ btnTheme.lightBlue }
               text='Search'
            />
         </div>
         <AddNewCourse />
         <div className='m-t-exl' />
         <BaseButton
            theme={ btnTheme.blueBordered }
            text='Add Class'
         />
         <div className='m-t-exl'>
            <CourseCard
               title='Class Code Masterclass'
               content='This training shows you how to massively scale your business with online classes.'
               count='124'
               img={ img1 }
               published
            />
         </div>
         <div className='m-t-exl'>
            <CourseCard
               title='Facebook Ads '
               content='David Schloss shows you how to have facebook ads that convert like crazy and help you to s...'
               count='80'
               img={ img2 }
               published
            />
         </div>
         <div className='m-t-exl'>
            <CourseCard
               title='Test'
               content='This training shows you how to massively scale your business with online classes.'
               img={ img3 }
               count='24'
            />
         </div>
         <div className='m-t-exl'>
            <CourseCard
               title='Miestro Elite'
               content='This training shows you how to massively scale your business with online classes.'
               count='34'
               img={ img1 }
            />
         </div>
         <div className='m-t-exl'>
            <CourseCard
               title='Ui Design Masterclass'
               content='This training shows you how to massively scale your business with online classes.'
               count='112'
               img={ img4 }
               published
            />
         </div>
      </div>
   );
};

export default Courses;
