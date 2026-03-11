/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import { getAwards } from 'utils/StaticData';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isLocalhost } from 'utils/Helpers';

const apiUrl = isLocalhost() ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;
const awards = getAwards();

const LevelIconsRow = ({ selected, handleChange }) => {
   return (
      <div className='levelIconsRow'>
         {
            awards.map((award, i) => {
               return (
                  <div
                     className={ classnames('levelIconWrapper', { 'levelIconChecked': selected === award }) }
                     key={ i }
                     role='presentation'
                     onClick={ () => handleChange('badge_src', award) }
                  >
                     <img src={ `${ apiUrl }${ award }` } alt='level icon' />
                  </div>
               );
            })
         }

      </div>
   );
};

LevelIconsRow.propTypes = {
   selected: PropTypes.string,
   handleChange: PropTypes.func,
};

LevelIconsRow.defaultProps = {
   selected: awards[0],
   handleChange: () => {},
};

export default LevelIconsRow;
