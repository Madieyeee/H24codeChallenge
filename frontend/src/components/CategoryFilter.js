import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ onSelectCategory }) => {
  const categories = ['All', 'PHP', 'HTML', 'CSS'];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
