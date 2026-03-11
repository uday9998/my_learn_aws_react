import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconNew from 'components/elements/iconsSize';


export const TYPES = {
   publish: 'publish',
   draft: 'draft',
   drip: 'drip',
   lock: 'lock',
   mixed: 'mixed',
   calendar: 'calendar',
   course: 'course',
   scheduled: '#FFF1F1',
   failed: 'failed',
   passed: 'passed',
};

export const COLORS = {
   publish: '#24554E',
   draft: '#131F1E',
   drip: '#9B2355',
   lock: '#58239B',
   mixed: '#fff',
   calendar: '#D12D36',
   scheduled: '#D12D36',
   failed: ' #A61C23',
   passed: '#24554E',
};

const Status = ({
   text, icon, type, disabled,
}) => {
   return (
      <div
         className={
            classNames(
               'status',
               {
                  [`status_type_${ type }`]: type && !disabled,
                  'status_disabled': disabled,
               })
         }
         disabled={ disabled }
      >
         {icon
         && <IconNew name={ icon } color={ !disabled ? COLORS[type] : '#ffff' } />}
         {text && <span>{text}</span>}
      </div>
   );
};

Status.propTypes = {
   text: PropTypes.string,
   icon: PropTypes.string,
   type: PropTypes.string,
   disabled: PropTypes.bool,
};

export default Status;
