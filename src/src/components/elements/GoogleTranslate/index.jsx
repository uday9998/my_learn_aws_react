/* eslint-disable no-new */
import React, { useEffect, useRef, useState } from 'react';
import { changeLanguage } from 'api';
import { LANGUAGES, scriptSrc } from 'constants/googleTranslate';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie';

import Icon from 'components/elements/Icon';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import { Scrollbars } from 'react-custom-scrollbars';

import './index.scss';


const GoogleTranslate = () => {
   // Initialize with the saved language from localStorage
   const savedLanguage = localStorage.getItem('currentLanguage');
   const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage || 'en');
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const selectRef = useRef(null);
   const isAuth = useSelector(authUserSelector);
   const siteInfo = useSelector(siteInfoSelector);
   useOutsideClickDetector(selectRef, () => setIsOpenMenu(false));

   const handleChangeLanguage = (value = 'en', isFirstRender) => {
      const translateElementRef = document.querySelector('#google_translate_element');
      if (selectedLanguage !== value || isFirstRender) {
         Object.keys(Cookie.get()).forEach(cookie => {
            if (cookie === 'googtrans') {
               Cookie.remove(cookie);
            }
         });
         const translateSelectElement = translateElementRef.querySelector('select');
         if (translateSelectElement) {
            translateSelectElement.value = value;
            translateSelectElement.dispatchEvent(new Event('change'));
         } 
   
         if (isAuth) {
            changeLanguage(value);
         }

         // Save the language preference to localStorage
         localStorage.setItem('currentLanguage', value);
         setSelectedLanguage(value);

         // Emit custom event for translation system
         window.dispatchEvent(new CustomEvent('languageChanged', { detail: value }));
      }
      Object.keys(Cookie.get()).forEach(cookie => {
         if (cookie === 'googtrans') {
            Cookie.remove(cookie);
         }
      });
      setIsOpenMenu(false);
   };

   useEffect(() => {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = scriptSrc;
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);
      const translateElementRef = document.querySelector('#google_translate_element');
      window.googleTranslateElementInit = () => {
         new window.google.translate.TranslateElement({
            autoDisplay: false,
         }, translateElementRef);
      };
      Object.keys(Cookie.get()).forEach(cookie => {
         if (cookie === 'googtrans') {
            Cookie.remove(cookie);
         }
      });


      return () => {
         if (googleTranslateScript) {
            document.body.removeChild(googleTranslateScript);
         }
      };
   }, []);

   const changeDefaultLanguage = (languagePack) => {
      const checkSelectLoaded = setInterval(() => {
         const selectElement = document.querySelector('.goog-te-combo');
         if (selectElement?.querySelectorAll('option').length) {
            selectElement.value = languagePack;
            selectElement.dispatchEvent(new Event('change'));
            setSelectedLanguage(languagePack);
            
            clearInterval(checkSelectLoaded);
         }
      }, 100); 
   };

   useEffect(() => {
      // First check localStorage for saved language preference
      const savedLang = localStorage.getItem('currentLanguage');
      if (savedLang && savedLang !== 'en') {
         changeDefaultLanguage(savedLang);
      } else {
         // Fall back to site info if no saved preference
         const languagePack = siteInfo.languages_pack;
         const selectedLanguage = siteInfo.selected_language;
         if (!isAuth) {
            changeDefaultLanguage(languagePack);
         } else {
            changeDefaultLanguage(selectedLanguage);
         }
      }
   }, [isAuth, siteInfo.languages_pack]);

   const handleOpenMenu = () => {
      setIsOpenMenu(prevState => !prevState);
   };

   return (
      <div ref={ selectRef } className='select__wrapper'>
         <div id='google_translate_element' />
         <div role='presentation' onClick={ handleOpenMenu } className='icons__wrapper'>
            <img
               src={ LANGUAGES.find(language => language.value === selectedLanguage)?.icon }
               width='30'
               alt='flag' 
            />
            <div style={ {
               transform: isOpenMenu ? 'rotate(180deg)' : 'rotate(0)',
            } }>
               <Icon name='TriangleDown' color='var(--textColor)' />
            </div>
         </div>
         <div className={ isOpenMenu ? 'languages__wrapper active' : 'languages__wrapper' }>
            <Scrollbars>
               {
                  LANGUAGES.map(language => {
                     return (
                        <div role='presentation' id='selectElement' onClick={ () => handleChangeLanguage(language.value) } className='notranslate languages'>
                           <img
                              src={ language.icon }
                              width='30'
                              alt='flag' 
                           />
                           <Text 
                              inner={ language.label }
                              size={ sizes.size_14 }
                              style={ {
                                 color: '#000',
                              } }
                           />
                        </div>
                     );
                  }) 
               }   
            </Scrollbars>
         </div>
      </div>
   );
};

export default GoogleTranslate;