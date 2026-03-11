import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import classNames from 'classnames';
import './index.scss';

export const Td = ({ children, noText = false }) => {
   return (
      <td>
         {!noText
            ? (
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.regular }
                  bold
                  inner={ children }
                  style={ { fontSize: '14px' } }
               />
            )
            : children
         }
      </td>
   );
};

export const Th = ({ children }) => {
   return (
      <th>
         <Text
            size={ txtSizes.extraSmall }
            type={ txtType.normal }
            inner={ children }
            style={ { fontSize: '14px' } }
         />
      </th>
   );
};

export const Tr = ({
   children, checked, onClick = () => {},
}) => {
   return (
      <tr
         onClick={ (id) => onClick(id) }
         className={ classNames(
            'tableRow',
            {
               'checked': checked,
            }
         ) }
      >
         {children}
      </tr>
   );
};

export const Theader = ({ children }) => {
   return (
      <thead className='tableHeader'>
         {children}
      </thead>
   );
};
export const Tbody = ({ children }) => {
   return (
      <tbody className='tableBody'>
         {children}
      </tbody>
   );
};

Theader.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
};

Tbody.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
};

Td.propTypes = {
   children: PropTypes.any,
   noText: PropTypes.bool,
};

Th.propTypes = {
   children: PropTypes.any,
};

Tr.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   checked: PropTypes.bool,
   onClick: PropTypes.func,
};
