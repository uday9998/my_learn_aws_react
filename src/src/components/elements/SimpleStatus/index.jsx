import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from '../iconsSize';

const SimpleStatus = ({
   color, text, iconName, size, 
}) => {
   const backgrounds = {
      green: '#E8F2F1',
      lightGreen: '#E7FFEA',
      orange: '#ff705133',
      yellow: '#ac890a33',
      lightYellow: '#FFFBE7',
      red: '#FFF1F1',
      pink: '#FFEEF6',
      navy: '#F1F6FF',
      blue: '#ECF5FF',
      grey: '#E7E9E9',
      black: '#131F1E',
      purple: '#FDF1FF',
      lightPurple: '#F9EDFF',
      lightPink: '#FEE1F2',
      test: '#EAE1FE',
      follow: '#F7FCFC',
      new: '#FBF7FE',
      greyWhite: '#A1A5A5',
   };
   const colors = {
      green: '#24554E',
      lightGreen: '#66E479',
      orange: '#FF7051',
      yellow: '#AC890A',
      lightYellow: '#FFD60A',
      red: '#A61C23',
      pink: '#FF61AD',
      navy: '#3060BD',
      blue: '#329BFC',
      grey: '#444C4B',
      black: '#FFFFFF',
      purple: '#8830BD',
      lightPurple: '#D582FF',
      lightPink: '#9B2355',
      test: '#58239B',
      follow: '#3060BD',
      new: '#8830BD',
      greyWhite: '#fff',
   };
   return (
      <div className='status__simple' style={ { background: backgrounds[color] } }>
         {iconName && (<IconNew name={ iconName } color={ colors[color] } />)}
         <Text
            inner={ text }
            type={ types.regularDefault }
            size={ size ? sizes[size] : sizes.xsmall }
            style={ { color: colors[color] } }
         />
      </div>
   );
};

SimpleStatus.propTypes = {
   iconName: PropTypes.string,
   color: PropTypes.string,
   text: PropTypes.string,
   size: PropTypes.string,
};

export default SimpleStatus;
