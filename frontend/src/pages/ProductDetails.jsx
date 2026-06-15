import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFlag, FaHeart, FaRegHeart, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import { SEO } from '../components';
import { Breadcrumb } from '../components';
import { Button } from '../components';
import { ImageCarousel } from '../components';
import { ProductCard } from '../components';
import { ProfileCard } from '../components';
import { Loader } from '../components';
import { Modal } from '../components';
import { Textarea } from '../components';
import { useProductStore } from '../store';
import { useWishlistStore } from '../store';
import { useAuthStore } from '../store';
import { useNotificationStore } from '../store';
import { reportService } from '../services';
import { formatCurrency, formatDate } from '../utils';
import { buildWhatsappLink } from '../utils';

export default function ProductDetails() {
  const { id } = useParams();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const { currentProduct, related, loading, fetchProduct } = useProductStore();
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const user = useAuthStore((state) => state.user);
  const pushToast = useNotificationStore((state) => state.pushToast);
  useEffect(() => { fetchProduct(id); }, [fetchProduct, id]);
  if (loading || !currentProduct) return <Loader />;
  const wished = ids.includes(currentProduct.id);
  const whatsappLink = buildWhatsappLink({
    number: currentProduct.seller?.whatsappNumber,
    productTitle: currentProduct.title,
  });

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
              {whatsappLink ? (
                <Button
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-0"
                >
                  <FaWhatsapp />
                  Contact Seller
                </Button>
              ) : (
                <p className="rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-500">Seller has not shared WhatsApp number.</p>
              )}
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
