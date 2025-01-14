const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const actions = {
    default: async ({ request }) => {
        // now hit the backend health api
        const response = await fetch(`${backendUrl}/health`);
        const data = await response.json();
        console.log(data);
        return { success: true, message: "Health check successful" };
    }
}