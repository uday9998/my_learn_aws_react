import React, { useState, useEffect } from 'react';
import {
   BrowserRouter as Router,
   useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/certificates/selectors';
import * as operations from 'state/modules/certificates/operations';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Certificate from 'components/modules/certificates/certificate';
import templateBlackWhiteThumbnail from 'assets/images/templateBlackWhiteThumbnail.png';
import blackBackgroundThumbnail from 'assets/images/blackBackgroundThumbnail.png';
import trianglesThumbnail from 'assets/images/trianglesThumbnail.png';
import booksThumbnail from 'assets/images/booksThumbnail.png';
import yellowFloralThumbnail from 'assets/images/yellowFloralThumbnail.png';
import redWhiteThumbnail from 'assets/images/redWhiteThumbnail.png';
import greenWhiteThumbnail from 'assets/images/greenWhiteThumbnail.png';
import './index.scss';
import withLoading from 'utils/withLoading';
import { push } from 'connected-react-router';
import CertificateTabView from 'components/modules/certificates/certificateTabView';
import CertificateNavbar from 'components/modules/certificates/certificateNavbar';
import moment from 'moment';


const CertificateIsLoading = withLoading('div');

const CreateCertificatesContainer = ({
   isFetchingData, certificate, createCertificate, getCertificateById, goTo,
}) => {
   const history = useHistory();
   const [tab, setTab] = useState('gallery');

   const {
      selectedCourseIds, certificateName, editId, certificateDate,
   } = history.location.state || {};

   const editMode = editId !== undefined;

   useEffect(() => {
      // if (!editMode && certificateName === undefined) {
      //    history.push('/admin/certificates');
      // }
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
         goTo('/admin');
      }
      if (editMode) {
         getCertificateById(editId);
      }
   }, []);
   const createCertificatePage = true;
   const certificatesCardpage = false;
   const [title, setTitle] = useState(editMode ? (certificate.metas && certificate.metas.title) : 'Certificate of Graduation');
   const [titleSize, setTitleSize] = useState(editMode ? (certificate.metas && certificate.metas.titleSize) : 16);
   const [belowTitle, setBelowTitle] = useState(editMode ? (certificate.metas && certificate.metas.text_bellow_title) : 'This certifies is awarded to');
   const [belowTitleSize, setBelowTitleSize] = useState(editMode ? (certificate.metas && certificate.metas.belowTitleSize) : 16);
   const [note, setNote] = useState(editMode ? (certificate.metas && certificate.metas.note) : 'has pursued studies and completed all the requirements');
   const [noteSize, setNoteSize] = useState(editMode ? (certificate.metas && certificate.metas.noteSize) : 12);
   const [courseName, setCourseName] = useState(editMode ? (certificate.metas && certificate.metas.text_above_course_name) : '{{Student Name}}');
   const [dateIssued] = useState(editMode ? (certificate.metas && certificate.certificate?.updated_at) : '{{date}}');
   const [expiryDescription] = useState('2022-02-12');
   const [signatureImg, setSignatureImg] = useState(editMode ? (certificate.metas && certificate.metas.signatureImg) : '');
   const [penColor] = useState(editMode ? (certificate.metas && certificate.metas.signatureColor) : '#2155cd');
   const [logoSize] = useState({});
   const [signatureSize] = useState({});

   const [certificateFont] = useState(editMode ? (certificate.metas && certificate.metas.font) : 'Alegreya');
   const [primaryTextColor, setPrimaryTextColor] = useState(editMode ? (certificate.metas && certificate.metas.ptxtcolor) : '');
   const [secondaryTextColor, setSecondaryTextColor] = useState(editMode ? (certificate.metas && certificate.metas.stxtcolor) : '');
   const [tertiaryTextColor, setTertiaryTextColor] = useState(editMode ? (certificate.metas && certificate.metas.ttxtcolor) : '');
   // const [activeThumbnail, setActiveThumbnail] = useState('certeficateBlackWhite');
   const [activeThumbnail, setActiveThumbnail] = useState(editMode ? (certificate.certificate && certificate.certificate.template_slug) : 'certeficateBlackWhite');
   const [thumbnails, setThumbnails] = useState([{
      color: 'red', id: 0, selected: true, img: templateBlackWhiteThumbnail, name: 'certeficateBlackWhite',
   }, {
      color: 'yellow', id: 1, selected: false, img: blackBackgroundThumbnail, name: 'blackBackground',
   }, {
      color: 'green', id: 2, selected: false, img: trianglesThumbnail, name: 'triangles',
   }, {
      color: 'blue', id: 3, selected: false, img: booksThumbnail, name: 'bookTemplate',
   },
   {
      color: 'purple', id: 4, selected: false, img: yellowFloralThumbnail, name: 'yellowFloral',
   },
   {
      color: 'red', id: 5, selected: false, img: redWhiteThumbnail, name: 'redWhite',
   },
   {
      color: 'yellow', id: 6, selected: false, img: greenWhiteThumbnail, name: 'greenWhite',
   },

   ]);

   const [backgroundImage, setBackgroundImage] = useState(editMode ? (certificate.metas && certificate.metas.bg_image) : '');
   const [logo, setlogo] = useState(editMode ? (certificate.metas && certificate.metas.logo) : '');
   const onChangeHandler = (name, value) => {
      switch (name) {
         case 'title':
            setTitle(value);
            break;
         case 'text_bellow_title':
            setBelowTitle(value);
            break;
         case 'courseName':
            setCourseName(value);
            break;
         case 'note':
            setNote(value);
            break;
         case 'signatureImg':
            setSignatureImg(value);
            break;
         case 'logo':
            setlogo(value);
            break;
         case 'ptxtcolor':
            setPrimaryTextColor(value);
            break;
         case 'stxtcolor':
            setSecondaryTextColor(value);
            break;
         case 'ttxtcolor':
            setTertiaryTextColor(value);
            break;
         case 'bg_image':
            setBackgroundImage(value);
            break;
         case 'titleSize':
            setTitleSize(value);
            break;
         case 'belowTitleSize':
            setBelowTitleSize(value);
            break;
         case 'noteSize':
            setNoteSize(value);
            break;
         default:
      }
   };
   const redirectCertificate = () => history.push('/admin/certificates');

   const changeSelectedThumbnails = (i) => {
      return (
         setThumbnails(thumbnails.map((j) => {
            j.selected = false;
            thumbnails[thumbnails.indexOf(i)].selected = true;
            return j;
         }))
      );
   };

   const createCertificateHandler = async (published) => {
      await createCertificate({
         name: certificateName,
         course_id: selectedCourseIds,
         template: activeThumbnail,
         font: certificateFont,
         title,
         note,
         text_bellow_title: belowTitle,
         text_above_course_name: courseName,
         ptxtcolor: primaryTextColor,
         stxtcolor: secondaryTextColor,
         ttxtcolor: tertiaryTextColor,
         bg_image: backgroundImage,
         logo,
         signatureImg,
         signatureColor: penColor,
         signatureWidth: signatureSize.signatureWidth,
         signatureHeight: signatureSize.signatureHeight,
         logoWidth: logoSize.logoWidth,
         logoHeight: logoSize.logoHeight,
         published,
         is_expired_date: certificateDate.is_expired_date ? 1 : 0,
         expiration_date: moment(certificateDate.expiration_date).format('YYYY-MM-DD'),
         titleSize,
         belowTitleSize,
         noteSize,
      });
      redirectCertificate();
   };


   // const updateCertificateHandler = async () => {
   //    await updateCertificate(editId, {
   //       name: certificate.name,
   //       template: activeThumbnail,
   //       font: certificateFont,
   //       title,
   //       note,
   //       text_bellow_title: belowTitle,
   //       text_above_course_name: courseName,
   //       ptxtcolor: primaryTextColor,
   //       stxtcolor: secondaryTextColor,
   //       ttxtcolor: tertiaryTextColor,
   //       bg_image: backgroundImage,
   //       logo,
   //       signatureImg,
   //       signatureColor: penColor,
   //       signatureWidth: signatureSize.signatureWidth,
   //       signatureHeight: signatureSize.signatureHeight,
   //       logoWidth: logoSize.logoWidth,
   //       logoHeight: logoSize.logoHeight,
   //    });
   //    redirectCertificate();
   // };
   const changeActiveThumbnail = (templateName) => setActiveThumbnail(templateName);

   return (
      <Router>

         <div className='createCertificatesContainer'>
            <Container>
               <Container.Header>
                  <div className='main'>
                     <SiteHeader
                        title='Certificates'
                        hintIcon={ false }
                        iconWidth={ createCertificatePage && '24px' }
                        iconHeight={ createCertificatePage && '24px' }
                        titleSize={ createCertificatePage && 'large' }
                        hasArrow={ !certificatesCardpage }
                        noBorderPadding={ createCertificatePage }
                        goTo={ true }
                        tooltip='Select one of out beautiful templates to create your certificates.'
                        goBackTo={ redirectCertificate }
                        bottom={ (
                           <>
                              <div style={ {
                                 display: 'flex',
                              } }
                              />
                           </>
                        )
                        }
                        right={ (
                           <div className='uploadButton'>
                              <BaseButton
                                 text='Save to Draft'
                                 className='ubdate-certificate'
                                 onClick={ () => createCertificateHandler(0) }
                                 theme={ btnThemes.secondary }
                              />
                              <BaseButton
                                 text='Publish Certificate'
                                 onClick={ () => createCertificateHandler(1) }
                              />
                           </div>
                        ) }
                     >
                        <span>Create Certificate
                        </span>
                     </SiteHeader>
                  </div>
               </Container.Header>
               <CertificateIsLoading isLoading={ isFetchingData }>
                  <div className='certificatesContentDesign'>
                     <div style={ { display: 'flex' } }>
                        <div className='certificatesContentDesignLeft'>
                           <CertificateNavbar currentTab={ tab } changeTab={ (id) => setTab(id) } />
                           <CertificateTabView
                              certificate={ {
                                 metas: {
                                    title,
                                    bg_image: backgroundImage,
                                    ptxtcolor: primaryTextColor,
                                    stxtcolor: secondaryTextColor,
                                    ttxtcolor: tertiaryTextColor,
                                    logo,
                                    titleSize,
                                    belowTitleSize,
                                    noteSize,
                                 },
                                 certificate: {
                                    template_slug: activeThumbnail,
                                 },
                              } }
                              handleInputChange={ (name, value, target) => onChangeHandler(name, value, target) }
                              onSelectGalleryItem={ (i) => {
                                 return (
                                    changeActiveThumbnail(i.name),
                                    changeSelectedThumbnails(i)
                                 );
                              } }
                              tab={ tab }
                              activeThumbnail={ activeThumbnail }
                              galleryItems={ thumbnails }
                           />
                        </div>
                        <div className='certificateView'>
                           <Certificate
                              color='white'
                              certificate={ certificate }
                              handleInputChange={ onChangeHandler }
                              title={ title }
                              courseName={ courseName }
                              belowTitle={ belowTitle }
                              note={ note }
                              dateIssued={ dateIssued }
                              backgroundImage={ backgroundImage }
                              logo={ logo }
                              expiryDescription={ expiryDescription }
                              certificateFont={ certificateFont }
                              primaryTextColor={ primaryTextColor }
                              secondaryTextColor={ secondaryTextColor }
                              tertiaryTextColor={ tertiaryTextColor }
                              signatureImg={ signatureImg }
                              certeficateBlackWhite={ thumbnails[0].selected }
                              blackBackground={ thumbnails[1].selected }
                              triangles={ thumbnails[2].selected }
                              bookTemplate={ thumbnails[3].selected }
                              yellowFloral={ thumbnails[4].selected }
                              redWhite={ thumbnails[5].selected }
                              greenWhite={ thumbnails[6].selected }
                              activeThumbnail={ activeThumbnail }
                              titleSize={ titleSize }
                              belowTitleSize={ belowTitleSize }
                              noteSize={ noteSize }
                           />
                        </div>
                     </div>
                  </div>
               </CertificateIsLoading>
            </Container>

         </div>
      </Router>
   );
};

CreateCertificatesContainer.propTypes = {
   isFetchingData: PropTypes.bool,
   createCertificate: PropTypes.func,
   getCertificateById: PropTypes.func,
   certificate: PropTypes.object,
   goTo: PropTypes.func,
};


const mapStateToProps = (state) => {
   return {
      certificate: selectors.certificateSelector(state),
      isFetchingData: selectors.isFetchingDataSelector(state),
      certifacteTemp: selectors.certifacteTempSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCertificateById: async (id, params) => {
         await dispatch(operations.getCertificateByIdOperation(id, params));
      },
      createCertificate: async (params) => {
         await dispatch(operations.createCertificateOperation(params));
      },
      updateCertificate: async (id, params) => {
         await dispatch(operations.updateCertificateOperation(id, params));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCertificatesContainer);
