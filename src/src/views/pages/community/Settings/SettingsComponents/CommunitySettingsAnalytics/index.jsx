/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
   getCommunityAnalytics,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { PageRoomViewTable } from 'views/pages/pageView/PageViewComponents/PageRoomViewTable';
import { PageViewRoomStatistic } from 'views/pages/pageView//PageViewComponents/PageViewRoomStatistic';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Input from 'components/elements/inputNew';
import moment from 'moment';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';


const CommunitySettingsAnalytics = ({ community }) => {
   const [analytics, setAnalytics] = useState([]);
   const [inputs, setInputs] = useState({
      searchFrom: '',
      searchTo: '',
   });

   const [getCommunityAnalyticsFunc, { loading }] = useSubmitForm(getCommunityAnalytics, {
      successMessage: '',
   });

   const generateDateRangeData = (fromDate, toDate, data) => {
      const startDate = moment(fromDate);
      const endDate = moment(toDate);
      const result = [];
      for (let date = startDate; date.isSameOrBefore(endDate); date = date.add(1, 'day')) {
         const existingData = data.find(item => item.date === date.format('YYYY-MM-DD'));
         if (existingData) {
            result.push(existingData); 
         } else {
            result.push({
               date: date.format('YYYY-MM-DD'),
               all_view_count: 0,
               unique_view_count: 0,
            });
         }
      }
      return result;
   };


   const getAnalytics = (from, to) => {
      getCommunityAnalyticsFunc({ id: community.id, from, to }, (res) => {
         if (from && to) {
            setAnalytics({
               ...res,
               community: generateDateRangeData(from, to, res.community), 
            });
         } else if (!res.community.length) {
            setAnalytics({
               ...res,
               community: generateDateRangeData(Date.now(), Date.now(), res.community), 
            });
         } else {
            setAnalytics({
               ...res,
               community: res.community, 
            });
         }
      });
   };

   useEffect(() => {
      let dateFrom = '';
      let dateTo = '';
      if (inputs.searchto) {
         dateTo = moment(inputs.searchto).format('YYYY-MM-DD');
      }
      if (inputs.searchFrom) {
         dateFrom = moment(inputs.searchFrom).format('YYYY-MM-DD');
      }
      getAnalytics(dateTo, dateFrom);
   }, []);


   const handleChangeDate = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name === 'searchTo' && value) {
         let dateFrom = '';
         let dateTo = '';
         if (value) {
            dateTo = moment(value).format('YYYY-MM-DD');
         }
   
         if (inputs.searchFrom) {
            dateFrom = moment(inputs.searchFrom).format('YYYY-MM-DD');
         }
         getAnalytics(dateFrom, dateTo);
      }
   };


   return (
      <CommunitySettingsWrapper
         title='Community Analytics'
         tooltip='text'
      >
         {(loading) && <LoaderSpinner />}
         {!loading 
         && (
            <div className='communityAnalytics'>
               <div>
                  <Input
                     classI='transactions-filter-input'
                     type='date-period'
                     from={ inputs.searchFrom }
                     to={ inputs.searchTo }
                     name='search'
                     onChange={ handleChangeDate }
                     isPeriod={ true }
                     placeholder='Select Date'
                  />
               </div>
               <PageViewRoomStatistic
                  landingStatistic={ analytics.community }
               />
               <PageRoomViewTable
                  data={ analytics.room }
                  usersCountAll={ analytics.room_view }
                  uniqueUsersAllCount={ analytics.room_view_unique }    
               /> 
            </div>
         )} 

      </CommunitySettingsWrapper>
   );
};

CommunitySettingsAnalytics.propTypes = {
   community: PropTypes.object,
};

export default CommunitySettingsAnalytics;
