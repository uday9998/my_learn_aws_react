import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as reducers from './modules';
import { createLogger } from './middlewares';

export const history = createBrowserHistory({
   /* pass a configuration object here if needed */
});


function configureStore(initialState) {
   const rootReducer = combineReducers({
      ...reducers,
      router: connectRouter(history),
   });

   return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
         thunkMiddleware,
         createLogger(true),
         routerMiddleware(history)
      )
   );
}

export default configureStore();
