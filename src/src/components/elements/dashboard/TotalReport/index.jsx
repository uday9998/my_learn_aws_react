import React from 'react';
import './index.scss';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';

const TotalReport = ({ icon, bold, regular }) => {
   return (
      <div className='totalReport'>
         <div className='totalReport__left'>
            <IconNew name={ icon } />
            <Text
               size={ textSize.small }
               type={ textType.regularDefault }
               inner={ regular }
            />
         </div>
         <div className='totalReport__statistic'>
            <Text
               size={ textSize.small }
               type={ textType.regularDefault }
               inner={ bold }
            />

         </div>
      </div>
   );
};

TotalReport.propTypes = {
   icon: PropTypes.string,
   bold: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   regular: PropTypes.string,
};

TotalReport.defaultProps = {
   icon: 'ReportMembers',
   bold: '138',
   regular: 'Total Members',
};

export default TotalReport;
