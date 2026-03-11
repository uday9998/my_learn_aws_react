/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import { footerData } from './data';

const LandingFooter = () => {
   return (
      <div className='landingFooter'>
         <div className='landingFooter__content'>
            { footerData.map((section, i) => {
               return (
                  <div className='landingFooter__section' key={ i }>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.small }
                        inner={ section.title }
                     />
                     { section.links.map((link, j) => {
                        return (
                           <div className={ j === 0 ? 'm-t-exs' : 'm-t-m' } key={ j }>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ link }
                              />
                           </div>
                        );
                     }) }
                     {i === footerData.length - 1 && (
                        <div className='landingFooter__social'>
                           <div className='m-r-m'>
                              <Icon name='Twitter' />
                           </div>
                           <div>
                              <Icon name='Facebook' />
                           </div>
                        </div>
                     )}
                  </div>
               );
            }) }
         </div>
      </div>
   );
};

export default LandingFooter;
