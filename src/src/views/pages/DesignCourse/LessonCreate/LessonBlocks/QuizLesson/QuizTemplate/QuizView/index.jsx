import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Quiz from './Quiz';
import './index.scss';


const QuizTemplate = ({ src, ...rest }) => {
   const [isHidenUpload, setIsHidenUpload] = useState(false);
   useEffect(() => {
      setIsHidenUpload(!!src);
   }, [src]);
   // rest.videoSrctype, rest.videEmbed

   return (
      <div className='block__upload__media__view'>
         {isHidenUpload ? (
            <>
               {/* {!rest.openSettings && (
                  <div className='upload__media__image__view__button'>
                     <ChangeButton
                        text={ `Change ${ rest.buttonText }` }
                        iconName='ChangeImageM'
                        onClick={ () => setIsHidenUpload(false) }
                        withText={ true }
                     />
                  </div>
               )}
               <div className={ (rest.type === 'audio' || rest.type === 'video' || rest.type === 'image') ? 'upload__media__image__view__change' : 'upload__media__image__view__change embed-container' }>
                  <FileLoading src={ src } type={ rest.type } view={ rest.view } style={ rest.style } />
               </div> */}
            </>
         ) : (
            <Quiz
               { ...rest }
               onFinish={ () => setIsHidenUpload(true) }
               setIsHidenUpload={ setIsHidenUpload }
               src={ src }
            />
         )}
      </div>
   );
};

QuizTemplate.propTypes = {
   src: PropTypes.string,
   rest: PropTypes.object,
};

export default QuizTemplate;
