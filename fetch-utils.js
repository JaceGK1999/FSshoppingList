const SUPABASE_URL = 'https://uhmsxsfarryniihsuyry.supabase.co';
const SUPABASE_KEY = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXN4c2ZhcnJ5bmlpaHN1eXJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NDg1ODk5NSwiZXhwIjoxOTYwNDM0OTk1fQ.6nj7bcX8HwQyFQNgiIoCcY6u37Gv4ctD0Ivcfo9zsKQ'';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    const response = await client
        .from('shoppings')
        .insert({
            todo: todo,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();


    return checkError(response);
}

export async function deleteAllTodos() {
    await client.from('shoppings').delete().match({ user_id: client.auth.user().id });

}

export async function getTodos() {
    const response = await client
        .from('shoppings')
        .select()
        .order('complete')
        .match({ user_id: client.auth.user().id });


    return checkError(response);
}

export async function completeTodo(id) {
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

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
