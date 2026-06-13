import { formatDate } from '../utils/formatters';

export default function ChatBubble({ message, mine }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[76%] rounded-md px-4 py-2 text-sm ${mine ? 'bg-primary text-white' : 'bg-slate-100 text-secondary'}`}>
        <p>{message.text || message.message}</p>
        <time className={`mt-1 block text-[11px] ${mine ? 'text-blue-100' : 'text-slate-500'}`}>{formatDate(message.createdAt)}</time>
      </div>
    </div>
  );
}
