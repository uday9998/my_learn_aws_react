import React from 'react';
import 'assets/css/base.scss';
// import 'assets/css/toast.scss';
import './index.scss';
import { createRoot } from 'react-dom/client';
import store, { history } from 'state/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from 'routes';
import bootsrapApp from 'bootstrap';
import { screenResize } from 'state/modules/common/actions';


bootsrapApp();

window.addEventListener('resize', () => {
   store.dispatch(screenResize(window.innerWidth));
});

const app = document.getElementById('root');
const root = createRoot(app);

root.render(
   <Provider store={ store }>
      <ConnectedRouter history={ history }>
         <>
            <Routes />
         </>
      </ConnectedRouter>
   </Provider>
);
