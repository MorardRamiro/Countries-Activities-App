import React from 'react';
import { render } from '@testing-library/react';
import {Activity, validate}  from './Activities.js';

import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('<Activity />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = (() => {
      return mount(<Activity />)
    })
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('El form debe tener un h2 que diga: "Name of the activity:"', () => {
      const { container } = render(<Activity />)
      const element = container.querySelectorAll('h2')[0]
      expect(element.innerHTML).toBe('Name of the activity:');
  });

  it('El form debe tener un h2 que diga: "Difficulty:"', () => {
    const { container } = render(<Activity />)
    const element = container.querySelectorAll('h2')[1]
    expect(element.innerHTML).toBe('Difficulty:');
  });

  it('El form debe tener un input con name "name" y type "text"', () => {
    const { container } = render(<Activity />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('name');
  });

   it('El form debe tener un input con name "difficulty" y type "radio"', () => {
    const { container } = render(<Activity />)
    const element = container.querySelectorAll('input')[1]
    expect(element.type).toBe('radio');
    expect(element.name).toBe('difficulty');
  });

 it('El input de name tiene que tener la clase danger si tiene un error',  () => {
      wrapper = shallow(<Activity />);
      wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: '(っ◔◡◔)っ๑۞๑,¸¸,ø¤º°`°๑ṭ̵̻̝̯̘̉̈́͐h̴̠͋̈́́͐̈́̔̀͘͘i̷͓̯̩͔̩̯̝̍̾́̒̊̊͑͑́s̵̛͚̻̲̜̗̟͆̀̆ ̷̡̩̰̖̻̜͐̾̌̃̀́́ͅȋ̵̤̼͉̪̖̠̰̞͖̒̈͋̒̕s̶̥̃ ̵̧̛̞̪̲͕̍̑̊͊n̸̨̼̙̭͇̋̐̎̇͗̈́̆͌̆ő̸̢̧̹̳̺̪̻̹̀̾ţ̶̢̢̙͎̱̐̉̽̍̎̀͒͝ ̵̡̢̼͎̭͖̫͚̻̟̀̄̏̍̾̔͝͝a̵̧̛̝̝͍̝̖̜̰̎̈̃̈͒͠ͅ ̴̥̯̭̖̘͑͑̑v̶̡̧̤̲͕͍̮̿̓̊̓͋̃̍a̸̢̙̟̰͖̻̻̜̽̀̓͊͑́͊͗͘͘l̷̡͚̞̣̙̻̾͒́̾͘i̶̡̛̝͖͈͙̥̞̤̇̇͆͗̈d̴̖̟͐͐͜ ̷̧̢̪͔͎͍̪̅̃̈̆͊̒̍ń̴͕̟̳̹͖͓̪͇̜ä̷̺̺̤͈̞̣̙͐̒̕͜m̶̢̧̱̮̲̊̓̍̀͂͂̇̓͘ė̷̬͚͉̘͎͇̩͇̪̼̀̾̽̽̏̍๑,¸¸,ø¤º°`°๑۞๑'}});
      wrapper.find('button').simulate("click");
      const ele = wrapper.find('input[name="name"]');
      expect(ele.hasClass('danger')).toBeTruthy();
   });

   it('El input de name NO tiene que tener la clase danger si tiene un nombre es correcto',  () => {
      wrapper = shallow(<Activity />);
      wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: 'Sky-diving'}});
      wrapper.find('button').simulate("click");
      const ele = wrapper.find('input[name="name"]');
      expect(ele.hasClass('danger')).toBeFalsy();
    });

  
  it('El form deberia cambiar de estado cuando escriban en el input de name', () => {
    wrapper = shallow(<Activity />);
    wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: 'New Activity'}});
    const ele = wrapper.find('input[name="name"]');
    expect(ele.prop('value')).toEqual('New Activity');
  });
  
  describe('Validacion: ', () => {
    it('validate debe devolver un objeto con un error si el usarname no es un email valido:', () => {
      expect(validate({
        name: '¯\_(ツ)_/¯'
      }).name).toEqual('Name is invalid');
    });
  });  
  
    /* it('El form deberia cambiar de estado cuando escriban en el input de difficulty', () => {
    wrapper = shallow(<Activity />);
    wrapper.find('input[name="difficulty"]').simulate('change', {target: {name: 'difficulty', value: '1'}});
    const ele = wrapper.find('input[name="difficulty"]');
    expect(ele.prop('value')).toEqual("1");
  }); 
    it('validate debe devolver un objeto con un error si el usarname esta vacio:', () => {
      expect(validate({
        username: '',
        password: 'hola1',
      })).toEqual({username: 'Username is required'});
    });
    it('validate debe devolver un objeto con un error si el password no tiene un numero:', () => {
      expect(validate({
        username: 'toni@soyhenry.com',
        password: 'dassadas'
      })).toEqual({password: 'Password is invalid'});
    });
    it('validate debe devolver un objeto con un error si el password esta vacio:', () => {
      expect(validate({
        username: 'toni@soyhenry.com',
        password: ''
      })).toEqual({password: 'Password is required'});
    }); */
  
});