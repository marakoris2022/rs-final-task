import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryIdByName } from '../../services/getCategoryNameById';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useEffect } from 'react';

export const Category = () => {
  const { data } = useParams();
  const navigate = useNavigate();

  const catId = getCategoryIdByName(data!);

  const clearCategories = useCategoryStore((state) => state.clearCategories);
  const addCategories = useCategoryStore((state) => state.addCategories);

  useEffect(() => {
    if (catId) {
      clearCategories();
      addCategories([catId]);
    }
    navigate(`/`);
  }, [catId]);

  return <div>Loading page... {data}</div>;
};
