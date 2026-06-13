import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Loader from '../../components/Loader';
import { categories, locations } from '../../constants/categories';
import { useProductStore } from '../../store/productStore';
import { useNotificationStore } from '../../store/notificationStore';
import { priceValidation, required } from '../../utils/validators';
import { fieldErrors } from '../../utils/apiErrors';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { currentProduct, loading, fetchProduct, updateProduct } = useProductStore();
  const pushToast = useNotificationStore((state) => state.pushToast);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  useEffect(() => {
    fetchProduct(id).then((product) => {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        location: product.location,
      });
    }).catch((err) => pushToast({ message: err.message }));
  }, [fetchProduct, id, pushToast, reset]);

  const onSubmit = async (data) => {
    try {
      const product = await updateProduct(id, { ...data, images });
      navigate(`/products/${product.id}`);
    } catch (err) {
      Object.entries(fieldErrors(err)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      pushToast({ message: err.message });
    }
  };

  if (loading || !currentProduct) return <Loader />;

  return (
    <div>
      <SEO title="Edit Listing" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Edit Listing</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface grid max-w-3xl gap-4 rounded-md p-5">
        <Input label="Title" {...register('title', required('Title'))} error={errors.title?.message} />
        <Textarea label="Description" {...register('description', required('Description'))} error={errors.description?.message} />
        <Input label="Price" type="number" {...register('price', priceValidation)} error={errors.price?.message} />
        <Select label="Category" {...register('category')}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
        <Select label="Location" {...register('location')}>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</Select>
        <Input label="Replace images" type="file" accept="image/*" multiple onChange={(event) => setImages(Array.from(event.target.files || []).slice(0, 6))} />
        <Button type="submit">Save Listing</Button>
      </form>
    </div>
  );
}
