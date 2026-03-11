import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import Select from 'components/elements/SelectNew';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';

const DividerEditable = ({
    slug, changeProp, scroll, menuVisible, toggleSidebar, index,
    bgColor, paddingTop, paddingBottom, width, lineThickness, borderStyle, borderColor, align
}) => {
    useEffect(() => {
       if (scroll) {
          highlightSidebar(slug, toggleSidebar, menuVisible);
       }
    }, [scroll]);

    const borderStyleOptions = [
        {
            label: '-------------------------------',
            value: 'solid'
        },
        {
            label: ' -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -',
            value: 'dashed'
        },
        {
            label: '.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .',
            value: 'dotted'
        },
        {
            label: 'Empty Space',
            value: 'none'
        }
    ];

    const alignOptions = [
        {
            label: 'left',
            value: 'left'
        },
        {
            label: 'center',
            value: 'center'
        },
        {
            label: 'right',
            value: 'right'
        }
    ];

    return (
        <div>
            <div className='m-t-m'>
                <ColorInput
                    label='Background Color'
                    name='bgColor'
                    value={ bgColor }
                    onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
                    isPageBuilder={ true }
                />
            </div>
            <div className='m-t-m'>
                <ColorInput
                    label='Line Color'
                    name='borderColor'
                    value={ borderColor }
                    onChange={ (key, value) => changeProp(value, 'borderColor', 'component', index) }
                    isPageBuilder={ true }
                />
            </div>
            <div className='m-t-m'>
                <Select
                    label='Divider Type'
                    className=''
                    heading=''
                    type='select-medium'
                    placeholder='Divider Type'
                    value={ borderStyle }
                    onChange={ (name, value) => changeProp(value, 'borderStyle', 'component', index) }
                    options={ borderStyleOptions }
                />
            </div>
            <div className='m-t-m'>
                <TextInputRange
                    label='Line Thickness'
                    type='range'
                    leftText={ lineThickness }
                    id={ `lineThickness-${ slug }` }
                    min={ 0 }
                    max={ 20 }
                    name='lineThickness'
                    value={ lineThickness }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='m-t-m'>
                <TextInputRange
                    label='Divider Width (%)'
                    type='range'
                    leftText={ width }
                    id={ `width-${ slug }` }
                    min={ 0 }
                    max={ 100 }
                    name='width'
                    value={ width }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='m-t-m'>
                <Select
                    label='Alignment'
                    className=''
                    heading=''
                    type='select-medium'
                    placeholder='Alignment'
                    value={ align }
                    onChange={ (name, value) => changeProp(value, 'align', 'component', index) }
                    options={ alignOptions }
                />
            </div>
            <div className='m-t-m'>
                <TextInputRange
                    label='Top Margin'
                    type='range'
                    leftText={ paddingTop }
                    id={ `paddingTop-${ slug }` }
                    min={ 0 }
                    max={ 60 }
                    name='paddingTop'
                    value={ paddingTop }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
            <div className='m-t-m'>
                <TextInputRange
                    label='Bottom Margin'
                    type='range'
                    leftText={ paddingBottom }
                    id={ `paddingBottom-${ slug }` }
                    min={ 0 }
                    max={ 60 }
                    name='paddingBottom'
                    value={ paddingBottom }
                    onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                />
            </div>
        </div>
    );
};
// menuVisible, toggleSidebar, size
DividerEditable.propTypes = {
    slug: PropTypes.string,
    changeProp: PropTypes.func,
    scroll: PropTypes.any,
    menuVisible: PropTypes.bool,
    toggleSidebar: PropTypes.func,
    index: PropTypes.number,
    bgColor: PropTypes.string,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    width: PropTypes.number,
    lineThickness: PropTypes.string,
    borderStyle: PropTypes.string,
    borderColor: PropTypes.string,
    align: PropTypes.string,
};

export default DividerEditable;