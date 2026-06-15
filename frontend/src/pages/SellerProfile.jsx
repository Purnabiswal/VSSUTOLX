import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../components';
import { ProductCard } from '../components';
import { ProfileCard } from '../components';
import { Loader } from '../components';
import { userService } from '../services';
import { Button } from '../components';
import { buildWhatsappLink } from '../utils';

export default function SellerProfile() {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    Promise.all([userService.getSeller(id), userService.getSellerListings(id)]).then(([sellerData, listingData]) => {
      setSeller(sellerData);
      setListings(listingData);
    });
  }, [id]);
  if (!seller) return <Loader />;
  const whatsappLink = buildWhatsappLink({ number: seller.whatsappNumber, productTitle: 'one of your listings' });
  return (
    <section className="container-page py-8">
      <SEO title={seller.name} />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <ProfileCard user={seller} action="Seller Profile" />
          {whatsappLink ? (
            <Button as="a" href={whatsappLink} target="_blank" rel="noreferrer" className="w-full">Contact Seller on WhatsApp</Button>
          ) : (
            <p className="surface rounded-md p-4 text-sm font-semibold text-slate-500">Seller has not shared WhatsApp number.</p>
          )}
        </div>
        <div>
          <h1 className="mb-5 text-2xl font-extrabold text-secondary">{seller.name}'s Listings</h1>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{listings.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </div>
    </section>
  );
}
