import { useCategoriesStorage } from '../zustand.ts';
import { Categories } from '../models/Categories.ts';
import StructureCategoriesItem from './StructureCategoriesItem.tsx';

function CategoriesPartie() {
  const categories = useCategoriesStorage((state) => state.categories);

  return (
    <div className="divUlCategoriesPart">
      {categories.map((t: Categories) => (
        <StructureCategoriesItem key={t.id} categorie={t} />
      ))}
    </div>
  );
}

export default CategoriesPartie;
