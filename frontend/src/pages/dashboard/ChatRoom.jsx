import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import SEO from '../../components/SEO';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import ChatBubble from '../../components/ChatBubble';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';
import { useSocket } from '../../hooks/useSocket';

export default function ChatRoom() {
  useSocket();
  const { id } = useParams();
  const [text, setText] = useState('');
  const { activeConversation, openConversation, sendMessage } = useChatStore();
  const user = useAuthStore((state) => state.user);
  useEffect(() => { openConversation(id); }, [openConversation, id]);
  const submit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    await sendMessage(id, text.trim());
    setText('');
  };
  if (!activeConversation) return null;
  return (
    <div>
      <SEO title="Chat" />
      <div className="surface flex h-[72vh] flex-col rounded-md">
        <div className="flex items-center gap-3 border-b border-slate-200 p-4">
          <Avatar src={activeConversation.participant?.avatar} name={activeConversation.participant?.name} />
          <div><p className="font-bold text-secondary">{activeConversation.participant?.name || 'VSSUT user'}</p><p className="text-sm text-success">{activeConversation.online ? 'Online' : activeConversation.typing ? 'Typing...' : 'Offline'}</p></div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {activeConversation.messages.map((message) => <ChatBubble key={message.id} message={message} mine={message.senderId === user?.id} />)}
          {activeConversation.typing && <p className="text-sm text-slate-400">Typing indicator...</p>}
        </div>
        <form onSubmit={submit} className="flex gap-2 border-t border-slate-200 p-4">
          <input value={text} onChange={(event) => setText(event.target.value)} className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" placeholder="Write a message" />
          <Button type="submit"><FaPaperPlane /></Button>
        </form>
      </div>
    </div>
  );
}
