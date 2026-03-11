import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';

const landingsDefaultsListDefaults = ({
   landings = [], createLanding, previewLanding,
}) => {
   return (
      <div className='landingsDefaultsList'>
         {landings.map(({
            id, img, title,
         }) => {
            return (
               <div key={ id } className='landingsDefaultsList__item'>
                  <img src={ img } alt='Landing Template' />
                  <div className='blackOverlay' />
                  <div className='landingsDefaultsList__item__actions'>
                     <div className='landingsDefaultsList__item__title'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.medium }
                           inner={ title }
                           color='#1c1d1f'
                        />
                     </div>
                     <div className='landingsDefaultsList__item__btns'>
                        <BaseButton
                           theme={ btnTheme.green }
                           size={ btnSize.large }
                           text='Preview'
                           onClick={ () => previewLanding(id) }
                        />
                        <BaseButton
                           theme={ btnTheme.lightGreen }
                           size={ btnSize.large }
                           text='Choose'
                           onClick={ () => createLanding(id, title, img) }
                        />
                     </div>
                  </div>

               </div>
            );
         })}
      </div>
   );
};

landingsDefaultsListDefaults.propTypes = {
   landings: PropTypes.array,
   createLanding: PropTypes.func,
   previewLanding: PropTypes.func,
};

export default landingsDefaultsListDefaults;
