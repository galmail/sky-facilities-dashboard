import * as React from 'react';
import * as moment from 'moment';
import { FilterDates } from '../../types';

import './Filters.css';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';

interface Props extends FilterDates {
  onChange?: (dates: FilterDates) => void;
}

interface State extends FilterDates {

}

class Filters extends React.Component<Props, State> {

  public static defaultProps: Partial<Props> = {
    fromDate: new Date(1512000000000),
    toDate: new Date(1512086340000),
    onChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      fromDate: props.fromDate,
      toDate: props.toDate,
    };
  }

  onChange(dateType: string, value: string): void {
    const dateObj = moment(value, DATETIME_FORMAT);
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    if (dateType === 'fromDate') {
      if (dateObj.isValid()) fromDate = dateObj.toDate();
      else fromDate = null;
    }
    if (dateType === 'toDate') {
      if (dateObj.isValid()) toDate = dateObj.toDate();
      else toDate = null;
    }
    this.setState({ fromDate, toDate }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }
  
  render() {
    const fromDate = this.state.fromDate ? moment(this.state.fromDate).format(DATETIME_FORMAT) : '';
    const toDate = this.state.toDate ? moment(this.state.toDate).format(DATETIME_FORMAT) : '';
    return (
      <div className="filters">
        <div className="startDate">
          <label>From:</label>
          <input id="startDateId" type="datetime-local" value={fromDate} onChange={(e) => this.onChange('fromDate', e.target.value)} />
        </div>
        <div className="endDate">
          <label>To:</label>
          <input id="endDateId" type="datetime-local" value={toDate} onChange={(e) => this.onChange('toDate', e.target.value)} />
        </div>
      </div>
    );
  }

}

export default Filters;
