import React from 'react';
import ViewCard from 'components/modules/designCourse/studentsView/ViewCard';
import TextInput from 'components/elements/form/TextInput';

const AccountCard = () => {
   return (
      <ViewCard
         title='Account Information'
         content={ (
            <>
               <TextInput
                  label=''
                  placeholder='Enter Your Name'
                  style={ { marginTop: '16px' } }
               />
               <TextInput
                  label=''
                  placeholder='Enter Email Address'
                  style={ { marginTop: '16px' } }
               />
            </>
         ) }
      />
   );
};

export default AccountCard;
