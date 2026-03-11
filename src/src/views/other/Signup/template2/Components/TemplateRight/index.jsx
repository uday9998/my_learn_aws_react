import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const TemplateRight = ({
   generalProps,
}) => {
   const data = React.useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   return (
      <div
         className='signup__template2__right'
         style={ !generalProps.showSocialLinks ? {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${ generalProps.image })`,
         } : {
            backgroundColor: generalProps.imageBackground,
         } }
      >
         {
            generalProps.showSocialLinks && (
            <>
               <div
                  style={ {
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundImage: `url(${ generalProps.image })`,
                  } }
                  className='image__div'
               />
               {
                  editor ? (
                     <AffiliateInlineEditor
                        text={ generalProps.socialLinksText }
                        fontSize='24'
                        fontWeight='500'
                        lineHeight='130%'
                        color='#F7FCFC'
                        onChange={ (e) => {
                           changeProp('socialLinksText', e);
                        } }
                     />
                  ) : (
                     <Text
                        inner={ generalProps.socialLinksText }
                        type={ types.mediumSmall }
                        // size={ sizes.size_2 }
                        style={ { color: '#F7FCFC', fontSize: '24px', textAlign: 'center' } }
                     />
                  )
               }
               <div
                  className='social__links'
               >
                  {
                     Boolean(generalProps.facebook) && (
                        <div
                           role='presentation'
                           onClick={ () => window.open(`https://facebook.com/${ generalProps.facebook }`, '_blank') }
                        >
                           <IconNew
                              name='FaceBookM'
                              color='#FFFFFF'
                           />
                        </div>
                     )
                  }
                  {
                     Boolean(generalProps.twitter) && (
                        <div
                           role='presentation'
                           onClick={ () => window.open(`https://twitter.com/${ generalProps.twitter }`, '_blank') }
                        >
                           <IconNew
                              name='TwitterM'
                              color='#FFFFFF'
                           />
                        </div>
                     )
                  }
                  {
                     Boolean(generalProps.instagram) && (
                        <div
                           role='presentation'
                           onClick={ () => window.open(`https://instagram.com/${ generalProps.instagram }`, '_blank') }
                        >
                           <IconNew
                              name='InstagramM'
                              color='#FFFFFF'
                           />
                        </div>
                     )
                  }
                  {
                     Boolean(generalProps.youtube) && (
                        <div
                           role='presentation'
                           onClick={ () => window.open(`https://youtube.com/${ generalProps.youtube }`, '_blank') }
                        >
                           <IconNew
                              name='YoutubeMBlack'
                              color='#FFFFFF'
                           />
                        </div>
                     )
                  }
               </div>
            </>
            )
         }
      </div>
   );
};

TemplateRight.propTypes = {
   generalProps: PropTypes.object,
};

export default TemplateRight;
