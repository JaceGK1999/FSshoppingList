import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

const shoppingsEl = document.querySelector('.shoppings');
const shoppingForm = document.querySelector('.shopping-form');
const deleteButton = document.querySelector('.delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});
