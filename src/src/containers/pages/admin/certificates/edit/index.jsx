/* eslint-disable max-len */
import React, { Component } from 'react';
import {
   BrowserRouter as Router,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/certificates/selectors';
import * as operations from 'state/modules/certificates/operations';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
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
import {
   setInput as setInputAction,
} from 'state/modules/certificates/actions';
import { push } from 'connected-react-router';
import moment from 'moment';
import CertificateNavbar from 'components/modules/certificates/certificateNavbar';
import CertificateTabView from 'components/modules/certificates/certificateTabView';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';

const CertificateIsLoading = withLoading('div');

class EditCertificatesContainer extends Component {
   static propTypes = {
      match: PropTypes.object,
      isFetchingData: PropTypes.bool,
      updateCertificate: PropTypes.func,
      getCertificateById: PropTypes.func,
      certificate: PropTypes.any,
      history: PropTypes.object,
      setInput: PropTypes.func,
      goTo: PropTypes.func,
   };

   constructor(props) {
      super(props);
      this.thumbnails = [{
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

      ];
      this.state = {
         logoHeight: '',
         logoWidth: '',
         signatureHeight: '',
         signatureWidth: '',
         menuClosed: true,
         tab: 'gallery',
      };
   }


   componentDidMount() {
      const { match, getCertificateById, goTo } = this.props;
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
         goTo('/admin');
      }
      getCertificateById(match.params.id);
   }

   redirectCertificate = () => {
      const { history } = this.props;
      history.push('/admin/certificates');
   }

   changeSelectedThumbnails = (i) => {
      // eslint-disable-next-line array-callback-return
      this.thumbnails.map((j) => {
         // eslint-disable-next-line no-param-reassign
         j.selected = false;
         this.thumbnails[this.thumbnails.indexOf(i)].selected = true;
      });
   };

   updateCertificateHandler = (isDraft) => {
      const { updateCertificate, match, certificate } = this.props;
      const {
         logoHeight, logoWidth, signatureWidth, signatureHeight,
      } = this.state;
      updateCertificate(match.params.id, {
         name: certificate.name,
         template: certificate.certificate.template_slug,
         font: certificate.metas.font,
         title: certificate.metas.title,
         note: certificate.metas.note,
         text_bellow_title: certificate.metas.text_bellow_title,
         text_above_course_name: certificate.metas.text_above_course_name,
         ptxtcolor: certificate.metas.ptxtcolor,
         stxtcolor: certificate.metas.stxtcolor,
         ttxtcolor: certificate.metas.ttxtcolor,
         bg_image: certificate.metas.bg_image,
         logo: certificate.metas.logo,
         signatureImg: certificate.metas.signatureImg,
         signatureColor: certificate.metas.signatureColor,
         signatureWidth,
         published: certificate.certificate.published,
         signatureHeight,
         logoWidth,
         logoHeight,
         course_id: certificate.certificate.course.map((course) => course.id),
         titleSize: certificate.metas.titleSize,
         belowTitleSize: certificate.metas.belowTitleSize,
         noteSize: certificate.metas.noteSize,
      });
   };

   updateLogoSize = (width, height) => {
      this.setState({ logoHeight: height, logoWidth: width });
   }

   updateSignatureSize = (width, height) => {
      this.setState({ signatureHeight: height, signatureWidth: width });
   }

   handleInputChange = (name, value, target) => {
      const { setInput } = this.props;
      setInput(name, value, target);
   }

   changeActiveThumbnail = (templateName) => {
      const { setInput } = this.props;
      setInput('template_slug', templateName, 'certificate');
   }

   toggleMenu = () => this.setState(prev => ({ menuClosed: !prev.menuClosed }))

   onTabChange = (tab) => this.setState({ tab })

   render() {
      const {
         isFetchingData,
         certificate,
      } = this.props;
      const { tab } = this.state;
      return (
         <Router>
            <div className='createCertificatesContainer'>
               <Container>
                  <Container.Header>
                     <div style={ { display: 'flex', flexDirection: 'column' } }>
                        <SiteHeader
                           title='Certificates'
                           hintIcon={ false }
                           iconWidth='24px'
                           iconHeight='24px'
                           titleSize='large'
                           hasArrow={ true }
                           noBorderPadding={ true }
                           goTo={ true }
                           goBackTo={ this.redirectCertificate }
                           bottom={ (
                              <>
                                 {/* <span className='subTitle'>Update Certificate</span> */}
                                 <div style={ {
                                    display: 'flex',
                                 } }
                                 >
                                    {/* <NavLink activeClassName='navTextActive' className='navText' to={ `/admin/certificates/${ match.params.id }/edit/template` }>Certificates</NavLink>
                                    <NavLink activeClassName='navTextActive' className='navText' to={ `/admin/certificates/${ match.params.id }/edit/content` }>content</NavLink>
                                    <NavLink activeClassName='navTextActive' className='navText' to={ `/admin/certificates/${ match.params.id }/edit/design` }>design</NavLink> */}
                                 </div>
                              </>
                           )
                           }
                           right={ (
                              <div className='uploadButton'>
                                 {certificate && certificate.certificate && (
                                    <>
                                       <BaseButton
                                          text='Save '
                                          className='ubdate-certificate'
                                          onClick={ () => this.updateCertificateHandler() }
                                          theme={ btnThemes.secondary }
                                       />
                                    </>
                                 )}

                              </div>
                           ) }
                        >
                           {/* <span>Update Certificate</span> */}
                        </SiteHeader>
                     </div>
                  </Container.Header>

                  <CertificateIsLoading isLoading={ isFetchingData }>
                     {certificate && certificate.metas && certificate.certificate
                        && (
                           <div className='certificatesContentDesign'>
                              <div style={ { display: 'flex' } }>
                                 <div className='certificatesContentDesignLeft'>
                                    <CertificateNavbar currentTab={ tab } changeTab={ this.onTabChange } />
                                    <CertificateTabView
                                       certificate={ certificate }
                                       handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                                       onSelectGalleryItem={ (i) => {
                                          return (
                                             this.changeActiveThumbnail(i.name),
                                             this.changeSelectedThumbnails(i)
                                          );
                                       } }
                                       tab={ tab }
                                       activeThumbnail={ certificate && certificate.certificate
                                          && certificate.certificate.template_slug }
                                       galleryItems={ this.thumbnails }
                                    />
                                 </div>
                                 {/* <div className={ cx('designContentRectangle content_left', { menuClosed }) }>
                                    <div className='templateMenu'>
                                       <NavLink onClick={ this.onTabChange } activeClassName='linkRectangleActive' className='linkRectangle' to={ `/admin/certificates/${ match.params.id }/edit/template` }><Icon
                                          name='Templates'
                                          className='svgGreen'
                                       /><span className='linkText'> Certificates </span>
                                       </NavLink>
                                       <NavLink onClick={ this.onTabChange } activeClassName='linkRectangleActive' className='linkRectangle' to={ `/admin/certificates/${ match.params.id }/edit/content` }><Icon
                                          name='Content'
                                          className='svgGreen'
                                       /><span className='linkText'> Create </span>
                                       </NavLink>
                                       <NavLink onClick={ this.onTabChange } activeClassName='linkRectangleActive' className='linkRectangle' to={ `/admin/certificates/${ match.params.id }/edit/design` }><Icon
                                          name='Design'
                                          className='svgGreen'
                                       /><span className='linkText'> Customize </span>
                                       </NavLink>
                                    </div>
                                    <div className='templateList sidebarBg'>
                                       <Switch>
                                          <Route exact path={ `/admin/certificates/${ match.params.id }/edit` }>
                                             <Redirect to={ `/admin/certificates/${ match.params.id }/edit/template` } />
                                          </Route>
                                          <Route isExact path={ `/admin/certificates/${ match.params.id }/edit/content` }>
                                             <Content
                                                certificate={ certificate }
                                                handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                                                l
                                             />
                                          </Route>
                                          <Route isExact path={ `/admin/certificates/${ match.params.id }/edit/design` }>
                                             <Design
                                                certificate={ certificate }
                                                handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                                             />
                                          </Route>
                                          <Route isExact path={ `/admin/certificates/${ match.params.id }/edit/template` }>
                                             <div style={ { display: 'flex', flexDirection: 'column' } }>
                                                {
                                                   this.thumbnails.map((i) => {
                                                      return (
                                                         <div style={ { marginBottom: '16px', height: '170px', width: '240px' } }>
                                                            <Certificate
                                                               color={ i.color }
                                                               key={ i }
                                                               el={ i.id }
                                                               templateList={ true }
                                                               backgroundImage={ i.img }
                                                               selected={ certificate && certificate.certificate && certificate.certificate.template_slug === i.name }
                                                               changeCertificate={ () => {
                                                                  return (
                                                                     this.changeActiveThumbnail(i.name),
                                                                     this.changeSelectedThumbnails(i)
                                                                  );
                                                               }
                                                               }
                                                            />
                                                         </div>
                                                      );
                                                   })
                                                }
                                             </div>
                                          </Route>
                                       </Switch>
                                    </div>
                                    <ArrowButton
                                       onClick={ this.toggleMenu }
                                       direction={ `${ menuClosed ? 'right' : 'left' }` }
                                       className='toggleMenu'
                                    />

                                 </div> */}
                                 <div className='certificateView' style={ { display: 'flex', flexGrow: 1 } }>
                                    <Certificate
                                       color='white'
                                       certificate={ certificate }
                                       handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                                       onUpdateSignatureSize={ (width, height) => {
                                          this.handleInputChange('signatureWidth', width, 'metas');
                                          this.handleInputChange('signatureHeight', height, 'metas');
                                       } }
                                       onUpdateLogoSize={ (width, height) => {
                                          this.handleInputChange('logoWidth', width, 'metas');
                                          this.handleInputChange('logoHeight', height, 'metas');
                                       } }
                                       title={ certificate.metas && certificate.metas.title }
                                       courseName={ certificate.metas && certificate.metas.text_above_course_name }
                                       belowTitle={ certificate.metas && certificate.metas.text_bellow_title }
                                       note={ certificate.metas && certificate.metas.note }
                                       dateIssued={ certificate.metas && moment(certificate.certificate.updated_at).format('MMMM DD, YYYY') }
                                       backgroundImage={ certificate.metas && certificate.metas.bg_image }
                                       logo={ certificate.metas && certificate.metas.logo }
                                       expiryDescription='2022-02-12'
                                       certificateFont={ certificate.metas && certificate.metas.font }
                                       primaryTextColor={ certificate.metas && certificate.metas.ptxtcolor }
                                       secondaryTextColor={ certificate.metas && certificate.metas.stxtcolor }
                                       tertiaryTextColor={ certificate.metas && certificate.metas.ttxtcolor }
                                       certeficateBlackWhite={ this.thumbnails[0].selected }
                                       blackBackground={ this.thumbnails[1].selected }
                                       triangles={ this.thumbnails[2].selected }
                                       bookTemplate={ this.thumbnails[3].selected }
                                       yellowFloral={ this.thumbnails[4].selected }
                                       redWhite={ this.thumbnails[5].selected }
                                       greenWhite={ this.thumbnails[6].selected }
                                       signatureImg={ certificate.metas && certificate.metas.signatureImg }
                                       activeThumbnail={ certificate && certificate.certificate
                                          && certificate.certificate.template_slug }
                                       titleSize={ certificate.metas && certificate.metas.titleSize }
                                       belowTitleSize={ certificate.metas && certificate.metas.belowTitleSize }
                                       noteSize={ certificate.metas && certificate.metas.noteSize }
                                    />
                                 </div>
                              </div>
                           </div>
                        )
                     }
                  </CertificateIsLoading>
               </Container>

            </div>
         </Router>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      certificate: selectors.certificateSelector(state),
      isFetchingData: selectors.isFetchingDataSelector(state),
      certifacteTemp: selectors.certifacteTempSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCertificateById: (id, params) => {
         dispatch(operations.getCertificateByIdOperation(id, params));
      },
      updateCertificate: (id, params) => {
         dispatch(operations.updateCertificateOperation(id, params));
      },
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(EditCertificatesContainer);
