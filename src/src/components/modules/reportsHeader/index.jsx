import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Icon from 'components/elements/Icon';

const ReportsHeader = ({ title, exportCSV }) => {
   return (
      <div className='reports-header'>
         <Text inner={ title } style={ { display: 'block' } } size={ txtSizes.size_28 } type={ txtTypes.mediumTitle } />
         <div className='reports-header-right'>
            {/* {printList && (
               <div className='reports-header-right-button' role='presentation' onClick={ () => printList() }>
                  <Icon name='PrintReports' />
                  <Text inner='Print' size={ txtSizes.xsmall } type={ txtTypes.regularMin } />
               </div>
            )} */}
            {exportCSV && (
               <div className='reports-header-right-button' role='presentation' onClick={ () => exportCSV() }>
                  <Icon name='ExportReports' />
                  <Text inner='Export' size={ txtSizes.xsmall } type={ txtTypes.regularMin } />
               </div>
            )}
         </div>
      </div>
   );
};

ReportsHeader.propTypes = {
   exportCSV: PropTypes.func,
   title: PropTypes.string,
};


export default ReportsHeader;
