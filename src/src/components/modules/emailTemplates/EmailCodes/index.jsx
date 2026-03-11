import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Tooltip from 'components/elements/members/Tooltip';

const emails = [
   '[%user_name%]',
   '[%user_email%]',
   '[%sign_in_url%]',
   '[%site_title%]',
   '[%owner_name%]',
];
const EmailCodesCard = () => {
   return (
      <SelectedWrapper>
         <div className='EmailCodesCard'>
            <div className='flex'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Email Codes'
               />
               <Tooltip
                  hintText='These codes can be used to autofill information into the appropriate place in the email from the member contact record.'
                  style={ { top: '-3px' } }
                  hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
               />
            </div>
            <div className='m-t-s' />
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner={ emails.map((email, i) => {
                  return (
                     <span key={ i.toString() } style={ { userSelect: 'auto' } }>
                        {email}
                        {i !== emails.length && <div className='m-t-exs' />}
                     </span>
                  );
               }) }
            />
         </div>
      </SelectedWrapper>
   );
};

EmailCodesCard.propTypes = {
};

export default EmailCodesCard;
