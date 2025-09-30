import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSinglePost, fetchPostBySlug } from '../services/wordpressApi';
import blogsData from '../data/blogs.json';
import { CONFIG } from '../config';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (CONFIG.USE_WORDPRESS) {
          // Fetch from WordPress by slug (preferred)
          const wpBlog = await fetchPostBySlug(slug);
          
          if (wpBlog) {
            setBlog(wpBlog);
          } else {
            // Fallback to JSON
            const localBlog = blogsData.find(b => b.slug === slug || String(b.id) === String(slug));
            setBlog(localBlog);
            if (!localBlog) {
              setError('Blog post not found');
            }
          }
        } else {
          // Use local JSON data
          const localBlog = blogsData.find(b => b.slug === slug || String(b.id) === String(slug));
          setBlog(localBlog);
          if (!localBlog) {
            setError('Blog post not found');
          }
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
        // Try fallback
        const localBlog = blogsData.find(b => b.slug === slug || String(b.id) === String(slug));
        setBlog(localBlog);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Blog post not found</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link to="/blog" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/blog" className="inline-block mb-8 text-blue-600 hover:underline text-sm">← Back to Blog</Link>
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={blog.image || 'https://via.placeholder.com/1200x500?text=Blog+Image'}
          alt={blog.title || 'Blog image'}
          className="w-full max-h-[400px] object-cover rounded-t-lg"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

          {(blog.category || (Array.isArray(blog.tags) && blog.tags.length)) && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {blog.category && (
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Category: {blog.category}</span>
              )}
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div
            className="prose max-w-none text-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;