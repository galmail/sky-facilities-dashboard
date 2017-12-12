import * as React from 'react';
import { shallow } from 'enzyme';
import * as moment from 'moment';

import App from './App';
import Filters from '../Filters';
import LineChart from '../Chart/LineChart';
import ChartIndicators from '../ChartIndicators';

describe('Test App Component', () => {

  const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
  const data = [
    { date: moment('2017-12-10T10:00', DATETIME_FORMAT).toDate(), value: 30.0 },
    { date: moment('2017-12-10T11:00', DATETIME_FORMAT).toDate(), value: 25.0 },
    { date: moment('2017-12-10T12:00', DATETIME_FORMAT).toDate(), value: 10.0 },
  ];

  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Filters).length).toEqual(1);
    expect(wrapper.find(LineChart).length).toEqual(1);
    expect(wrapper.find(ChartIndicators).length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should calculate min,max,avg value given a set of data', () => {
    const wrapper = shallow(<App />);
    const app: App<any, any> = wrapper.instance();
    const result = app.calculateMinMaxAvg(data);
    expect(result.min).toEqual(10);
    expect(result.max).toEqual(30);
    expect(result.avg).toEqual(21.67);
  });

  it('should filter the data by dates correctly', () => {
    const wrapper = shallow(<App />);
    const app: App<any, any> = wrapper.instance();
    const from = moment('2017-12-10T11:00', DATETIME_FORMAT).toDate();
    const to = new Date();
    const filteredData = app.filterByDates(data, from, to);
    expect(filteredData.length).toBe(2);
    expect(filteredData[0].value).toBe(25);
  });

  it('should update chart when filters change', () => {
    // const wrapper = mount(<App />);
    // const wrapper = shallow(<App />);
    // const app = wrapper.instance();
    // app.filtersChanged = jest.fn();
    // const startDate = wrapper.find('#startDateId').get(0);
    // startDate.props.value = '2017-12-10T12:00';
    // const filters = wrapper.find(Filters);
    // ReactTestUtils.Simulate.change(filters);
    // expect(app.filtersChanged.mock.calls.length).toBe(1);

  });

  it('should highlight minValue on chart when highlight is called', () => {

  });

});
