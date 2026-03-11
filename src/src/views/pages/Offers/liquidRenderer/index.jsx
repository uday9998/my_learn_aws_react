import React from 'react';
import PropTypes from 'prop-types';
import { ReactLiquid } from 'react-liquid';
import { sanitizeHtml } from 'utils/sanitizeHtml';

const LiquidRenderer = ({
   template,
   data,
   actions,
}) => {
   return (
      <ReactLiquid
         template={ template }
         data={ data }
         render={ (renderedTemplate) => {
            return (
               <div
                  className={ data.className }
                  dangerouslySetInnerHTML={ { __html: sanitizeHtml(renderedTemplate.__html) } }
                  role='presentation'
                  style={ {
                     background: data.templateName === 'template2' && '#fff',
                     // height: data.templateName === 'template2' && '359px',
                     borderRadius: data.templateName === 'template2' && '4px',
                  } }
                  onClick={ e => {
                     const target = e.target;
                     const clickable = target.closest('[data-action]');
                     if (clickable && clickable.dataset && clickable.dataset.action) {
                        const action = clickable.dataset.action;
                        actions[action](e);
                     }
                  } }
               />
            );
         } }
      />
   );
};

LiquidRenderer.propTypes = {
   template: PropTypes.string,
   data: PropTypes.object,
   actions: PropTypes.func,
   templateName: PropTypes.string,
};

export default LiquidRenderer;