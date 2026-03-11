import React from 'react';
import PropTypes from 'prop-types';
import {
   CerteficateBlackWhite,
   BlackBackground,
   Triangles,
   BookTemplate,
   YellowFloral,
   RedWhite,
   GreenWhite,
} from 'components/modules/certificates/certificate/certificatesTemplate';
import './index.scss';

const Certificate = ({
   backgroundImage,
   logo,
   color,
   certificate,
   handleInputChange,
   changeCertificate,
   title,
   belowTitle,
   courseName,
   note,
   dateIssued,
   expiryDescription,
   certificateFont,
   primaryTextColor,
   secondaryTextColor,
   tertiaryTextColor,
   templateList,
   selected,
   onUpdateSignatureSize,
   onUpdateLogoSize,
   signatureImg,
   activeThumbnail,
   titleSize,
   belowTitleSize,
   noteSize,
}) => {
   return (
      <div
         role='presentation'
         onClick={ () => templateList && changeCertificate() }
         style={ {
            // width: '100%',
            // height: '100%-48px',
            // width: templateList ? '100%' : '776px',
            // height: templateList ? '100%' : '548px',
            backgroundColor: !backgroundImage && color,
            backgroundImage: `url(${ templateList && backgroundImage })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: '8px',
            boxShadow: '0 2px 14px 0 rgba(63, 79, 101, 0.14)',
            border: !templateList ? '24px solid white' : (selected && 'solid 2px #7cb740'),

         } }
      >
         {!templateList && (
            <>
               { activeThumbnail === 'certeficateBlackWhite' && (
                  <CerteficateBlackWhite
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     changeCertificate={ changeCertificate }
                     title={ title }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     certificate={ certificate }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'blackBackground' && (
                  <BlackBackground
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     changeCertificate={ changeCertificate }
                     title={ title }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     certificate={ certificate }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'triangles' && (
                  <Triangles
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     changeCertificate={ changeCertificate }
                     title={ title }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     certificate={ certificate }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'bookTemplate' && (
                  <BookTemplate
                     backgroundImage={ backgroundImage }
                     changeCertificate={ changeCertificate }
                     title={ title }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'yellowFloral' && (
                  <YellowFloral
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     changeCertificate={ changeCertificate }
                     title={ title }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'redWhite' && (
                  <RedWhite
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     changeCertificate={ changeCertificate }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     title={ title }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     certificate={ certificate }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
               { activeThumbnail === 'greenWhite' && (
                  <GreenWhite
                     backgroundImage={ backgroundImage }
                     logo={ logo }
                     changeCertificate={ changeCertificate }
                     onUpdateLogoSize={ onUpdateLogoSize }
                     onUpdateSignatureSize={ onUpdateSignatureSize }
                     title={ title }
                     belowTitle={ belowTitle }
                     courseName={ courseName }
                     note={ note }
                     dateIssued={ dateIssued }
                     expiryDescription={ expiryDescription }
                     certificateFont={ certificateFont }
                     primaryTextColor={ primaryTextColor }
                     secondaryTextColor={ secondaryTextColor }
                     tertiaryTextColor={ tertiaryTextColor }
                     signatureImg={ signatureImg }
                     onChange={ handleInputChange }
                     titleSize={ titleSize }
                     belowTitleSize={ belowTitleSize }
                     noteSize={ noteSize }
                  />
               )}
            </>
         )}
      </div>
   );
};

Certificate.propTypes = {
   backgroundImage: PropTypes.string,
   logo: PropTypes.string,
   color: PropTypes.string,
   certificate: PropTypes.any,
   handleInputChange: PropTypes.func,
   changeCertificate: PropTypes.func,
   title: PropTypes.string,
   belowTitle: PropTypes.string,
   courseName: PropTypes.string,
   note: PropTypes.string,
   dateIssued: PropTypes.any,
   expiryDescription: PropTypes.any,
   certificateFont: PropTypes.string,
   primaryTextColor: PropTypes.string,
   secondaryTextColor: PropTypes.string,
   tertiaryTextColor: PropTypes.string,
   templateList: PropTypes.any,
   selected: PropTypes.any,
   onUpdateSignatureSize: PropTypes.func,
   onUpdateLogoSize: PropTypes.func,
   signatureImg: PropTypes.string,
   activeThumbnail: PropTypes.string,
   titleSize: PropTypes.number,
   belowTitleSize: PropTypes.number,
   noteSize: PropTypes.number,
};

export default Certificate;
