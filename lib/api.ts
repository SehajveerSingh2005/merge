// API client for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  name: string;
  username: string;
  email?: string; // Made optional
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUsername?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  language?: string;
  stars: number;
  forks: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
  _count: {
    likes: number;
    comments: number;
  };
  isLiked?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
  tags: string[];
  readTime?: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  _count: {
    likes: number;
    comments: number;
  };
  isLiked?: boolean;
}

export interface FeedItem {
  id: string;
  type: 'project' | 'blog' | 'news';
  title: string;
  description: string;
  author: User;
  stats: any;
  tags: string[];
  timeAgo: string;
  featured: boolean;
  [key: string]: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// API Client class
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Get token from localStorage or cookies if available
    if (typeof window !== 'undefined') {
      // First check localStorage
      this.token = localStorage.getItem('auth_token');
      
      // If not in localStorage, check cookies
      if (!this.token) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'auth_token') {
            this.token = value;
            break;
          }
        }
      }
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      // Also set token in cookie
      document.cookie = `auth_token=${token}; path=/; max-age=60480; secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}; samesite=lax`;
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      // Also clear token from cookie
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax';
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as any).Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData: { email: string; password: string; username: string; name: string }) {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async githubAuth() {
    // Redirect to GitHub OAuth endpoint
    window.location.href = `${this.baseUrl}/auth/github`;
  }

  async githubCallback(token: string, user: User) {
    // Set token and user after GitHub OAuth
    this.setToken(token);
    return { user, token };
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  async logout() {
    this.clearToken();
  }

  // Feed
  async getFeed(params?: { page?: number; limit?: number; type?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.type) searchParams.set('type', params.type);

    const query = searchParams.toString();
    return this.request<{ items: FeedItem[]; pagination: any }>(`/feed${query ? `?${query}` : ''}`);
  }

  async getTrendingTags() {
    return this.request<{ tags: Array<{ name: string; count: number }> }>('/feed/trending');
  }

  // Projects
  async getProjects(params?: { page?: number; limit?: number; search?: string; tag?: string; featured?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.featured) searchParams.set('featured', 'true');

    const query = searchParams.toString();
    return this.request<{ projects: Project[]; pagination: any }>(`/projects${query ? `?${query}` : ''}`);
  }

  async getProject(id: string) {
    return this.request<Project>(`/projects/${id}`);
  }

  async createProject(projectData: Partial<Project>) {
    return this.request<{ project: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async likeProject(id: string) {
    return this.request<{ liked: boolean; message: string }>(`/projects/${id}/like`, {
      method: 'POST',
    });
  }

  // Blog Posts (Insights)
  async getBlogPosts(params?: { page?: number; limit?: number; search?: string; tag?: string; type?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.type) searchParams.set('type', params.type);

    const query = searchParams.toString();
    return this.request<{ posts: BlogPost[]; pagination: any }>(`/blogs${query ? `?${query}` : ''}`);
  }

  async getBlogPost(id: string) {
    return this.request<BlogPost>(`/blogs/${id}`);
  }

  async createBlogPost(postData: Partial<BlogPost>) {
    return this.request<{ post: BlogPost }>('/blogs', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likeBlogPost(id: string) {
    return this.request<{ liked: boolean; message: string }>(`/blogs/${id}/like`, {
      method: 'POST',
    });
  }

  // Users
  async getUser(username: string) {
    return this.request<User>(`/users/${username}`);
  }

  async followUser(username: string) {
    return this.request<{ following: boolean; message: string }>(`/users/${username}/follow`, {
      method: 'POST',
    });
  }

  async updateProfile(userData: Partial<User>) {
    return this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Notifications
  async getNotifications(params?: { page?: number; limit?: number; unread?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.unread) searchParams.set('unread', 'true');

    const query = searchParams.toString();
    return this.request<{ notifications: any[]; unreadCount: number; pagination: any }>(`/notifications${query ? `?${query}` : ''}`);
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Messages
  async getConversations() {
    return this.request<{ conversations: any[] }>('/messages/conversations');
  }

  async getMessages(userId: string, params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const query = searchParams.toString();
    return this.request<{ messages: any[]; otherUser: User; pagination: any }>(`/messages/${userId}${query ? `?${query}` : ''}`);
  }

  async sendMessage(receiverId: string, content: string) {
    return this.request<{ message: any }>('/messages', {
      method: 'POST',
      body: JSON.stringify({ receiverId, content }),
    });
  }

  async getUnreadMessageCount() {
    return this.request<{ count: number }>('/messages/unread/count');
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL);

// Utility functions
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
};

export const transformFeedItem = (item: any): FeedItem => {
  // Ensure tags is always an array
  const tags = Array.isArray(item.tags) ? item.tags : [];
  
  // Handle different data structures from API
  const stats = item.stats || {
    stars: item.stars || 0,
    forks: item.forks || 0,
    likes: item._count?.likes || 0,
    comments: item._count?.comments || 0,
    points: item.points || 0,
    readTime: item.readTime ? `${item.readTime} min read` : undefined
  };

  return {
    ...item,
    tags,
    stats,
    timeAgo: formatTimeAgo(item.createdAt),
    description: item.description || item.excerpt || (item.content ? item.content.substring(0, 200) + '...' : ''),
    author: item.author || {
      name: item.author?.name || 'Unknown',
      username: item.author?.username || 'unknown',
      avatar: item.author?.image || '/api/placeholder/40/40'
    }
  };
};