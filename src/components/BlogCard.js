import React from 'react';
import { Link } from 'react-router-dom';

// Accept either `blog` or legacy `post` prop, and guard against missing fields
const BlogCard = ({ blog, post }) => {
  const item = blog || post || {};
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const imageSrc = item.image || 'https://via.placeholder.com/800x400?text=Blog+Image';
  const titleText = item.title || 'Untitled';
  const excerptText = item.excerpt || '';
  const categoryText = item.category || 'General';
  const dateText = item.date || '';
  const id = item.id != null ? item.id : '';
  const slug = item.slug || '';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={imageSrc}
        alt={titleText}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{titleText}</h3>
        {excerptText && <p className="text-gray-600 mb-4">{excerptText}</p>}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {categoryText}
          </span>
          {dateText && <span className="text-gray-500 text-sm">{dateText}</span>}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/blog/${slug || id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;