import * as React from 'react';
import { shallow, mount } from 'enzyme';
// import { Simulate, renderIntoDocument } from 'react-dom/test-utils';

import ChartIndicators from './ChartIndicators';

describe('Test ChartIndicators Component', () => {

  it('should render without crashing', () => {
    const wrapper = shallow(<ChartIndicators />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onHover("min") when hovering on minTemperature', () => {
    const onHover = jest.fn();
    const wrapper = mount(<ChartIndicators onHover={onHover}/>);
    // Simulate.mouseEnter(node);
    // expect(onHover).toHaveBeenCalled();
  });

});
