export async function getVans(id) {
  const url = id
    ? `http://localhost:9898/api/vans/${id}`
    : "http://localhost:9898/api/vans";
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}

export async function getHostVans(id) {
  const url = id
    ? `http://localhost:9898/api/host/vans/${id}`
    : "http://localhost:9898/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}

export async function loginUser(creds) {
  const res = await fetch("http://localhost:9898/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.msg,
    };
  }
  return data;
}
