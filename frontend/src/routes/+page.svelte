<script lang="ts">
   
    const apiUrl = import.meta.env.VITE_API_URL;

    const healthCheck = async () => {
        const response = await fetch(`${apiUrl}/api/health`);
        const data = await response.json();
        console.log(data);
        healthresponse = JSON.stringify(data);
    };

    let healthresponse = "";

</script>


<div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">Welcome to SvelteKit</h1>
    <p class="text-lg text-gray-600">Visit <a href="https://svelte.dev/docs/kit" class="text-blue-500">svelte.dev/docs/kit</a> to read the documentation</p>
    <button onclick={healthCheck} class="btn btn-primary">Health Check</button>
    <p>The API URL is: {apiUrl}</p>
    <p>{healthresponse}</p>

</div>