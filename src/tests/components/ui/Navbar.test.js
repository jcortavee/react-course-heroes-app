import { mount } from "enzyme"
import { MemoryRouter, Route, Router } from "react-router";
import { AuthContext } from "../../../auth/AuthContext"
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe('Test for <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Jose'
        }
    };

    afterAll(() => {
        jest.clearAllMocks();
    });
    
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('should show the component', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Jose');
    })

    test('should call the logout and use history', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout})
        expect(historyMock.replace).toHaveBeenCalledWith('/login')
    })
    
    

})
