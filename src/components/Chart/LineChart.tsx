import * as React from 'react';
import * as d3 from 'd3';

import * as helpers from '../../helpers';
import { DataPoint } from '../../types';

import './LineChart.css';

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface Props {
    margin?: Margin;
    width?: number;
    height?: number;
    data?: Array<DataPoint> | null;
    highlightValue?: DataPoint | null;
}

const MARGIN: Margin = { top: 20, right: 20, bottom: 30, left: 50 };
const WIDTH = 760;
const HEIGHT = 300;

class LineChart extends React.Component<Props, {}> {

    public static defaultProps: Partial<Props> = {
        margin: MARGIN,
        width: WIDTH,
        height: HEIGHT
    };

    rootElement: HTMLDivElement | null;

    constructor(props: Props) {
        super(props);
        this.highlightIndicator = this.highlightIndicator.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    render() {
        return (
            <div ref={(el) => { this.rootElement = el; }} className="line-chart">
                The Chart is Loading...
            </div>
        );
    }

    componentDidUpdate() {
        const data = this.props.data;
        if (data && data.length > 0) this.renderChart(data);
        else if (this.rootElement) this.rootElement.innerHTML = 'No data to display';
    }

    renderChart(data: Array<DataPoint>) {
        if (!this.rootElement) return;
        
        this.rootElement.innerHTML = '';

        // set the dimensions and margins of the chart
        const margin = this.props.margin  || MARGIN;
        const width = this.props.width || WIDTH;
        const height = this.props.height || HEIGHT;

        const widthWithoutMargins = width - margin.left - margin.right;
        const heightWithoutMargins = height - margin.top - margin.bottom;

        const widthWithMargins = width + margin.left + margin.right;
        const heightWithMargins = height + margin.top + margin.bottom;

        // set the ranges
        const x = d3.scaleTime().range([0, widthWithoutMargins]);
        const y = d3.scaleLinear().range([heightWithoutMargins, 0]);

        // define the line
        const line = helpers.getLine({ d3, x, y });

        const svg = d3.select(this.rootElement).append('svg')
            .attr('width', widthWithMargins)
            .attr('height', heightWithMargins)
            .append('g')
            .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');
        
        x.domain(helpers.getDomainX({ d3, data }));
        y.domain(helpers.getDomainY({ d3, data }));

        // Add the valueline path.
        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);

        // Add the X Axis
        svg.append('g')
            .attr('class', 'axis-x')
            .attr('transform', 'translate(0,' + heightWithoutMargins + ')')
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append('g')
            .attr('class', 'axis-y')
            .call(d3.axisLeft(y));

        // Add Circle
        const focus = svg.append('g')
            .attr('class', 'focus')
            .style('display', 'none');

        focus.append('circle').attr('r', 7.5);

        this.highlightIndicator(focus, x, y);
    }

    // tslint:disable-next-line:no-any
    highlightIndicator(el: any, x: Function, y: Function) {
        const dataObj = this.props.highlightValue;
        if (dataObj) el.attr('transform', 'translate(' + x(dataObj.date) + ',' + y(dataObj.value) + ')');
        if (dataObj) el.style('display', null);
        else el.style('display', 'none');
    }

}

export default LineChart;
