import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const ErrorMessageWrapper = ({
    errorMessages, children, hideMessages = false, hideBorder = false
}) => {
    const [isInView, setIsInView] = useState(false);
    const errorInputRef = useRef(null);
    
    // Ensure errorMessages is always an array
    const messages = Array.isArray(errorMessages) ? errorMessages : [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 1 }
        );

        if (errorInputRef.current) {
            observer.observe(errorInputRef.current);
        }

        return () => {
            if (errorInputRef.current) {
                observer.unobserve(errorInputRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView && messages.length > 0) {
            errorInputRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [messages.length, isInView]);

    return (
        <div
            className={`errorMessageWrapper${!hideBorder && messages.length ? ' error_border' : ''}`}
            ref={errorInputRef}
        >
            {children}
            {!hideMessages && messages.length > 0 && (
                <div className='errorMessageWrapper_errorMessages'>
                    {messages.map((message) => (
                        <p key={message} className='errorMessage'>
                            {message}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

ErrorMessageWrapper.propTypes = {
    children: PropTypes.node,
    errorMessages: PropTypes.arrayOf(PropTypes.string),
    hideMessages: PropTypes.bool,
    hideBorder: PropTypes.bool,
};

// Set default props
ErrorMessageWrapper.defaultProps = {
    errorMessages: [],
    hideMessages: false,
    hideBorder: false,
};

export default ErrorMessageWrapper;