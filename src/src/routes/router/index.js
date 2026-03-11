/* eslint-disable no-use-before-define */
import { reverse } from 'named-urls';
import { matchPath } from 'react-router';
import routes from './routeCodes';

function getCompiledPath(params = {}) {
   return reverse(this.path, params);
}

function getMask() {
   return this.path;
}

function match(locationPath) {
   return matchPath(locationPath, {
      path: this.path,
      exact: this.exact,
      strict: false,
   });
}

function route(routeName) {
   return routes[routeName];
}

function isExact() {
   return !!this.isExact;
}

Object.getOwnPropertyNames(routes).forEach((key) => {
   routes[key].getCompiledPath = getCompiledPath;
   routes[key].getMask = getMask;
   routes[key].match = match;
   routes[key].isExact = isExact;
});

routes.route = route;

export default routes;
