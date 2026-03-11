/* eslint-disable react/prop-types */
import React from 'react';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import PropTypes from 'prop-types';

const withLoading = (Component, {
   LoaderComponent = LoaderSpinner,
   centered = true,
   loaderStyle,
   width,
   height,
} = {}) => {
   return ({
      isLoading, LoaderSpinnerStyle, width, height, ...props
   }) => {
      if (isLoading) {
         return (
            <LoaderComponent
               width={ width }
               heigth={ height }
               centered={ centered }
               loaderStyle={ loaderStyle }
               LoaderSpinnerStyle={ LoaderSpinnerStyle }
            />
         );
      }
      if (typeof Component === 'string') return React.createElement(Component, props);
      return <Component { ...props } />;
   };
};

withLoading.propTypes = {
   width: PropTypes.number,
   heigth: PropTypes.number,
   LoaderSpinnerStyle: PropTypes.object,
};

withLoading.defaultProps = {
   width: 300,
   heigth: 300,
};

export default withLoading;
