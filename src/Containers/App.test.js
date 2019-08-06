import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import ChoiceLang from '../Components/Home/ChoiceLang/ChoiceLang';
import HomeLayout from '../hoc/HomeLayout/HomeLayout';

configure({adapter: new Adapter()});

describe('<App />', () => {    
    const props = {
		appLanguage: null,
		headText: 'Head Text',
		autoInitLang: ()=>{},
		setLang: ()=>{}
	};   
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
			<MemoryRouter initialEntries={[ '/' ]} initialIndex={0} >				
				<App { ...props } />
			</MemoryRouter>)
    });
    
    it('should render one element <ChoiceLang />' , () => {        
        expect(wrapper.find(ChoiceLang)).toHaveLength(1);
    });
    it('should no render element <HomeLayout />' , () => {        
        expect(wrapper.find(HomeLayout)).toHaveLength(0);
    });    
})
