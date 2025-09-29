import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogsData from '../data/blogs.json';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogsData.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>
          
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="text-gray-500">{post.date}</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;