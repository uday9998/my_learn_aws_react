import React from 'react';
import './index.scss';
import AvatarBlock from 'components/elements/mainHub/AvatarBlock';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-polyglot';

const MemberComment = ({
   avatar, name, handleOnChange, comment, handleOnCreate, textColor, primaryTheme, defaultColor,
}) => {
   const t = useTranslate();
   // const handleKeyDown = (e) => {
   //    if (e.keyCode === 13) {
   //       if (!e.shiftKey) {
   //          handleOnCreate(e);
   //       }
   //    }
   // };
   return (
      <div className='memberComment'>
         <AvatarBlock
            name={ name }
            avatar={ avatar }
            avatarStyle={ { width: '40px', height: '40px' } }
            primaryTheme={ primaryTheme }
            defaultColor={ defaultColor }
            studentRoom={ true }
         />
         <div className='memberComment__textarea'>
            <form onSubmit={ handleOnCreate }>
               <TextArea
                  label=''
                  placeholder='Write a comment'
                  onChange={ (key, value) => handleOnChange(key, value) }
                  value={ comment }
                  name='commentText'
                  style={ { height: '80px', fontFamily: primaryTheme } }
                  // handleOnKeyDown={ handleKeyDown }
               />
              <BaseButton
               size={btnSize.large}
               theme={btnTheme.purple}
               text='Post Comment'
               type='submit'
               style={{
                  background: 'var(--buttonBgcolor)',
                  borderColor: 'var(--buttonBgcolor)',
               }}
             />
            </form>
         </div>
      </div>
   );
};

MemberComment.propTypes = {
   avatar: PropTypes.string,
   name: PropTypes.string,
   handleOnChange: PropTypes.func,
   handleOnCreate: PropTypes.func,
   comment: PropTypes.string,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   defaultColor: PropTypes.string,
};
MemberComment.defaultProps = {
   avatar: '',
   name: 'John Doe',
   textColor: '#7cb740',
};

export default MemberComment;
