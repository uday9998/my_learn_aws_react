import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import addSection from 'assets/images/promotions/add-section.png';

const AddNewCourse = () => {
   return (
      <SelectedWrapper>
         <div className='addNewCourse'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Add New Class'
            />
            <div className='addSection__form'>
               <img src={ addSection } alt='add section' />
            </div>
         </div>
      </SelectedWrapper>
   );
};

export default AddNewCourse;
