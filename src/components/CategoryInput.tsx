import React, { useState, useEffect } from 'react';
import { BsPlus, BsCheckLg } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

interface CategoryInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: (name: string) => void;
    onCancel: () => void;
  }
  
  const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChange, onAdd, onCancel }) => {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    useEffect(() => {
      setInputValue(value);
    }, [value]);
  
    const handleAdd = () => {
      if (inputValue.trim() !== '') {
        onAdd(inputValue);
        setEditing(false);
      }
    };
  
    const handleCancel = () => {
      setEditing(false);
      onCancel();
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange(e);
    };


  return (
    <div className="new-category">
        <div className='main_action'>
            <h2>Categories</h2>
          <button onClick={() => setEditing(true)}>
            <BsPlus/>
          </button>
        </div>
      {editing && (
       <div className="category-input">
            <input type="text" value={inputValue} onChange={handleInputChange} className='input_action' />
            <div className='input_buttons'>
                <button onClick={handleCancel}><AiOutlineClose/></button>
                <button onClick={handleAdd}><BsCheckLg/></button>
            </div>
     </div>
      )}
    </div>
  );
};

export default CategoryInput;
