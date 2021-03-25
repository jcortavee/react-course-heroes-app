const { mount } = require("enzyme")
const { MemoryRouter, Route } = require("react-router")
const { SearchScreen } = require("../../../components/search/SearchScreen")

describe('Test for <SearchSreen />', () => {
    
    test('should show default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').exists()).toBe(true);
    })

    test('should show batman and input', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value')).toBe('batman');
    })
    
    test('should show an error if there is no heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman22']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no result for batman22')
    })

    test('should call the push of history', () => {
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            targe: {
                name: 'search',
                value: 'batman'
            }
        });

        wrapper.find('button').prop('onClick')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith('?q=batman');

    })
    
    
    

})
