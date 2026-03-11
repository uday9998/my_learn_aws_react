import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ReactTooltip from 'react-tooltip';
import Icon from 'components/elements/Icon';

const PageTitle = ({ title, tooltip }) => {
   return (
      <div className='page__title'>
         <Text type={ txtTypes.mediumTitle } size={ txtSizes.size_28 } inner={ title } />
         {tooltip && (
            <div className='tooltip' data-tip={ tooltip }>
               <Icon name='TooltipQuestion' style={ { marginTop: '10px' } } className='backIcon' />
               <ReactTooltip />
            </div>
         )}
      </div>
   );
};

PageTitle.propTypes = {
   title: PropTypes.string,
   tooltip: PropTypes.string,
};

export default PageTitle;
