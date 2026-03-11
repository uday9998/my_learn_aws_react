import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { useTimer } from 'react-timer-hook';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from '../iconsSize';

const TimerDesign = ({
   time, onExpire, theme, isConstant, timerTitle,
}) => {
   const {
      seconds,
      minutes,
      hours,
      days,
      pause,
      isRunning,
   } = useTimer({ expiryTimestamp: time, autoStart: true, onExpire: () => onExpire() });
   useEffect(() => {
      if (isConstant) {
         setTimeout(() => {
            pause();
         }, 0);
      }
   }, [time]);
   if ((isRunning && isConstant) || (seconds === 0 && minutes === 0 && hours === 0 && days === 0)) {
      return null;
   }
   if (theme === 'second') {
      return (
         <>
            {!!timerTitle && (
               <Text
                  inner={ timerTitle }
                  type={ types.mediumXSmall }
                  size={ sizes.xxlarge }
                  style={ { color: '#444C4B' } }
               />
            )}
            <div className='react__timer__view react__timer__view__second'>
               <div className='react__timer__view__block'>
                  <Text
                     inner={ days }
                     type={ types.medium160 }
                     className='react__timer__view__second__time'
                     style={ { color: '#24554E' } }
                     size={ sizes.xlarge }
                  />
                  <Text
                     inner='Days'
                     type={ types.regularDefault }
                     style={ { color: '#444C4B' } }
                     size={ sizes.small }
                  />
               </div>
               <Text
                  inner=':'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='react__timer__view__block'>
                  <Text
                     inner={ hours }
                     type={ types.medium160 }
                     className='react__timer__view__second__time'
                     style={ { color: '#24554E' } }
                     size={ sizes.xlarge }
                  />
                  <Text
                     inner='Hours'
                     type={ types.regularDefault }
                     style={ { color: '#444C4B' } }
                     size={ sizes.small }
                  />
               </div>
               <Text
                  inner=':'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='react__timer__view__block'>
                  <Text
                     inner={ minutes }
                     type={ types.medium160 }
                     className='react__timer__view__second__time'
                     style={ { color: '#24554E' } }
                     size={ sizes.xlarge }
                  />
                  <Text
                     inner='Minutes'
                     type={ types.regularDefault }
                     style={ { color: '#444C4B' } }
                     size={ sizes.small }
                  />
               </div>
               <Text
                  inner=':'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='react__timer__view__block'>
                  <Text
                     inner={ seconds }
                     type={ types.medium160 }
                     className='react__timer__view__second__time'
                     style={ { color: '#24554E' } }
                     size={ sizes.xlarge }
                  />
                  <Text
                     inner='Seconds'
                     type={ types.regularDefault }
                     style={ { color: '#444C4B' } }
                     size={ sizes.small }
                  />
               </div>
            </div>
         </>
      );
   }
   if (theme === 'secondMini') {
      return (
         <div className='react__timer__view react__timer__view__second react__timer__view__second__mini'>
            <div className='react__timer__view__block'>
               <Text
                  inner={ days }
                  type={ types.mediumXSmall }
                  className='react__timer__view__second__time'
                  style={ { color: '#24554E' } }
                  size={ sizes.xx_small }
               />
               <Text
                  inner='Days'
                  type={ types.mediumXSmall }
                  style={ { color: '#444C4B' } }
                  size={ sizes.xx_small }
               />
            </div>
            <Text
               inner=':'
               type={ types.regularLarge }
               size={ sizes.xsmall }
            />
            <div className='react__timer__view__block'>
               <Text
                  inner={ hours }
                  type={ types.mediumXSmall }
                  className='react__timer__view__second__time'
                  style={ { color: '#24554E' } }
                  size={ sizes.xx_small }
               />
               <Text
                  inner='Hours'
                  type={ types.mediumXSmall }
                  style={ { color: '#444C4B' } }
                  size={ sizes.xx_small }
               />
            </div>
            <Text
               inner=':'
               type={ types.regularLarge }
               size={ sizes.xsmall }
            />
            <div className='react__timer__view__block'>
               <Text
                  inner={ minutes }
                  type={ types.mediumXSmall }
                  className='react__timer__view__second__time'
                  style={ { color: '#24554E' } }
                  size={ sizes.xx_small }
               />
               <Text
                  inner='Minutes'
                  type={ types.mediumXSmall }
                  style={ { color: '#444C4B' } }
                  size={ sizes.xx_small }
               />
            </div>
            <Text
               inner=':'
               type={ types.regularLarge }
               size={ sizes.xsmall }
            />
            <div className='react__timer__view__block'>
               <Text
                  inner={ seconds }
                  type={ types.medium160 }
                  className='react__timer__view__second__time'
                  style={ { color: '#24554E' } }
                  size={ sizes.xx_small }
               />
               <Text
                  inner='Seconds'
                  type={ types.mediumXSmall }
                  style={ { color: '#444C4B' } }
                  size={ sizes.xx_small }
               />
            </div>
         </div>
      );
   }
   return (
      <div className='react__timer__view'>
         <IconNew name='TimerM' />
         <div className='react__timer__view__block'>
            <Text
               inner={ days }
               type={ types.regular148 }
               size={ sizes.xsmall }
            />
            <Text
               inner='Days'
               type={ types.mediumXSmall }
               style={ { color: '#727978' } }
               size={ sizes.xx_small }
            />
         </div>
         <Text
            inner=':'
            type={ types.regular148 }
            size={ sizes.xsmall }
         />
         <div className='react__timer__view__block'>
            <Text
               inner={ hours }
               type={ types.regular148 }
               size={ sizes.xsmall }
            />
            <Text
               inner='Hours'
               type={ types.mediumXSmall }
               style={ { color: '#727978' } }
               size={ sizes.xx_small }
            />
         </div>
         <Text
            inner=':'
            type={ types.regular148 }
            size={ sizes.xsmall }
         />
         <div className='react__timer__view__block'>
            <Text
               inner={ minutes }
               type={ types.regular148 }
               size={ sizes.xsmall }
            />
            <Text
               inner='Minutes'
               type={ types.mediumXSmall }
               style={ { color: '#727978' } }
               size={ sizes.xx_small }
            />
         </div>
         <Text
            inner=':'
            type={ types.regular148 }
            size={ sizes.xsmall }
         />
         <div className='react__timer__view__block'>
            <Text
               inner={ seconds }
               type={ types.regular148 }
               size={ sizes.xsmall }
            />
            <Text
               inner='Seconds'
               type={ types.mediumXSmall }
               style={ { color: '#727978' } }
               size={ sizes.xx_small }
            />
         </div>
      </div>
   );
};

TimerDesign.propTypes = {
   time: PropTypes.any,
   onExpire: PropTypes.func,
   theme: PropTypes.string,
   isConstant: PropTypes.bool,
   timerTitle: PropTypes.string,
};

export default TimerDesign;
