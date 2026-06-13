import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateListing from './CreateListing';
import { useProductStore } from '../../store/productStore';

export default function EditListing() {
  const { id } = useParams();
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  useEffect(() => { fetchProduct(id); }, [fetchProduct, id]);
  return <CreateListing />;
}
