import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import { useTranslate } from 'react-polyglot';
import { onDownload } from 'utils/mediaLibrary';


const StudentCertifacte = ({ studentCertificates }) => {
   const t = useTranslate();
   return (
      <div className='studentCertifacte'>
         {
            studentCertificates.length !== 0 && studentCertificates.map((i) => {
               return (
                  <>
                     <div
                        className='studentCertifacteRectangle'
                        style={ {
                           display: 'flex', flexDirection: 'column',
                        } }
                     >
                        <div
                           className='image'
                           style={ {
                              height: '120px',
                              width: '264px',
                              backgroundImage: `url(${ i.thumbnail })`,
                              backgroundSize: 'cover',
                              marginBottom: '10px',
                           } }
                        />
                        <div style={ {
                           paddingLeft: '15px', paddingRight: '15px', display: 'flex', flexDirection: 'column',
                        } }
                        >
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.extraSmall }
                              color='#8994a2'
                              inner='Class Name'
                           />
                           <Text
                              type={ TextType.bold }
                              size={ TextSize.medium }
                              inner={ i.course }
                              style={ { marginTop: '12px' } }
                           />
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.small }
                              inner={ `${ t('issued_date') } ${ i.finished_at }` }
                              style={ { marginTop: '15px' } }
                           />
                           <BaseButton
                              theme={ btnTheme.grey }
                              size={ btnSizes.medium }
                              text={ i.certificate_status === 'generated' ? t('download_as_pdf') : 'Generating...' }
                              style={ { marginTop: '25px' } }
                              disabled={ i.certificate_status !== 'generated' }
                              onClick={ () => onDownload(i.certificate_src, i.course) }
                           />
                        </div>
                     </div>
                  </>
               );
            })
         }
      </div>
   );
};

StudentCertifacte.propTypes = {
   studentCertificates: PropTypes.array,
};

export default StudentCertifacte;
