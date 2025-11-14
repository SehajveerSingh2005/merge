// Custom hook for GitHub projects data
import { useState, useEffect, useRef } from 'react';

// Define types for GitHub project data
interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
  size: number;
  open_issues_count?: number;
}

interface GitHubProjectResponse {
  items: GitHubProject[];
  total_count: number;
  incomplete_results: boolean;
}

interface GitHubProjectsHook {
  projects: GitHubProject[];
  loading: boolean;
  error: string | null;
  fetchProjects: (limit?: number, language?: string, query?: string, page?: number) => Promise<void>;
}

/**
 * Custom hook to fetch GitHub projects
 */
export const useGitHubProjects = (): GitHubProjectsHook => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a debounced version of fetchProjects to prevent too many API calls
  // For now, we'll just cache the last successful result for 5 minutes
  const lastFetchTime = useRef<number | null>(null);
  const cachedProjects = useRef<GitHubProject[]>([]);

  const fetchProjects = async (limit: number = 12, language?: string, query?: string, page: number = 1) => {
    // Check if we have a cached result that's less than 5 minutes old
    const now = Date.now();
    if (cachedProjects.current.length > 0 && lastFetchTime.current &&
        (now - lastFetchTime.current) < 5 * 60 * 1000) { // 5 minutes in milliseconds
      // Use cached data if it's recent
      setProjects(cachedProjects.current);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Construct the search query - make it more specific to avoid hitting limits with generic requests
      let searchQuery = 'is:project is:open-source';

      if (language) {
        searchQuery += ` language:${language}`;
      } else {
        // If no language is specified, add a more specific search to return relevant results
        searchQuery += ' stars:>100'; // Only fetch projects with more than 100 stars
      }

      if (query) {
        searchQuery += ` ${query}`;
      } else if (!language) {
        // If no specific query or language, add a trending sort to get popular projects
        searchQuery += ' created:>2023-01-01';  // Recent projects
      }

      // Build the API URL with parameters
      const params = new URLSearchParams({
        q: searchQuery,
        sort: 'stars',
        order: 'desc',
        per_page: limit.toString(),
        page: page.toString(),
      });

      const url = `https://api.github.com/search/repositories?${params}`;

      // Add headers to avoid rate limiting
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Merge-App'
      };

      // Check if we have a GitHub token in environment or localStorage
      const githubToken = typeof window !== 'undefined'
        ? localStorage.getItem('github_token')
        : undefined;

      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 403 || response.status === 429) {
          console.warn('GitHub API rate limit reached. Using cached data.');
          // Use cached data if available
          if (cachedProjects.current.length > 0) {
            setProjects(cachedProjects.current);
          } else {
            setProjects([]);
          }
          return;
        }
        throw new Error(`GitHub API request failed with status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform the data to match our needs
      const fetchedProjects: GitHubProject[] = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        full_name: item.full_name,
        description: item.description || 'No description provided',
        html_url: item.html_url,
        stargazers_count: item.stargazers_count,
        forks_count: item.forks_count,
        language: item.language,
        created_at: item.created_at,
        updated_at: item.updated_at,
        owner: {
          login: item.owner.login,
          avatar_url: item.owner.avatar_url,
          html_url: item.owner.html_url,
        },
        topics: item.topics || [],
        size: item.size,
        open_issues_count: item.open_issues_count,
      }));

      setProjects(fetchedProjects);
      // Cache the successful result
      cachedProjects.current = fetchedProjects;
      lastFetchTime.current = now;
    } catch (err) {
      console.error('Error fetching GitHub projects:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching GitHub projects');

      // If we have cached data, use it instead of showing error
      if (cachedProjects.current.length > 0) {
        setProjects(cachedProjects.current);
      } else {
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
  };
};