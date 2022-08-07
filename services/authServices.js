const URL = "http://localhost:8000";

/* Login API */
export async function login({ email, password }) {
    const response = await fetch(`${URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
}

/** Register API */
export async function register({ name, email, password }) {
    const response = await fetch(`${URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const data = await response.json();
    return data;
}

/** Logout API */
export async function logout() {
    const response = await fetch(`${URL}/users/logout`);
    const data = await response.json();
    return data;
}

/** Profile API */
export async function profileAPI(token) {
    const response = await fetch(`${URL}/users/profile`, {
        headers: {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}