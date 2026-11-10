'use client';

import { useState, useRef, useEffect } from 'react';

const AI_BRANDS = [
  { value: 'gemini', label: 'Gemini', accent: '#8b5cf6', bg: 'rgba(12, 18, 30, 0.82)' },
  { value: 'chatgpt', label: 'ChatGPT', accent: '#22c55e', bg: 'rgba(10, 17, 20, 0.82)' },
  { value: 'claude', label: 'Claude', accent: '#f472b6', bg: 'rgba(28, 15, 22, 0.82)' },
  { value: 'midjourney', label: 'Midjourney', accent: '#f59e0b', bg: 'rgba(28, 22, 12, 0.82)' },
  { value: 'dalle', label: 'DALL·E', accent: '#a78bfa', bg: 'rgba(21, 18, 36, 0.82)' },
  { value: 'stable-diffusion', label: 'Stable Diffusion', accent: '#22c55e', bg: 'rgba(10, 22, 16, 0.82)' },
] as const;

const createBrandLogoSvg = (brand: (typeof AI_BRANDS)[number]['value']) => {
  const common = `viewBox="0 0 120 120" width="120" height="120"`;

  switch (brand) {
    case 'gemini':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="28" fill="#0B1020"/>
          <path d="M60 14 L92 29 L103 60 L92 91 L60 106 L28 91 L17 60 L28 29 Z" fill="none" stroke="#B5B7FF" stroke-width="8"/>
          <path d="M60 25 L83 38 L90 60 L83 82 L60 95 L37 82 L30 60 L37 38 Z" fill="none" stroke="#89F0FF" stroke-width="7"/>
          <path d="M60 46 L72 60 L60 74 L48 60 Z" fill="#B5B7FF"/>
        </svg>
      `)}`;
    case 'chatgpt':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="30" fill="#091A1A"/>
          <path d="M35 36C35 25.5 43.5 17 54 17H68C80 17 88 25.5 88 36V64C88 74.5 80 83 68 83H59L46 95V83H54C43.5 83 35 74.5 35 64V36Z" fill="#7ee7b0"/>
          <path d="M50 47 C50 40, 56 35, 62 35H74C82 35, 88 41, 88 49C88 57, 82 63, 74 63H67L61 70L61 63H62C56 63, 50 58, 50 51V47Z" fill="#0d241f"/>
          <circle cx="58" cy="48" r="4" fill="#7ee7b0"/>
          <circle cx="71" cy="48" r="4" fill="#7ee7b0"/>
          <path d="M57 58 Q65 63 72 58" stroke="#7ee7b0" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>
      `)}`;
    case 'claude':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="28" fill="#1F0D16"/>
          <path d="M82 22C71 17 58 20 49 30C35 46 35 69 47 83C57 94 74 98 87 92C77 84 71 76 68 66C64 54 66 42 82 22Z" fill="#FFB4D9" fill-opacity="0.9"/>
          <path d="M36 92C47 100 61 101 73 96C63 82 57 69 54 53C48 57 42 63 38 70C32 80 32 87 36 92Z" fill="#FFD2E7" fill-opacity="0.9"/>
          <path d="M74 34C60 33 48 39 42 49C37 58 37 71 42 80C48 89 59 95 71 94C64 87 60 80 59 72C58 60 61 50 74 34Z" fill="#1F0D16"/>
        </svg>
      `)}`;
    case 'midjourney':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="26" fill="#1F1A0D"/>
          <path d="M26 92V23H41L60 60L79 23H94V92H79V48L62 83H58L41 48V92H26Z" fill="#F8D875"/>
          <circle cx="60" cy="24" r="9" fill="#FFFFFF" fill-opacity="0.9"/>
        </svg>
      `)}`;
    case 'dalle':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="26" fill="#171523"/>
          <path d="M35 88V32H65C80 32 92 44 92 59C92 73 80 86 65 86H35Z" fill="#D8C8FF"/>
          <path d="M50 47H66C73 47 78 52 78 59C78 66 73 72 66 72H50V47Z" fill="#171523"/>
          <path d="M59 29 L75 44 L72 59 L52 76 L30 59 L35 46 Z" fill="#A78BFA" fill-opacity="0.7"/>
        </svg>
      `)}`;
    case 'stable-diffusion':
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}>
          <rect width="120" height="120" rx="28" fill="#081A11"/>
          <path d="M72 18C60 18 48 22 40 32C33 41 30 52 33 63C35 71 42 79 50 82C56 84 62 84 68 82C58 78 52 70 52 61C52 50 62 42 74 42C85 42 94 49 94 62C94 81 78 97 57 97H43V107H77C90 107 103 99 110 85C116 73 116 58 109 46C100 30 86 18 72 18Z" fill="#9DECB5"/>
          <path d="M34 91C44 83 52 73 56 61C59 53 59 47 56 41C48 47 41 56 37 67C33 77 32 84 34 91Z" fill="#B3F7C2" fill-opacity="0.8"/>
        </svg>
      `)}`;
    default:
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" ${common}><rect width="120" height="120" rx="28" fill="#111827"/><circle cx="60" cy="60" r="30" fill="#E2E8F0"/></svg>
      `)}`;
  }
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<(typeof AI_BRANDS)[number]['value']>('gemini');
  const [watermarkScale, setWatermarkScale] = useState(1.2);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.75);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedBrandConfig = AI_BRANDS.find((brand) => brand.value === selectedBrand) ?? AI_BRANDS[0];

  const applyWatermark = (imageData: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.onload = () => {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
      ctx.drawImage(baseImg, 0, 0);

      const logo = new Image();
      logo.crossOrigin = 'anonymous';
      logo.onload = () => {
        const logoSize = Math.max(72, baseImg.width * 0.14 * watermarkScale);
        const margin = 34;
        const pillWidth = logoSize * 1.8;
        const pillHeight = logoSize * 1.2;
        const x = baseImg.width - margin - pillWidth;
        const y = baseImg.height - margin - pillHeight;

        ctx.save();
        ctx.globalAlpha = watermarkOpacity;
        ctx.fillStyle = selectedBrandConfig.bg;
        ctx.strokeStyle = selectedBrandConfig.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, pillWidth, pillHeight, 18);
        ctx.fill();
        ctx.stroke();

        const iconSize = logoSize * 0.7;
        const iconX = x + 12;
        const iconY = y + (pillHeight - iconSize) / 2;
        ctx.drawImage(logo, iconX, iconY, iconSize, iconSize);
        ctx.restore();

        setWatermarkedImage(canvas.toDataURL('image/png'));
      };
      logo.src = createBrandLogoSvg(selectedBrand);
    };
    baseImg.src = imageData;
  };

  useEffect(() => {
    if (selectedImage) {
      applyWatermark(selectedImage);
    }
  }, [selectedImage, selectedBrand, watermarkScale, watermarkOpacity]);

  // Load demo image on mount
  useEffect(() => {
    const loadDemoImage = async () => {
      try {
        const response = await fetch('/cma.jpeg');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          setSelectedImage(imageData);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error loading demo image:', error);
      }
    };
    loadDemoImage();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setSelectedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (!watermarkedImage) return;

    const link = document.createElement('a');
    link.href = watermarkedImage;
    link.download = 'watermarked-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative">
      {/* Cyberpunk background effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-pink-500/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)',
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-wider" style={{
              textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.6)',
              color: '#00ffff',
            }}>
              COVER MY ASS
            </h1>
            <p className="text-lg md:text-xl text-pink-400" style={{
              textShadow: '0 0 10px rgba(255, 0, 128, 0.8)',
            }}>
              ✦ Making Real Photos Look Fake ✦
            </p>
            <p className="text-sm text-cyan-300 mt-2 opacity-80">
              Turn your mundane moments into AI-Generated masterpieces
            </p>
          </div>

          {/* Main card */}
          <div className="border-2 border-cyan-500 bg-black/80 backdrop-blur p-8 mb-8" style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)',
          }}>
            {/* Upload section */}
            <div className="mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 px-4 border-2 border-dashed border-pink-500 bg-black hover:bg-pink-500/10 transition-all duration-300 cursor-pointer group"
                style={{
                  boxShadow: '0 0 15px rgba(255, 0, 128, 0.2)',
                }}
              >
                <p className="text-xl font-bold text-pink-400 group-hover:text-pink-300 transition-colors">
                  ▲ {selectedImage ? 'UPLOAD NEW IMAGE' : 'UPLOAD IMAGE'} ▲
                </p>
                <p className="text-sm text-cyan-300 mt-2">
                  Click to {selectedImage ? 'swap' : 'select your'} photo
                </p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Image preview and watermark section */}
            {selectedImage && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original image */}
                  <div className="border border-cyan-500/50 p-4 bg-black/50">
                    <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3">
                      ► Original
                    </p>
                    <div className="relative overflow-hidden border border-cyan-500/30">
                      <img
                        src="/littlestjeff1.jpeg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25 blur-[1px]"
                      />
                      <img
                        src={selectedImage}
                        alt="Original"
                        className="relative w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Watermarked image */}
                  <div className="border border-pink-500/50 p-4 bg-black/50">
                    <p className="text-xs uppercase tracking-widest text-pink-400 mb-3">
                      ► Watermarked
                    </p>
                    <div className="relative overflow-hidden border border-pink-500/30">
                      {watermarkedImage ? (
                        <img
                          src={watermarkedImage}
                          alt="Watermarked"
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-black/50">
                          <p className="text-cyan-500/50">Processing...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Watermark controls */}
                <div className="pt-6 border-t border-cyan-500/30 space-y-5">
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="block text-left">
                      <span className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">
                        AI brand
                      </span>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value as (typeof AI_BRANDS)[number]['value'])}
                        className="w-full bg-black border border-cyan-500/60 text-cyan-100 px-3 py-2 outline-none"
                        style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.2)' }}
                      >
                        {AI_BRANDS.map((brand) => (
                          <option key={brand.value} value={brand.value}>
                            {brand.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-left">
                      <span className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">
                        Size: {watermarkScale.toFixed(2)}x
                      </span>
                      <input
                        type="range"
                        min="0.7"
                        max="1.8"
                        step="0.05"
                        value={watermarkScale}
                        onChange={(e) => setWatermarkScale(Number(e.target.value))}
                        className="w-full accent-pink-500"
                      />
                    </label>

                    <label className="block text-left">
                      <span className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">
                        Opacity: {watermarkOpacity.toFixed(2)}
                      </span>
                      <input
                        type="range"
                        min="0.2"
                        max="1"
                        step="0.05"
                        value={watermarkOpacity}
                        onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => selectedImage && applyWatermark(selectedImage)}
                      className="flex-1 py-3 px-4 border border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 font-bold uppercase tracking-widest transition-all duration-300"
                    >
                      Reapply Watermark
                    </button>
                    {watermarkedImage && (
                      <button
                        onClick={downloadImage}
                        className="flex-1 py-3 px-4 bg-pink-500 hover:bg-pink-400 text-black font-bold uppercase tracking-widest transition-all duration-300"
                        style={{
                          boxShadow: '0 0 15px rgba(255, 0, 128, 0.4)',
                        }}
                      >
                        DOWNLOAD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer message */}
          <div className="text-center text-xs text-cyan-400/60 uppercase tracking-widest">
            <p>⚡ Processing in browser • No uploads to servers ⚡</p>
          </div>
        </div>
      </div>

    </div>
  );
}
