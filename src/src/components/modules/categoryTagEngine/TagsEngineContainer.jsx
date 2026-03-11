/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
   addTagOperation,
   getTagsOperation,
   removeTagOperation,
   updateTagOperation,
} from 'state/modules/tags/operations';
import {
   getTagsSelector,
   tagsIsFetchingSelector,
} from 'state/modules/tags/selectors';

import Engine from './Engine';


class CoursesContainer extends Component {
   async componentDidMount() {
      const {
         getTags,
      } = this.props;
      getTags();
   }

   handleCrate = (name) => {
      const { addTag, onCreateCompleted } = this.props;
      addTag(name, onCreateCompleted);
   }

   handleUpdate = ({ id, name }) => {
      const { updateTag } = this.props;
      updateTag(id, { name });
   }

   handleRemove = (id) => {
      const { removeTag, onRemoveCompleted } = this.props;
      removeTag(id, onRemoveCompleted);
   }

   handleItemToggle= (evt, id) => {
      const { onDetach, onAttach, attachedValues } = this.props;
      const attached = attachedValues.includes(id);
      evt.stopPropagation();
      if (attached) {
         onDetach(id, false);
      } else {
         onAttach(id, true);
      }
   }

   render() {
      const {
         attachedValues, tags, onAttach, onDetach, className, tagsIsFetching,
         isMemberTags,
      } = this.props;
      if (!tags || tagsIsFetching) return null;
      const attachedTags = attachedValues
         .filter(i => !!tags.find(({ id }) => id === i))
         .map(i => tags.find(({ id }) => id === i));
      const tagItems = tags.map(t => {
         const active = attachedValues.includes(t.id);
         return { ...t, active };
      });
      return (
         <Engine
            attachedValues={ attachedTags }
            onCreate={ this.handleCrate }
            onUpdate={ this.handleUpdate }
            onRemove={ this.handleRemove }
            options={ tagItems }
            onAttach={ onAttach }
            onDetach={ onDetach }
            className={ className }
            resource='Tag'
            selectProps={ { label: 'Tags' } }
            onItemToggle={ this.handleItemToggle }
            modalTitle='Manage Tags'
            tooltipText='You can create tags to be added to your new members account automatically.'
            isMemberTags={ isMemberTags }
            tooltipTag
         />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      tags: getTagsSelector(state),
      tagsIsFetching: tagsIsFetchingSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getTags: () => {
         dispatch(getTagsOperation());
      },
      addTag: (name, cb) => {
         dispatch(addTagOperation({ name }, cb));
      },
      updateTag: (id, data) => {
         dispatch(updateTagOperation(id, data));
      },
      removeTag: (id, cb) => {
         dispatch(removeTagOperation(id, cb));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
