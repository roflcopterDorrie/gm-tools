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

  formatShortDate = (datetime) => {
    return datetime.day + ' ' + this.monthNames[datetime.month];
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
      return niceText.join(' ');
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

  newestToOldest = (first, second) => {
    const diff = this.datetimeToEpoc(second.datetime) - this.datetimeToEpoc(first.datetime);
    if (diff === 0) {
      return second.id - first.id;
    }
    return diff;
  }

  deleteEvent = (id) => {
    this.props.deleteData('Timeline', id);
  }

  render() {
    let timeline = [];

    let events = this.props.allData['events'];
    // Order events by date, newest to oldest.
    events.sort(this.newestToOldest);

    timeline = events.map((event, index) => {
      let nextEvent = events[index-1];
      let icon, title, summary;
      switch(event.parentType) {
        case 'Long rest':
        case 'Short rest':
          icon = 'fa-campground';
          title = event.parentType;
          break;
        case 'Travel':
          icon = 'fa-route';
          title = event.parentType;
          break;
        default:
          const eventParent = this.props.getData(event.parentType, event.parentId);
          const dataStore = this.props.getDataStore(event.parentType);
          icon = dataStore.icon;
          title = eventParent.name;
          switch (event.parentType) {
            case 'Encounter':
              title += ' - ' + eventParent.difficulty;
              summary = eventParent.outcome;
              break;
            case 'Interaction':
                const interactionParent = this.props.getData(eventParent.parentType, eventParent.parentId);
                title = interactionParent.name;
                summary = eventParent.name;
                break;
          }
          break;
      }

      let timeBetween = this.timeBetween( nextEvent ? nextEvent.datetime : this.state.datetime, event.datetime);
      if (nextEvent && timeBetween === 'Now') {
        timeBetween = '';
      } else {
        timeBetween = '(' + timeBetween + ')';
      }

      let dayBreak = '';
      if (nextEvent && nextEvent.datetime.day !== event.datetime.day) {
        dayBreak = <li class="timeline__daybreak">{this.formatShortDate(event.datetime)}</li>
      }

      return (
        <>
          {dayBreak}
          <li>
            <span className="fa-li"><i className={"fas " + icon}></i></span>
            <div className="timeline__event">
              <span className="card-minor-minor">{this.formatTime(event.datetime)} {timeBetween}</span>
              <span className="timeline__event-title">{title}</span>
              <span className="timeline__event-summary">{summary}</span>
            </div>
            <button style={{position: 'absolute', right: 0, top: 0}} className="link" onClick={(e) => {this.deleteEvent(event.id)}}>
              <i className="fas fa-times"></i>
            </button>
          </li>
        </>
      );
    });

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-clock"></i> Timeline</span>
        </div>
        <div className="card-top">
          <div className="date">
            <span className="date__time"><i className="fas fa-clock"></i> {this.formatTime(this.state.datetime)}</span>
            <span className="date__date"><i className="fas fa-calendar-alt"></i> {this.formatDate(this.state.datetime)}</span>
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
          {this.toolbar(['event-rest-long', 'event-rest-short', 'event-travel'])}
        </div>
      </section>
    );

  }
}

export default Timeline;
