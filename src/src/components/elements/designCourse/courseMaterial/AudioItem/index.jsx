import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

const AudioItem = ({ file, name }) => {
   return (
      <div className='AudioItemContent'>
         <div className='AudioItem'>
            <div className='AudioItem__icon'>
               <IconNew name='audioM' />
            </div>
            <div className='AudioItem__data'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner={ name }
               />
            </div>
         </div>
         <div className='audo-content'>
            <audio controls src={ file } style={ { width: '100%' } }>
               <source type='audio/wav' />
               <track src='captions_en.vtt' kind='captions' srcLang='en' label='english_captions' />
            </audio>
         </div>
      </div>

   );
};

AudioItem.propTypes = {
   file: PropTypes.string,
   name: PropTypes.string,
};

export default AudioItem;
