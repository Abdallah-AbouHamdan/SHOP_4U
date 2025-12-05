import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type Props = {
  images: string[];
  alt: string;
  mainImageClassName?: string;
  className?: string;
};

export default function ImageGallery({
  images,
  alt,
  mainImageClassName = "",
  className = "",
}: Props) {
  const hasImages = images.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images]);

  if (!hasImages) {
    return null;
  }

  const activeImage = images[activeIndex];
  const mainClasses = ["w-full object-cover", mainImageClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <img
        src={activeImage}
        alt={alt}
        className={`relative ${mainClasses}`}
        loading="lazy"
      />
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
            }
            aria-label="Previous image"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/10 text-slate-900 transition hover:bg-white/20 hover:scale-105 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % images.length)
            }
            aria-label="Next image"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/10 text-slate-900 transition hover:bg-white/20 hover:scale-105 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <HiChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
