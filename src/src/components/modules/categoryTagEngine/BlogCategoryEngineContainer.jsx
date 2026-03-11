/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
   getBlogCategoriesOperation,
   addBlogCategoryOperation,
   updateCategoryOperation,
   removeCategoryOperation,
} from 'state/modules/blog/operations';
import {
   categoriesSelector,
} from 'state/modules/blog/selectors';
import TagSelect from 'components/elements/TagMultiSelect';

import Engine from './Engine';


class BlogCategoryEngineContainer extends Component {
   async componentDidMount() {
      const {
         getCategories,
      } = this.props;
      getCategories();
   }

   handleCrate = (name) => {
      const { addCategory, post: { id }, attachedValues } = this.props;
      const attachedIds = attachedValues ? attachedValues.map(({ id }) => id) : [];

      return addCategory(name, { id, attachedIds });
   }

   handleUpdate = ({ id, name }) => {
      const { updateCategory, post: { id: postId }, attachedValues } = this.props;

      updateCategory(id, { name }, { id: postId, attachedValues });
   }

   handleRemove = (id) => {
      const { removeCategory, post: { id: postId }, attachedValues } = this.props;

      removeCategory(id, { id: postId, attachedValues });
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

   render() {
      const {
         attachedValues, categories, onAttach, onDetach, className, post, isBlog, tagName,
      } = this.props;
      if (!categories) return null;
      const attachedIds = attachedValues ? attachedValues.map(({ id }) => id) : [];
      const categoryItems = categories.map(cat => {
         const active = attachedIds.includes(cat.id);
         return { ...cat, active };
      });
      return (
         // <Engine
         //    attachedValues={ attachedValues }
         //    onCreate={ this.handleCrate }
         //    onUpdate={ this.handleUpdate }
         //    onRemove={ this.handleRemove }
         //    options={ categoryItems }
         //    onAttach={ onAttach }
         //    onDetach={ onDetach }
         //    className={ className }
         //    resource='Category'
         //    onItemToggle={ this.handleItemToggle }
         //    modalTitle='Manage Categories'
         // />
         <TagSelect
            isHaveDetach={ true }
            onDetach={ (id) => onDetach(id, false) }
            atachTag={ (id, tag) => onAttach(id, tag) }
            onAttachTag={ (inputs) => this.handleCrate(inputs.name) }
            values={ attachedValues }
            options={ categoryItems }
            placeholder='Select a category'
            isBlog={ isBlog }
            tagName={ tagName }
         />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      categories: categoriesSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCategories: () => {
         dispatch(getBlogCategoriesOperation());
      },

      addCategory: (name, post) => dispatch(addBlogCategoryOperation({ name }, post)),

      updateCategory: (id, data, post) => {
         dispatch(updateCategoryOperation(id, data, post));
      },
      removeCategory: (id, post) => {
         dispatch(removeCategoryOperation(id, post));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogCategoryEngineContainer);
