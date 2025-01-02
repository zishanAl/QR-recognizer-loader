const API_BASE = 'https://qr-recogniser.onrender.com/';

export async function fetchModelInfo(modelId) {
  const res = await fetch(`${API_BASE}/arinfo/${modelId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch model information');
  }
  return res.json();
}
