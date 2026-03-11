import React from 'react';
import { connect } from 'react-redux';
import ClassProgressUserView from 'views/pages/ClassProgress/ClassProgressView';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getCourseCompletionMember,
} from 'api';
import PropTypes from 'prop-types';

import withLoading from 'utils/withLoading';

const ClassProgressUserViewLoading = withLoading(ClassProgressUserView);


const ClassProgressUserViewContainer = (props) => {
   const { match } = props;
   const {
      data: member, loading,
   } = useApiQuery(getCourseCompletionMember, [match.params.id]);


   return (
      <ClassProgressUserViewLoading
         isLoading={ loading }
         member={ member }
      />
   );
};

ClassProgressUserViewContainer.propTypes = {
   match: PropTypes.object,
};

const mapStateToProps = () => {
   return {

   };
};

const mapDispatchToProps = () => {
   return {

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(ClassProgressUserViewContainer);
