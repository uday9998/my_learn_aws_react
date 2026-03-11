import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ClassProgressView from 'views/pages/ClassProgress';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   getAllFrontCourses, getClassCompletion, runReportsJob,
} from 'api';
import withLoading from 'utils/withLoading';
import { appSelector } from 'state/modules/common/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';
import socketIOClient from 'socket.io-client';

const ClassProgressViewLoading = withLoading(ClassProgressView);

const ClassProgress = ({ goTo, app }) => {
   const {
      data: courses, loading: loadingCourses,
   } = useApiQuery(getAllFrontCourses);

   const [getCourseCompletionFunc, { loading }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });
   const socket = useRef(null);
   const [completionData, setCompletionData] = useState('procesed');

   const [inputs, setInputs] = useState({
      course: '',
      name: '',
      email: '',
   });


   useEffect(() => {
      if (!loadingCourses && Boolean(courses)) {
         const filteredCourses = courses.courses.filter(course => course.type !== '2');
         if (filteredCourses && filteredCourses.length > 0) {
            setInputs({
               ...inputs,
               'course': filteredCourses[0].id,
            });
            getClassCompletion({ course: filteredCourses[0].id }).then(() => {
               const bindSocketEvents = () => {
                  socket.current.on('connect', () => {
                     socket.current.emit('subscribe');
                     runReportsJob(['class-progress', { course_id: filteredCourses[0].id }]);
                  });

                  socket.current.on('reports.class-progress-data', (data) => {
                     setCompletionData({ ...data });
                  });
               };
               const socketUrl = `${process.env.REACT_APP_SOCKET_ENDPOINT}?uuid=${app.uuid}`;
               socket.current = socketIOClient(socketUrl);
               bindSocketEvents();
            });
         }
      }
      return () => {
         if (socket.current) {
            socket.current.disconnect();
         }
      };
   }, [loadingCourses]);


   const handleInputChange = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      getCourseCompletionFunc(['class-progress', { ...filters, course_id: filters.course }], (res) => {
         setCompletionData(res);
      });
   };


   const tableData = [
      {
         name: 'asd', progress: 75, logins: 56, start_date: '5/27/15', activity: '5/27/15',
      },
   ];
   const topUsers = completionData && completionData.top_students;

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <Container>
            <ClassProgressViewLoading
               isLoading={ loadingCourses }
               courses={ courses }
               inputs={ inputs }
               handleInputChange={ handleInputChange }
               completionData={ completionData }
               topUsers={ topUsers }
               goTo={ goTo }
               tableData={ tableData }
               loading={ loading }
            />
         </Container>
      </>
   );
};
ClassProgress.propTypes = {
   goTo: PropTypes.func,
   app: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location, hash) => {
         dispatch(push({
            pathname: Router.route('ADMIN_CLASS_PROGRESS_VIEW').getCompiledPath({ id: location }),
            hash,
         }));
      },

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(ClassProgress);
