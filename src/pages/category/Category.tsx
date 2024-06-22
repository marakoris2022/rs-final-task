import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryIdByName } from '../../services/getCategoryNameById';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useEffect } from 'react';

export const Category = () => {
  const { data } = useParams();
  const navigate = useNavigate();

  const categoryId = getCategoryIdByName(data!);

  const clearCategories = useCategoryStore((state) => state.clearCategories);
  const addCategories = useCategoryStore((state) => state.addCategories);

  useEffect(() => {
    if (categoryId) {
      clearCategories();
      addCategories([categoryId]);
    }
    navigate(`/`);
  }, [categoryId]);

  return <div>Loading page... {data}</div>;
};
