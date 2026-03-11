/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
   addCategoryOperation,
   getCategoriesOperation,
   removeCategoryOperation,
   reorederCategoriesOperation,
   updateCategoryOperation,
} from 'state/modules/categories/operations';
import {
   getCategoriesSelector,
} from 'state/modules/categories/selectors';
import arrayMove from 'array-move';

import Engine from './Engine';


class CoursesContainer extends Component {
   async componentDidMount() {
      const {
         getCategories,
      } = this.props;
      getCategories();
   }

   handleCrate = (name) => {
      const { addCategory, course } = this.props;

      addCategory({ name }, course);
   }

   handleUpdate = ({ id, name }) => {
      const { updateCategory, course } = this.props;
      updateCategory(id, { name }, course);
   }

   handleRemove = (id) => {
      const { removeCategory, course } = this.props;
      removeCategory(id, course);
   }

   handleItemToggle= (evt, id) => {
      const { attachedValues, onAttach, onDetach } = this.props;
      const attachedIds = attachedValues ? attachedValues.map(({ id }) => id) : [];
      const attached = attachedIds.includes(id);
      evt.stopPropagation();
      if (attached) {
         onDetach(id, false);
      } else {
         onAttach(id, true);
      }
   }

   onSortEnd = ({ oldIndex, newIndex }) => {
      const { categories, reorderCategories } = this.props;
      const orderedCategories = arrayMove(categories, oldIndex, newIndex);

      const orderedIds = orderedCategories.map(({ id }) => id);
      reorderCategories(orderedIds);
   }

   render() {
      const {
         attachedValues, categories, onAttach, onDetach, className,
      } = this.props;
      if (!categories) return null;
      const attachedIds = attachedValues ? attachedValues.map(({ id }) => id) : [];
      const categoryItems = categories.map(cat => {
         const active = attachedIds.includes(cat.id);
         return { ...cat, active };
      });
      return (
         <Engine
            attachedValues={ attachedValues }
            onCreate={ this.handleCrate }
            onUpdate={ this.handleUpdate }
            onRemove={ this.handleRemove }
            options={ categoryItems }
            onAttach={ onAttach }
            onDetach={ onDetach }
            className={ className }
            onSortEnd={ this.onSortEnd }
            resource='Category'
            onItemToggle={ this.handleItemToggle }
            modalTitle='Manage Categories'
            disableReorder
         />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      categories: getCategoriesSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCategories: () => {
         dispatch(getCategoriesOperation());
      },
      addCategory: (inputs, course) => {
         dispatch(addCategoryOperation(inputs, course));
      },
      updateCategory: (id, data, course) => {
         dispatch(updateCategoryOperation(id, data, course));
      },
      removeCategory: (id, course) => {
         dispatch(removeCategoryOperation(id, course));
      },
      reorderCategories: (categoryIds) => {
         dispatch(reorederCategoriesOperation(categoryIds));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
