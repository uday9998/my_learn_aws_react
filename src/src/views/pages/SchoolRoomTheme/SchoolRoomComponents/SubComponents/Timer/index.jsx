/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
import React from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import PropTypes from 'prop-types';

class Timer extends React.Component {
   static propTypes = {
      isPreview: PropTypes.bool,
      days: PropTypes.any,
      hours: PropTypes.any,
      minutes: PropTypes.any,
      seconds: PropTypes.any,
      date: PropTypes.any,
      landingComponents: PropTypes.array,
   };

   constructor() {
      super();
      this.state = { time: {}, seconds: 0 };
      this.timer = 0;
   }

   componentDidMount() {
      const {
         days, hours, minutes, seconds, date,
      } = this.props;
      const dateInSecsNow = Math.round(Date.now() / 1000);
      const totalSeconds = parseInt(days, 10) * 3600 * 24 + parseInt(hours, 10) * 3600
       + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

      let diff = totalSeconds + date - dateInSecsNow;
      if (parseInt(days, 10) === 0 && parseInt(hours, 10) === 0 && parseInt(minutes, 10) === 0
       && parseInt(seconds, 10) === 0) {
         diff = 0;
      }
      const { seconds: seconds2 } = this.state;
      if (diff > 0) {
         const timeLeftVar = this.secondsToTime(seconds2);
         this.setState({ time: timeLeftVar, seconds: diff }, () => this.startTimer());
      }
   }

   componentDidUpdate(prevProps) {
      const {
         days, hours, minutes, seconds, date,
      } = this.props;
      const dateInSecsNow = Math.round(Date.now() / 1000);
      const totalSeconds = parseInt(days, 10) * 3600 * 24 + parseInt(hours, 10)
       * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
      let diff = totalSeconds + date - dateInSecsNow;
      if (parseInt(days, 10) === 0 && parseInt(hours, 10) === 0
      && parseInt(minutes, 10) === 0 && parseInt(seconds, 10) === 0) {
         diff = 0;
      }
      if (prevProps.days !== days || prevProps.hours !== hours
         || prevProps.minutes !== minutes || prevProps.seconds !== seconds) {
         // eslint-disable-next-line react/no-did-update-set-state
         this.setState({
            time: this.secondsToTime(diff),
            seconds: diff,
         }, () => this.startTimer());
      }
   }


      startTimer = () => {
         const { seconds: seconds2 } = this.state;
         if (this.timer === 0 && seconds2 > 0) {
            this.timer = setInterval(this.countDown, 1000);
         }
      }

      countDown = () => {
         // Remove one second, set state so a re-render happens.
         const { seconds: seconds2 } = this.state;
         const seconds = seconds2 - 1;
         this.setState({
            time: this.secondsToTime(seconds),
            seconds,
         });

         // Check if we're at zero.
         if (seconds <= 0) {
            clearInterval(this.timer);
            this.timer = 0;
         }
      }


    toggle = e => {
       const { isPreview } = this.props;
       const { active } = this.state;
       if (!isPreview) {
          this.setState({ active: toggleHighlighted(e, active) });
       }
    };

    secondsToTime(secs) {
       const days = Math.floor(secs / (60 * 60 * 24));
       const divisor_for_hours = secs % (60 * 60 * 24);
       const hours = Math.floor(divisor_for_hours / (60 * 60));

       const divisor_for_minutes = secs % (60 * 60);
       const minutes = Math.floor(divisor_for_minutes / 60);

       const divisor_for_seconds = divisor_for_minutes % 60;
       const seconds = Math.ceil(divisor_for_seconds);

       const obj = {
          'd': days,
          'h': hours,
          'm': minutes,
          's': seconds,
       };
       return obj;
    }


    render() {
       const { time, active } = this.state;
       const { landingComponents } = this.props;
       return (
          <div className='countdown-wrapper'>
             <div
                className={ active ? 'countdown-item mark' : 'countdown-item' }
                data-slug={ landingComponents[0].slug }
                onMouseOver={ this.toggle }
                onMouseOut={ this.toggle }
             >
                {time.d <= 0 || time.d === undefined ? 0 : time.d}
                <span>days</span>
             </div>
             <div
                className={ active ? 'countdown-item mark' : 'countdown-item' }
                data-slug={ landingComponents[1].slug }
                onMouseOver={ this.toggle }
                onMouseOut={ this.toggle }
             >
                {time.h <= 0 || time.h === undefined ? 0 : time.h}
                <span>hours</span>
             </div>


             <div
                className={ active ? 'countdown-item mark' : 'countdown-item' }
                data-slug={ landingComponents[2].slug }
                onMouseOver={ this.toggle }
                onMouseOut={ this.toggle }
             >
                {time.m <= 0 || time.m === undefined ? 0 : time.m}
                <span>minutes</span>
             </div>

             <div
                className={ active ? 'countdown-item mark' : 'countdown-item' }
                data-slug={ landingComponents[3].slug }
                onMouseOver={ this.toggle }
                onMouseOut={ this.toggle }
             >
                {time.s <= 0 || time.s === undefined ? 0 : time.s}
                <span>seconds</span>
             </div>
          </div>
       );
    }
}

export default Timer;
