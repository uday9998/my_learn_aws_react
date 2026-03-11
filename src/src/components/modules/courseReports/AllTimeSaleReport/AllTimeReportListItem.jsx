import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { parseFloat } from 'utils/numberParseFloat';


const AllTimeReportListItem = ({ value }) => {
   return (
      <Text
         type={ TextType.demiBold }
         size={ TextSize.base }
         inner={ parseFloat(value) }
      />
   );
};

AllTimeReportListItem.propTypes = {
   value: PropTypes.number,
};

export default AllTimeReportListItem;
