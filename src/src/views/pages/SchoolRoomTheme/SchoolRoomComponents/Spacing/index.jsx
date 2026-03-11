import React from 'react';
import TextInputRange from 'components/elements/form/TextInputRange';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import './index.scss';

const Spacing = ({
   changeProp, index, top, left, bottom, right, slug, subIndex, componentType, unit, min, max,
}) => {
   return (
      <>
         <div>
            <Text
               type={ TextType.normal }
               size={ TextSize.extraSmall }
               inner={ `Spacing (${ unit })` }
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
                     min={ min }
                     max={ max }
                     name='paddingTop'
                     value={ top }
                     onChange={ (value, name) => { changeProp(value, name, componentType, index, subIndex); } }
                  />
               </div>
               <div className='padding-right'>
                  <TextInputRange
                     label='Right Padding'
                     type='range'
                     leftText={ right }
                     id={ `right-${ slug }` }
                     min={ min }
                     max={ max }
                     name='paddingRight'
                     value={ right }
                     onChange={ (value, name) => { changeProp(value, name, componentType, index, subIndex); } }
                  />
               </div>
               <div className='padding-bottom'>
                  <TextInputRange
                     label='Bottom Padding'
                     type='range'
                     leftText={ bottom }
                     id={ `bottom-${ slug }` }
                     min={ min }
                     max={ max }
                     name='paddingBottom'
                     value={ bottom }
                     onChange={ (value, name) => { changeProp(value, name, componentType, index, subIndex); } }
                  />
               </div>
               <div className='padding-left'>
                  <TextInputRange
                     label='Left Padding'
                     type='range'
                     leftText={ left }
                     id={ `left-${ slug }` }
                     min={ min }
                     max={ max }
                     name='paddingLeft'
                     value={ left }
                     onChange={ (value, name) => { changeProp(value, name, componentType, index, subIndex); } }
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
   componentType: 'component',
   unit: 'px',
   min: 0,
   max: 150,
};

Spacing.propTypes = {
   slug: PropTypes.string,
   changeProp: PropTypes.func,
   index: PropTypes.number,
   top: PropTypes.string,
   bottom: PropTypes.string,
   left: PropTypes.string,
   right: PropTypes.string,
   subIndex: PropTypes.number,
   componentType: PropTypes.string,
   unit: PropTypes.string,
   min: PropTypes.number,
   max: PropTypes.number,
};

export default Spacing;
