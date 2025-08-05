import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ onSelectCategory, selectedCategory }) => {
  const categories = ['Tous', 'PHP', 'HTML', 'CSS'];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button 
          key={category} 
          className={selectedCategory === (category === 'Tous' ? 'All' : category) ? 'active' : ''}
          onClick={() => onSelectCategory(category === 'Tous' ? 'All' : category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
