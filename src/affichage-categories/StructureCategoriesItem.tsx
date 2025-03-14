import { Categories } from '../models/Categories.ts';
import { useCategoriesStorage } from '../zustand.ts';
import { useToasts } from '../test/ErrorContext.tsx';
import apiFetchDeleteCategories from '../api-fetch-categories/apiFetchDeleteCategorie.ts';

interface Props {
  categorie: Categories;
}

function StructureCategoriesItem({ categorie }: Props) {
  const deleteCategories = useCategoriesStorage(
    (state) => state.deleteCategories,
  );
  const context = useToasts();

  const handleDelete = async () => {
    try {
      await apiFetchDeleteCategories(categorie.id);
      deleteCategories(categorie);
    } catch (error) {
      console.error('Error deleting todo', error);
      context.pushToast('Error deleting category');
    }
  };

  return (
    <ul className="ulCategoriesPartie">
      <li className="liElementCategories">
        <p style={{ color: categorie.color }}>{categorie.title}</p>
      </li>
      <button onClick={handleDelete} className="buttonDelete">
        delete
      </button>
    </ul>
  );
}

export default StructureCategoriesItem;
