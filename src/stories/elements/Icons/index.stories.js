import React from 'react';
import { storiesOf } from '@storybook/react';
import * as icons from 'assets/icons';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import './index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Icons', () => (
      <div className='storybook-element__wrapper' style={ { background: '#ffffff' } }>
         <div className='iconsList'>
            {Object.keys(icons).map(icon => icon.replace('Icon', '')).sort()
               .map(icon => {
                  return (
                     <div className='icon-element'>
                        <Icon name={ `${ icon }` } />
                        <br /><hr />
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.small }
                           inner={ icon }
                        />
                     </div>
                  );
               })}
         </div>
      </div>
   ));
