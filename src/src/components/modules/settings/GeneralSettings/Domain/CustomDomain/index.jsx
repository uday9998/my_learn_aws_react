import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import IToolTipNew from 'components/elements/IToolTipNew';

const CustomDomainItem = ({ domain, index, onDelete }) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
   return (
      <div className='custom__domain'>
         {isOpenDeleteModal && (
            <DeleteModal
               deleteText='Delete'
               title='Are you sure you want to delete the custom domain?'
               onCancel={ () => setIsOpenDeleteModal(false) }
               onDelete={ () => onDelete() }
            />
         )}
         <div className='left'>
            <Text
               inner={ `${ index + 1 }. ${ domain.domain }` }
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <IToolTipNew
               iconName={ domain.is_domain_pointed ? 'CustomDomainSuccessL' : 'CustomDomainErrorL' }
               tooltip={ `${ domain.domain } is ${ domain.is_domain_pointed ? '' : 'not' } currently pointing to Miestro` }
            />
            <IToolTipNew
               iconName={ domain.is_domain_pointed ? 'CustomDomainSuccessL' : 'CustomDomainErrorL' }
               tooltip={ `www.${ domain.domain } is ${ domain.is_www_domain_pointed ? '' : 'not' } currently pointing to Miestro` }
            />
         </div>
         <IconButton
            onClick={ () => setIsOpenDeleteModal(true) }
            name='TrashSettingsM'
         />
      </div>
   );
};

CustomDomainItem.propTypes = {
   domain: PropTypes.string,
   onDelete: PropTypes.func,
   index: PropTypes.number,
};

export default CustomDomainItem;
