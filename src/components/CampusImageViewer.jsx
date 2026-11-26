import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function CampusImageViewer({
  src,
  alt,
  caption,
  variant = 'full',
  className = '',
  imagePosition = 'center',
}) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeLightbox() {
    dialogRef.current?.close();
    setIsOpen(false);
  }

  const lightbox = isOpen && (
    <dialog ref={dialogRef}
      className="campus-image-lightbox"
      onCancel={(event) => { event.preventDefault(); closeLightbox(); }}
      aria-modal="true"
      aria-label={`${alt} full view`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeLightbox();
      }}
    >
      <button
        className="campus-image-lightbox-close"
        type="button"
        aria-label="Close full image view"
        onClick={closeLightbox}
      >
        <X size={23} />
      </button>
      <figure className="campus-image-lightbox-figure">
        <img src={src} alt={alt} style={{ objectPosition: imagePosition }} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </dialog>
  );

  if (variant === 'expand') {
    return (
      <>
        <button
          className={`campus-image-expand-button ${className}`}
          type="button"
          aria-label={`View full image: ${alt}`}
          onClick={() => setIsOpen(true)}
        >
          <Maximize2 size={16} /> <span>View full image</span>
        </button>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <figure className={`campus-full-image ${className}`}>
        <button
          className="campus-full-image-trigger"
          type="button"
          aria-label={`View full image: ${alt}`}
          onClick={() => setIsOpen(true)}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: imagePosition }}
            onError={(event) => {
              event.currentTarget.closest('figure').hidden = true;
            }}
          />
          <span className="campus-full-image-prompt"><Maximize2 size={15} /> View full image</span>
        </button>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      {lightbox}
    </>
  );
}
