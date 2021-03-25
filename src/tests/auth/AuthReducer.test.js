import { authReducer } from "../../auth/AuthReducer";
import { types } from "../../types/types";

describe('AuthReducer test', () => {

    test('should return default value', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    });

    test('should authenticate', () => {
        const state = authReducer({}, {type: types.login, payload: {name: 'Jose'}});
        expect(state).toEqual({logged: true, name: 'Jose'});
    });

    test('should erase the username', () => {
        const state = authReducer({}, {type: types.logout});
        expect(state).toEqual({logged: false});
    });

})