import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(() => ({
   tooltip: {
      backgroundColor: '#fff',
      boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.3);',
      padding: 0,
   },
}))(Tooltip);

export default function PopOver({ children, ...rest }) {
   return (
      <HtmlTooltip
         enterDelay={ 100 }
         { ...rest }
      >
         {children}
      </HtmlTooltip>
   );
}

PopOver.propTypes = {
   children: PropTypes.any,
};
