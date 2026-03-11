import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import CustomLinks from 'components/elements/mainHub/CustomLinks';

const BlueHeader = ({
   rightSide, style, styleClass, topLevel, goToBack, siteInfo, isBlogPage, total,
}) => {
   return (
      <div
         style={ siteInfo.header_bg_color ? { ...style, backgroundColor: siteInfo.header_bg_color || '#3f4f65' } : { style } }
         className={ `header-container ${ styleClass }` }
      >
         <div className='header-content'>
            {
               !topLevel && (
                  <div
                     role='presentation'
                     onClick={ goToBack }
                     className='m-r-exs left-icon'
                  >
                     <Icon
                        name='Left'
                     />
                  </div>
               )
            }

            {
               topLevel && (
                  <div
                     role='presentation'
                     onClick={ goToBack }
                  >
                     {
                        siteInfo.active_school_room && siteInfo.active_school_room.school_logo ? (
                           <img
                              src={ siteInfo.active_school_room.school_logo }
                              className='school_logo'
                              alt='schoollogo'
                           />
                        ) : <Icon name='Logo' className='main-styleMainhubIcon' color={ siteInfo.header_text_color } />
                     }

                  </div>
               )
            }
            <CustomLinks className='desk-header-links' isHeader={ true } isBlogPage={ isBlogPage } total={ total } />
            {rightSide}
         </div>
         <CustomLinks className='mob-header-links w-full' isHeader={ true } isBlogPage={ isBlogPage } total={ total } />
      </div>
   );
};

BlueHeader.propTypes = {
   style: PropTypes.object,
   styleClass: PropTypes.string,
   topLevel: PropTypes.bool,
   goToBack: PropTypes.func,
   siteInfo: PropTypes.object,
   rightSide: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   isBlogPage: PropTypes.bool,
   total: PropTypes.number,
};

BlueHeader.defaultProps = {
   styleClass: 'main-style',
   topLevel: true,
   goToBack: () => {},
   isBlogPage: false,
   total: 0,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};
const mapDispatchToProps = () => {
   return {
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlueHeader);
