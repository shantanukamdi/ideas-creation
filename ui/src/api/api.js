import { BASE_API } from "../config";

export const login = (username, password) => {
  if (!username || !password) {
    return;
  }
  return fetch(`${BASE_API}/auth`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
};

export const logout = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/logout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const register = (user) => {
  return fetch(`${BASE_API}/register`, {
    method: "POST",
    body: JSON.stringify({
      ...user,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
};

export const createIdea = (idea) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/ideas`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...idea }),
  });
};

export const getIdeas = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/ideas`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getIdea = (id) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/ideas/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateIdea = (idea) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/ideas`, {
    method: "PUT",
    body: JSON.stringify(idea),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteIdea = (id) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/ideas/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const me = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_API}/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
