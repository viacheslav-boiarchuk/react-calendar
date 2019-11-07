// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import {sum, isnull, compileAndroidCode} from './test/sum';
import axios from 'axios';
import Users from './test/users';

jest.mock('axios');

describe('SCOPE1', () => {
    // Applies only to tests in this describe block

    afterAll(() => {
        console.log('HI! This is Slava"s code!');
    });

    test('is null', () => {
        expect(isnull()).toBeNull();
    });

    test('compiling android goes as expected', () => {
        expect(compileAndroidCode).toThrow();
    });
});

describe('SCOPE2', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});


function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

describe('Mock axios', () => {

    test('should fetch users', () => {
        const finalObj = [{name: 'Bob'}];
        const testObj = {data: finalObj, value: 12321, name: 'Slava'};

        // ВОТ ТУТ. КАК ОНО ПОНИМАЕТ ЧТО В ЗАПРОСЕ ЧТО НИЖЕ НУЖНО ВСТАВИТЬ ИМЕННО ЭТИ ДАННЫЕ testObj -
        // а если бы было 2 запроса или что то другое?
        axios.get.mockResolvedValue(testObj);

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        return Users.all().then(data => {
            console.log(data);
            return expect(data).toEqual(finalObj)
        });
    });

    test('mock functionality 1', () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1, 2], mockCallback);

        // mockCallback.mock.results - возвращает объеком все результаты выполнения функции
        // {
        //      {type: 'return', value: 42}
        //      {type: 'return', value: 43}
        //      {type: 'return', value: 44}
        // }

        // mockCallback.mock.calls - возвращает массивом аргументы каждого вызова фунции
        // [ [0], [1], [2] ]
        //

        mockCallback
            .mockReturnValueOnce(10)
            .mockReturnValueOnce('x')
            .mockReturnValue(true);

        // вызов mockCallback(), mockCallback(), mockCallback() вернет
        // 10, 'x', true
        // то есть mockReturnValueOnce определяет что вернет функция при опереденном вызове,  нашем случае
        // при первом и втором, mockReturnValue - что будет возвращать дальше

        expect(mockCallback.mock.calls[1][0]).toBe(1);

    });
});

