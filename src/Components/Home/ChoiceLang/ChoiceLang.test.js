import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChoiceLang from './ChoiceLang';

configure({ adapter: new Adapter() });

describe('Components/Home <ChoiceLang />', () => {

    const context = { choiceLang: () => { } };
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ChoiceLang />, {context});
    });
    it('should contains alt with polish text', () => {
        expect(wrapper.find({alt:'System kontroli zużycia paliwa wersja polska'})).toHaveLength(1);
    });
    it('should contains alt with spanish text', () => {
        expect(wrapper.find({alt:'Sistema de Control de Combustible version español'})).toHaveLength(1);
    });
})