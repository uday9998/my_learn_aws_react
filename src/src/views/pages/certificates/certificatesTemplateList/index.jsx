import React from 'react';
import PropTypes from 'prop-types';
import Certificate from 'components/modules/certificates/certificate';
import './index.scss';

const CertificatesTemplatesList = (props) => {
   return (
      <div className='CertificatesTemplatesList'>
         <div style={ { display: 'flex' } }>
            <div className='certificateColumn'>
               { [{ color: 'red', id: 0 }, { color: 'yellow', id: 1 }, { color: 'green', id: 2 }, { color: 'blue', id: 3 }].map((i) => {
                  return (
                     <div style={ { marginBottom: '5px', height: '200px' } }>
                        <Certificate
                           color={ i.color }
                           key={ i }
                           el={ i.id }
                           //  changeCertificate={ () => changeCertificate(i.color) }
                        />
                     </div>
                  );
               })}
            </div>

            <div style={ { paddingLeft: ' 24px', width: '100%', height: '500px' } }>
               <Certificate color='red' />
            </div>
         </div>
      </div>
   );
};

CertificatesTemplatesList.propTypes = {

};

export default CertificatesTemplatesList;
