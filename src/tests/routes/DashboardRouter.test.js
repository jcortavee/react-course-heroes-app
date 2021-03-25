import { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";
import { DashboardRouter } from "../../routers/DashboardRouter";

describe('Test in <DashboardRouter />', () => {

    test('should match snapshot', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'John Doe'
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('John Doe');
        
    });
    
    
})
