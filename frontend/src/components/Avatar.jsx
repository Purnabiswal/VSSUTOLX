export default function Avatar({ src, name = 'User', size = 'md' }) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-lg' };
  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} loading="lazy" />
  ) : (
    <div className={`${sizes[size]} grid place-items-center rounded-full bg-primary text-white font-bold`}>{name.charAt(0)}</div>
  );
}
