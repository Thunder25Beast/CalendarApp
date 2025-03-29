// src/lib/api.js
export async function apiRequest(method, url, data) {
    // Simulate a delay and return a dummy response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Response(JSON.stringify({ conflicts: [] }), { status: 200 }));
      }, 500);
    });
  }
  