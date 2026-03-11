import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineActions from 'components/modules/InlineActions';
import InlineEditor from 'components/modules/InlineEditor';
import AccordionWrapper from './AccordionWrapper';

const FaqElement = ({
    slug, className, onClick, handleDuplicateComponent, handleDeleteComponent, sectionIndex, index, isPreview, changeProp,
    ...elementProps
}) => {
    const [active, setActive] = useState(false);

    const toggle = (e, action) => {
        setActive(toggleHighlighted(e, active, action));
    };

    return (
        <div
            role='presentation'
            className={`faqElement Image QAelement${active ? ' mark' : ''}`}
            style={{
                maxWidth: `${elementProps.maxWidth || 700}px`,
                marginTop: `${elementProps.marginTop}px`,
                marginLeft: `${elementProps.marginLeft}px`,
                marginBottom: `${elementProps.marginBottom}px`,
                marginRight: `${elementProps.marginRight}px`,
                textAlign: elementProps.alignment,
            }}
            onClick={ (e) => onClick(e) }
            data-slug={ slug }
            id={ slug }
            onMouseEnter={ (e) => toggle(e, 'enter') }
            onMouseLeave={ (e) => toggle(e, 'leave') }
        >
            <InlineActions
                slug={ slug }
                handleDuplicateComponent={ handleDuplicateComponent }
                handleDeleteComponent={ handleDeleteComponent }
                sectionIndex={ sectionIndex }
                index={ index }
            />
            <AccordionWrapper
                { ...elementProps }
                isOpen={ false }
                title={[
                    <div
                        style={{
                            minHeight: '20px',
                            padding: '4px',
                            color: elementProps.titleColor,
                            fontFamily: elementProps.titleFontFamily,
                            fontSize: `${elementProps.titleFontSize}px`,
                            lineHeight: elementProps.titleLineHeight ? elementProps.titleLineHeight / 10 : 'normal',
                        }}
                        data-editableSlug={`editable-${ slug }`}
                        className='lineHeight_editor'
                    >
                        {
                            isPreview ? (
                                <div dangerouslySetInnerHTML={{ __html: elementProps.title }} />
                            ) : (
                                <InlineEditor
                                    text={ elementProps.title }
                                    propsName='title'
                                    slug={ slug }
                                    changeProp={ changeProp }
                                    index={ index }
                                    sectionIndex={ sectionIndex }
                                    hideInlineActions={ true }
                                />
                            )
                        }
                    </div>
                ]}
            >
                <div
                    style={{
                        minHeight: '20px',
                        padding: '4px',
                        color: elementProps.textColor,
                        fontFamily: elementProps.textFontFamily,
                        fontSize: `${elementProps.textFontSize}px`,
                        lineHeight: elementProps.textLineHeight ? elementProps.textLineHeight / 10 : 'normal',
                    }}
                    data-editableSlug={`editable-${ slug }`}
                    className='lineHeight_editor'
                >
                    {
                        isPreview ? (
                            <div dangerouslySetInnerHTML={{ __html: elementProps.text }} />
                        ) : (
                            <InlineEditor
                                text={ elementProps.text }
                                propsName='text'
                                slug={ slug }
                                changeProp={ changeProp }
                                index={ index }
                                sectionIndex={ sectionIndex }
                                hideInlineActions={ true }
                            />
                        )
                    }
                </div>
            </AccordionWrapper>
        </div>
    );
};

FaqElement.propTypes = {
    slug: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    handleDuplicateComponent: PropTypes.func,
    handleDeleteComponent: PropTypes.func,
    sectionIndex: PropTypes.number,
    index: PropTypes.number,
    isPreview: PropTypes.bool,
    changeProp: PropTypes.func,
};

export default FaqElement;