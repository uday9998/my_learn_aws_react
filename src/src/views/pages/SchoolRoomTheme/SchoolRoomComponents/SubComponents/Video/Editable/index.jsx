import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import Select from 'components/elements/form/Select';
import { toast } from 'react-toastify';
import {
   getYoutubeId, getVimeoEmbed, getIframeEmbed, getWistiaEmbed,
} from 'utils/pageBuilder/video';
import TextInputRange from 'components/elements/form/TextInputRange';
// import Switch from 'components/elements/form/Switch';
import './index.scss';
import isPrint from 'state/modules/designCourse/edit/Error';


const VideoEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, source, src, width, spacing, justifyContent,
      subIndex,
   } = props;

   const [currentSrc, setCurrentSrc] = useState(src);
   const [currentCode, setCurrentCode] = useState('');
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);


   const getVideo = (value) => {
      if (source === 'youtube' && getYoutubeId(value) !== 'error') {
         setCurrentSrc(getYoutubeId(value));
         changeProp(getYoutubeId(value), 'src', 'component', index);
      } else if (source === 'vimeo' && getVimeoEmbed(value) !== 'error') {
         setCurrentSrc(getVimeoEmbed(value));
         changeProp(getVimeoEmbed(value), 'src', 'component', index);
      } else if (source === 'wistia' && getWistiaEmbed(value) !== 'error') {
         setCurrentSrc(getWistiaEmbed(value));
         changeProp(getWistiaEmbed(value), 'src', 'component', index);
      } else if (source === 'iframe' && getIframeEmbed(value) !== 'error') {
         setCurrentCode(getIframeEmbed(value));
         changeProp(getIframeEmbed(value), 'src', 'component', index);
      } else if (isPrint('Enter valid video URL of current Player !')) {
         toast.error('Enter valid video URL of current Player !');
      }
   };
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   useEffect(() => {
      if (source === 'iframe') {
         setCurrentCode(src);
      } else {
         setCurrentSrc(src);
      }
   }, []);

   return (
      <div className='videoEditable' data-slug={ slug }>
         {/* <div>
            <Switch
               label='Show Video'
               checked={ visibility === true }
               name='visibility'
               onChange={ (name, value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div> */}
         <div className='select_video_source'>
            <Select
               label='Select Video Source'
               className='select'
               heading='Select Video Source'
               placeholder='YouTube'
               value={ source }
               onChange={ (name, value) => { changeProp(value, 'source', 'component', index); } }
               options={ [
                  { label: 'YouTube', value: 'youtube' },
                  { label: 'Vimeo', value: 'vimeo' },
                  { label: 'Wistia', value: 'wistia' },
                  { label: 'Iframe', value: 'iframe' },
               ] }
            />
         </div>
         <div className='m-t-m'>
            {
               source === 'iframe'
                  ? (
                     <TextArea
                        placeholder='Embed Code/Iframe'
                        label='Code'
                        id={ `video-${ slug }` }
                        name='video'
                        value={ currentCode }
                        onChange={ (name, value) => getVideo(value) }
                     />
                  )
                  : (
                     <TextInput
                        label='Video URL'
                        placeholder='Video URL'
                        id={ `video-${ slug }` }
                        name='video'
                        value={ currentSrc }
                        onChange={ (key, value) => { getVideo(value); } }
                     />
                  )
            }
            <TextInput
               label='Video URL'
               placeholder='Video URL'
               id={ `video-${ slug }` }
               name='video'
               value={ currentSrc }
               onChange={ (key, value) => { getVideo(value); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Spacing (px)'
               type='range'
               leftText={ spacing }
               id={ `spacing-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='spacing'
               value={ spacing }
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Size (px)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 0 }
               max={ 560 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         <div>
            <Select
               label='Align Video'
               className=''
               heading=''
               placeholder='Align Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'subcomponent', index, subIndex) }
               options={ textAlignFlexOptions }
            />
         </div>
      </div>
   );
};

VideoEditable.defaultProps = {

};

VideoEditable.propTypes = {
   source: PropTypes.string,
   src: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   width: PropTypes.string,
   spacing: PropTypes.string,
   justifyContent: PropTypes.string,
   subIndex: PropTypes.number,
};

export default VideoEditable;
