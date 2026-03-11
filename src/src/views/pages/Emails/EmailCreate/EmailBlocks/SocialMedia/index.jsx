import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';

const TextLesson = ({
   block,
}) => {
   const styles = block.css_attributes;

   const buttonStyle = {
      justifyContent: styles.justifyContent,
   };

   const iconStyle = {
      marginRight: `${ styles.gap }px`,
      marginTop: '6px',
      marginBottom: '6px',
   };

   const linkIcons = {
      'Facebook': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/facebook.png',
      'Pinterest': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/pinterest.png',
      'Youtube': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/youtube.png',
      'Linkedin': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/linkedin.png',
      'Tumblr': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/tumblr - black.png',
      'TikTok': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/tiktok.png',
      'Instagram': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/instagram.png',
      'Dribbble': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/dribbble.png',
      'Discord': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/discord.png',
      'Meet': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/meet.png',
      'Telegram': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/telegram.png',
      'Twitter': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/twitter.png',
      'Zoom': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/zoom.png',
      'Figma': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/figma.png',
      'defaultSocial': 'https://miestro-production.s3.us-west-2.amazonaws.com/icons/default.png',
   };


   return (
      <div className='social_email ' style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }>
         <div className='socialMedia_email' style={ buttonStyle }>
            {block.links && !!block.links.length ? block.links.map((link, i) => {
               const newIndex = i + 1;
               return (
                  <div key={ newIndex } style={ iconStyle }>
                     <img src={ linkIcons[link.text] || linkIcons.defaultSocial } alt='icon-social' />
                  </div>
               );
            })
               : (
                  <Text
                     inner='Select in the left pane which of the social icons you want to see here'
                     type={ textType.regularDefault }
                     size={ textSize.medium }
                  />
               )
            }
         </div>
      </div>
   );
};

TextLesson.propTypes = {
   block: PropTypes.object,
};

export default TextLesson;
