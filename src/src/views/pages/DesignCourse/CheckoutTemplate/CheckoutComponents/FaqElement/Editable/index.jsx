import React, { useEffect } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import TextInputRange from 'components/elements/form/TextInputRange';
import ColorInput from 'components/elements/form/ColorInput';
import Select from 'components/elements/SelectNew';
import { getThemeFonts } from 'utils/StaticData';

const FaqElementEditable = ({
    slug, changeProp, scroll, menuVisible, toggleSidebar, index,
    maxWidth, backColor, openedBackColor, iconColor, borderColor, borderRadius,
    paddingTop, paddingBottom, paddingLeft, paddingRight,
    marginTop, marginBottom, marginLeft, marginRight, alignment,
    titleColor, titleFontFamily, titleFontSize, titleLineHeight,
    textColor, textFontFamily, textFontSize, textLineHeight
}) => {
    useEffect(() => {
        if (scroll) {
           highlightSidebar(slug, toggleSidebar, menuVisible);
        }
    }, [scroll]);

    const textAlignOptions = [
       { label: 'Left', value: 'left' },
       { label: 'Center', value: 'center' },
       { label: 'Right', value: 'right' },
    ];

    return (
        <div className='faqElement__editable'>
            <div className='faqElement__editable__subsection'>
                <span className='subtitles'>Global Settings</span>
                <TextInputRange
                    label='Max Width'
                    type='range'
                    leftText={ maxWidth }
                    id={ `maxWidth-${ slug }` }
                    min={100}
                    max={1000}
                    name='maxWidth'
                    value={ maxWidth }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <ColorInput
                    label='Background Color'
                    name='backColor'
                    value={ backColor }
                    onChange={ (key, value) => changeProp(value, 'backColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <ColorInput
                    label='Opened Background Color'
                    name='openedBackColor'
                    value={ openedBackColor }
                    onChange={ (key, value) => changeProp(value, 'openedBackColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <ColorInput
                    label='Icon Color'
                    name='iconColor'
                    value={ iconColor }
                    onChange={ (key, value) => changeProp(value, 'iconColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <ColorInput
                    label='Border Color'
                    name='borderColor'
                    value={ borderColor }
                    onChange={ (key, value) => changeProp(value, 'borderColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <TextInputRange
                    label='Border Radius'
                    type='range'
                    leftText={ borderRadius }
                    id={ `borderRadius-${ slug }` }
                    min={0}
                    max={50}
                    name='borderRadius'
                    value={ borderRadius }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='faqElement__editable__subsection'>
                <span className='subtitles'>Distances</span>
                <TextInputRange
                    label='Top Padding'
                    type='range'
                    leftText={ paddingTop }
                    id={ `paddingTop-${ slug }` }
                    min={0}
                    max={60}
                    name='paddingTop'
                    value={ paddingTop }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Bottom Padding'
                    type='range'
                    leftText={ paddingBottom }
                    id={ `paddingBottom-${ slug }` }
                    min={0}
                    max={60}
                    name='paddingBottom'
                    value={ paddingBottom }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Left Padding'
                    type='range'
                    leftText={ paddingLeft }
                    id={ `paddingLeft-${ slug }` }
                    min={0}
                    max={60}
                    name='paddingLeft'
                    value={ paddingLeft }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Right Padding'
                    type='range'
                    leftText={ paddingRight }
                    id={ `paddingRight-${ slug }` }
                    min={0}
                    max={60}
                    name='paddingRight'
                    value={ paddingRight }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Top Margin'
                    type='range'
                    leftText={ marginTop }
                    id={ `marginTop-${ slug }` }
                    min={0}
                    max={60}
                    name='marginTop'
                    value={ marginTop }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Bottom Margin'
                    type='range'
                    leftText={ marginBottom }
                    id={ `marginBottom-${ slug }` }
                    min={0}
                    max={60}
                    name='marginBottom'
                    value={ marginBottom }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Left Margin'
                    type='range'
                    leftText={ marginLeft }
                    id={ `marginLeft-${ slug }` }
                    min={0}
                    max={60}
                    name='marginLeft'
                    value={ marginLeft }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Right Margin'
                    type='range'
                    leftText={ marginRight }
                    id={ `marginRight-${ slug }` }
                    min={0}
                    max={60}
                    name='marginRight'
                    value={ marginRight }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='faqElement__editable__subsection'>
                <Select
                    label='Align Content'
                    className=''
                    heading=''
                    placeholder='Align Content'
                    type='select-medium'
                    value={ alignment }
                    onChange={ (name, value) => changeProp(value, 'alignment', 'component', index) }
                    options={ textAlignOptions }
                />
            </div>
            <div className='faqElement__editable__subsection'>
                <span className='subtitles'>Title Settings</span>
                <ColorInput
                    label='Title Color'
                    name='titleColor'
                    value={ titleColor }
                    onChange={ (key, value) => changeProp(value, 'titleColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <div className='m-t-m'>
                    <Select
                        label='Title Font Family'
                        className=''
                        heading=''
                        type='select-medium'
                        placeholder='Title Font Family'
                        value={ titleFontFamily }
                        onChange={ (name, value) => changeProp(value, 'titleFontFamily', 'component', index) }
                        options={ getThemeFonts() }
                        fontStyles={ true }
                    />
                </div>
                <TextInputRange
                    label='Title Size'
                    type='range'
                    leftText={ titleFontSize }
                    id={ `titleFontSize-${ slug }` }
                    min={0}
                    max={60}
                    name='titleFontSize'
                    value={ titleFontSize }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Title Line Height'
                    type='range'
                    leftText={ titleLineHeight }
                    id={ `titleLineHeight-${ slug }` }
                    min={0}
                    max={60}
                    name='titleLineHeight'
                    value={ titleLineHeight }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='faqElement__editable__subsection'>
                <span className='subtitles'>Text Settings</span>
                <ColorInput
                    label='Text Color'
                    name='textColor'
                    value={ textColor }
                    onChange={ (key, value) => changeProp(value, 'textColor', 'component', index) }
                    isPageBuilder={ true }
                />
                <div className='m-t-m'>
                    <Select
                        label='Text Font Family'
                        className=''
                        heading=''
                        type='select-medium'
                        placeholder='Text Font Family'
                        value={ textFontFamily }
                        onChange={ (name, value) => changeProp(value, 'textFontFamily', 'component', index) }
                        options={ getThemeFonts() }
                        fontStyles={ true }
                    />
                </div>
                <TextInputRange
                    label='Text Size'
                    type='range'
                    leftText={ textFontSize }
                    id={ `textFontSize-${ slug }` }
                    min={0}
                    max={60}
                    name='textFontSize'
                    value={ textFontSize }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
                <TextInputRange
                    label='Text Line Height'
                    type='range'
                    leftText={ textLineHeight }
                    id={ `textLineHeight-${ slug }` }
                    min={0}
                    max={60}
                    name='textLineHeight'
                    value={ textLineHeight }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
        </div>
    );
};

FaqElementEditable.propTypes = {
    slug: PropTypes.string,
    changeProp: PropTypes.func,
    scroll: PropTypes.any,
    menuVisible: PropTypes.bool,
    toggleSidebar: PropTypes.func,
    index: PropTypes.number,
    maxWidth: PropTypes.number,
    backColor: PropTypes.string,
    openedBackColor: PropTypes.string,
    iconColor: PropTypes.string,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    alignment: PropTypes.string,
    titleColor: PropTypes.string,
    titleFontFamily: PropTypes.string,
    titleFontSize: PropTypes.number,
    titleLineHeight: PropTypes.number,
    textColor: PropTypes.string,
    textFontFamily: PropTypes.string,
    textFontSize: PropTypes.number,
    textLineHeight: PropTypes.number,
};

export default FaqElementEditable;
