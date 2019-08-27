import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './Main';
import CookiesInfo from './CookiesInfo/CookiesInfo';
import textHomeInside from '../../../text-data/es/homeInside.json'

configure({adapter: new Adapter()});

describe('Components / <Main />', () => {
    let wrapper;
    const props = {
        text: textHomeInside
    } 

    it('should render one element <CookiesInfo />', () => {
        window.localStorage.removeItem("cookieAccepted");
        wrapper = shallow(<Main {...props}/>);
        expect(wrapper.find(CookiesInfo)).toHaveLength(1)
    });
    it('should no render element <CookiesInfo />', () => {
        window.localStorage.setItem("cookieAccepted", true);
        wrapper = shallow(<Main {...props}/>);
        expect(wrapper.find(CookiesInfo)).toHaveLength(0);
    });
    it('should contains props.text.section_1_h1, props.text.regTitle, props.text.policyTitle', () => {
        wrapper = shallow(<Main {...props}/>);
        expect(wrapper.text()).toContain(props.text.section_1_h1);
        expect(wrapper.text()).toContain(props.text.regTitle);
        expect(wrapper.text()).toContain(props.text.policyTitle);
        expect(wrapper.contains(<h5 className="card-title">{props.text.footer_body_h5}</h5>)).toEqual(true);
    });
    it('should contains text 1. Información general', () => {
        const state = {showRegulations: true};
        wrapper = mount(<Main {...props}/>, {state});       
        expect(wrapper.text()).toContain('1. Información general');     
        // expect(wrapper.contains([<h5 className="card-title">{props.text.regTitle}</h5>])).toEqual(true);   
    });
}); 