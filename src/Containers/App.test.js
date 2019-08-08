import React from 'react';
import { MemoryRouter, Route, browserHistory  } from 'react-router-dom';
import { configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { App } from './App';
import ChoiceLang from '../Components/Home/ChoiceLang/ChoiceLang';
import {HomeLayout} from '../hoc/HomeLayout/HomeLayout';
import {Activation} from '../Components/Activation/Activation';

configure({adapter: new Adapter()});

describe('<App />', () => {    
    let props = {
		appLanguage: null,
		headText: 'Head Text',
		autoInitLang: ()=>{},
		setLang: ()=>{}
	}; 
    
    it('should render one element <Activation />' , () => {
      
        const wrapper = mount(
			<MemoryRouter initialEntries={[ '/activation' ]} initialIndex={0}>                
                <IntlProvider locale="en">
                    <Provider store={store} >
                        <Route path="/activation" render={()=> <Activation />}/>
                    </Provider>                    
                </IntlProvider>				                
			</MemoryRouter>)      
        expect(wrapper.find(Activation)).toHaveLength(1);
    });

    it('should render element <ChoiceLang />' , () => {
        const wrapper = mount(
			<MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
                <Route path="/" render={() => (<div className="App"> {props.appLanguage === null ? <ChoiceLang /> : <HomeLayout />} </div>)} />
			</MemoryRouter>)      
        expect(wrapper.find(ChoiceLang)).toHaveLength(1);
    });
    it('should render element <HomeLayout />' , () => {
        props = {
            ...props,
            appLanguage: "es"
        }
        const wrapper = mount(
			<MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
                <Route path="/" render={() => (<div className="App"> {props.appLanguage === null ? <ChoiceLang /> : <HomeLayout />} </div>)} />
			</MemoryRouter>)        
        expect(wrapper.find(HomeLayout)).toHaveLength(1);
    });    
})
