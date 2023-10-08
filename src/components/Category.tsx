import React, { useState } from 'react';
import { Subcategory } from './Subcategory';
import { MdEdit } from 'react-icons/md';
import { BsCheck2 } from 'react-icons/bs';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

interface CategoryProps {
  name: string;
  onDelete: () => void;
}

export const Category: React.FC<CategoryProps> = ({ name, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(name);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [addingSubcategory, setAddingSubcategory] = useState(false);
  const [subcategoryType, setSubcategoryType] = useState<string | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingSubcategoryIndex, setEditingSubcategoryIndex] = useState<number | null>(null);

  const handleEdit = () => {
    setEditing(true);
    setAddingSubcategory(false);
    setEditingSubcategoryIndex(null);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleAddSubcategory = () => {
    setAddingSubcategory(true);
    setEditing(false);
  };

  const handleSelectSubcategoryType = (type: string) => {
    setSubcategoryType(type);
    setNewSubcategoryName('');
    setAddingSubcategory(false); 
  };

  const handleSaveSubcategory = () => {
    if (subcategoryType && newSubcategoryName.trim() !== '') {
      if (editingSubcategoryIndex !== null) {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[editingSubcategoryIndex] = newSubcategoryName;
        setSubcategories(updatedSubcategories);
        setEditingSubcategoryIndex(null);
      } else {
        setSubcategories([...subcategories, newSubcategoryName]);
      }
      setAddingSubcategory(false);
      setSubcategoryType(null);
      setNewSubcategoryName('');
    }
  };

  const handleCancelSubcategory = () => {
    setAddingSubcategory(false);
    setSubcategoryType(null);
    setNewSubcategoryName('');
    setEditingSubcategoryIndex(null);
  };

  const handleEditSubcategory = (index: number) => {
    setEditingSubcategoryIndex(index);
    setSubcategoryType('subcategory');
    setNewSubcategoryName(subcategories[index]);
    setAddingSubcategory(true);
  };

  const handleDeleteSubcategory = (index: number) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories.splice(index, 1);
    setSubcategories(updatedSubcategories);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      {editing ? (
        <div className="edit_actions">
          <div>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="edit_buttons">
            <button onClick={handleSave}>
              <BsCheck2 />
            </button>
            <button onClick={handleCancel}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="saved_category">
            <div className="saved_content">
              <span>{categoryName}</span>
            </div>
            <div className="saved_element_buttons">
              <button onClick={handleEdit}>
                <MdEdit />
              </button>
              <button onClick={handleDelete}>
                <AiOutlineClose />
              </button>
              <button onClick={handleAddSubcategory}>
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          {addingSubcategory && (
            <div className="subcategory_selection">
              <h3>What do you want to create?</h3>
                <div className="selection_buttons">
                    <button onClick={() => handleSelectSubcategoryType('category')}>
                    Category
                </button>
                <button onClick={() => handleSelectSubcategoryType('service')}>
                    Service
                </button>
                </div>
            </div>
          )}
          <div>
          {subcategoryType && (
            <div className='saved_third_element'>
              <input
                type="text"
                placeholder={`Enter ${subcategoryType} name`}
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
              />
                <button onClick={handleCancelSubcategory} style={{background: "red"}}>
                    <AiOutlineClose />
                </button>
                <button onClick={handleSaveSubcategory} style={{background: "#159947"}}>
                   <BsCheck2/>
                </button>
            </div>
          )}
          </div>
          <div className='saved_third_elements_container'>
          {subcategories.map((subcategory, index) => (
            <div key={index}  className='third_element_saved'>
              {editingSubcategoryIndex === index ? (
                <div></div>
              ) : (
                <div className='third_element_cc_container'>
                <div className='third_element_conf'>
                  <Subcategory name={subcategory} />
                  <button onClick={() => handleEditSubcategory(index)} style={{background: "#131313"}}>
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDeleteSubcategory(index)} style={{background: "var(--color-main)"}}>
                    <AiOutlineClose />
                  </button>
                </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};
