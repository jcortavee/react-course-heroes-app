import { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router";
import { PrivateRouter } from "../../routers/PrivateRouter"

describe('Test in <PrivateRouter />', () => {

    const rest = {
        location: {
            pathname: '/dc'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('should show the component if it is authenticated and save localStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                isAuthenticated={true}
                component={() => <span>Ready</span>}
                {...rest} />
            </MemoryRouter>);

        expect(wrapper.find('span').text()).toBe('Ready');
        expect(wrapper.html()).toBe('<span>Ready</span>');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc');
    });

    test('should block the component if it is not autheticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                isAuthenticated={false}
                component={() => <span>Ready</span>}
                {...rest} />
            </MemoryRouter>);

        expect(wrapper.find('span').exists()).toBe(false);
    });
    
    
})
