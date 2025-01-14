// in response to a fetch request, return a json object with the message "Hello World"
export const GET = () => {
    return new Response(JSON.stringify({ message: "Hello World" }), {
        headers: { "Content-Type": "application/json" }
    });
}