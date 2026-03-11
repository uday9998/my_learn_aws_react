import PropTypes from 'prop-types';

import './index.scss';

const LeftBar = ({ children }) => {
   return (
      <div className='leftBar'>
         {children}
      </div>
   );
};

export default LeftBar;

LeftBar.propTypes = {
   children: PropTypes.any,
};
