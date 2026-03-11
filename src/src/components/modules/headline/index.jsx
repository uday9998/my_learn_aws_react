import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Text, { SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Icon from 'components/elements/Icon';
import ReactTooltip from 'react-tooltip';


function Headline({ title, tooltip = null }) {
   const history = useHistory();
   return (
      <div className='headline'>
         <button onClick={ () => history.goBack() } type='button' className='headline__button'>
            <Icon name='LeftArrowNew' />
         </button>
         <Text inner={ title } size={ txtSizes.size_28 } />
         {tooltip?.length && (
            <div className='tooltip' data-tip={ tooltip }>
               <Icon name='ToolTip' style={ { marginTop: '10px' } } className='backIcon' />
               <ReactTooltip />
            </div>
         )}
      </div>
   );
}
Headline.propTypes = {
   title: PropTypes.string,
   tooltip: PropTypes.string,
};
export default Headline;
