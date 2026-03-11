import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';

const SectionModule = ({ section, onSelect, isSelected }) => {
   return (
      <div className={ `module${ isSelected ? ' module__selected' : '' }` } role='presentation' onClick={ isSelected ? () => {} : () => onSelect(section) }>
         <div className='module__right'>
            {isSelected ? <Icon name='ModuleOpened' /> : <Icon name='ModuleClosed' />}
            <Text
               inner={ section.name }
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
               style={ { color: isSelected ? '#FFF' : '#131F1E' } }
            />
         </div>
         <div className='module__left'>
            <div className='module__progress'>
               <Text
                  inner={ `${ section.progress_percentage }%` }
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: isSelected ? '#FFF' : '#131F1E' } }
               />
               <div className='module__progress__wrapper'>
                  <div className='module__progress__prsentage' style={ { width: `${ section.progress_percentage }%` } } />
               </div>
            </div>
            <Icon name='ModuleOpenArrow' color={ isSelected ? '#FFF' : '#A1A5A5' } />
         </div>
      </div>
   );
};

SectionModule.defaultProps = {
   isSelected: false,
};

SectionModule.propTypes = {
   section: PropTypes.object,
   onSelect: PropTypes.func,
   isSelected: PropTypes.func,
};

export default SectionModule;
