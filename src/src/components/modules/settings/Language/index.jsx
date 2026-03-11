/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './index.scss';
import Text, { TYPES as textTypes, SIZES as textSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import countyList from './country_list.json';

const Language = ({ languages, updateLanguages }) => {
   const [choosenLanguagesData, setChoosenLanguagesData] = useState({});
   const [savedLang, setSavedLang] = useState({});

   useEffect(() => {
      setChoosenLanguagesData({
         [languages.languages_pack]: true,
         code: languages.languages_pack,
      });
      setSavedLang(languages.languages_pack);
   }, []);

   const updateLanguagesFunc = () => {
      updateLanguages(choosenLanguagesData.code);
      setSavedLang(choosenLanguagesData.code);
   };

   const handleChangeLanguage = (lang) => {
      setChoosenLanguagesData({
         [lang]: true,
         code: lang,
      });
   };

   return (
      <InnerWrapper title='Languages'>
         <Text
            inner='Select the default language of your page'
            type={ textTypes.regularDefault }
            size={ textSize.small }
            style={ { color: '#727978', marginTop: '4px' } }
         />
         {/* <Text
            inner={ `${ getChoosedLanguagesLength() }/${ Object.keys(countyList).length } of Languages` }
            type={ textTypes.regularDefault }
            size={ textSize.small }
            style={ { margin: '24px 0px' } }
         /> */}
         <div className='langCreateEditCards'>
            {countyList.map((i) => {
               const langCode = i.code;
               return (
                  <div key={ i.code } className={ choosenLanguagesData[langCode] ? 'langCreateEditCard langCreateEditCard_checked' : 'langCreateEditCard' } onClick={ () => handleChangeLanguage(i.code) } role='presentation'>
                     {i.name !== undefined && (
                        <Text
                           type={ textTypes.regularDefault }
                           size={ textSize.small }
                           inner={ i.name }
                           className='langCreateEditBelowTitle'
                        />
                     )}
                     {i.nativeName !== undefined && (
                        <Text
                           type={ textTypes.regularLarge }
                           size={ textSize.xsmall }
                           inner={ i.nativeName }
                           style={ { color: '#727978' } }
                           className='langCreateEditBelowTitle'
                        />
                     )}
                  </div>
               );
            })
            }
         </div>
         <div className='langCreateEditButtonsRectangle'>
            <div>
               <BaseButton
                  size={ btnSize.full }
                  disabled={ savedLang === choosenLanguagesData.code }
                  text='Save Changes'
                  className='language-save'
                  onClick={ () => updateLanguagesFunc() }
               />
            </div>
         </div>
      </InnerWrapper>
   );
};

Language.defaultProps = {
   languages: {},
};


Language.propTypes = {
   languages: PropTypes.object,
   updateLanguages: PropTypes.func,
};

export default Language;
