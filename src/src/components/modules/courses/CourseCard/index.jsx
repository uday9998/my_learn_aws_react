import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import ui from 'assets/images/mobile/ui.png';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';

const CourseCard = ({
   published, count, title, content, img,
}) => {
   return (
      <SelectedWrapper>
         <div className='courseCard'>
            <div className='courseCard__img'>
               <img src={ img } alt='' />
            </div>
            <div className='courseCard__main'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ title }
               />
               <div className='courseCard__content'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner={ content }
                  />
               </div>
               <div className='courseCard__info'>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.extraSmall }
                     inner={ published ? 'Published' : 'Unpublished' }
                     color={ published ? '#7cb740' : '#3f4f65' }
                  />
                  <div className='courseCard__enrolled'>
                     <Icon name='GroupOfPeople' />
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.extraSmall }
                        inner={ `${ count } Enrolled` }
                        style={ { fontSize: '12px' } }
                        bold
                     />
                  </div>
               </div>
               <div className='courseCard__actionIcons flex align-start'>
                  <span className='m-r-exs'>
                     <Icon name='Pencil' />
                  </span>
                  <span className='m-r-exs'>
                     <Icon name='Copy' />
                  </span>
                  <span className='m-r-exs'>
                     <Icon name='Link' />
                  </span>
                  <span>
                     <Icon name='EyeSlash' />
                  </span>
               </div>
            </div>
         </div>
      </SelectedWrapper>
   );
};

CourseCard.propTypes = {
   published: PropTypes.bool,
   count: PropTypes.bool,
   title: PropTypes.string,
   content: PropTypes.string,
   img: PropTypes.string,
};

CourseCard.defaultProps = {
   published: false,
   count: 0,
   title: 'Title',
   content: 'Content',
   img: ui,
};

export default CourseCard;
