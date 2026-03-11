import React from 'react';
import './index.scss';
// import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import { useHistory } from 'react-router-dom';


const BlogCreateHeader = () => {
   const history = useHistory();
   return (
      <div className='siteHeader'>
         <div className='siteHeader__top'>
            <div className='siteHeader__title'>
               <div className='flex course__name blog__left'>
                  <div
                     className='m-r-exs left-icon'
                     onClick={ () => history.goBack() }
                     role='presentation'
                  >
                     <Icon
                        name='Left'
                     />
                  </div>
                  <Text
                     type={ textType.normal }
                     size={ textSizes.extraSmall }
                     inner='Blog'
                  />
               </div>
            </div>
            {/* <div className='siteHeader__rightSide blog__rightSide'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text='Save'
                  onClick={ () => {} }
               />
            </div> */}
         </div>
         <div className='siteHeader__bottom'>
            <Text
               type={ textType.normal }
               size={ textSizes.large }
               inner='Create Blog Post'
            />
         </div>
      </div>
   );
};

BlogCreateHeader.propTypes = {

};

export default BlogCreateHeader;
