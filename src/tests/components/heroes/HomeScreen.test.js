import { mount, shallow } from "enzyme"
import { MemoryRouter, Route } from "react-router";
import { HeroeScreen } from "../../../components/heroes/HeroeScreen"

describe('Test for <HeroScreen />', () => {
    
    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    }

    
    test('should show the component redirect if there are not params', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroeScreen history={history} />
            </MemoryRouter>
            );

        expect(wrapper.find('Redirect').exists()).toBe(true);
    })

    test('should show a heroe if the param exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-hulk']}>
                <Route path='/heroe/:heroeId' component={HeroeScreen}/>
            </MemoryRouter>
            );
        
        expect(wrapper.find('.row').exists()).toBe(true);    
    })

    test('should go back to the last page with push', () => {
        
        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-hulk']}>
                <Route path='/heroe/:heroeId' component={ () => <HeroeScreen history={history} />}/>
            </MemoryRouter>
            );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();

    })

    test('should go back to the last page with push', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-hulk']}>
                <Route path='/heroe/:heroeId' component={ () => <HeroeScreen history={history} />}/>
            </MemoryRouter>
            );

        wrapper.find('button').prop('onClick')();
        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalled();

    })

    test('should called the redirect', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-hulk22']}>
                <Route path='/heroe/:heroeId' component={ () => <HeroeScreen history={history} />}/>
            </MemoryRouter>
            );

        expect(wrapper.html()).toBe('');

    })
    
    

})
