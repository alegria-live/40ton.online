import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Activation from './Activation';
import Header from '../../Components/Home/Header/Header';
import Activate from '../../Containers/Activate/Activate';

configure({ adapter: new Adapter() });

describe('Components / <Activation />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Activation />);
    });

    it('shold render one component <Header />', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('shold render one component <Activate />', () => {
        expect(wrapper.find(Activate)).toHaveLength(1);
    });
})