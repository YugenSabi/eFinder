const DEFAULT_API_URL = 'http://localhost:4000';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${getApiUrl()}/uploads/image`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || typeof payload !== 'object' || !('url' in payload)) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Не удалось загрузить изображение';

    throw new Error(message);
  }

  return `${getApiUrl()}${String(payload.url)}`;
}
