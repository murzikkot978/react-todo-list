import { useCategoriesStorage } from '../zustand.ts';
import React, { useState } from 'react';
import { useToasts } from '../test/ErrorContext.tsx';
import apiFetchPostCategories from '../api-fetch-categories/apiFetchPostCategories.ts';
import apiFetchDeleteAllCategories from '../api-fetch-categories/apiFetchDeleteAllCategories.ts';

function InputpartieCategories() {
  const addCategoris = useCategoriesStorage((state) => state.addCategories);
  const deleteAllCategories = useCategoriesStorage(
    (state) => state.deleteAllCategories,
  );
  const [status, setStatus] = useState('typing');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [categoriesColor, setCategoriesColor] = useState('');
  const context = useToasts();

  async function handleSubmit() {
    setStatus('submitting');
    try {
      const newCategorie = await apiFetchPostCategories(
        categoriesInput,
        categoriesColor,
      );
      addCategoris([newCategorie]);
      setStatus('success');
      setCategoriesInput('');
      setCategoriesColor('');
    } catch (err: unknown) {
      console.error(err);
      setStatus('typing');
      context.pushToast('Can not add categorie');
    }
  }

  function handleInputCategorieChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoriesInput(e.target.value);
  }

  function handleInputColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoriesColor(e.target.value);
  }

  const handleDeleteAllCategories = async () => {
    try {
      await apiFetchDeleteAllCategories();
      deleteAllCategories();
    } catch (err) {
      console.error(err);
      context.pushToast('Can not delete all categories');
    }
  };

  return (
    <>
      <form className="divInputPartie">
        <input
          value={categoriesInput}
          onChange={handleInputCategorieChange}
          disabled={status === 'submitting'}
          className="inputCatogories"
          type="text"
        />
        <input
          value={categoriesColor}
          onChange={handleInputColorChange}
          className="inputCategoriesColor"
          type="color"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={categoriesInput.length === 0 || status === 'submitting'}
          className="addTodo"
        >
          addCategorie
        </button>
      </form>
      <button onClick={handleDeleteAllCategories} className="deleteAll">
        Delete all
      </button>
    </>
  );
}

export default InputpartieCategories;
