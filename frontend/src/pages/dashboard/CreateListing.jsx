import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import ProductCard from '../../components/ProductCard';
import { categories, locations } from '../../constants/categories';
import { useProductStore } from '../../store/productStore';
import { priceValidation, required } from '../../utils/validators';

export default function CreateListing() {
  const [imageText, setImageText] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { category: 'books', location: locations[0] } });
  const createProduct = useProductStore((state) => state.createProduct);
  const navigate = useNavigate();
  const images = useMemo(() => imageText.split('\n').map((item) => item.trim()).filter(Boolean), [imageText]);
  const preview = { id: 'preview', title: watch('title') || 'Listing title', price: Number(watch('price')) || 0, category: watch('category') || 'books', seller: { name: 'You' }, postedAt: new Date().toISOString(), images: images.length ? images : ['https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80'] };
  const onSubmit = async (data) => { const product = await createProduct({ ...data, images }); navigate(`/products/${product.id}`); };
  return (
    <div>
      <SEO title="Create Listing" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Create Listing</h1>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit(onSubmit)} className="surface grid gap-4 rounded-md p-5">
          <Input label="Title" {...register('title', required('Title'))} error={errors.title?.message} />
          <Textarea label="Description" {...register('description', required('Description'))} error={errors.description?.message} />
          <Input label="Price" type="number" {...register('price', priceValidation)} error={errors.price?.message} />
          <Select label="Category" {...register('category')}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
          <Select label="Location" {...register('location')}>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</Select>
          <Textarea label="Multiple Images" placeholder="Paste one image URL per line" value={imageText} onChange={(event) => setImageText(event.target.value)} />
          <Button type="submit">Publish Listing</Button>
        </form>
        <div><p className="mb-3 font-bold text-secondary">Preview</p><ProductCard product={preview} /></div>
      </div>
    </div>
  );
}
