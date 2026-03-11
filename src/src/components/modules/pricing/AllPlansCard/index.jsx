/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';

const AllPlansCard = ({ title, plans }) => {
   return (
      <ItemWrapper style={ { borderColor: '#cddaf1' } }>
         <div className='allPlansCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner={ title }
            />
            <div className='plansListContainer'>
               {plans.map((plan, i) => {
                  return (
                     <div className='plansList' key={ i }>
                        {plan.map((item, j) => {
                           return (
                              <div className='plansList__item' key={ j }>
                                 <Icon name={ item.icon } color='#7CB740' />
                                 <Text
                                    type={ TextType.regular }
                                    size={ TextSize.small }
                                    inner={ item.name }
                                    bold
                                 />
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </div>
      </ItemWrapper>
   );
};

AllPlansCard.propTypes = {
   title: PropTypes.string,
   plans: PropTypes.array,
};
AllPlansCard.defaultProps = {
   title: 'Included in All Plans',
   plans: [
      [
         { icon: 'Course', name: 'Unlimited Classes' },
         { icon: 'Students', name: 'Unlimited Students' },
         { icon: 'Hosting', name: 'Unlimited hosting' },
      ],
      [
         { icon: 'Integrations', name: 'Integrated Payment System' },
         { icon: 'Management', name: 'Student Management' },
         { icon: 'Forums', name: 'Discussion forums' },
      ],
      [
         { icon: 'Quizze', name: 'Basic quizzes' },
         { icon: 'Transactions', name: 'No fees on free Classes' },
      ],
   ],
};

export default AllPlansCard;
