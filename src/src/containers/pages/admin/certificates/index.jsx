import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/certificates/selectors';
import * as operations from 'state/modules/certificates/operations';
import CertificatesCard from 'views/pages/certificates/certificatesCard';
import Container from 'views/layout/AdminContainer';
import CertificateInfo from 'views/pages/certificates/certificateInfo';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import CertificateHeader from 'views/layout/CertificateHeader';
import EmptyCertificates from 'views/pages/certificates/emptycertifacte';
import withLoading from 'utils/withLoading';
import ModalNew from 'components/elements/ModalNew';
import CertificatesFilter from 'views/pages/certificates/certificatesFilter';
import DeleteModal from 'components/elements/DeleteModal';
import moment from 'moment';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { screenWidthSelector } from 'state/modules/common/selectors';

const CertificatesIsLoading = withLoading('div');

class CertificatesContainer extends Component {
   static propTypes = {
      getCertificates: PropTypes.func,
      getCoursesForNewCertificate: PropTypes.func,
      history: PropTypes.object,
      deleteCertificates: PropTypes.func,
      certificates: PropTypes.array,
      coursesForCertificate: PropTypes.array,
      goTo: PropTypes.func,
      deleteCertificatesByIds: PropTypes.func,
      isFetchingData: PropTypes.bool,
      duplicateCertificate: PropTypes.func,
      statusChangeCertificate: PropTypes.func,
      screenWidth: PropTypes.number,
   };

   state = {
      createCertificatePage: false,
      certificatesCardpage: true,
      certificateInfo: false,
      certificateName: '',
      selectedCourseName: '',
      selectedCourseIds: [],
      searchValue: '',
      certificateSortingValue: 'recently',
      isMultiSelect: false,
      isOpenDeleteModal: false,
      selectedCertificatesIds: [],
   };

   componentDidMount() {
      const { getCertificates, getCoursesForNewCertificate } = this.props;

      getCertificates({ sortName: 'name', sortValue: 'asc' });
      getCoursesForNewCertificate();
   }

   changeCourseTemplateName=(name) => {
      this.setState({ certificateName: name });
   }

   changeSelectedCourse = (newCoursesIds) => {
      this.setState({
         selectedCourseIds: newCoursesIds,
      });
   }

   redirectCreateCertificate = (editId, certificateDate) => {
      const { history } = this.props;
      if (!!certificateDate.is_expired_date
         && (new Date(moment(certificateDate.expiration_date).format('YYYY-MM-DD'))) < new Date(moment().add(1, 'day').format('YYYY-MM-DD'))) {
         if (isPrint(`The expiration date must be a date after ${ moment().format('YYYY-MM-DD') }`)) {
            return toast.error(`The expiration date must be a date after ${ moment().format('YYYY-MM-DD') }`);
         }
      }
      const {
         certificateName,
         selectedCourseIds,
      } = this.state;
      if (history) {
         history.push({
            pathname: '/admin/createcertificates/template',
            state: {
               selectedCourseIds, certificateName, certificateDate,
            },
         });
      }
   };

   deleteCertificate = (id, name) => {
      const { deleteCertificates } = this.props;
      deleteCertificates(id, name);
   };

   redirectCertificate = () => {
      const { history } = this.props;
      if (history) history.push('/admin/certificates');
   };

   goToCreateCertificate = (id) => {
      const { goTo } = this.props;
      goTo(`${ Router.route('ADMIN_EDIT_CERTIFICATE').getCompiledPath({ id }) }`);
   }

   goToSettingsCertificate = (id) => {
      const { goTo } = this.props;
      goTo(`${ Router.route('ADMIN_SETTINGS_CERTIFICATE').getCompiledPath({ id }) }`);
   }


   certificateInfoModalToggle = () => {
      return this.setState(prevState => ({
         certificateInfo: !prevState.certificateInfo,
         certificateName: '',
         selectedCourseName: '',
      }));
   };

   changeSearchValue=(value) => {
      this.setState({ searchValue: value });
   }

   searchOnEnter=(e) => {
      const { getCertificates } = this.props;
      const { searchValue, certificateSortingValue } = this.state;
      if (e.key === 'Enter') {
         getCertificates({ sortName: certificateSortingValue, sortValue: 'asc', searchValue });
      }
   }

   onClearSearch = () => {
      const { getCertificates } = this.props;
      const { certificateSortingValue } = this.state;

      getCertificates({ sortName: certificateSortingValue, sortValue: 'asc', searchValue: '' });
   }

   searchOnIconClick= () => {
      const { getCertificates } = this.props;
      const { searchValue, certificateSortingValue } = this.state;
      getCertificates({ sortName: certificateSortingValue, sortValue: 'asc', searchValue });
   }

   sortbyHandle=(value) => {
      const { getCertificates } = this.props;
      const { searchValue } = this.state;
      this.setState({
         certificateSortingValue: value,
      });
      getCertificates({ sortName: value, sortValue: 'asc', searchValue });
   }

   handleChangeMultiSelect = (isMultiSelect) => {
      this.setState({
         isMultiSelect,
         selectedCertificatesIds: [],
      });
   }

   handleOnCheckItem = (id) => {
      const { selectedCertificatesIds } = this.state;
      if (!selectedCertificatesIds.includes(id)) {
         this.setState({
            selectedCertificatesIds: [...selectedCertificatesIds, id],
         });
      } else {
         this.setState({
            selectedCertificatesIds: (selectedCertificatesIds.filter((i) => i !== id)),
         });
      }
   }

   onAcceptRemove = () => {
      const { selectedCertificatesIds } = this.state;
      if (selectedCertificatesIds.length > 0) {
         const { deleteCertificatesByIds } = this.props;
         this.handleChangeMultiSelect(false);
         this.setState({
            isOpenDeleteModal: false,
         });
         deleteCertificatesByIds(selectedCertificatesIds);
      }
   }

   handleRemove = () => {
      this.setState({
         isOpenDeleteModal: true,
      });
   }

   handleOnCheckAll = () => {
      const { selectedCertificatesIds } = this.state;
      const { certificates } = this.props;
      if (certificates.length === selectedCertificatesIds.length) {
         this.setState({
            selectedCertificatesIds: [],
         });
      } else {
         const ids = certificates.map((cer) => cer.id);
         this.setState({
            selectedCertificatesIds: ids,
         });
      }
   }

   render() {
      const {
         createCertificatePage,
         certificatesCardpage,
         certificateInfo,
         certificateName,
         selectedCourseName,
         searchValue,
         certificateSortingValue,
         isMultiSelect,
         isOpenDeleteModal,
         selectedCertificatesIds,
         selectedCourseIds,
      } = this.state;
      const {
         certificates,
         goTo,
         coursesForCertificate,
         isFetchingData,
         duplicateCertificate,
         statusChangeCertificate,
         screenWidth,
      } = this.props;

      const searchIsActive = searchValue !== '' || certificateSortingValue !== 'recently';

      return (
         <div className='certificatesContainer scroll'>
            <Container>
               <CertificateHeader
                  createCertificatePage={ createCertificatePage }
                  certificatesCardpage={ certificatesCardpage }
                  isEmptyPage={ !searchIsActive && certificates.length === 0 }
                  redirectCertificate={ this.redirectCertificate }
                  certificateInfoModalToggle={ this.certificateInfoModalToggle }
                  courses={ coursesForCertificate }
                  goTo={ goTo }
               />
               <Container.Content>
                  <CertificatesIsLoading isLoading={ isFetchingData }>
                     {certificateInfo && (
                        <ModalNew onCloseModal={ this.certificateInfoModalToggle }>
                           <CertificateInfo
                              changeCourseTemplateName={
                                 this.changeCourseTemplateName
                              }
                              selectedCourseIds={ selectedCourseIds }
                              certificateName={ certificateName }
                              courses={ selectedCourseName }
                              changeSelectedCourse={ this.changeSelectedCourse }
                              coursesdata={ coursesForCertificate }
                              closeModal={ this.certificateInfoModalToggle }
                              goToCreateCertificate={
                                 this.redirectCreateCertificate
                              }
                           />
                        </ModalNew>
                     )}
                     {isOpenDeleteModal && (
                        <DeleteModal
                           title={ selectedCertificatesIds.length === certificates.length ? 'Are you sure you want to delete your all certificates?' : 'Are you sure you want to delete?' }
                           deleteText='Delete'
                           onDelete={ () => this.onAcceptRemove() }
                           onCancel={ () => this.setState({ isOpenDeleteModal: false }) }
                        />
                     )}
                     {
                        certificates.length > 0 ? (
                           <>
                              <CertificatesFilter
                                 searchValue={ searchValue }
                                 setSearchValue={ this.changeSearchValue }
                                 searchOnEnter={ this.searchOnEnter }
                                 duplicateCertificates={ () => duplicateCertificate(selectedCertificatesIds) }
                                 onClearSearch={ this.onClearSearch }
                                 isMultiSelected={ isMultiSelect }
                                 setIsMultiSelected={ this.handleChangeMultiSelect }
                                 certificates={ certificates }
                                 onFilter={ this.sortbyHandle }
                                 certificateSortingValue={ certificateSortingValue }
                                 onCheck={ this.handleOnCheckAll }
                                 checkedItemsLength={ selectedCertificatesIds.length }
                                 onRemoveSelected={ this.handleRemove }
                                 isMobile={ screenWidth < 1024 }
                              />
                              <CertificatesCard
                                 isMultiSelect={ isMultiSelect }
                                 certificates={ certificates }
                                 statusChangeCertificate={ statusChangeCertificate }
                                 duplicateCertificate={ duplicateCertificate }
                                 checkedIds={ selectedCertificatesIds }
                                 onCheck={ this.handleOnCheckItem }
                                 goToSettings={ this.goToSettingsCertificate }
                                 deleteTemplate={ this.deleteCertificate }
                                 goToCreateCertificate={ (id) => this.goToCreateCertificate(id) }
                              />
                           </>
                        ) : (
                           searchIsActive ? (
                              <>
                                 <CertificatesFilter
                                    searchValue={ searchValue }
                                    setSearchValue={ this.changeSearchValue }
                                    searchOnEnter={ this.searchOnEnter }
                                    duplicateCertificates={ () => duplicateCertificate(selectedCertificatesIds) }
                                    onClearSearch={ this.onClearSearch }
                                    isMultiSelected={ isMultiSelect }
                                    setIsMultiSelected={ this.handleChangeMultiSelect }
                                    certificates={ certificates }
                                    onFilter={ this.sortbyHandle }
                                    certificateSortingValue={ certificateSortingValue }
                                    onCheck={ this.handleOnCheckAll }
                                    checkedItemsLength={ selectedCertificatesIds.length }
                                    onRemoveSelected={ this.handleRemove }
                                    isMobile={ screenWidth < 1024 }
                                 />
                                 <div
                                    className='noCredit'
                                 >
                                    <img src={ NoSearchSvg } alt='noCredit' />
                                    <Text
                                       color='#8A94A8'
                                       type={ TextType.normal }
                                       size={ TextSize.small }
                                       inner='No results found for your search.'
                                    />
                                 </div>
                              </>
                           ) : (
                              <EmptyCertificates
                                 certificateInfoModalToggle={ this.certificateInfoModalToggle }
                              />
                           )
                        )
                     }
                     {/* {(searchIsActive || count !== 0)
                        ? (
                           <>
                              <CertificatesFilter
                                 searchValue={ searchValue }
                                 setSearchValue={ this.changeSearchValue }
                                 searchOnEnter={ this.searchOnEnter }
                                 duplicateCertificates={ () => duplicateCertificate(selectedCertificatesIds) }
                                 onClearSearch={ this.onClearSearch }
                                 isMultiSelected={ isMultiSelect }
                                 setIsMultiSelected={ this.handleChangeMultiSelect }
                                 certificates={ certificates }
                                 onFilter={ this.sortbyHandle }
                                 certificateSortingValue={ certificateSortingValue }
                                 onCheck={ this.handleOnCheckAll }
                                 checkedItemsLength={ selectedCertificatesIds.length }
                                 onRemoveSelected={ this.handleRemove }
                                 isMobile={ screenWidth < 1024 }
                              />
                              <CertificatesCard
                                 isMultiSelect={ isMultiSelect }
                                 certificates={ certificates }
                                 statusChangeCertificate={ statusChangeCertificate }
                                 duplicateCertificate={ duplicateCertificate }
                                 checkedIds={ selectedCertificatesIds }
                                 onCheck={ this.handleOnCheckItem }
                                 goToSettings={ this.goToSettingsCertificate }
                                 deleteTemplate={ this.deleteCertificate }
                                 goToCreateCertificate={ (id) => this.goToCreateCertificate(id) }
                              />
                           </>
                        ) : (!searchIsActive && count === 0
                           && (
                              <EmptyCertificates
                                 certificateInfoModalToggle={ this.certificateInfoModalToggle }

                              />
                           )
                        )
                     } */}
                     {/* {count === 0 && searchIsActive
                          && (
                             <div
                                className='noCredit'
                             >
                                <img src={ NoSearchSvg } alt='noCredit' />
                                <Text
                                   color='#8A94A8'
                                   type={ TextType.normal }
                                   size={ TextSize.small }
                                   inner='No Search Results'
                                />
                             </div>
                          )
                     } */}
                  </CertificatesIsLoading>
               </Container.Content>
            </Container>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return {
      certificates: selectors.certificatesSelector(state),
      coursesForCertificate: selectors.coursesForCertificateSelector(state),
      isFetchingData: selectors.isFetchingDataSelector(state),
      screenWidth: screenWidthSelector(state),
   };
};
const mapDispatchToProps = dispatch => {
   return {
      getCertificates: (params) => {
         dispatch(operations.getCertificateOperation(params));
      },
      deleteCertificates: (id, name) => {
         dispatch(operations.deleteCertificateOperation(id, name));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
      getCoursesForNewCertificate: () => {
         dispatch(operations.getCoursesForNewCertificateOperation());
      },
      deleteCertificatesByIds: (ids) => {
         dispatch(operations.deleteCertificatesOperation(ids));
      },
      duplicateCertificate: (ids) => {
         dispatch(operations.duplicateCertificateOperation(ids));
      },
      statusChangeCertificate: (id, type) => {
         dispatch(operations.statusChangeCertificateOperation(id, type));
      },
   };
};
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CertificatesContainer);
