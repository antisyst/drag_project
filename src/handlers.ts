import { SetStateAction, Dispatch } from 'react';

interface Category {
  id: number;
  name: string;
  saved?: boolean;
  items?: { id: number; name: string }[];
}

export const handleAddCategory = (
  newCategoryName: string,
  setCategories: Dispatch<SetStateAction<Category[]>>,
  setNewCategoryName: Dispatch<SetStateAction<string>>,
) => {
  if (newCategoryName.trim() !== '') {
    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName.trim(),
      saved: true,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setNewCategoryName('');
  }
};

export const handleEditCategory = (
  categoryId: number,
  setCategories: Dispatch<SetStateAction<Category[]>>,
  setSelectedCategoryId: Dispatch<SetStateAction<number | null>>,
) => {
  setSelectedCategoryId(categoryId);
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === categoryId ? { ...category, saved: false } : category
    )
  );
};

export const handleSaveEditCategory = (
  categoryId: number,
  editedName: string,
  setCategories: Dispatch<SetStateAction<Category[]>>,
) => {
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === categoryId
        ? { ...category, name: editedName, saved: true }
        : category
    )
  );
};

export const handleCancelEditCategory = (
  categoryId: number,
  setCategories: Dispatch<SetStateAction<Category[]>>,
) => {
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === categoryId ? { ...category, saved: true } : category
    )
  );
};

export const handleDeleteCategory = (
  categoryId: number,
  setCategories: Dispatch<SetStateAction<Category[]>>,
) => {
  setCategories((prevCategories) =>
    prevCategories.filter((category) => category.id !== categoryId)
  );
};

export const handleCancelCategory = (setNewCategoryName: Dispatch<SetStateAction<string>>) => {
  console.log('Adding category canceled');
  setNewCategoryName('');
};

export const handleSaveNewItem = (
  name: string,
  selectedCategoryId: number | null,
  setCategories: Dispatch<SetStateAction<Category[]>>,
  setSelectedCategoryId: Dispatch<SetStateAction<number | null>>,
) => {
  if (selectedCategoryId !== null) {
    const newId = Date.now();
    const newItem: { id: number; name: string } = {
      id: newId,
      name,
    };

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === selectedCategoryId
          ? {
              ...category,
              saved: true,
              items: [...(category.items || []), newItem],
            }
          : category
      )
    );

    setSelectedCategoryId(null);
  }
};
