import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const pickerRef = useRef(null);

  const colors = [
    '#379552', '#3B82F6', '#F97316', '#8B5CF6',
    '#EC4899', '#EF4444', '#10B981', '#14B8A6',
    '#0EA5E9', '#6366F1', '#D946EF', '#F59E0B'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync prop change to local state
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const handleColorSelect = (selectedColor) => {
    setCurrentColor(selectedColor);
    onChange(selectedColor);
    setShowPicker(false);
  };

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <div className="color-picker-container" ref={pickerRef}>
      <div className="color-input-group">
        <div
          className="color-preview"
          style={{ backgroundColor: currentColor }}
          onClick={togglePicker}
        />
        <input
          className="color-input"
          type="text"
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>

      {showPicker && (
        <div className="color-picker-dropdown">
          <div className="color-palette">
            {colors.map((colorOption, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: colorOption }}
                onClick={() => handleColorSelect(colorOption)}
              />
            ))}
          </div>
          <div className="custom-color">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
            />
            <span>Custom color</span>
          </div>
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
