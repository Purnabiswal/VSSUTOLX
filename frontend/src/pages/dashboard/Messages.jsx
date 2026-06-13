import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Avatar from '../../components/Avatar';
import Badge from '../../components/Badge';
import { useChatStore } from '../../store/chatStore';
import { useSocket } from '../../hooks/useSocket';

export default function Messages() {
  useSocket();
  const { conversations, fetchConversations } = useChatStore();
  useEffect(() => { fetchConversations(); }, [fetchConversations]);
  return (
    <div>
      <SEO title="Messages" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Messages</h1>
      <div className="surface rounded-md">
        {conversations.map((conversation) => (
          <Link key={conversation.id} to={`/dashboard/messages/${conversation.id}`} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-b-0 hover:bg-slate-50">
            <Avatar src={conversation.participant?.avatar} name={conversation.participant?.name} />
            <div className="min-w-0 flex-1"><p className="font-bold text-secondary">{conversation.participant?.name || 'VSSUT user'}</p><p className="truncate text-sm text-slate-500">{conversation.messages.at(-1)?.text || conversation.product?.title || 'No messages yet'}</p></div>
            {conversation.online && <Badge tone="green">Online</Badge>}
            {conversation.unread > 0 && <Badge tone="blue">{conversation.unread}</Badge>}
          </Link>
        ))}
      </div>
    </div>
  );
}
