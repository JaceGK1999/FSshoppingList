import {
    checkAuth,
    completeShoppings,
    logout,
    deleteAllShoppings,
    getShoppings,
    createShoppings,
} from '../fetch-utils.js';
import { renderShoppingList } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

const shoppingsEl = document.querySelector('.shoppings');
const shoppingForm = document.querySelector('.shopping-form');
const deleteButton = document.querySelector('.delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});

shoppingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(shoppingForm);

    const shop = formData.get('shopping');

    await createShoppings(shop);

    shoppingForm.reset();
    displayShop();
});

async function displayShop() {
    const shoppings = await getShoppings();
    console.log(shoppings, 'shoppings display');
    shoppingsEl.textContent = '';

    for (let shopping of shoppings) {
        const shopEl = renderShoppingList(shopping.shop);

        shopEl.addEventListener('click', async () => {
            console.log('clicked');
            await completeShoppings(shopping.id);
            displayShop();
        });
        shoppingsEl.append(shopEl);
    }
}

window.addEventListener('load', async () => {
    await displayShop();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    await deleteAllShoppings();

    displayShop();
});
