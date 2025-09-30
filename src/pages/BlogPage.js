import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { fetchPostsFromWP } from '../services/wordpressApi';
import blogsData from '../data/blogs.json';
import { CONFIG } from '../config';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (CONFIG.USE_WORDPRESS) {
          // Fetch from WordPress
          const wpBlogs = await fetchPostsFromWP();
          
          if (wpBlogs.length > 0) {
            setBlogs(wpBlogs);
            setFilteredBlogs(wpBlogs);
          } else {
            // Fallback to JSON if WordPress returns empty
            setBlogs(blogsData);
            setFilteredBlogs(blogsData);
            setError('Using local data as fallback');
          }
        } else {
          // Use local JSON data
          setBlogs(blogsData);
          setFilteredBlogs(blogsData);
        }
      } catch (err) {
        console.error('Error loading blogs:', err);
        setError('Failed to load blog posts. Using local data.');
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(blog => blog.category === categoryFilter);
    }

    // Tag filter
    if (tagFilter) {
      filtered = filtered.filter(blog => Array.isArray(blog.tags) && blog.tags.includes(tagFilter));
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, categoryFilter, tagFilter]);

  const categories = [...new Set(blogs.map(blog => blog.category))];
  const tags = [...new Set(blogs.flatMap(blog => Array.isArray(blog.tags) ? blog.tags : []))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Loading blog posts...</h2>
        <p className="text-gray-600">Please wait while we fetch the latest posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Our Blog</h1>
        {CONFIG.USE_WORDPRESS && (
          <span className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow">
            <span className="mr-1">✓</span> Live from WordPress
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 text-yellow-800 p-4 mb-6">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>Showing {filteredBlogs.length} of {blogs.length} posts</span>
          {(searchTerm || categoryFilter || tagFilter) && (
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter(''); setTagFilter(''); }}
              className="text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg">No blog posts found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategoryFilter(''); setTagFilter(''); }}
            className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;