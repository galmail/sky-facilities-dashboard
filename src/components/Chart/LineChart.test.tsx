import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as moment from 'moment';

import LineChart from './LineChart';

describe('Test LineChart Component', () => {

    const DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
    const data = [
        { date: moment('2017-12-10T10:00', DATETIME_FORMAT).toDate(), value: 30.0 },
        { date: moment('2017-12-10T11:00', DATETIME_FORMAT).toDate(), value: 25.0 },
        { date: moment('2017-12-10T12:00', DATETIME_FORMAT).toDate(), value: 10.0 },
    ];

    it('should render without crashing', () => {
        const wrapper = shallow(<LineChart />);
        expect(wrapper).toMatchSnapshot();
    });

    it('is calling the right methods when updating', (done) => {
        const wrapper = mount(<LineChart />);
        let spy = spyOn(wrapper.instance(), 'highlightIndicator');
        wrapper.setProps({ data: data, highlightValue: data[0] }, () => {
            expect(spy).toHaveBeenCalled();
            spy = spyOn(wrapper.instance(), 'renderChart');
            wrapper.setProps({ data: data, highlightValue: data[1] }, () => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(data);
                done();
            });
        });
    });

    it('should be able to highlight data', () => {
        const wrapper = mount(<LineChart data={data} highlightValue={data[2]} />);
        const lineChart: LineChart<any, any> = wrapper.instance();
        lineChart.renderChart(data);
        expect(wrapper.render().find('.focus').length).toBe(1);
        expect(wrapper.render().find('.focus').prop('style').display).toBe(undefined);
        expect(wrapper.render().find('.focus').prop('transform')).toBe('translate(690,166.66666666666669)');
    });

});
