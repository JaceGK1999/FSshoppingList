// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderShoppingList } from '../render-utils.js';

const test = QUnit.test;

test('render shopping list', (expect) => {
    const expected = '';

    const actual = renderShoppingList('hello');

    expect.outerHtml(actual, expected);
});

test('time to test a function', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = true;

    //Act
    // Call the function you're testing and set the result to a const
    const actual = true;

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});
