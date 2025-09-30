import { CONFIG } from '../config';

// WordPress API Configuration
const WP_BASE_URL = CONFIG.API_BASE;

// Fetch Services from WordPress
export const fetchServicesFromWP = async () => {
  try {
    const response = await fetch(`${WP_BASE_URL}/services?_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const services = await response.json();
    
    function extractFieldFromHtml(html, field) {
      if (!html) return undefined;
      // Match: Price: 1500. or Price: ₹2500. or Category: Wellness.
      const regex = new RegExp(`${field}:\\s*([^.<]+)`, 'i');
      const match = html.match(regex);
      return match ? match[1].replace(/[\\s.]+$/, '').trim() : undefined;
    }

    return services.map(service => {
      // Try meta, then root, then parse from excerpt/content
      const price = service.meta?.price || service.price || extractFieldFromHtml(service.excerpt?.rendered, 'Price') || extractFieldFromHtml(service.content?.rendered, 'Price') || '₹0';
      const category = service.meta?.category || service.category || extractFieldFromHtml(service.excerpt?.rendered, 'Category') || extractFieldFromHtml(service.content?.rendered, 'Category') || 'General';
      return {
        id: service.id,
        slug: service.slug,
        title: service.title?.rendered ?? '',
        description: (service.excerpt?.rendered || '').replace(/<[^>]*>/g, '').trim(),
        price,
        image: service._embedded?.['wp:featuredmedia']?.[0]?.source_url || service.featured_image_url || 'https://via.placeholder.com/400',
        category
      };
    });
  } catch (error) {
    console.error('Error fetching services from WordPress:', error);
    return [];
  }
};

// Fetch Blog Posts from WordPress
export const fetchPostsFromWP = async () => {
  try {
    const response = await fetch(`${WP_BASE_URL}/posts?_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await response.json();
    
    // Transform WordPress data to match your app's format
    return posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered ?? '',
      excerpt: (post.excerpt?.rendered || '').replace(/<[^>]*>/g, '').trim(),
      content: post.content?.rendered || '',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.featured_image_url || 'https://via.placeholder.com/400',
      category: 'Blog',
      tags: []
    }));
  } catch (error) {
    console.error('Error fetching posts from WordPress:', error);
    return [];
  }
};

// Fetch Single Post by ID
export const fetchSinglePost = async (id) => {
  try {
    const response = await fetch(`${WP_BASE_URL}/posts/${id}?_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const post = await response.json();
    
    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered ?? '',
      excerpt: (post.excerpt?.rendered || '').replace(/<[^>]*>/g, '').trim(),
      content: post.content?.rendered || '',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.featured_image_url || 'https://via.placeholder.com/400',
      category: 'Blog',
      tags: []
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Fetch single post by slug
export const fetchPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${WP_BASE_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch post by slug');
    }
    const posts = await response.json();
    const post = posts?.[0];
    if (!post) return null;
    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered ?? '',
      excerpt: (post.excerpt?.rendered || '').replace(/<[^>]*>/g, '').trim(),
      content: post.content?.rendered || '',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400',
      category: 'Blog',
      tags: []
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

// Fetch single service by slug
export const fetchServiceBySlug = async (slug) => {
  try {
    const response = await fetch(`${WP_BASE_URL}/services?slug=${encodeURIComponent(slug)}&_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch service by slug');
    }
    const services = await response.json();
    const service = services?.[0];
    if (!service) return null;
    function extractFieldFromHtml(html, field) {
      if (!html) return undefined;
      // Match: Price: 1500. or Price: ₹2500. or Category: Wellness.
      const regex = new RegExp(`${field}:\\s*([^.<]+)`, 'i');
      const match = html.match(regex);
      return match ? match[1].replace(/[\\s.]+$/, '').trim() : undefined;
    }

    return {
      id: service.id,
      slug: service.slug,
      title: service.title?.rendered ?? '',
      description: (service.excerpt?.rendered || '').replace(/<[^>]*>/g, '').trim(),
      content: service.content?.rendered || '',
      price: service.meta?.price || service.price || extractFieldFromHtml(service.excerpt?.rendered, 'Price') || extractFieldFromHtml(service.content?.rendered, 'Price') || '₹0',
      image: service._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400',
      category: service.meta?.category || service.category || extractFieldFromHtml(service.excerpt?.rendered, 'Category') || extractFieldFromHtml(service.content?.rendered, 'Category') || 'General'
    };
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return null;
  }
};