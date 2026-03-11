import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';

import './ProductCard.scss';

const ProductCard = ({ 
  title, 
  subtitle, 
  iconName, 
  buttonInner, 
  buttonIconName,
  path,
  history
}) => {
  
  const handleClick = () => {
    if (path) {
      history.push(path);
    }
  };
  
  return (
    <div className="product-card">
      <div className="product-card-icon">
        <Icon name={iconName} />
      </div>
      
      <div className="product-card-content">
        <Text 
          inner={title}
          size={sizes.medium}
          type={types.medium}
          className="product-card-title"
        />
        
        <Text 
          inner={subtitle}
          size={sizes.small}
          className="product-card-subtitle"
        />
      </div>
      
      <button className="product-card-button" onClick={handleClick}>
        <span>{buttonInner}</span>
        <Icon name={buttonIconName} />
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  buttonInner: PropTypes.string.isRequired,
  buttonIconName: PropTypes.string.isRequired,
  path: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(ProductCard);