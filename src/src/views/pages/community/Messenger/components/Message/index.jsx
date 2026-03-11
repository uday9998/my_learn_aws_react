import React, { useState, useContext, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import classNames from 'classnames';
import IconNew from 'components/elements/iconsSize';
import { Popover } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import FileMessageView from '../FileMessageView';

const CommunityMessage = ({
   isFrom, time, text, isHaveMessageBecome, user, id,
   isFile, fileOptions,
}) => {
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const { messageDelete } = useContext(CommunityMessengerContext);
   const messageOptions = [
      {
         trash: true,
         iconName: 'deleteCommunityM',
         name: 'Delete Message',
         onClick: () => messageDelete(id),
      },
   ];
   const options = fileOptions && typeof fileOptions === 'string' ? JSON.parse(fileOptions) : fileOptions;

   return (
      <div
         className={ classNames(
            'message',
            `message__${ isFrom ? 'from' : 'send' }`,
            {
               'message__border__off': isHaveMessageBecome,
            }
         ) }
         id={ `message-${ id }` }
         onContextMenu={ (e) => {
            e.preventDefault();
            setAnchorEl(e.currentTarget);
            setIsOpenMenu(!isFrom);
         } }
      >
         <Popover
            open={ isOpenMenu }
            anchorEl={ anchorEl }
            onClose={ () => setIsOpenMenu(false) }
            className='custom-popover'
            elevation={ 24 }
            style={ {
               top: '-50px',
               left: '-20px',
            } }
            anchorOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className='triggle__popover'>
               <div className='triggle__popover__flex'>
                  {messageOptions.map((option) => {
                     return (
                        <div
                           onClick={ (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              option.onClick(e); setIsOpenMenu(false);
                           } }
                           role='presentation'
                           key={ uuidv4() }
                           style={ option.style || {} }
                           className={ `triggle__popover__item ${ option.trash && messageOptions.length > 1 && 'triggle__popover__item__border' }${ option.trash ? ' triggle__popover__item__trash' : ` triggle__popover__item__${ option.iconName }` }` }
                        >
                           <IconNew name={ option.iconName } />
                           <Text
                              inner={ option.name }
                              type={ types.regularDefault }
                              size={ sizes.small }
                              style={ { ...(option.textOptions || {}) } }
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Popover>
         <div className='message__left'>
            {isFrom && !isHaveMessageBecome && (
               <IconNew name='MessageLeftVectorM' />
            )}
         </div>
         <div className='message__content'>
            {isFrom && (
               <Text
                  inner={ user ? (user.name || user.username) : 'USSS' }
                  type={ types.medium160 }
                  size={ sizes.small }
               />
            )}
            {isFile && options ? (
               <FileMessageView
                  url={ options.src }
                  name={ options.name }
                  type={ options.extension || '' }
               />
            ) : (
               // <div
               //    className='message__content__text'
               //    dangerouslySetInnerHTML={ { __html: text } }
               // />
               <Text
                  inner={ text }
                  className='message__content__text'
                  size={ sizes.small_new }
                  type={ types.regular148 }
               />
            )}
            <Text
               inner={ `${ time } am` }
               type={ types.regular148 }
               size={ sizes.xsmall }
               style={ { color: '#8E8D94', whiteSpace: 'nowrap' } }
            />
         </div>
         <div className='message__right'>
            {!isFrom && !isHaveMessageBecome && (
               <IconNew name='MessageRightVectorM' />
            )}
         </div>
      </div>
   );
};

CommunityMessage.propTypes = {
   isFrom: PropTypes.bool,
   time: PropTypes.string,
   text: PropTypes.string,
   isHaveMessageBecome: PropTypes.bool,
   user: PropTypes.object,
   id: PropTypes.number,
   fileOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
   isFile: PropTypes.bool,
};

export default CommunityMessage;
