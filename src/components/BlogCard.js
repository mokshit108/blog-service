import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <Link 
          to={`/blog/${post.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;