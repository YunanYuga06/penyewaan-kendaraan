import { useState } from 'react';

export default function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
            </div>
        );
    }

    const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    const next = () => setCurrentIndex((currentIndex + 1) % images.length);

    return (
        <div className="relative w-full">
            <div className="relative h-80 rounded-lg overflow-hidden bg-gray-200">
                <img src={`/storage/${images[currentIndex].url_foto}`} alt="" className="w-full h-full object-cover" />
                {images.length > 1 && (
                    <>
                        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="flex justify-center mt-3 gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
