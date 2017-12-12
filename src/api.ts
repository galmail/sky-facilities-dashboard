// api.ts

import { DataPoint } from './types';

// tslint:disable-next-line:no-any
function delay(data: any): Promise<any> {
  const timeDelayed = Math.floor(Math.random() * 500) + 100;
  return new Promise(resolve => setTimeout(() => resolve(data), timeDelayed));
}

function transformTempObjectToArray(tempObj: object): Array<DataPoint> {
  return Object.keys(tempObj).map(key => ({
    date: new Date(parseInt(key, 10) * 1000),
    value: tempObj[key]
  }));
}

export default {
  
  getTemperatures: (): Promise<Array<DataPoint>> => {
    const temperaturesObject = require('./temperatures.json');
    return new Promise(resolve => {
      delay(temperaturesObject).then((tempObj) => {
        const temperatures = transformTempObjectToArray(tempObj);
        resolve(temperatures);
      });
    });
  }

};
