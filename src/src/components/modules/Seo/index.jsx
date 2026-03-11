import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import SeoImg from 'assets/images/seo.jpg';
import UploadModal from 'components/modules/UploadModal';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import LinkViewWithEditOneLine from 'components/modules/LinkViewWithEditOneLine';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { savePlaylist } from 'api';

import './index.scss';

const Seo = ({
   title, inputs, seo, setSeo, isPlaylist, handleChangeSeoLink, playlistName, seoLink,
}) => {
   const { id, sectionId, playlistId } = useParams();
   const [saveData, { loading }] = useSubmitForm(savePlaylist);
   const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

   useEffect(() => {
      setSeo(inputs.seo_data || {});
   }, [inputs.seo_data]);

   const onChange = (name, value) => {
      setSeo(
         {
            ...seo,
            [name]: value,
         }
      );
   };

   const onSeoLinkSave = async (url, setLink, onClose) => {
      const { data: { errors = {} } = {} } = await saveData(
         {
            courseId: id,
            sectionId,
            lessonId: playlistId,
            params: {
               link: url,
               is_playlist: 1,
               name: playlistName,
            },
         },
         () => {
            handleChangeSeoLink(url);
            setLink('');
            onClose(false);
         },
         () => true
      ) || {};
      
      return errors;
   };

   return (
      <div className='seoProgram'>
         {
            loading && <LoaderSpinner />
         }
         <div>
            <Text
               inner={ title }
               type={ types.medium }
               size={ sizes.medium }
            />
         </div>
         <div>
            <Input
               label='SEO Title'
               value={ seo.title || '' }
               placeholder='SEO Title'
               name='title'
               maxlength={ 150 }
               helpText={ `${ (seo.title || '').length }/150` }
               onChange={ onChange }
            />
         </div>
         <div>
            <Input
               label='SEO Description'
               type='textarea'
               value={ seo.description || '' }
               placeholder='SEO Description'
               name='description'
               maxLengthTextArea={ 160 }
               helpText={ `${ (seo.description || '').length }/160` }
               onChange={ onChange }
            />
         </div>
         <div>
            <Input
               label='SEO Keywords'
               value={ seo.keywords || '' }
               placeholder='Enter Keywords'
               name='keywords'
               // maxlength={ 150 }
               helpText='Comma Separated'
               onChange={ onChange }
            />
         </div>
         {
            isPlaylist && (
               <div className='link__wrapper'>
                  <LinkViewWithEditOneLine
                     label='Playlist Link'
                     copyUrl={ `${ window.location.origin }/portal/membership/playlists/${ inputs.link }` }
                     isValid={ true }
                     constantUrlStart={ `${ window.location.origin }/portal/membership/playlists/` }
                     editableLink={ seoLink }
                     constantUrlEnd=''
                     onSave={ onSeoLinkSave }
                  />
               </div>
            )
         }
         <div className='seoProgram__img'>
            <div className='seoProgram__img__top'>
               <Text
                  inner='SEO Image'
                  type={ types.medium }
                  size={ sizes.medium }
               />
               <div>
                  <Text
                     inner='Appears when a link to the site is shared on social media. All other pages will use this by default, unless overridden. Recommended size is 1200 × 630 px.'
                     type={ types.regularDefault145 }
                     size={ sizes.small_14 }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            </div>
            <div className='image__upload__wrapper'>
               {
                  !isPlaylist ? (
                     <div className='seoProgram__img__upload'>
                        <BaseButton
                        // onDragOver={ dragOver }
                           isIconRight={ true }
                           onClick={ () => setIsOpenUploadModal(true) }
                           text={ seo.image ? 'Change SEO Image' : 'Upload SEO Image' }
                           theme={ btnTheme.secondary }
                           iconName='DefaultUpload'
                           // disabled={ disabled }
                           iconColor='#24554E'
                        />
                     </div>
                  ) : (
                     <div className='seo__upload__modal'>
                        <BaseButton
                        // onDragOver={ dragOver }
                           isIconRight={ true }
                           onClick={ () => setIsOpenUploadModal(true) }
                           text={ seo.image ? 'Change SEO Image' : 'Upload SEO Image' }
                           theme={ btnTheme.secondary }
                           iconName='DefaultUpload'
                           // disabled={ disabled }
                           iconColor='#24554E'
                        />
                     </div>
                  )
               }
               <span className='footer__text'>Recommended size – 1200 × 630 px</span>
            </div>


            {
               !isPlaylist ? (
                  <div className='seoProgram__img__view'>
                     <div className='seoProgram__img__view__top'>
                        <img src={ seo.image || SeoImg } alt='seo' />
                        {seo.image && (
                           <BaseButton
                              theme={ btnTheme.change }
                              size={ btnSize.small }
                              text=''
                              iconName='ClearImage'
                              className='seoProgram__img__view__top__clear'
                              onClick={ () => onChange('image', null) }
                           />
                        )}
                     </div>
                     <div className='seoProgram__img__view__bottom'>
                        <Text
                           inner={ `${ window.location.origin }/portal/membership/${ inputs.link }` }
                           type={ types.regularDefault145 }
                           size={ sizes.small_14 }
                           style={ { color: '#727978' } }
                           className='seoProgram__img__view__bottom__link'
                        />
                        <Text
                           inner={ seo.title }
                           type={ types.medium }
                           size={ sizes.medium }
                           className='seoProgram__img__view__bottom__title'
                        />
                        <Text
                           inner={ seo.description }
                           type={ types.regularDefault145 }
                           size={ sizes.small_14 }
                           style={ { color: '#444C4B', marginTop: '4px' } }
                           className='seoProgram__img__view__bottom__desc'
                        />
                     </div>
                  </div>
               ) : (
                  <div className='seo__view__wrapper'>
                     <Text
                        inner={ title }
                        type={ types.medium }
                        size={ sizes.medium }
                     />
                     <div className='seoProgram__img__view'>
                        <div className='seoProgram__img__view__top'>
                           <img src={ seo.image || SeoImg } alt='seo' />
                           {seo.image && (
                              <BaseButton
                                 theme={ btnTheme.change }
                                 size={ btnSize.small }
                                 text=''
                                 iconName='ClearImage'
                                 className='seoProgram__img__view__top__clear'
                                 onClick={ () => onChange('image', null) }
                              />
                           )}
                        </div>
                        <div
                           className='seoProgram__img__view__bottom'
                           style={ {
                              display: 'flex',
                              flexDirection: 'column',
                           } }>
                           <Text
                              inner={ `${ window.location.origin }/portal/membership/${ inputs.link }` }
                              type={ types.regularDefault145 }
                              size={ sizes.small_14 }
                              style={ { color: '#727978' } }
                           />
                           <Text
                              inner={ seo.title }
                              type={ types.medium }
                              size={ sizes.medium }
                           />
                           <Text
                              inner={ seo.description }
                              type={ types.regularDefault145 }
                              size={ sizes.small_14 }
                              style={ { color: '#444C4B', marginTop: '4px' } }
                           />
                        </div>
                     </div>
                  </div>
               )
            }
         </div>
         {isOpenUploadModal && (
            <UploadModal
               cropRatio='1200x630'
               onChange={ (url) => {
                  onChange('image', url);
                  setIsOpenUploadModal(false);
               } }
               fileLessonFormat='image'
               isAmazonFile={ true }
               onCloseModal={ () => setIsOpenUploadModal(false) }
            />
         )}
      </div>
   );
};

Seo.propTypes = {
   title: PropTypes.string,
   inputs: PropTypes.object,
   setSeo: PropTypes.func,
   handleChangeSeoLink: PropTypes.func,
   seo: PropTypes.object,
   isPlaylist: PropTypes.bool,
   playlistName: PropTypes.string,
   seoLink: PropTypes.string,
};


Seo.defaultProps = {
   title: 'Category SEO',

};

export default Seo;
