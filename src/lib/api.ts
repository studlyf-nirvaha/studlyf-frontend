import { auth } from './firebase';

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // If VITE_API_BASE_URL is set, use it
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Production URL or local backend
  if (import.meta.env.PROD) {
    return 'https://studlyf.in';
  }

  // Development: prefer Node/Express backend (profile, uploads, messaging)
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();
const FALLBACK_BASE_URLS = [
  'http://localhost:3000',
  'http://localhost:5001',
];
const getChatApiBaseUrl = () => {
  // If running the app locally, hard-target the Node chat server on 127.0.0.1:3000
  try {
    const isLocal = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    if (isLocal) return 'http://127.0.0.1:3000';
  } catch {}
  if (import.meta.env.VITE_CHAT_API_BASE_URL) return import.meta.env.VITE_CHAT_API_BASE_URL as string;
  // heuristic: if pointing to Flask in dev, fall back to Node on 3000
  if (API_BASE_URL.includes('localhost:5001')) return 'http://127.0.0.1:3000';
  return API_BASE_URL;
};

const postFormWithAuth = async (endpoint: string, form: FormData): Promise<Response> => {
  const token = await getIdToken();
  const bases = [getChatApiBaseUrl(), ...FALLBACK_BASE_URLS.filter(b => b !== getChatApiBaseUrl())];
  let lastErr: any = null;
  for (const base of bases) {
    try {
      const resp = await fetch(`${base}${endpoint}`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: form,
      });
      if (resp.ok || resp.status !== 0) return resp;
      lastErr = await resp.text();
    } catch (e) {
      lastErr = e;
    }
  }
  const message = typeof lastErr === 'string' ? lastErr : (lastErr?.message || 'upload failed');
  return new Response(JSON.stringify({ error: message }), { status: 503, headers: { 'Content-Type': 'application/json' } });
};

const getIdToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  } catch (error) {
    return null;
  }
};

const tryFetch = async (baseUrl: string, endpoint: string, options: RequestInit): Promise<Response> => {
  const token = await getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  } as Record<string, string>;
  return fetch(`${baseUrl}${endpoint}`, { ...options, headers });
};

const authenticatedFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  try {
    // Try primary then fallbacks
    const bases = [API_BASE_URL, ...FALLBACK_BASE_URLS.filter(b => b !== API_BASE_URL)];
    let lastError: any = null;
    for (const base of bases) {
      try {
        const resp = await tryFetch(base, endpoint, options);
        if (resp.ok || resp.status !== 0) return resp;
      } catch (e) {
        lastError = e;
      }
    }
    // If all attempts failed, return mock 503
    return new Response(JSON.stringify({ error: 'Connection failed' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Return a mock response when network fails
    return new Response(JSON.stringify({ error: 'Connection failed' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// API Service Class
export class ApiService {
  static getBaseUrl() {
    return API_BASE_URL;
  }
  // User Management
  static async createUser(userData: {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
  }) {
    const response = await authenticatedFetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    return response.json();
  }

  static async getUserProfile(uid: string) {
    const response = await authenticatedFetch(`/api/profile/${uid}`);

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateUserProfile(uid: string, profileData: any) {
    try {
      const response = await authenticatedFetch(`/api/profile/${uid}`, {
        method: 'POST',
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || response.statusText,
          message: errorData.message || 'Failed to update profile'
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to update profile'
      };
    }
  }

  static async getUserPublicProfile(uid: string) {
    const response = await authenticatedFetch(`/api/profile/${uid}/public`);
    if (!response.ok) {
      throw new Error(`Failed to get public user profile: ${response.statusText}`);
    }
    return response.json();
  }

  // Users (Public)
  static async getAllUsers() {
    // try primary then fallbacks without auth
    const bases = [API_BASE_URL, ...FALLBACK_BASE_URLS.filter(b => b !== API_BASE_URL)];
    let lastErr: any = null;
    for (const base of bases) {
      try {
        const response = await fetch(`${base}/api/users`);
        if (response.ok) return response.json();
        lastErr = new Error(await response.text());
      } catch (e) {
        lastErr = e;
      }
    }
    throw new Error(`Failed to get users: ${lastErr?.message || 'connection failed'}`);
  }

  // Connections
  static async getUserConnections(uid: string) {
    const response = await authenticatedFetch(`/api/connections/${uid}`);

    if (!response.ok) {
      throw new Error(`Failed to get connections: ${response.statusText}`);
    }

    return response.json();
  }

  static async sendConnectionRequest(from: string, to: string) {
    const response = await authenticatedFetch('/api/connections/request', {
      method: 'POST',
      body: JSON.stringify({ from, to }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send connection request: ${response.statusText}`);
    }

    return response.json();
  }

  static async acceptConnectionRequest(from: string, to: string) {
    const response = await authenticatedFetch('/api/connections/accept', {
      method: 'POST',
      body: JSON.stringify({ from, to }),
    });

    if (!response.ok) {
      throw new Error(`Failed to accept connection request: ${response.statusText}`);
    }

    return response.json();
  }

  static async rejectConnectionRequest(from: string, to: string) {
    const response = await authenticatedFetch('/api/connections/reject', {
      method: 'POST',
      body: JSON.stringify({ from, to }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reject connection request: ${response.statusText}`);
    }

    return response.json();
  }

  static async getConnectionRequests(uid: string) {
    const response = await authenticatedFetch(`/api/connections/requests/${uid}`);

    if (!response.ok) {
      throw new Error(`Failed to get connection requests: ${response.statusText}`);
    }

    return response.json();
  }

  // Messages
  static async sendMessage(from: string, to: string, text: string) {
    const response = await authenticatedFetch('/api/messages/send', {
      method: 'POST',
      body: JSON.stringify({ from, to, text }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return response.json();
  }

  static async getMessages(uid1: string, uid2: string) {
    const response = await authenticatedFetch(`/api/messages/${uid1}/${uid2}`);

    if (!response.ok) {
      throw new Error(`Failed to get messages: ${response.statusText}`);
    }

    return response.json();
  }

  static async sendImageMessage(from: string, to: string, file: File) {
    const form = new FormData();
    form.append('from', from);
    form.append('to', to);
    form.append('image', file);
    const response = await postFormWithAuth('/api/messages/send-image', form);
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to send image: ${response.status} ${response.statusText} ${body}`);
    }
    return response.json();
  }

  static async sendFileMessage(from: string, to: string, file: File) {
    const form = new FormData();
    form.append('from', from);
    form.append('to', to);
    form.append('file', file);
    const response = await postFormWithAuth('/api/messages/send-file', form);
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to send file: ${response.status} ${response.statusText} ${body}`);
    }
    return response.json();
  }

  static async forwardMessage(from: string, to: string, messageId: string) {
    const response = await authenticatedFetch('/api/messages/forward', {
      method: 'POST',
      body: JSON.stringify({ from, to, messageId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to forward message: ${response.statusText}`);
    }
    return response.json();
  }

  static async getUnreadCounts(uid: string) {
    const base = getChatApiBaseUrl();
    const token = await getIdToken();
    const response = await fetch(`${base}/api/messages/unread-counts/${uid}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to get unread counts: ${response.statusText}`);
    }
    return response.json();
  }

  static async markMessagesRead(peerId: string) {
    const base = getChatApiBaseUrl();
    const token = await getIdToken();
    const response = await fetch(`${base}/api/messages/${peerId}/read`, {
      method: 'PATCH',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to mark messages read: ${response.statusText}`);
    }
    return response.json();
  }

  // Profile: Certificate image upload
  static async uploadCertificateImage(file: File) {
    const token = await getIdToken();
    const form = new FormData();
    form.append('image', file);
    const response = await fetch(`${API_BASE_URL}/api/profile/certificates/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: form,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || response.statusText);
    }
    return response.json();
  }

  // Health Check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/api`);

      if (!response.ok) {
        return { success: false, error: 'Backend not available' };
      }

      const data = await response.text();
      return { success: true, message: data };
    } catch (error) {
      return { success: false, error: 'Backend connection failed' };
    }
  }
}

// Export individual functions for backward compatibility
export const createUser = ApiService.createUser;
export const getUserProfile = ApiService.getUserProfile;
export const updateUserProfile = ApiService.updateUserProfile;
export const getUserPublicProfile = ApiService.getUserPublicProfile;
export const getAllUsers = ApiService.getAllUsers;
export const getUserConnections = ApiService.getUserConnections;
export const sendConnectionRequest = ApiService.sendConnectionRequest;
export const acceptConnectionRequest = ApiService.acceptConnectionRequest;
export const rejectConnectionRequest = ApiService.rejectConnectionRequest;
export const getConnectionRequests = ApiService.getConnectionRequests;
export const sendMessage = ApiService.sendMessage;
export const getMessages = ApiService.getMessages;
export const healthCheck = ApiService.healthCheck;