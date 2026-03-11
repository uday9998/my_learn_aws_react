import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StudentCertifacte from 'components/modules/certificates/studentCertifacte';
import { connect } from 'react-redux';
import { studentCertificatesSelector, isFetchingDataSelector } from 'state/modules/studentCertificates/selectors';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { getStudentCertificatesOperation } from 'state/modules/studentCertificates/operations';
import withLoading from 'utils/withLoading';
import './index.scss';
import { useTranslate } from 'react-polyglot';

const StudentCertificatesIsLoading = withLoading('div');

const StudentCertifactes = ({ studentCertificates, getStudentCertificates, isFetchingData }) => {
   const t = useTranslate();
   useEffect(() => {
      getStudentCertificates();
   }, []);
   return (
      <div className='studentCertifactes'>
         <div className='certificate_title'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner={ t('certificates') }
               color='#333333'
            />
         </div>
         <StudentCertificatesIsLoading isLoading={ isFetchingData }>
            <StudentCertifacte studentCertificates={ studentCertificates } />
         </StudentCertificatesIsLoading>

      </div>
   );
};

StudentCertifactes.propTypes = {
   studentCertificates: PropTypes.array,
   getStudentCertificates: PropTypes.func,
   isFetchingData: PropTypes.bool,
};

const mapStateToProps = state => {
   return {
      studentCertificates: studentCertificatesSelector(state),
      isFetchingData: isFetchingDataSelector(state),
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getStudentCertificates: async () => {
         dispatch(getStudentCertificatesOperation());
      },

   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(StudentCertifactes);
