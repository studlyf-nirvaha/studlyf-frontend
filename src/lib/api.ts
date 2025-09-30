import { auth } from './firebase';

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // If VITE_API_BASE_URL is set, use it
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Use Flask backend for all API calls
  return 'http://localhost:5001';
};

const API_BASE_URL = getApiBaseUrl();

const getIdToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  } catch (error) {
    return null;
  }
};

const authenticatedFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  try {
    const token = await getIdToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If backend is not available, return a mock response
    if (!response.ok && response.status === 0) {
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return response;
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
    const response = await fetch(`${API_BASE_URL}/api/users`);

    if (!response.ok) {
      throw new Error(`Failed to get users: ${response.statusText}`);
    }

    return response.json();
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