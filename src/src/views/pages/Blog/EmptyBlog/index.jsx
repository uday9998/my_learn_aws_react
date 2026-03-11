import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import BlogEmpty from 'assets/images/blog/empty.png';

const EmptyBlog = ({ setTurnOnBlog }) => {
   return (
      <div className='emptyBlog'>
         <div className='emptyBlog_top'>
            <div>
               <div>
                  <Text
                     type={ TextType.medium }
                     size={ TextSize.xxlarge }
                     inner='One of the best ways to inspire your audience'
                  />
               </div>
               <div className='m-t-exs'>
                  <Text
                     type={ TextType.regularDefaultGrey145 }
                     size={ TextSize.small }
                     inner='A blog is an easy way to promote your online brand and share your experience with students or prospective students'
                  />
               </div>
               {/* <div className='emptyBlog_top_video'>
                  <IconNew name='playM' />
                  <div>
                     <Text
                        type={ TextType.regularDefaultSmall }
                        style={ { color: '#24554E' } }
                        size={ TextSize.small }
                        inner='See how it works'
                     />
                  </div>
               </div> */}
            </div>
            <div>
               <img src={ BlogEmpty } alt='blog' />
            </div>
         </div>
         <div className='emptyBlog_bottom'>
            <div className='emptyBlog_bottom_left'>
               <div className='emptyBlog_bottom_left_icon'><IconNew name='commentX' /></div>
               <div className='emptyBlog_bottom_left_text'>
                  <div>
                     <Text
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                        inner="Let's start blogging"
                     />
                  </div>
                  <div>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner='By turning on the Blog settings, there would be an option for your members to access your blog through the menu in your portal.'
                     />
                  </div>
               </div>
            </div>
            <div className='emptyBlog_bottom_right'>
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSize.large }
                  text='Turn on Blog'
                  onClick={ (e) => setTurnOnBlog(e, true) }
               />
            </div>
         </div>
      </div>
   );
};

EmptyBlog.propTypes = {
   setTurnOnBlog: PropTypes.func,
};

export default EmptyBlog;
