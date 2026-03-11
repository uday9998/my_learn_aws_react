import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import { toast } from 'react-toastify';
import {
   getYoutubeId, getVimeoEmbed, getIframeEmbed, getWistiaEmbed,
} from 'utils/pageBuilder/video';
import TextInputRange from 'components/elements/form/TextInputRange';
import Switch from 'components/elements/switchNew';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import './index.scss';
import isPrint from 'state/modules/designCourse/edit/Error';


const VideoEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, source, src, width, justifyContent, visibility,
      paddingBottom, paddingLeft, paddingRight, paddingTop, templateName,
   } = props;

   const [currentSrc, setCurrentSrc] = useState(src);
   const [currentCode, setCurrentCode] = useState('');
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
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
   useEffect(() => {
      if (source === 'iframe') {
         setCurrentCode(src);
      } else {
         setCurrentSrc(src);
      }
   }, []);
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   return (
      <div className='videoEditable' data-slug={ slug }>
         <div>
            <Switch
               label='Show Video'
               size='medium'
               name='visibility'
               positionText='left'
               value={ visibility === true }
               onChange={ () => changeProp(!(visibility === true), 'visibility', 'component', index) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div>
         <div className='select_video_source'>
            <Select
               label='Select Video Source'
               className='select'
               heading='Select Video Source'
               type='select-medium'
               placeholder='YouTube'
               value={ source }
               onChange={ (name, value) => {
                  setCurrentCode('');
                  setCurrentSrc('');
                  changeProp(value, 'source', 'component', index);
               } }
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
                     <Input
                        placeholder='Embed Code/Iframe'
                        type='textarea'
                        label='Code'
                        id={ `video-${ slug }` }
                        name='video'
                        value={ currentCode }
                        onChange={ (name, value) => getVideo(value) }
                     />
                  )
                  : (
                     <Input
                        label='Video URL'
                        placeholder='Video URL'
                        id={ `video-${ slug }` }
                        name='video'
                        value={ currentSrc }
                        onChange={ (key, value) => { getVideo(value); } }
                     />
                  )
            }
         </div>
         <div className='m-t-m'>
            <Spacing
               top={ paddingTop }
               bottom={ paddingBottom }
               left={ paddingLeft }
               right={ paddingRight }
               changeProp={ changeProp }
               index={ index }
               slug={ slug }
            />
         </div>
         <div>
            <TextInputRange
               label='Size (px)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 0 }
               max={ templateName === 'template6' ? 500 : 560 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <Select
               label='Align Video'
               className=''
               heading=''
               placeholder='Align Content'
               type='select-medium'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
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
   justifyContent: PropTypes.string,
   visibility: PropTypes.bool,
   templateName: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
};

export default VideoEditable;
