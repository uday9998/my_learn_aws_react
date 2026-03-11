import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getCertificatesByIdData, getCoursesForNewCertificate, updateCertificateSettings } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router-dom';
import AdminContainer from 'views/layout/AdminContainer';
import CertificateSettingsView from 'views/pages/certificates/CertificatesSettings';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import moment from 'moment';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

const AdminCertificateSettings = ({ match }) => {
   const history = useHistory();
   const { data, setData, loading } = useApiQuery(getCertificatesByIdData, [match.params.id]);
   const { data: courses, setData: setCourses, loading: coursesLoading } = useApiQuery(getCoursesForNewCertificate);
   const [update] = useSubmitForm(updateCertificateSettings);

   useEffect(() => {
      if (!loading && !coursesLoading) {
         setCourses([
            ...courses,
            ...data.certificate.course,
         ]);
         setData({
            ...data,
            certificate: {
               ...data.certificate,
               coursesIds: data.certificate.course.map((e) => e.id),
               coursesIdsOld: [...data.certificate.course.map((e) => e.id)],
            },
         });
      }
   }, [loading || coursesLoading]);
   const certificate = data ? data.certificate : {};

   const handleInputChange = (name, value) => {
      setData({
         ...data,
         certificate: {
            ...data.certificate,
            [name]: value,
            course: name === 'coursesIds' ? value.map((e) => courses.find((course) => course.id === e)) : data.certificate.course,
         },
      });
   };


   const handleSave = () => {
      const detachingCourseIds = data.certificate.coursesIdsOld.filter(
         value => !data.certificate.coursesIds.includes(value));
      const notChangedCourseIds = data.certificate.coursesIdsOld.filter(
         value => data.certificate.coursesIds.includes(value));
      const courseIds = data.certificate.coursesIds.filter(
         value => !notChangedCourseIds.includes(value));
      update([match.params.id, {
         course_id: courseIds,
         detaching_course_ids: detachingCourseIds,
         'is_expired_date': data.certificate.is_expired_date ? 1 : 0,
         'expiration_date': data.certificate.expiration_date ? moment(data.certificate.expiration_date).format('YYYY-MM-DD') : moment().add(1, 'day').format('YYYY-MM-DD'),
      }], () => {
         if (isPrint('Certificate updated successfuly.')) {
            toast.success('Certificate updated successfuly.');
         }
         history.goBack();
      });
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <ComponentProgress loading={ loading || coursesLoading }>
            <AdminContainer>
               <div className='certificate__settings'>
                  <HeaderTypeFirst
                     title={ certificate.name }
                     goBack={ () => history.goBack() }
                     onSave={ () => handleSave() }
                  />
                  <AdminContainer.Content>
                     <CertificateSettingsView
                        inputs={ certificate }
                        courses={ courses }
                        setInputs={ handleInputChange }
                     />
                  </AdminContainer.Content>
               </div>
            </AdminContainer>
         </ComponentProgress>
      </>
   );
};

AdminCertificateSettings.propTypes = {
   match: PropTypes.object,
};

export default AdminCertificateSettings;
