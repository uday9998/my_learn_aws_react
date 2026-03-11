import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CertificateCard from 'components/modules/certificates/certificateCard';
import './index.scss';

const CertificatesCards = ({
   goToCreateCertificate, deleteTemplate, certificates, isMultiSelect, onCheck, checkedIds,
   goToSettings, duplicateCertificate, statusChangeCertificate,
}) => {
   const [modal, setModal] = useState(false);
   const [activeCourse, setActiveCourse] = useState(null);

   const toggleModalHandlerer = (id, course) => {
      if (course) {
         setActiveCourse(course);
      }
      setModal(!modal);
   };
   return (
      <div>
         <div className='CertificatesContent'>
            { certificates.map((certificate) => (
               <div key={ certificate.id }>
                  <CertificateCard
                     certificate={ certificate }
                     goToEditCertificate={ () => goToCreateCertificate(certificate.id) }
                     modal={ modal }
                     published={ certificate.published }
                     deleteTemplate={ deleteTemplate }
                     name={ certificate.name }
                     onCheck={ () => onCheck(certificate.id) }
                     goToSettings={ goToSettings }
                     statusChangeCertificate={ statusChangeCertificate }
                     isChecked={ checkedIds.includes(certificate.id) }
                     updatedDate={ certificate.updated_at }
                     id={ certificate.id }
                     activeCourse={ activeCourse }
                     courses={ certificate.course || [] }
                     isMultiSelect={ isMultiSelect }
                     toggleModalHandlerer={ () => toggleModalHandlerer(certificate.id, certificate.course) }
                     goToCreateCertificate={ goToCreateCertificate }
                     img={ certificate.template_slug }
                     key={ certificate.id }
                     handleDuplicate={ () => duplicateCertificate([certificate.id]) }
                     selected
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

CertificatesCards.propTypes = {
   goToCreateCertificate: PropTypes.func,
   deleteTemplate: PropTypes.func,
   certificates: PropTypes.array,
   isMultiSelect: PropTypes.bool,
   onCheck: PropTypes.func,
   checkedIds: PropTypes.array,
   goToSettings: PropTypes.func,
   statusChangeCertificate: PropTypes.func,
   duplicateCertificate: PropTypes.func,
};

export default CertificatesCards;
