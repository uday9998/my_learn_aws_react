/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';

const Divider = ({
    slug, className, onClick, handleDuplicateComponent, handleDeleteComponent, sectionIndex, index, isPreview,
    bgColor, paddingTop, paddingBottom, width, lineThickness, borderStyle, borderColor, maxWidth, align, customStyles,
}) => {
    const [active, setActive] = useState(false);

    const toggle = (e, action) => {
        setActive(toggleHighlighted(e, active, action));
    };

    const elementStyles = {
        backgroundColor: bgColor,
        paddingTop: `${ paddingTop }px`,
        paddingBottom: `${ paddingBottom }px`,
    };

    const LineStyles = {
        width: `${ width }%`,
        borderWidth: `${ lineThickness }px 0 0`,
        borderStyle,
        borderColor,
        maxWidth: maxWidth
            ? maxWidth === 'none' || maxWidth === '0'
                ? 'none'
                : `${ maxWidth }px`
            : '',
        marginLeft: align === 'left' ? '' : 'auto',
        marginRight: align === 'right' ? '' : 'auto',
    };

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
            role='presentation'
            className={ classnames(
                {
                    'mark': active && !isPreview,
                    [`${ className }`]: !!className,
                }
            ) }
            onClick={ (e) => onClick(e) }
            data-slug={ slug }
            id={ slug }
            onMouseEnter={ (e) => toggle(e, 'enter') }
            onMouseLeave={ (e) => toggle(e, 'leave') }
            style={elementStyles}
        >
            <div
                className='divider_element'
                style={{
                    ...LineStyles,
                    ...customStyles,
                }}
            />
            <InlineActions
                slug={ slug }
                handleDuplicateComponent={ handleDuplicateComponent }
                handleDeleteComponent={ handleDeleteComponent }
                sectionIndex={ sectionIndex }
                index={ index }
            />
        </div>
    );
};

Divider.propTypes = {
    slug: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    handleDuplicateComponent: PropTypes.func,
    handleDeleteComponent: PropTypes.func,
    sectionIndex: PropTypes.number,
    index: PropTypes.number,
    isPreview: PropTypes.bool,
    bgColor: PropTypes.string,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    width: PropTypes.number,
    lineThickness: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
    maxWidth: PropTypes.string,
    align: PropTypes.string,
    customStyles: PropTypes.string,
};

export default Divider;
