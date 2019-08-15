import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import Slogan from './Slogan/Slogan';
import NavBig from '../../Nav/NavForBigDevices/NavForBigDevices';
import NavSmall from '../../Nav/NavForSmallDevices/NavForSmallDevices';

configure({ adapter: new Adapter() });

describe('Components/Home <Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('shold render one component <Slogan />', () => {
        expect(wrapper.find(Slogan)).toHaveLength(1);
    });

    it('shold render one component <NavBig />', () => {
        expect(wrapper.find(NavBig)).toHaveLength(1);
    });

    it('shold render one component <NavSmall />', () => {
        expect(wrapper.find(NavSmall)).toHaveLength(1);
    });
})