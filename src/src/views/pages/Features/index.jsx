import React from 'react';
import './index.scss';
import LandingHeader from 'views/layout/landings/LandingHeader';
import LandingGetStarted from 'views/layout/landings/LandingGetStarted';
import LandingFooter from 'views/layout/landings/LandingFooter';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import sect2Image from 'assets/images/landings/bitmap.png';
import sect1Image from 'assets/images/landings/laptop.png';
import sect3Image from 'assets/images/landings/bitmap1.png';
import sect6Image from 'assets/images/landings/image.png';
import sect7Image from 'assets/images/landings/bitmap7.png';
import sect8Image from 'assets/images/landings/bitmap8.png';
import sect9Image from 'assets/images/landings/bitmap9.png';
import sect10Image from 'assets/images/landings/bitmap10.png';
import sect11Image from 'assets/images/landings/bitmap11.png';

const moreFeatures = [
   'Your Own Affiliate Program', 'Checkout Pages', 'Drop content', 'Broadcast Your Class to The World', 'Custom Domains', 'Landing Pages', 'Membership Themes', 'Quizzes', 'Manage Comments', 'Advanced Reporting', 'Integrations',
];

const Features = () => {
   return (
      <div className='d-features'>
         <LandingHeader />
         <div className='features__sect features__sect1'>
            <div className='content_center'>
               <div className='features__sect1_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Miestro Features'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='Paying high transaction and per user fees will cost you in the long run. Use our platform with no limitations.'
                     />
                  </div>
                  <div className='m-t-m flex'>
                     <div className='m-r-exl buttom-content'>
                        <BaseButton
                           theme={ btnTheme.darkBlue }
                           size={ btnSize.large }
                           style={ { height: '56px' } }
                           text='Start Free Trial'
                        />
                     </div>
                  </div>
                  <div className='m-t-exl sect1Image'>
                     <img src={ sect1Image } alt='sect1Image' />
                  </div>
               </div>
            </div>
         </div>
         <div className='features__sect features__sect2'>
            <div className='content_center'>
               <div className='features__sect2_image'>
                  <img src={ sect2Image } alt='sect3_Image' />
               </div>
               <div className='features__sect2_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Easy to Set Up in Minutes'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='Easily create robust membership, online training portals, and online coaching programs in minutes. Use our landing page builder, then add your class material and you’re done. No more dealing with tech headaches and spending days setting up a class.'
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='features__sect features__sect3'>
            <div className='content_center'>
               <div className='features__sect3_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Explore The Future of Membership Sites'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='About 90% of people won’t consume your content or buy your program—no one sits in front of their computer all day. But now, you can use Miestro to increase your conversion rates. With Miestro you’ll be able to broadcast your message onto platforms where your customers actually are—TV, Android, and other supported platforms. The future is here...'
                     />
                  </div>
               </div>
               <div className='features__sect3_image'>
                  <img src={ sect3Image } alt='sect3_Image' />
               </div>
            </div>
         </div>
         <div className='features__sect features__sect4'>
            <div className='features__sect4_content mob-padding-content'>
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.extraLarge }
                     inner='Miestro Makes It Simple to Run Your Online Business'
                     style={ { fontSize: '40px' } }
                  />
               </div>
               <div className='m-t-m width_60'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.medium }
                     inner='Get the tools to create your own digital programs and grow your online business.'
                  />
               </div>
               <div className='m-t-exl buttom-content' style={ { maxWidth: '192px' } }>
                  <BaseButton
                     theme={ btnTheme.darkBlue }
                     size={ btnSize.large }
                     style={ { height: '56px', width: '100%' } }
                     text='Start Free Trial'
                  />
               </div>
            </div>
         </div>
         <div className='features__sect features__sect5'>
            <div className='features__sect5_content mob-padding-content'>
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.extraLarge }
                     inner='Powerful Membership Features'
                     style={ { fontSize: '40px' } }
                  />
               </div>
               <div className='m-t-m width_60'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.medium }
                     inner="You'll be able to set up beautiful class membership sites with your expertise."
                  />
               </div>
            </div>
         </div>
         <div className='features__sect features__sect6'>
            <div className='content_center'>
               <div className='features__sect6_image'>
                  <img src={ sect6Image } alt='sect6_Image' />
               </div>
               <div className='features__sect6_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Robust Email Solution'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='With Miestro, you can send direct emails to your customers.
                        Send one-time updates or email sequences to your members, affiliates, or team — all at the push of a button.
                        You can also set up automated emails to send later the same day or days into the future using the automation tool.'
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='features__sect features__sect7'>
            <div className='content_center'>
               <div className='features__sect7_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Choose From Amazing Class Templates to Host Your Class'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner="No need to choose boring class templates. We've got you covered with intuitive designs that help your members want to consume your content."
                     />
                  </div>
               </div>
               <div className='features__sect7_image'>
                  <img src={ sect7Image } alt='sect7_Image' />
               </div>
            </div>
         </div>
         <div className='features__sect features__sect8'>
            <div className='content_center'>
               <div className='features__sect8_image'>
                  <img src={ sect8Image } alt='sect8_Image' />
               </div>
               <div className='features__sect8_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Powerful Customer Management'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='See a full display of important information on your class members. After they’ve joined, you are able to see how much each customer is worth and tag them to organize your members’ area.'
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='features__sect features__sect9'>
            <div className='content_center'>
               <div className='features__sect9_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Video & Content Hosting'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m width_60'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner='Eliminate the hassle of external hosting with included fast, reliable hosting for your video and class content.'
                     />
                  </div>
                  <div className='m-t-exl buttom-content' style={ { maxWidth: '192px' } }>
                     <BaseButton
                        theme={ btnTheme.darkBlue }
                        size={ btnSize.large }
                        style={ { height: '56px', width: '100%' } }
                        text='Request a Demo'
                     />
                  </div>
               </div>
               <div className='features__sect9_image'>
                  <img src={ sect9Image } alt='sect9_Image' />
               </div>
            </div>
         </div>
         <div className='features__sect features__sect10'>
            <div className='content_center'>
               <div className='features__sect10_image'>
                  <img src={ sect10Image } alt='sect10_Image' />
               </div>
               <div className='features__sect10_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Advanced Analytics'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner="Data is important and that's why we've created amazing analytics such as LTV, sales, refunds, members added and so much more."
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='features__sect features__sect11'>
            <div className='content_center'>
               <div className='features__sect11_content mob-padding-content'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.extraLarge }
                        inner='Gamification'
                        style={ { fontSize: '40px' } }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner="We're all about keeping customers engaged. Now with Miestro you can give your customers points
                        and badges after they finish a lesson."
                     />
                  </div>
               </div>
               <div className='features__sect11_image'>
                  <img src={ sect11Image } alt='sect11_Image' />
               </div>
            </div>
         </div>
         <div className='features__more'>
            <div className='content_center'>
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.extraLarge }
                     inner='Plus Many More Features'
                     style={ { fontSize: '40px' } }
                  />
               </div>
               <div className='features__more_items'>
                  {
                     moreFeatures.map((elem, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className='features__more_item' key={ i }>
                           <span className='features__more_icon' />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.medium }
                              inner={ elem }
                           />
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
         <LandingGetStarted isColorBlue={ true } />
         <LandingFooter />
      </div>
   );
};

export default Features;
