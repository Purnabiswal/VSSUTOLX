import { useEffect, useState } from 'react';
import { FaBell, FaHeart, FaList, FaEnvelope } from 'react-icons/fa';
import SEO from '../../components/SEO';
import Button from '../../components/Button';
import { productService } from '../../services/productService';
import { useAuthStore } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useChatStore } from '../../store/chatStore';
import { useNotificationStore } from '../../store/notificationStore';

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  const unread = useNotificationStore((state) => state.unreadCount);
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const conversations = useChatStore((state) => state.conversations);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const fetchConversations = useChatStore((state) => state.fetchConversations);
  const [listingCount, setListingCount] = useState(0);

  useEffect(() => {
    fetchWishlist().catch(() => {});
    fetchConversations().catch(() => {});
    productService.getProducts({ limit: 50 }).then((data) => {
      setListingCount(data.items.filter((product) => product.seller?.id === user?.id).length);
    }).catch(() => {});
  }, [fetchConversations, fetchWishlist, user?.id]);

  const stats = [
    ['My listings', listingCount, <FaList key="list" className="text-xl text-primary" />],
    ['Wishlist', wishlistCount, <FaHeart key="heart" className="text-xl text-primary" />],
    ['Conversations', conversations.length, <FaEnvelope key="mail" className="text-xl text-primary" />],
    ['Notifications', unread, <FaBell key="bell" className="text-xl text-primary" />],
  ];

  return (
    <div>
      <SEO title="Dashboard" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-extrabold text-secondary">Dashboard</h1><p className="text-slate-500">Manage your listings, messages, and profile.</p></div>
        <Button to="/dashboard/listings/new">Create Listing</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, icon]) => <div key={label} className="surface rounded-md p-5">{icon}<p className="mt-4 text-3xl font-extrabold text-secondary">{value}</p><p className="text-sm text-slate-500">{label}</p></div>)}
      </div>
    </div>
  );
}
