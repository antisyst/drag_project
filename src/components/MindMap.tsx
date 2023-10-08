import React, { useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Category } from './Category';

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    setAddingCategory(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryName.trim() !== '') {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName('');
      setAddingCategory(false);
    }
  };

  const handleCancelCategory = () => {
    setNewCategoryName('');
    setAddingCategory(false);
  };

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  return (
    <div className='main_action'>
      <div className='main_element'>
        <div className='main_categories'>
        <h3>Categories</h3>
        <button onClick={handleAddCategory}><AiOutlinePlus/></button>
      </div>
      </div>
      <div>
        <div className='saved_c_container'>
      {categories.map((category, index) => (
        <Category key={index} name={category} onDelete={() => handleDeleteCategory(index)} />
      ))}
      {addingCategory && (
          <div className='add_category'>
            <div>
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className='add_category_buttons'>
              <button onClick={handleCancelCategory}><AiOutlineClose/></button>
              <button onClick={handleSaveCategory}><BsCheck2/></button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
