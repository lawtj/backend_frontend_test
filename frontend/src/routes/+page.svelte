<script lang="ts">  

    let {data, form} = $props();
   
    const apiUrl = import.meta.env.VITE_API_URL;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const healthCheck = async () => {
        const response = await fetch(`${apiUrl}/health`);
        const data = await response.json();
        console.log(data);
        healthresponse = JSON.stringify(data);
    };

    const svelteHealthCheck = async () => {
        const response = await fetch(`/api/svelte`);
        const data = await response.json();
        console.log(data);
        healthresponse = JSON.stringify(data);
    };

    $inspect(form);

    let healthresponse = $state("");

</script>


<div class="flex flex-col items-center justify-center h-screen space-y-4">
    <h1 class="text-4xl font-bold">Welcome to Hot Reload</h1>
    <p class="text-lg text-gray-600">Visit <a href="https://svelte.dev/docs/kit" class="text-blue-500">svelte.dev/docs/kit</a> to read the documentation</p>
    <div class="flex flex-row items-center justify-center gap-4">
        <button onclick={healthCheck} class="btn btn-primary">Health Check (frontend)</button>
        <button onclick={svelteHealthCheck} class="btn btn-primary">Health Check (svelte)</button>
        <form method="post">
            <button class="btn btn-primary" type="submit">Health Check (backend)</button>
        </form>
    </div>
    <p>The frontend API URL is: {apiUrl}</p>
    <p>The backend API URL is: {backendUrl}</p>
    <p>{healthresponse}</p>
    {#if form?.success}
        <p>{form.message}</p>
    {/if}

</div>