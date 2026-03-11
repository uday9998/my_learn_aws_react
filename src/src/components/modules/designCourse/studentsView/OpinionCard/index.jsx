import React from 'react';
import ViewCard from 'components/modules/designCourse/studentsView/ViewCard';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import './index.scss';
import avatar from 'assets/images/jonas.png';
import PropTypes from 'prop-types';

const SummaryCard = ({ testimonials }) => {
   return (
      <ViewCard
         title='See What Some People Are Saying About Class Code Masterclass!'
         content={ (
            <>
               {
                  testimonials.map((testimonial) => {
                     return (
                        <div className='opinionBlock' key={ testimonial.id }>
                           <img src={ testimonial.picture_src ? testimonial.picture_src : avatar } alt='' />
                           <div className='textBlock'>
                              <Text
                                 type={ txtType.normal }
                                 size={ txtSizes.small }
                                 inner={ testimonial.text }
                              />
                              <Text
                                 type={ txtType.regular }
                                 size={ txtSizes.extraSmall }
                                 inner={ testimonial.author_name }
                                 color='#8a94a2'
                              />
                           </div>
                        </div>
                     );
                  })
               }

            </>
         ) }
      />
   );
};

SummaryCard.propTypes = {
   testimonials: PropTypes.array,
};

export default SummaryCard;
