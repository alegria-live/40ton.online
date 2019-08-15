import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Slogan from './Slogan';

configure({ adapter: new Adapter() });
const initialState = {
    initLang: {
        textHome: {
            headerSlogan: "test header slogan"
        }
    }
};

const mockStore = configureStore()
let store
describe('Components/Home/Header <Slogan />', () => {
    it('should render h1 with "test header slogan"', () => {
        store = mockStore(initialState);
        const wrapper = mount(
            <IntlProvider locale="en">
                <Provider store={store} >
                    <Slogan />
                </Provider>
            </IntlProvider>    
        )
        expect(wrapper.contains(<h1>test header slogan</h1>)).toEqual(true);
    })
});