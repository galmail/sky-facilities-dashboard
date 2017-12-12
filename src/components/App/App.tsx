import * as React from 'react';
import { DataPoint, FilterDates, Indicators } from '../../types';

import api from '../../api';
import LineChart from '../Chart/LineChart';
import Filters from '../Filters';
import ChartIndicators from '../ChartIndicators';

import './App.css';

interface HighlightInput {
  data: Array<DataPoint> | null;
  min?: number;
  max?: number;
  indicator: string | null;
}

interface Props { }

interface State {
  temperatures: Array<DataPoint> | null;
  fromDate?: Date | null;
  toDate?: Date | null;
  highlightValue?: DataPoint | null;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      temperatures: null,
      fromDate: null,
      toDate: null,
      highlightValue: null
    };
    
    // this only works in redux.. replace this line for pure react
    // if (props.getTemperatures) props.getTemperatures();
    
    this.filtersChanged = this.filtersChanged.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  componentWillMount() {
    api.getTemperatures().then(temperatures => this.setState({ temperatures }));
  }

  filtersChanged({ fromDate, toDate }: FilterDates): void {
    this.setState({ fromDate, toDate });
  }

  highlight({ data, min, max, indicator }: HighlightInput) {
    if (!data) return;
    let highlightValue: DataPoint | undefined;
    if (indicator === 'min') {
      highlightValue = data.find(obj => obj.value === min);
    }
    if (indicator === 'max') {
      highlightValue = data.find(obj => obj.value === max);
    }
    this.setState({ highlightValue });
  }

  filterByDates(data: Array<DataPoint> | null, from?: Date | null, to?: Date | null): Array<DataPoint> | null {
    if (!data || data.length === 0) return data;
    return data.filter(obj => (from ? obj.date >= from : true) && (to ? obj.date <= to : true));
  }

  calculateMinMaxAvg(data: Array<DataPoint> | null): Indicators {
    if (!data || data.length === 0) return {};
    const min = data.reduce((prev, curr) => prev.value < curr.value ? prev : curr);
    const max = data.reduce((prev, curr) => prev.value > curr.value ? prev : curr);
    const avg = data.reduce((sum, dataObj) => sum + dataObj.value, 0) / data.length;
    return {
      min: min.value,
      max: max.value,
      avg: Math.round(avg * 100) / 100
    };
  }
  
  render() {
    const data = this.filterByDates(this.state.temperatures, this.state.fromDate, this.state.toDate);
    const { min, max, avg }: Indicators = this.calculateMinMaxAvg(data);
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Filters onChange={this.filtersChanged} />
        <LineChart data={data} highlightValue={this.state.highlightValue} />
        <ChartIndicators min={min} max={max} avg={avg} onHover={(indicator: string | null) => this.highlight({ data, min, max, indicator })} />
      </div>
    );
  }

}

export default App;
