import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import Icon from 'components/elements/Icon';
import noTags from 'assets/images/schoolRoom/empty_state_product.png';

const TagView = ({ tags = [], onDelete }) => {
   return (
      <div className='tag__view'>
         <div className='tag__view__top'>
            <Text
               inner='Tags'
               tyoe={ txtTypes.regular160 }
               size={ txtSizes.xlarge }
            />
         </div>
         <div className='tag__view__flex'>
            {tags.length ? tags.map((tag) => {
               return (
                  <div className='tag__view__tag' key={ uniqueId() }>
                     <Text
                        inner={ tag.name }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                     <div className='tag__view__delete' role='presentation' onClick={ () => onDelete(tag.id) }>
                        <Icon name='DeleteTag' />
                     </div>
                  </div>
               );
            }) : (
               <div className='tag__view__none tags__wrapper'>
                  <img src={ noTags } alt='noTags' />
                  <Text
                     inner='There are no tags yet.'
                     type={ txtTypes.regular148 }
                     style={ { color: 'rgba(19, 31, 30, 1)' } }
                     size={ txtSizes.small14 }
                  />
               </div>
            )}
         </div>
      </div>
   );
};

TagView.propTypes = {
   tags: PropTypes.array,
   onDelete: PropTypes.func,
};

export default TagView;
