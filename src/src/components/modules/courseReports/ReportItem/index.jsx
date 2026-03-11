import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import './index.scss';

const ReportItem = ({ children, loading, half }) => {
   return (
      <div className={ cx('reportItemWrapper', { half }) }>
         <ItemWrapper>
            <div className='reportItem'>
               {loading && (<div className='loadingReportItem'>Loading...</div>)}
               <div className='inner'>
                  {!loading && children}
               </div>
            </div>
         </ItemWrapper>
      </div>
   );
};


ReportItem.propTypes = {
   loading: PropTypes.bool,
   half: PropTypes.bool,
   children: PropTypes.node,
};

export default ReportItem;
