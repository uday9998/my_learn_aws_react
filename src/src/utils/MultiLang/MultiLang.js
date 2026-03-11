/* eslint-disable prefer-rest-params */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-polyglot';
// import axios from 'axios';
import LocaleContext from './contexts/locale';

const MultiLang = ({ children }) => {
   const currentLang = localStorage.getItem('currentLanguage');
   const [locale, setLocale] = useState(currentLang || 'en');
   
   // Immediately apply Google Translate on mount if language is not English
   React.useEffect(() => {
      if (currentLang && currentLang !== 'en') {
         // Wait for Google Translate to be available
         const applyTranslation = () => {
            const translateElement = document.querySelector('.goog-te-combo');
            if (translateElement) {
               translateElement.value = currentLang;
               translateElement.dispatchEvent(new Event('change'));
               // Remove the opacity once translation is applied
               document.documentElement.style.opacity = '1';
            } else {
               // If Google Translate is not ready yet, try again
               setTimeout(applyTranslation, 100);
            }
         };
         applyTranslation();
      } else {
         // If English, ensure opacity is set to 1
         document.documentElement.style.opacity = '1';
      }
   }, []);
   
   const orignalSetItem = localStorage.setItem;
   localStorage.setItem = function (key, newValue) {
      const setItemEvent = new Event('setItemEvent');
      setItemEvent.key = key;
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this, arguments);
   };
   window.addEventListener('setItemEvent', (e) => {
      if (e.key === 'currentLanguage') {
         setLocale(e.newValue);
      }
   });

   window.addEventListener('storage', () => {
      setLocale(localStorage.getItem('currentLanguage'));
   });
   // useEffect(
   //    () => {
   //       async function fetchData() {
   //          const result = await axios.get(`${ process.env.PUBLIC_URL }/translations/${ locale }.json`);
   //          setMessages(result.data);
   //          if (result.status === 200) {
   //             setMessagesLoading(true);
   //          }
   //       }
   //       fetchData();
   //    },
   //    [locale]
   // );

   return (
      <LocaleContext.Provider value={ { locale, setLocale } }>
         <I18n locale={ locale }>
            <>
               { children }
            </>
         </I18n>
      </LocaleContext.Provider>
   );
};

MultiLang.propTypes = {
   children: PropTypes.any,
};

export default MultiLang;
