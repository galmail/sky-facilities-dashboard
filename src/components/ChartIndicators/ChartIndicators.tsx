import * as React from 'react';
import { Indicators } from '../../types';

import './ChartIndicators.css';

interface Props extends Indicators {
  onHover?: Function;
}

function ChartIndicators({ min, max, avg, onHover = () => {} }: Props) {
    return (
      <div className="chart-indicators">
        <div className="min-temperature" onMouseOver={() => onHover('min')} onMouseOut={() => onHover()}>Min Temp: {displayTemperature(min)}</div>
        <div className="max-temperature" onMouseOver={() => onHover('max')} onMouseOut={() => onHover()}>Max Temp: {displayTemperature(max)}</div>
        <div className="avg-temperature" onMouseOver={() => onHover('avg')} onMouseOut={() => onHover()}>Avg Temp: {displayTemperature(avg)}</div>
      </div>
    );
}

function displayTemperature(val?: number): string {
  return (val != null) ? `${val} °C` : '-----';
}

export default ChartIndicators;
