import React from 'react';
import './index.mob.scss';
import TemplatesCard from 'components/modules/emailTemplates/TemplatesCard';
import NotificationsCard from 'components/modules/emailTemplates/NotificationsCard';
import DynamicCard from 'components/modules/emailTemplates/DynamicCard';
import PropTypes from 'prop-types';

const EmailTemplates = ({ active }) => {
   return (
      <div className='mob-emailTemplates'>
         <TemplatesCard />
         <div className='m-t-m m-b-m'>
            <NotificationsCard />
         </div>
         <div className='m-b-exs'>
            <DynamicCard title='Welcome' isOpen={ active === 1 } />
         </div>
         <div className='m-b-exs'>
            <DynamicCard title='Enrollment' isOpen={ active === 2 } />
         </div>
         <div className='m-b-exs'>
            <DynamicCard title='Completion' isOpen={ active === 3 } />
         </div>
         <div className='m-b-exs'>
            <DynamicCard title='Subscription' isOpen={ active === 4 } />
         </div>
         <div className='m-b-exs'>
            <DynamicCard title='Affiliate Welcome' isOpen={ active === 5 } />
         </div>
         <div>
            <DynamicCard title='Refund' isOpen={ active === 6 } />
         </div>
      </div>
   );
};

EmailTemplates.propTypes = {
   active: PropTypes.number,
};

export default EmailTemplates;
