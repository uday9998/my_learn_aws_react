/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';


const BulletCardItem = ({
   bullet, handleInputSignUpChange, handleSignUpSave, newBullet = false, deleteSignUp = () => {},
   chooseBullet, currentBullet, handleAddBullet,
}) => {
   const [charectersLimit, setCharectersLimit] = useState(0);
   const getCharectersLength = (l) => setCharectersLimit(l);
   return (
      <>
         <div className='m-b-l'>
            { newBullet
               ? (
                  <>
                     <div className='charecters__line'>
                        <span className='charecters__numbers'>{ `${ charectersLimit }/190` }
                        </span>
                     </div>
                     <div className='inputBlockWithIcon'>
                        <TextInput
                           label=''
                           placeholder='Another benefit here'
                           name='text'
                           value={ bullet.text }
                           onChange={ (key, value) => {
                              return (
                                 handleInputSignUpChange(key, value, bullet.id),
                                 getCharectersLength(value.length));
                           } }
                        />
                     </div>
                     <div className='btnsBlock'>
                        <BaseButton
                           theme={ btnTheme.grey }
                           size={ btnSize.large }
                           text='Cancel'
                           onClick={ () => handleAddBullet(false) }
                        />
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           text='Save'
                           onClick={ () => { handleSignUpSave('bullet-points', bullet.id); } }
                        />
                     </div>
                  </>
               )
               : currentBullet && currentBullet.id === bullet.id ? (
                  <>

                     <div className='inputBlockWithIcon'>
                        <div style={ { display: 'flex', flexDirection: 'column', width: '100%' } }>
                           <div className='charecters__line'>
                              <span className='charecters__numbers'>{ `${ currentBullet.text.length }/190` }</span>
                           </div>
                           <TextInput
                              label=''
                              placeholder='Another benefit here'
                              name='text'
                              value={ currentBullet.text }
                              onChange={ (key, value) => handleInputSignUpChange(key, value, 'updatebullet') }
                           />
                        </div>


                        <div role='presentation' onClick={ () => deleteSignUp(bullet.id) }>
                           <Icon name='Delete' />
                        </div>
                     </div>
                     <div className='btnsBlock'>
                        {/* <BaseButton
                           theme={ btnTheme.lightGreen }
                           size={ btnSize.large }
                           text='Preview'
                        /> */}
                        <BaseButton
                           theme={ btnTheme.grey }
                           size={ btnSize.large }
                           text='Cancel'
                           onClick={ () => chooseBullet(0) }
                        />
                        <BaseButton
                           theme={ btnTheme.darkGreen }
                           size={ btnSize.large }
                           text='Save'
                           onClick={ () => handleSignUpSave('bullet-points', bullet.id) }
                        />
                     </div>
                  </>
               ) : (
                  <>
                     <div className='inputBlockWithIcon'>
                        <div className='bullet-view-block'>
                           {/* <div className='textArea'>
                              <span className='textBasic dont-break-out textBasic_type_normal textBasic_size_extraSmall comment'>Bullet Point</span>
                              <div role='presentation' onClick={ () => deleteSignUp(bullet.id) }>
                                 <Icon name='Delete' />
                              </div>
                           </div> */}
                           <div className='textArea__div'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ bullet.text }
                              />
                              <div className='testimonial__edit' role='presentation' onClick={ () => chooseBullet(bullet.id) }>
                                 <Icon name='EditItem' />
                              </div>
                           </div>
                           <div role='presentation' onClick={ () => deleteSignUp(bullet.id) }>
                              <Icon name='Delete' />
                           </div>

                        </div>
                        {/* <TextInput
                           label=''
                           placeholder='Another benefit here'
                           name='text'
                           value={ bullet.text }
                           onChange={ (key, value) => handleInputSignUpChange(key, value, bullet.id) }
                        /> */}
                        {/* <div role='presentation' onClick={ () => deleteSignUp(bullet.id) }>
                           <Icon name='Delete' />
                        </div> */}
                     </div>

                  </>
               )
            }

         </div>
      </>
   );
};

BulletCardItem.propTypes = {
   bullet: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   newBullet: PropTypes.bool,
   deleteSignUp: PropTypes.func,
   chooseBullet: PropTypes.func,
   currentBullet: PropTypes.object,
   handleAddBullet: PropTypes.func,
};

export default BulletCardItem;
