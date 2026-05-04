export const API_BASE_URL = '/api';

export const fetchDashboard = async () => {
  const res = await fetch(`${API_BASE_URL}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
};

export const fetchNews = async () => {
  const res = await fetch(`${API_BASE_URL}/news`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
};

export const fetchLocations = async () => {
  const res = await fetch(`${API_BASE_URL}/locations`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json();
};

export const fetchAppointments = async () => {
  const res = await fetch(`${API_BASE_URL}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
};

export const createAppointment = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create appointment');
  return res.json();
};
