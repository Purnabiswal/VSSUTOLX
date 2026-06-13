import { useState } from 'react';

export default function ImageCarousel({ images = [] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
        <img src={images[active]} alt="Product" className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button key={image} type="button" onClick={() => setActive(index)} className={`aspect-square overflow-hidden rounded-md border ${active === index ? 'border-primary' : 'border-slate-200'}`}>
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
