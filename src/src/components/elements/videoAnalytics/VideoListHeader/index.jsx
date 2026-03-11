import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import PropTypes from 'prop-types';

const VideoListHeader = ({ viewVideoChange, handleVideosSelectChange, total }) => {
   const options = [
      { value: 1, label: 'Viewing Most Recent' },
      { value: 2, label: 'Viewing Less Recent' },
   ];
   return (
      <div className='videoListHeaderContent'>
         <div className='videoListHeader'>
            <div className='videoListHeader__left'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='Video Analytics'
               />
               <div className='m-l-exl' />

            </div>
            <div className='videoListHeader__right'>
               <div className='selectWrapper'>
                  <Select
                     placeholder='Viewing Most Recent'
                     typeOval
                     hasBorder
                     padding='3px 16px 3px 28px'
                     options={ options }
                     onChange={ (name, value) => handleVideosSelectChange(name, value) }
                     value={ viewVideoChange }
                     name='viewChange'
                  />
               </div>
               {/* <div className='btnWrapper m-r-exs'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.medium }
                     text='Print'
                  />
               </div>
               <div className='btnWrapper'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.medium }
                     text='Export'
                  />
              </div> */}
            </div>
         </div>
         <div className='m-l-exs totalsContent'>
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner={ `${ total } Total` }
               color='rgba(51, 51, 51, 0.3)'
            />
         </div>
      </div>
   );
};

VideoListHeader.propTypes = {
   handleVideosSelectChange: PropTypes.func,
   viewVideoChange: PropTypes.number,
   total: PropTypes.number,
};

VideoListHeader.defaultProps = {
};

export default VideoListHeader;
