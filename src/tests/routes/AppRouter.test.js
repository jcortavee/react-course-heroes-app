import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Test in <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    test('should show the login if it is not authenticated', () => {

        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper.find('button').text()).toBe('Login');
        
    });
    
    test('should show dc component if it is authenticated', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Jose'
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper.find('h1').text()).toBe('DC');

    });
    
    
})
