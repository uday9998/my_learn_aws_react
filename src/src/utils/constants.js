import React from 'react';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

import { isLocalhost } from 'utils/Helpers';

const isLocal = isLocalhost();

export const portalId = { type: 'membership' };

export const MAIN_DOMAIN = isLocal ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;
export const LANDING_URL = isLocal ? process.env.REACT_APP_API_LOCAL_ENDPOINT : window.location.origin;
export const IMAGES_BASE_URL = `${ MAIN_DOMAIN }/images/admin/`;

export const template1 = {
   dark: {
      school_bg_color: '#121212',
      school_color: '#24554E',
      school_text_color: '#fff',
      school_color_2: '#fff',
      school_button_color: '#fff',
   },
   light: {
      school_bg_color: '#fff',
      school_color: '#24554E',
      school_text_color: '#131F1E',
      school_color_2: '#131F1E',
      school_button_color: '#131F1E',
   },
};

export const template2 = {
   dark: {
      school_bg_color: '#121212',
      school_color: '#3060BD',
      school_text_color: '#fff',
      school_color_2: '#fff',
      school_button_color: '#fff',
   },
   light: {
      school_bg_color: '#F7F8FA',
      school_color: '#3060BD',
      school_text_color: '#131F1E',
      school_color_2: '#131F1E',
      school_button_color: '#131F1E',
   },
};

export const template3 = {
   dark: {
      school_bg_color: '#121212',
      school_color: '#24554E',
      school_text_color: '#fff',
      school_color_2: '#fff',
      school_button_color: '#fff',
   },
   light: {
      school_bg_color: '#F4F7F7',
      school_color: '#24554E',
      school_text_color: '#131F1E',
      school_color_2: '#131F1E',
      school_button_color: '#131F1E',
   },
};

export const PlaylistTabVariants = [
   { key: 'Playlist Info', value: 1 },
   { key: 'Content', value: 2 },
   { key: 'SEO Metadata', value: 3 },
];

export const tabVariants = [
   { value: 'info', key: 'Instructor Info', iconName: 'InstructorInfo' },
   { value: 'images', key: 'Instructor Images', iconName: 'InstructorImages' },
];

export const statusVariants = [
   {
      value: '1',
      content: (
         <div className='playlist__access__content'>
            <div className='content__title__wrapper'>
               <Text
                  inner='Protected'
                  size={ sizes.small }
                  style={ {
                     color: '#131F1E',
                  } }
               />
               <IconNew name='PlayListAccessRightLock' />
            </div>
            <Text
               inner='To watch, the user must purchase'
               size={ sizes.small14 }
               style={ {
                  color: '#727978',
               } }
            />
         </div>
      ),
   },
   {
      value: '2',
      content: (
         <div className='playlist__access__content'>
            <div className='content__title__wrapper'>
               <Text
                  inner='Free To Watch'
                  size={ sizes.small }
                  style={ {
                     color: '#131F1E',
                  } }
               />
               <IconNew name='PlayListAccessRight' />
            </div>
            <Text
               inner='User can watch without purchase'
               size={ sizes.small14 }
               style={ {
                  color: '#727978',
               } }
            />
         </div>
      ),
   },
];

export const VideoListStatusVariant = [
   {
      value: 1,
      content: (
         <div className='playlist__video__list'>
            <Text
               inner='Show Only in Playlists'
               size={ sizes.small14 }
               style={ {
                  color: '#131F1E',
               } }
            />
         </div>
      ),
   },
   {
      value: 0,
      content: (
         <div className='playlist__video__list'>
            <Text
               inner='Show also as a separate video'
               size={ sizes.small14 }
               style={ {
                  color: '#131F1E',
               } }
            />
         </div>
      ),
   },
];


export const colors = [
   {
      backgroundColor: '#E7E9E9',
      textColor: '#444C4B',
   },
   {
      backgroundColor: '#ECF5FF',
      textColor: '#329BFC',
   },
   {
      backgroundColor: '#FFF1F1',
      textColor: '#A61C23',
   },
   {
      backgroundColor: '#E8F2F1',
      textColor: '#24554E',
   },
   {
      backgroundColor: '#FFF6D7',
      textColor: '#AC890A',
   },
];


export const fontList = [
   'Inter', 'Inter', 'Lobster', 'Abril Fatface', 'DM Serif Display', 'Anton', 
   'Lato', 'Poppins', 'Parisienne', 'Shrikhand', 'Playfair Display', 'Inter Mono', 
   'Lobster Two', 'Montserrat', 'Oswald', 'Andale Mono', 'Arial', 'Brush Script MT', 
   'Arial Black', 'Garamond', 'Comic Sans MS', 'Courier New', 'Georgia', 
   'Helvetica', 'Impact', 'Symbol', 'Tahoma', 'Terminal', 'Times New Roman', 
   'Trebuchet MS', 'Verdana', 'Raleway',
];

export const fontSizeList = ['16px', '4px', '6px', '8px', '10px', '12px', '14px', '18px', '24px', '36px', '48px', '54px'];