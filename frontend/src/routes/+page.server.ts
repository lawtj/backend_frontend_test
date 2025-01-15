import { API_SERVER_URL } from '$env/static/private';

export const actions = {
    default: async ({ request }) => {
        // now hit the backend health api
        const response = await fetch(`${API_SERVER_URL}/health`);
        const data = await response.json();
        console.log(data);
        return { success: true, message: "Health check successful" };
    }
}