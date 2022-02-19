// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderShoppingList } from '../render-utils.js';

const test = QUnit.test;

test('render shopping list', (expect) => {
    const expected = '<div class="incomplete list"><p>hello</p></div>';

    const actual = renderShoppingList('hello');

    expect.deepEqual(actual.outerHTML, expected);
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
