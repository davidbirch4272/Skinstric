export async function apiFetch(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(`API error: ${data.message || "Unknown error"}`);
  }
  return data;
}