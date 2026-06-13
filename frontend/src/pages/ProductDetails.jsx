import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFlag, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/ProductCard';
import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Textarea from '../components/Textarea';
import { useProductStore } from '../store/productStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { useChatStore } from '../store/chatStore';
import { reportService } from '../services/reportService';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const { currentProduct, related, loading, fetchProduct } = useProductStore();
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const user = useAuthStore((state) => state.user);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const createConversation = useChatStore((state) => state.createConversation);
  useEffect(() => { fetchProduct(id); }, [fetchProduct, id]);
  if (loading || !currentProduct) return <Loader />;
  const wished = ids.includes(currentProduct.id);
  const sellerId = currentProduct.seller?.id || currentProduct.seller?._id;

  const requireAuth = () => {
    if (user) return true;
    pushToast({ message: 'Unauthorized. Please login.' });
    return false;
  };

  const handleWishlist = async () => {
    if (!requireAuth()) return;
    try {
      const result = await toggle(currentProduct.id);
      pushToast({ message: result.added ? 'Added to wishlist' : 'Removed from wishlist' });
    } catch (error) {
      pushToast({ message: error.message });
    }
  };

  const handleShare = async () => {
    const url = globalThis.location.href;
    try {
      if (globalThis.navigator?.share) {
        await globalThis.navigator.share({ title: currentProduct.title, text: currentProduct.description, url });
        return;
      }
      await globalThis.navigator.clipboard.writeText(url);
      pushToast({ message: 'Product link copied' });
    } catch (error) {
      if (error.name !== 'AbortError') pushToast({ message: error.message || 'Unable to share product' });
    }
  };

  const handleChat = async () => {
    if (!requireAuth()) return;
    if (!sellerId) {
      pushToast({ message: 'Seller information is unavailable' });
      return;
    }
    try {
      const conversation = await createConversation({ participantId: sellerId, productId: currentProduct.id });
      navigate(`/dashboard/messages/${conversation.id}`);
    } catch (error) {
      pushToast({ message: error.message });
    }
  };

  const handleReport = async (event) => {
    event.preventDefault();
    if (!requireAuth()) return;
    setSubmittingReport(true);
    try {
      await reportService.createReport({ product: currentProduct.id, reason: reportReason });
      setReportOpen(false);
      setReportReason('');
      pushToast({ message: 'Report submitted' });
    } catch (error) {
      pushToast({ message: error.message });
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <section className="container-page py-8">
      <SEO title={currentProduct.title} description={currentProduct.description} image={currentProduct.images[0]} />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: currentProduct.title }]} />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div><ImageCarousel images={currentProduct.images} /></div>
        <aside className="space-y-5">
          <div className="surface rounded-md p-5">
            <p className="text-sm font-semibold uppercase text-primary">{currentProduct.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-secondary">{currentProduct.title}</h1>
            <p className="mt-2 text-3xl font-extrabold text-primary">{formatCurrency(currentProduct.price)}</p>
            <p className="mt-4 text-sm text-slate-500">{currentProduct.location} · Posted {formatDate(currentProduct.postedAt)} · {currentProduct.status}</p>
            <p className="mt-5 text-slate-600">{currentProduct.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={handleWishlist}>{wished ? <FaHeart /> : <FaRegHeart />} {wished ? 'Wishlisted' : 'Wishlist'}</Button>
              <Button onClick={handleChat} variant="secondary">Chat Seller</Button>
              <Button onClick={handleShare} variant="outline"><FaShareAlt /> Share</Button>
              <Button onClick={() => (requireAuth() ? setReportOpen(true) : undefined)} variant="outline"><FaFlag /> Report</Button>
            </div>
          </div>
          <ProfileCard user={currentProduct.seller} action="Seller Profile" />
        </aside>
      </div>
      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-extrabold text-secondary">Related Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
      <Modal open={reportOpen} title="Report Listing" onClose={() => setReportOpen(false)}>
        <form onSubmit={handleReport} className="grid gap-4">
          <Textarea label="Reason" value={reportReason} onChange={(event) => setReportReason(event.target.value)} placeholder="Describe the issue with this listing" required minLength={5} maxLength={500} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setReportOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={submittingReport}>{submittingReport ? 'Submitting...' : 'Submit Report'}</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
