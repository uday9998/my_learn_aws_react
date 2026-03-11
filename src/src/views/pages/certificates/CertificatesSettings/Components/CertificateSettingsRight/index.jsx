import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { certificateLandings } from 'utils/certificateLandings';
import Info from 'components/elements/messages/info';
import CertificateCardCourses from 'components/modules/certificates/CertificateCardCourses';

const CertificateSettingsRight = ({ data }) => {
   const image = certificateLandings.find((e) => e.name === data.template_slug).img;
   return (
      <div className='certificate__settings__right'>
         <Text
            inner='Preview'
            type={ types.medium150 }
            size={ sizes.medium }
         />
         <div className='certificate__settings__right__content'>
            <img src={ image } alt='' />
            <div className='certificate__settings__right__content__bottom'>
               <Text
                  inner={ data.name }
                  type={ types.medium153 }
                  size={ sizes.large }
               />
               {data.course.length === 0 ? (
                  <Info
                     title='Here you will see the assigned products, sections or lesson for this certificate.'
                     isHaveCancel={ false }
                  />
               ) : (
                  <div className='certificate__settings__right__content__courses'>
                     <CertificateCardCourses
                        courses={ data.course }
                        isInfinityView={ true }
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

CertificateSettingsRight.propTypes = {
   data: PropTypes.object,
};

export default CertificateSettingsRight;
