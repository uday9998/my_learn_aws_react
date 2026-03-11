import React from 'react';
import './index.scss';
import LandingHeader from 'views/layout/landings/LandingHeader';
import HomeLandingGetStarted from 'views/layout/landings/HomeLandingGetStarted';
import LandingFooter from 'views/layout/landings/LandingFooter';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import demoImage from 'assets/images/homepage/desktop.png';
import illustration from 'assets/images/homepage/illustration.png';
import illustration1 from 'assets/images/homepage/illustration1.png';
import illustration2 from 'assets/images/homepage/illustration2.png';
import illustration3 from 'assets/images/homepage/illustration3.png';
import logos from 'assets/images/homepage/logos.png';
import bitmap from 'assets/images/homepage/bitman.png';
import teamImage from 'assets/images/homepage/bitmap.png';
import computer from 'assets/images/homepage/computer.png';
import Order from 'components/modules/homePage/Order';
import TonyGrebmeier from 'assets/images/homepage/TonyGrebmeier.png';
import AliciaLyttle from 'assets/images/homepage/AliciaLyttle.png';
import RonDouglas from 'assets/images/homepage/RonDouglas.png';
import LynnTerry from 'assets/images/homepage/LynnTerry.png';
import { ordersData } from './data';

const HomePage = () => {
   return (
      <div className='homePage'>
         <div className='menu'>
            <LandingHeader />
         </div>

         <div className='sectionOne'>
            <div className='content_right_l'>
               <div className='sectionOne__content'>
                  <div>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner={ ['Turn Your', <br />, 'Knowledge Into', <br />, <span className='blue__title'>An Online Business</span>] }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.large }
                        inner='Create an online class and membership site with the all-in-one platform and have Miestro run your entire online business.'
                     />
                  </div>
                  <div className='m-t-exl flex bottom-content'>
                     <div className='m-r-exl'>
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           style={ { height: '56px' } }
                           text='Start Free Trial'
                        />
                     </div>
                     <div className='watch-domain'>
                        <BaseButton
                           theme={ btnTheme.blueBordered }
                           size={ btnSize.large }
                           style={ { height: '56px' } }
                           text='Watch Demo'
                        />
                     </div>
                  </div>
               </div>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ demoImage } alt='demo' />
                  </div>

               </div>
            </div>
         </div>
         <div className='sectionTwo'>
            <div className='content_center'>
               <div className='sectionTwo__content'>
                  <div className='m-t-exl m-b-exs flex justify-center header-content'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Thought Leaders Who Use Miestro'
                     />
                  </div>
                  <div className='flex sectionTwo__imgs'>
                     <div className='flex flex-col justify-between'>
                        <div className='sectionTwo__cover'>
                           <img src={ TonyGrebmeier } alt='Tony Grebmeier' />
                        </div>
                        <div className='flex flex-col text_center leader__name'>
                           <Text
                              type={ TextType.bold }
                              size={ TextSize.large }
                              inner='Tony Grebmeier'
                           />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.medium }
                              inner='Teaches Empowerment'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col justify-between'>
                        <div className='sectionTwo__cover'>
                           <img src={ AliciaLyttle } alt='Alicia Lyttle' />

                        </div>
                        <div className='flex flex-col text_center leader__name'>
                           <Text
                              type={ TextType.bold }
                              size={ TextSize.large }
                              inner='Alicia Lyttle'
                           />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.medium }
                              inner='Social Media Queen'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col justify-between'>
                        <div className='sectionTwo__cover'>
                           <img src={ RonDouglas } alt='Ron Douglas' />
                        </div>
                        <div className='flex flex-col text_center leader__name'>
                           <Text
                              type={ TextType.bold }
                              size={ TextSize.large }
                              inner='Ron Douglas'
                           />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.medium }
                              inner='Internet Entrepreneur'
                           />
                        </div>
                     </div>
                     <div className='flex flex-col justify-between'>
                        <div className='sectionTwo__cover'>
                           <img src={ LynnTerry } alt='Lynn Terry' />
                        </div>
                        <div className='flex flex-col text_center leader__name'>
                           <Text
                              type={ TextType.bold }
                              size={ TextSize.large }
                              inner='Lynn Terry'
                           />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.medium }
                              inner='Online Marketing Expert'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>


         <div className='sectionThree'>
            <div className='content_right_l'>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Miestro makes it simple to run your online business'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.large }
                        inner='Get the tools to create your own digital programs and grow your online business.'
                     />
                  </div>
                  <div className='m-t-exl flex button-content'>
                     <div className='m-r-exl'>
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           style={ { height: '56px' } }
                           text='Start Free Trial'
                        />
                     </div>

                  </div>
               </div>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ illustration2 } alt='illustration' />
                  </div>
               </div>
            </div>
         </div>

         <div className='sectionEight'>
            <div className='content__center'>
               <div className='text_center'>
                  <div className='sectionOne__content'>
                     <div className='sectionOne__title'>
                        <Text
                           type={ TextType.heavy }
                           size={ TextSize.extraLarge }
                           inner={ ['Record And Manage Your Trainings', <br />, 'From The Same Platform'] }
                        />
                     </div>
                     <div className='m-t-m sectionOne__desc'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.large }
                           inner='With Miestro Recorder you can record all your trainings and upload them directly into Miestro with one click. No need for external video recording software or taking time to export videos.'
                        />
                     </div>
                  </div>
               </div>
               <div className='videoPlayer'>
                  <img src={ computer } alt='computer' />
               </div>
            </div>
         </div>

         <div className='sectionFour'>
            <div className='content_right_l'>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ illustration3 } alt='illustration' />
                  </div>
               </div>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='All tools in one place. Get your classes and membership sites up'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Order
                        orders={ ordersData[0].orders }
                     />
                  </div>
               </div>

            </div>
         </div>


         <div className='sectionFour sectionFive'>
            <div className='content_right_l'>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ illustration } alt='illustration' />
                  </div>
               </div>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Create your program with our robust set of tool'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Order
                        orders={ ordersData[1].orders }
                     />
                  </div>
               </div>

            </div>
         </div>

         <div className='sectionFour'>
            <div className='content_right_l'>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ illustration1 } alt='illustration' />
                  </div>
               </div>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Selling your products has never been easier with miestro'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Order
                        orders={ ordersData[2].orders }
                     />
                  </div>
               </div>

            </div>
         </div>


         <div className='sectionSix'>
            <div className='flex justify-center integrations__title'>
               <Text
                  type={ TextType.heavy }
                  size={ TextSize.extraLarge }
                  inner='Integrations'
               />
            </div>
            <div className='flex justify-center integrations__desc'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.large }
                  inner='You can connect Miestro with hundreds of applications to analyze your text data and automate business workflows.'
               />
            </div>
            <div className='sectionSix__image'>
               <img src={ logos } alt='logos' />
            </div>
         </div>

         <div className='sectionThree sectionCoach'>
            <div className=' content_right_l'>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Become Our Next Success Story'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.large }
                        inner='The success coach who changed her life and business to help other businesses with her online training.'
                     />
                  </div>
                  <div className='m-t-exl flex button-content'>
                     <div className='m-r-exl'>
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           style={ { height: '56px' } }
                           text='Start Free Trial'
                        />
                     </div>

                  </div>
               </div>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ bitmap } alt='illustration' />
                  </div>
               </div>
            </div>
         </div>


         <div className='sectionSeven'>
            <div className='content_center'>
               <div className='sectionOne__images'>
                  <div className='sectionOne__image_big'>
                     <img src={ teamImage } alt='illustration' />
                  </div>
               </div>
               <div className='sectionOne__content'>
                  <div className='sectionOne__title'>
                     <Text
                        type={ TextType.heavy }
                        size={ TextSize.extraLarge }
                        inner='Get The Best Support In The Industry'
                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.large }
                        inner={ ['Imagine having your very own support team that is invested in your online business combined with the best tool on the market.'] }


                     />
                  </div>
                  <div className='m-t-m'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.large }
                        inner={ ['Reach out to us when you need us ', <span className='blue__title'>support@miestro.com</span>] }
                     />
                  </div>
               </div>
            </div>
         </div>

         <HomeLandingGetStarted />
         <LandingFooter />
      </div>
   );
};

export default HomePage;
