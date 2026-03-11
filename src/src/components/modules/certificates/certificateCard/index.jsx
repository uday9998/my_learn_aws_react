import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import CertificateCardCourses from '../CertificateCardCourses';


const CertificateCard = ({
   name,
   img,
   goToEditCertificate,
   isMultiSelect,
   onCheck,
   published,
   isChecked,
   courses,
   deleteTemplate,
   id,
   goToSettings,
   handleDuplicate,
   statusChangeCertificate,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

   const dropOptions = [
      { name: 'Edit', onClick: () => goToEditCertificate(), iconName: 'EditCommunityM' },
      { name: 'Duplicate', onClick: () => handleDuplicate(), iconName: 'CertificateDuplicateM' },
      { name: published ? 'Draft' : 'Publish', onClick: () => statusChangeCertificate(id, published ? 'draft' : 'publish'), iconName: published ? 'archiveM' : 'EyeCertificateM' },
      { name: 'Settings', onClick: () => goToSettings(id), iconName: 'settingsCommunityM' },
      {
         name: 'Delete', onClick: () => setIsOpenDeleteModal(true), trash: true, iconName: 'deleteCommunityM',
      },
   ];
   return (
      <div className='certificate__card'>
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to delete this certificate?'
               deleteText='Delete'
               onDelete={ () => deleteTemplate(id, name) }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <div className='certificate__card__view'>
            <div className='certificate__card__top'>
               <img
                  src={ `${ process.env.REACT_APP_MAIN_DOMAIN_LIVE }/images/certificates/thumbnail/${ img }.png` }
                  alt=''
                  role='presentation'
                  onClick={ isMultiSelect ? () => onCheck(!isChecked) : () => goToEditCertificate() }
               />
               {isMultiSelect && (
                  <CheckBox
                     checked={ isChecked }
                     onChange={ () => onCheck(!isChecked) }
                  />
               )}
               <div className='certificate__card__top__status'>
                  {published === 1 ? (
                     <div className='certificate__card__top__published'>
                        <IconNew name='CertificatePublishedM' />
                        <Text
                           inner='Published'
                           type={ textType.regular148 }
                           size={ textSize.xsmall }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                  ) : (
                     <div className='certificate__card__top__draft'>
                        <IconNew name='CertificateDraftM' />
                        <Text
                           inner='Draft'
                           type={ textType.regular148 }
                           size={ textSize.xsmall }
                           style={ { color: 'rgba(19, 31, 30, 0.8)' } }
                        />
                     </div>
                  )}
               </div>
            </div>
            <div className='certificate__card__bottom'>
               <div className='certificate__card__bottom__name'>
                  <Text
                     inner={ name }
                     type={ textType.medium153 }
                     size={ textSize.large }
                  />
                  <DropTriggle options={ dropOptions } />
               </div>
               <CertificateCardCourses
                  courses={ courses }
               />
               {/* <Text
                        inner={ `${ courses.map((e) => e.name).join(',') } Class` }
                        type={ textType.regular148 }
                        size={ textSize.xsmall }
                        style={ { color: '#BD30B7' } }
                     /> */}
            </div>
         </div>
      </div>
   );
};

CertificateCard.propTypes = {
   deleteTemplate: PropTypes.func,
   id: PropTypes.number,
   name: PropTypes.string,
   img: PropTypes.string,
   goToEditCertificate: PropTypes.func,
   published: PropTypes.number,
   isMultiSelect: PropTypes.bool,
   onCheck: PropTypes.func,
   isChecked: PropTypes.bool,
   courses: PropTypes.array,
   goToSettings: PropTypes.func,
   handleDuplicate: PropTypes.func,
   statusChangeCertificate: PropTypes.func,
};

export default CertificateCard;
