import React from 'react';

interface SubcategoryProps {
  name: string;
}

export const Subcategory: React.FC<SubcategoryProps> = ({ name }) => {
  return <div><span className='saved_third_content'>{name}</span></div>;
};
