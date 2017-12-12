import { configure } from 'enzyme';
const Adapter = require('enzyme-adapter-react-15');

// console.log('Configuring Adapter for the tests...');

configure({ adapter: new Adapter() });
