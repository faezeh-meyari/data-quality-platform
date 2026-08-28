export function getBackendStatus() {
  return fetch("http://localhost:3000/health").then((response) => {
    if (!response.ok) {
      throw new Error("Backend health check failed");
    }

    return response.json();
  });
}
