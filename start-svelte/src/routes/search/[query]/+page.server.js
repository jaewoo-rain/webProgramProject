// src/routes/search/[query]/+page.server.js
export async function load({ params, fetch }) {
    const query = params.query;

    const response = await fetch(`http://localhost:3000/flower/${encodeURIComponent(query)}`);

    if (!response.ok) {
        return { results: [] };
    }

    const results = await response.json();

    return { results };
}
