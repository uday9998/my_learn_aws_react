import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import img1 from 'assets/images/Program/roomCover.png';
import img2 from 'assets/images/Program/inviteMemberCover.png';
import img3 from 'assets/images/Program/inviteMemberCover2.png';
import PropTypes from 'prop-types';

const CommunityWelcomePage = ({
   userName, onAddRoom, onInviteMember, isVisibleRoom = false, role, community,
}) => {
   const [focusedBlock, setFocusedBlock] = useState('second');
   // const getImageByBlock = () => {
   //    if (focusedBlock === 'first') {
   //       return img1;
   //    } if (focusedBlock === 'second') {
   //       return isVisibleRoom ? img2 : img3;
   //    }
   //    return null;
   // };
   return (
      <div className='community__view'>
         <div className='community__welcome__page'>
            <Text
               inner={ `Hi ${ userName }` }
               type={ types.medium }
               size={ sizes.size_28 }
            />
            <br />
            <Text
               inner={ `Welcome To The ${ community.name } Community` }
               type={ types.medium }
               size={ sizes.size_28 }
            />
            {role === 'admin' && (
               <>
                  <br />
                  <div className='community__welcome__content__items'>
                     {isVisibleRoom && (
                        <div
                           onFocus={ () => { } }
                           role='presentation'
                           onClick={ () => onAddRoom() }
                           className='community__welcome__content__item'
                           onMouseOver={ () => setFocusedBlock('first') }
                        >
                           <div className='community__welcome__content__item__icon icon__pink'>
                              <IconNew name='ProgramCommunityL' />
                           </div>
                           <Text
                              inner='Add New Room'
                              type={ types.regular148 }
                              size={ sizes.medium }
                           />
                           <Text
                              inner="Create new rooms for your students to interact in. It's best if they are organized around a theme, like #rules."
                              type={ types.regularLarge }
                              size={ sizes.xsmall }
                              style={ { color: '#727978', margin: '4px 0px 16px' } }
                           />
                           <div
                              className='community__welcome__content__item__select'

                           >
                              <Text
                                 inner='Add Room'
                                 type={ types.regular148 }
                                 size={ sizes.xsmall }
                                 style={ { cursor: 'pointer' } }
                              />
                              <IconNew name='arrowRightProgramM' />
                           </div>
                        </div>
                     )}
                     <div
                        onFocus={ () => { } }
                        role='presentation'
                        onClick={ () => onInviteMember() }
                        className='community__welcome__content__item'
                        onMouseOver={ () => setFocusedBlock('second') }
                     >
                        <div className='community__welcome__content__item__icon icon__green'>
                           <IconNew name='CommunityAddUserL' />
                        </div>
                        <Text
                           inner='Invite Members'
                           type={ types.regular148 }
                           size={ sizes.medium }
                        />
                        <Text
                           inner='You can add members manually. For example, you need technical staff for the community or for some other reason.'
                           type={ types.regularLarge }
                           size={ sizes.xsmall }
                           style={ { color: '#727978', margin: '4px 0px 16px' } }
                        />
                        <div
                           className='community__welcome__content__item__select'

                        >
                           <Text
                              inner='Invite'
                              type={ types.regular148 }
                              size={ sizes.xsmall }
                              style={ { cursor: 'pointer' } }
                           />
                           <IconNew name='arrowRightProgramM' />
                        </div>
                     </div>

                  </div>
                  {/* <img src={ getImageByBlock() } alt='' /> */}
               </>
            )}

         </div>
      </div>
   );
};

CommunityWelcomePage.propTypes = {
   userName: PropTypes.string,
   onAddRoom: PropTypes.func,
   isVisibleRoom: PropTypes.bool,
   role: PropTypes.string,
   onInviteMember: PropTypes.func,
   community: PropTypes.object,
};

export default CommunityWelcomePage;
