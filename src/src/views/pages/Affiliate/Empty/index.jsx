import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, {
   TYPES as types, SIZES as sizes, TextColumn, TextWithTooltip, TextWithIcon,
} from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import image from 'assets/images/affiliate/empty.png';
import IconNew from 'components/elements/iconsSize';
import ModalNew from 'components/elements/ModalNew';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';

const AffiliateEmptyPage = ({ onCreate, isMobile }) => {
   const [isOpenModal, setIsOpenModal] = useState(false);

   useEffect(() => {
      if (isOpenModal) {
         (function (v, i, d, a, l, y, t, c, s) {
            y = `_${ d.toLowerCase() }`;
            c = `${ d }L`;
            if (!v[d]) { v[d] = {}; }
            if (!v[c]) { v[c] = {}; }
            if (!v[y]) { v[y] = {}; }
            const vl = 'Loader'; let vli = v[y][vl]; let vsl = v[c][`${ vl }Script`]; let vlf = v[c][`${ vl }Loaded`]; const 
               ve = 'Embed';
            if (!vsl) {
               vsl = function (u, cb) {
                  if (t) { cb(); return; }
                  s = i.createElement('script'); s.type = 'text/javascript'; s.async = 1; s.src = u;
                  if (s.readyState) {
                     s.onreadystatechange = function () {
                        if (s.readyState === 'loaded' || s.readyState === 'complete') {
                           s.onreadystatechange = null; vlf = 1; cb();
                        }
                     };
                  } else {
                     s.onload = function () { vlf = 1; cb(); };
                  }
                  i.getElementsByTagName('head')[0].appendChild(s);
               };
            }
            vsl(`${ l }loader.min.js`, () => {
               if (!vli) {
                  const vlc = v[c][vl]; vli = new vlc();
               }
               vli.loadScript(`${ l }player.min.js`, () => {
                  const vec = v[d][ve]; t = new vec(); t.run(a);
               });
            });
         }(window, document, 'Vidalytics', 'vidalytics_embed_NNYltDiomp7oovXy', 'https://fast.vidalytics.com/embeds/ia5wlRCR/NNYltDiomp7oovXy/'));
      }
   }, [isOpenModal]);

   const handleOpenVideo = () => {
      setIsOpenModal(true);
   };

   return (
      <div className='affiliate__empty'>
         {isOpenModal && (
            <ModalNew onCloseModal={ () => setIsOpenModal(false) } className='dashboard_video'>
               <div id='vidalytics_embed_NNYltDiomp7oovXy' style={ { width: '100%', position: 'relative', paddingTop: '56.25%' } } />
            </ModalNew>
         )}
         <TextWithTooltip
            inner='Affiliate Program'
            type={ types.regularDefaultSmall }
            // tooltip='asdas'
            size={ sizes.size_28 }
            iconName='AffiliateQuestionM'
            isIconRigth={ true }
         />
         <div className='affiliate__empty__content'>
            <div className='affiliate__empty__content__left'>
               <IconNew name='AffiliateDotsM' />
               {
                  isMobile ? (
                     <>
                        <Text
                           inner='Another good way to sell your products is through an affiliate program'
                           type={ types.bold }
                           size={ sizes.xxlarge }
                           style={ { textAlign: 'center', whiteSpace: 'normal' } }
                        />
                        <Text
                           inner='Using an affiliate program to drive sales and generate significant income online is a popular method of generating sales'
                           type={ types.regular148 }
                           size={ sizes.small }
                           style={ {
                              color: '#727978', marginTop: '8px', textAlign: 'center', whiteSpace: 'normal',
                           } }
                        />
                     </>
                  ) : (
                     <>
                        <TextColumn
                           texts={ ['Another good way to sell your products is', 'through an affiliate program'] }
                           type={ types.bold }
                           size={ sizes.xxlarge }
                        />
                        <TextColumn
                           texts={ ['Using an affiliate program to drive sales and generate significant income', 'online is a popular method of generating sales'] }
                           type={ types.regular148 }
                           size={ sizes.small }
                           style={ { color: '#727978', marginTop: '8px' } }
                        />
                     </>
                  )
               }
               <TextWithIcon
                  iconName='AffiliateVideoPlayerM'
                  type={ types.regularMin }
                  size={ sizes.small }
                  inner='See how it works'
                  onClick={ handleOpenVideo }
                  isIconRight={ false }
                  generalStyles={ {
                     marginTop: '32px', cursor: 'pointer', marginLeft: 'auto', marginRight: 'auto',
                  } }
                  style={ { color: '#24554E' } }
               />
               <div className='affiliate__empty__content__left__dot'>
                  <IconNew name='AffiliateDotsM' />
               </div>
            </div>
            <div>
               <img src={ image } alt='' />
            </div>
         </div>
         <div className='affiliate__empty__bottom'>
            <div className='affiliate__empty__bottom__left'>
               <div className='rect'>
                  <IconNew name='AffiliateConnectionL' />
               </div>
               <div className='affiliate__empty__bottom__left__texts'>
                  <Text
                     inner="Let's start an affiliate program"
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  <TextColumn
                     texts={ ['This will allow you to sell your products with an affiliate link. The link will appear in the', 'footer, and anyone will be able to register and sell your products, increasing your income.'] }
                     type={ types.regular148 }
                     size={ sizes.small }
                     alignItems='start'
                     style={ { color: '#727978' } }
                  />
               </div>
            </div>
            <Button
               text='Turn on Affiliate Program'
               onClick={ () => onCreate() }
               theme={ themes.primary }
            />
         </div>
      </div>
   );
};

AffiliateEmptyPage.propTypes = {
   onCreate: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default AffiliateEmptyPage;
