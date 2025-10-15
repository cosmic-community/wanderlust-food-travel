// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    twitter?: string;
    instagram?: string;
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Post type
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    excerpt?: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    published_date?: string;
    author?: Author;
    category?: Category;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guard for Post
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

// Type guard for Author
export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

// Type guard for Category
export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}