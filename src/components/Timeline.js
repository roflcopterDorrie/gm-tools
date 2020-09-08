import React from "react";
import Card from "components/Card";

const YEAR = 518400;
const MONTH = 43200;
const DAY = 1440;
const HOUR = 60;

class Timeline extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Timeline';
    this.state = {
      datetime: this.props.getConfig('datetime')['datetime'],
      timeUp: true
    };
    this.monthNames = ['','Hammer','Alturiak','Ches','Tarsakh','Mirtul','Kythorn','Flamerule','Eleasis','Eleint','Marpenoth','Uktar','Nightal'];
  }

  adjustTime = (amount) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    if (this.state.timeUp) {
      let min = parseInt(stateCopy.datetime.minute) + amount;
      while (true) {
        if (min > 59) {
          stateCopy.datetime.hour++;
          if (stateCopy.datetime.hour > 23) {
            stateCopy.datetime.day++;
            stateCopy.datetime.hour = 0;
            if (stateCopy.datetime.day > 30) {
              stateCopy.datetime.month++;
              stateCopy.datetime.day = 1;
              if (stateCopy.datetime.month > 12) {
                stateCopy.datetime.year++;
                stateCopy.datetime.month = 1;
              }
            }
          }
          min = min - 60;
        } else {
          break;
        }
      }
      stateCopy.datetime.minute = parseInt(min);
    } else {
      let min = parseInt(stateCopy.datetime.minute) - amount;
      while (true) {
        if (min < 0) {
          stateCopy.datetime.hour--;
          if (stateCopy.datetime.hour < 0) {
            stateCopy.datetime.day--;
            stateCopy.datetime.hour = 23;
            if (stateCopy.datetime.day < 1) {
              stateCopy.datetime.month--;
              stateCopy.datetime.day = 30;
              if (stateCopy.datetime.month < 1) {
                stateCopy.datetime.year--;
                stateCopy.datetime.month = 12;
              }
            }
          }
          min = min + 60;
        } else {
          break;
        }
      }
      stateCopy.datetime.minute = parseInt(min);
    }

    this.setState(stateCopy);
    this.props.updateConfig('datetime', stateCopy.datetime);
  }

  addEvent = (type) => {
    if (type == 'camp') {
      this.props.addData('Timeline', null, null, {type: 'camp', name: 'Camp', datetime: this.state.datetime});
    }
  }

  formatTime = (datetime) => {
    if (datetime) {
      const hour = datetime.hour === 0 ? 12 : datetime.hour > 12 ? datetime.hour - 12 : datetime.hour;
      const min = datetime.minute < 10 ? '0' + datetime.minute  : datetime.minute;
      const ampm = datetime.hour < 12 || datetime.hour === 24 ? 'AM' : 'PM';
      return hour + ':' + min + ' ' + ampm;
    }
    return '';
  }

  formatDate = (datetime) => {
    return datetime.day + ' ' + this.monthNames[datetime.month] + '(' + datetime.month + ') ' + datetime.year;
  }

  timeBetween = (start, end) => {
    if (start && end) {
      let diff = this.datetimeToEpoc(start) - this.datetimeToEpoc(end);
      if (diff === 0) {
        return 'Now';
      }
      let niceText = [];
      let years = 0;
      let months = 0;
      let days = 0;
      let hours = 0;
      let minutes = 0;
      while(true) {
        if (diff < YEAR) {
          break;
        }
        diff -= YEAR;
        years++;
      }
      while(true) {
        if (diff < MONTH) {
          break;
        }
        diff -= MONTH;
        months++;
      }
      while(true) {
        if (diff < DAY) {
          break;
        }
        diff -= DAY;
        days++;
      }
      while(true) {
        if (diff < HOUR) {
          break;
        }
        diff -= HOUR;
        hours++;
      }
      minutes = diff;

      if (years) {
        niceText.push(years + ' year' + (years > 1 ? 's' : ''));
      }
      if (months) {
        niceText.push(months + ' month' + (months > 1 ? 's' : ''));
      }
      if (days) {
        niceText.push(days + ' day' + (days > 1 ? 's' : ''));
      }
      if (hours) {
        niceText.push(hours + ' hour' + (hours > 1 ? 's' : ''));
      }
      if (minutes) {
        niceText.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
      }


      return niceText.join(' ') + ' ago';
    } else {
      return 'Unknown';
    }
  }

  datetimeToEpoc = (datetime) => {
    let mins = 0;
    mins += datetime.minute;
    mins += datetime.hour * HOUR;
    mins += datetime.day * DAY;
    mins += datetime.month * MONTH;
    mins += datetime.year * YEAR;
    return mins;
  }

  timeUp = (timeUp) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.timeUp = timeUp;
    this.setState(stateCopy);
  }

  render() {
    let timeline = [];
    timeline = this.props.allData['events'].map((event) => {
      return (
        <li>
          <span  className="fa-li"><i className="fas fa-campground"></i></span>
          <span className="card-minor-minor">{this.timeBetween(this.state.datetime, event.datetime)}</span>
          {event.name}
        </li>
      );
    });

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-clock"></i> Timeline</span>
        </div>
        <div className="card-top">
          <div className="date">
            {this.formatDate(this.state.datetime)} {this.formatTime(this.state.datetime)}
          </div>
          <div>
            <button className="icon" onClick={()=>this.adjustTime(15)}>15m</button>
            <button className="icon" onClick={()=>this.adjustTime(HOUR)}>1h</button>
            <button className="icon" onClick={()=>this.adjustTime(HOUR * 8)}>8h</button>
            <button className="icon" onClick={()=>this.adjustTime(DAY)}>1d</button>
            <button className="icon" onClick={()=>this.adjustTime(MONTH)}>1mon</button>
            <button className="icon" onClick={()=>this.adjustTime(YEAR)}>1year</button>
            <button
              className={"icon time-switch" + (this.state.timeUp ? ' active' : '')}
              onClick={() => this.timeUp(true)}
            >
              +
            </button>
            <button
              className={"icon time-switch" + (this.state.timeUp ? ' ' : ' active')}
              onClick={() => this.timeUp(false)}
            >
              -
            </button>
          </div>
        </div>
        <div className="card-body card-body--timeline">
          <div className="timeline__line"></div>
          <ul className='fa-ul timeline'>
            {timeline}
          </ul>
        </div>
        <div className="card-footer">
          {this.toolbar(['event-camp'])}
        </div>
      </section>
    );

  }
}

export default Timeline;
