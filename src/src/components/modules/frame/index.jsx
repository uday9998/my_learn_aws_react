import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import './index.scss';

const FrameWrapper = ({ children, viewMode }) => {
   const getStyles = () => {
      let head = '';
      const sheets = Array.from(document.querySelectorAll('link[rel=stylesheet]'));
      const styles = Array.from(document.querySelectorAll('head style'));
      sheets.forEach(link => {
         head += link.outerHTML;
      });

      styles.forEach(style => {
         head += style.outerHTML;
      });
      return head;
   };


   return (
      (viewMode === 'phone' || viewMode === 'tablet')
         ? (
            <Frame initialContent={ `<!DOCTYPE html><html><head>${ getStyles() } </head><body id="iframe-body"><div class="frame-root"></div></body></html>` }>
               {children}
            </Frame>
         )
         : <div className='view'>{children}</div>
   );
};


FrameWrapper.defaultProps = {
};

FrameWrapper.propTypes = {
   children: PropTypes.any,
   viewMode: PropTypes.string,
};

export default FrameWrapper;
