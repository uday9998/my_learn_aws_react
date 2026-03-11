import React from 'react';
import MemberUpdate from 'components/modules/emails/MemberUpdate';
import EmailUpdate from 'components/modules/emails/EmailUpdate';

const Emails = () => {
   return (
      <div className='mob-emails'>
         <MemberUpdate />
         <div className='m-t-exl' />
         <EmailUpdate />
      </div>
   );
};

export default Emails;
