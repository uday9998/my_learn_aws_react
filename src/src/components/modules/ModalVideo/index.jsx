import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import NewLessonBlock from './NewLessonBlock';
import './index.scss';


const ModalVideo = ({
   modalLesson, handleShowModal, course, videoImg, onJoin, isSmall, title, onLogin, isFreeCourse,
}) => {
   return (
      <div className='video_modal'>
         <div className={ isSmall ? 'inner_modal_wrapper_small scroll' : 'inner_modal_wrapper scroll' }>
            <Text
               inner={ title || 'This video is exclusive to members. Subscribe now to gain access.' }
               size={ sizes.xxlarge }
               type={ types.medium }
               style={ { color: 'var(--textColor)' } }
            />
            <NewLessonBlock modalLesson={ modalLesson } course={ course } videoImg={ videoImg } isSmall={ isSmall } />
            <div className='buttons_wrapper'>
               {!isSmall && (
                  <BaseButton
                     onClick={ handleShowModal }
                     theme='white'
                     text='Cancel'
                     size='large120'
                     style={ {
                        padding: '13px 16px',
                        color: 'var(--buttonBgcolor)',
                        backgroundColor: 'transparent',
                     } }
                  />
               )}

               <BaseButton
                  theme='explore'
                  text={ isFreeCourse() ? 'Log In' : 'Go To Checkout' }
                  onClick={ isFreeCourse() ? onLogin : onJoin }
                  style={ {
                     backgroundColor: 'var(--buttonBgcolor)',
                     color: '#fff',
                     borderColor: 'var(--buttonBgcolor)',
                  } }
               />

            </div>
         </div>
      </div>
   );
};


ModalVideo.propTypes = {
   modalLesson: PropTypes.object,
   handleShowModal: PropTypes.func,
   course: PropTypes.object,
   videoImg: PropTypes.func,
   onJoin: PropTypes.func,
   isSmall: PropTypes.bool,
   title: PropTypes.string,
   onLogin: PropTypes.func,
   isFreeCourse: PropTypes.func,
};


export default ModalVideo;
