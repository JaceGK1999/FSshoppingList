const SUPABASE_URL = 'https://uhmsxsfarryniihsuyry.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXN4c2ZhcnJ5bmlpaHN1eXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ4NTg5OTUsImV4cCI6MTk2MDQzNDk5NX0.DX8Yp3q-uUt4Q185uQlz61drW20MespMboRangENHIg';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createShoppings(shop) {
    const response = await client
        .from('shoppings')
        .insert({
            shop: shop,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();

    return checkError(response);
}

export async function deleteAllShoppings() {
    await client.from('shoppings').delete().match({ user_id: client.auth.user().id });
}

export async function getShoppings() {
    const response = await client
        .from('shoppings')
        .select()
        .order('complete')
        .match({ user_id: client.auth.user().id });
    console.log(response, 'supabase response');
    return checkError(response);
}

export async function completeShoppings(id) {
    const response = await client.from('shoppings').update({ complete: true }).match({
        user_id: client.auth.user().id,
        id: id,
    });

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });
    console.log(response, 'test 1');
    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
