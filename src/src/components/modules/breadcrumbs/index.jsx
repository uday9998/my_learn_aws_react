import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import LinkBreadCumb from 'components/elements/links';
import Icon from 'components/elements/Icon';
import { uniqueId } from 'lodash';


export const BreadCrumb = ({ links = [], linkColor }) => {
   return (
      <div className='breadcrumb'>
         {links.map((e, i) => {
            return (
               <div key={ uniqueId() }>
                  <LinkBreadCumb linkColor={ i === links.length - 1 && window.location.pathname.includes('offers') ? 'var(--subtitleTextColor060)' : linkColor } text={ e.text } goTo={ e.goTo } disabled={ e.disabled } />
                  {links.indexOf(e) + 1 !== links.length && (
                     <Icon name='ArrowRightBread' color={ linkColor } className='breadcrumb__icon' />
                  )}
               </div>
            );
         })}
      </div>
   );
};

BreadCrumb.propTypes = {
   links: PropTypes.array,
   linkColor: PropTypes.string,
};
