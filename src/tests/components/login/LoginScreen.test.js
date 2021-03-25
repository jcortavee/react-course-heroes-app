import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { AuthContext } from "../../../auth/AuthContext"
import { authReducer } from "../../../auth/AuthReducer"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { types } from "../../../types/types"

describe('Test for <LoginScreen></LoginScreen>', () => {
    
    const history={
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn()
    };

    test('should show component', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history} />
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();

    })

    test('should do dispatch and navigation', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history} />
            </AuthContext.Provider>
        )

        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.login,
            payload: {
                name: 'Jose Carlos'
            }});

        localStorage.setItem('lastPath', '/dc');
        wrapper.find('button').prop('onClick')();
        expect(history.replace).toHaveBeenCalledWith('/dc');

    })
    
    

})
