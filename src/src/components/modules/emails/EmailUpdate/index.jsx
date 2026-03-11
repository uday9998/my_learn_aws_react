import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const emails = [
   '[%user_name%]',
   '[%user_email%]',
   '[%course_name%]',
   '[%course_url%]',
   '[%owner_name%]',
   '[%sign_in_url%]',
   '[%site_title%]',
];


const EmailUpdate = () => {
   return (
      <SelectedWrapper>
         <div className='emailUpdate'>
            <div className='m-b-exl'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Email Update'
               />
               <div className='m-t-s' />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Send an email to specific users, users enrolled with class tags, or everyone in your class.'
               />
            </div>
            <div>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Email Codes'
               />
               <div className='m-t-s' />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ emails.map((email, i) => {
                     return (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={ i } style={ { userSelect: 'auto' } }>
                           {email}
                           {i !== emails.length && <div className='m-t-exs' />}
                        </span>
                     );
                  }) }
               />
            </div>
         </div>
      </SelectedWrapper>
   );
};

export default EmailUpdate;
