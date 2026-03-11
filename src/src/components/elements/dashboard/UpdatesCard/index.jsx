import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import bitmap from 'assets/images/bitmap.jpg';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';


const UpdatesCard = ({
   title, text, imageSrc, style, link,
}) => {
   return (
      <article
         className='updatesCard'
         style={ style }
      >
         <a href={ link } target='_blank' rel='noopener noreferrer'>
            <img className='updatesCard__image' src={ imageSrc } alt='cardimage' />
            <div className='updatesCard__text'>
               <Text
                  style={ { margin: '20px 0', fontSize: '20px' } }
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner={ title }
               />
               <div className='ellipsis'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner={ text }
                  />
               </div>
            </div>
         </a>
      </article>
   );
};

UpdatesCard.propTypes = {
   title: PropTypes.string,
   text: PropTypes.string,
   imageSrc: PropTypes.string,
   style: PropTypes.object,
   link: PropTypes.string,
};

UpdatesCard.defaultProps = {
   title: 'New Project',
   text: 'Start your new project in five easy steps and start by adding new class information to get started.',
   imageSrc: bitmap,
   link: '#',
};

export default UpdatesCard;
