import React from 'react';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import './index.scss';
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function UploadProgress({
   onCancel, progress = 30, fixed, className, showCancel = true,
}) {
   return (
      <div className={ `uploadCont ${ fixed && 'progressFixed' } ${ className }` }>
         <div className={ `uploadCont_wrapper ${ fixed && 'fixed' }` }>
            <CircularProgressbarWithChildren
               value={ parseInt(progress * 100, 10) }
               styles={ buildStyles({
                  trailColor: '#E7E9E9',
                  backgroundColor: '#E7E9E9',
                  pathColor: '#24554E',
                  textColor: '#24554E',
                  textSize: '24px',
                  text: {
                     color: 'black',
                  },
               }) }
            >

               <Text
                  inner={ parseInt(progress * 100, 10) }
                  type={ textType.mediumLargeGrey }
                  size={ textSize.large }
                  className='CircularProgressbarWithChildren__text'
                  style={ { color: '#24554e' } }
               />
            </CircularProgressbarWithChildren>
            {/* <Text
                  type={ textType.normal }
                  size={ textSize.small }
                  inner={ `Uploading ${ Math.round(progress * 100) }%` }
                  color='#8a94a2'
               />
               {showCancel && (
                  <div role='presentation' title='Cancel' onClick={ () => onCancel() }>
                     <Icon name='Close' />
                  </div>
               )} */}

            {/* <div className='uploadCont_uploadProgress'>
               <div className='uploadCont_uploadBar' style={ { width: `${ progress * 100 }%` } } />
            </div> */}
         </div>
      </div>
   );
}


UploadProgress.propTypes = {
   onCancel: PropTypes.func,
   progress: PropTypes.number,
   fixed: PropTypes.bool,
   showCancel: PropTypes.bool,
   className: PropTypes.string,
};

export default UploadProgress;
