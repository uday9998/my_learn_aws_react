import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Content from './Content';

export default class Modal extends React.Component {
   static propTypes = {
      children: PropTypes.node,
      contentPosition: PropTypes.oneOf([
         'bottom',
         'center',
         'tooltip',
         'left',
         'image',
         'full-screen',
      ]),
      onClose: PropTypes.func,
      closeOnClickOutside: PropTypes.bool,
      blurColor: PropTypes.string,
      contentBgColor: PropTypes.string,
      contentWidth: PropTypes.string,
      roundedModal: PropTypes.string,
      className: PropTypes.string,
      borderColor: PropTypes.string,
   };

   static defaultProps = {
      closeOnClickOutside: true,
      blurColor: 'modal',
      className: '',
   };


   constructor(props) {
      super(props);
      const body = document.querySelector('body');
      this.modalRoot = document.getElementById('modals-root');
      body.style.overflow = 'hidden';
      if (!this.modalRoot) {
         this.modalRoot = document.createElement('div');
         this.modalRoot.id = 'modals-root';
         body.appendChild(this.modalRoot);
         this.modalRoot.classList.add('active');
      } else {
         this.modalRoot.classList.add('active');
      }
      if (!window.activeModals) {
         window.activeModals = {};
      }
      this.id = this.generateUniqueId();
      this.el = document.createElement('div');
      this.el.className = 'relative w-full h-full';
      this.el.style.zIndex = this.getZindex();
      this.el.addEventListener('click', this.onClick, false);
   }

   componentDidMount = () => {
      this.addIdIntoSuperGlobals();
      const root = document.querySelector('#root');
      root.style.zIndex = 1;
      this.modalRoot.appendChild(this.el);
      // PullToRefresh.destroyAll()
   }

   componentWillUnmount() {
      this.modalRoot.removeChild(this.el);
      if (this.getModalsCount() === 1) {
         const body = document.querySelector('body');
         const root = document.querySelector('#root');
         root.removeAttribute('style');
         body.style.overflow = 'auto';
         // body.removeChild(this.modalRoot);
         this.modalRoot.classList.remove('active');
      }
      this.removeIdFromSuperGlobals();
   }

   getModalsCount = () => {
      return Object.keys(window.activeModals).length;
   }

   removeIdFromSuperGlobals = () => {
      delete window.activeModals[this.id];
   }

   addIdIntoSuperGlobals = () => {
      window.activeModals[this.id] = true;
   }

   getZindex = () => {
      return Object.keys(window.activeModals).length + 1;
   }

   generateUniqueId = () => {
      return `_${ Math.random().toString(36).substr(2, 9) }`;
   };


   onClick = e => {
      const { onClose, closeOnClickOutside } = this.props;
      if (closeOnClickOutside && e.target.closest('#modal-content') === null && typeof onClose === 'function') {
         onClose();
      }
   };


   render() {
      const {
         children, contentPosition, blurColor, contentBgColor, roundedModal, contentWidth, className, borderColor,
      } = this.props;
      this.el.style.backgroundColor = blurColor;
      return ReactDOM.createPortal(
         <Content
            bgColor={ contentBgColor }
            position={ contentPosition }
            roundedModal={ roundedModal }
            width={ contentWidth }
            borderColor={ borderColor }
            className={ className }
         >
            { children }
         </Content>,
         this.el
      );
   }
}
