import React from 'react';
import TextInputRange from 'components/elements/form/TextInputRange';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';

const Spacing = ({
   changeProp, index, top, left, bottom, right, slug,
}) => {
   return (
      <>
         <div>
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.xsmall }
               inner='Spacing (px)'
               color='#979797'
            />
         </div>
         <div className='padding-content'>
            <div className='padding-container'>
               <div className='padding-top'>
                  <TextInputRange
                     label='Top Padding'
                     type='range'
                     leftText={ top }
                     id={ `top-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingTop'
                     value={ top }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
               <div className='padding-right'>
                  <TextInputRange
                     label='Right Padding'
                     type='range'
                     leftText={ right }
                     id={ `right-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingRight'
                     value={ right }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
               <div className='padding-bottom'>
                  <TextInputRange
                     label='Bottom Padding'
                     type='range'
                     leftText={ bottom }
                     id={ `bottom-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingBottom'
                     value={ bottom }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
               <div className='padding-left'>
                  <TextInputRange
                     label='Left Padding'
                     type='range'
                     leftText={ left }
                     id={ `left-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingLeft'
                     value={ left }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
            </div>
         </div>
      </>
   );
};

Spacing.defaultProps = {
   top: '0',
   bottom: '0',
   left: '0',
   right: '0',
};

Spacing.propTypes = {
   slug: PropTypes.string,
   changeProp: PropTypes.func,
   index: PropTypes.number,
   top: PropTypes.string,
   bottom: PropTypes.string,
   left: PropTypes.string,
   right: PropTypes.string,
};

export default Spacing;
