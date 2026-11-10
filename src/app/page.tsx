'use client';

import { useState, useRef, useEffect } from 'react';

const AI_BRANDS = [
  { value: 'gemini', label: 'Gemini', logo: '/brand-logos/gemini.svg' },
  { value: 'chatgpt', label: 'ChatGPT', logo: '/brand-logos/chatgpt.svg' },
  { value: 'claude', label: 'Claude', logo: '/brand-logos/claude.svg' },
] as const;

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<(typeof AI_BRANDS)[number]['value']>('gemini');
  const [watermarkScale, setWatermarkScale] = useState(1.2);
  const [watermarkTransparency, setWatermarkTransparency] = useState(0.35);
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
        const logoSize = Math.max(64, baseImg.width * 0.12 * watermarkScale);
        const margin = 30;
        const x = baseImg.width - logoSize - margin;
        const y = baseImg.height - logoSize - margin;

        ctx.save();
        ctx.filter = 'grayscale(1) brightness(1.6) contrast(1.2)';
        ctx.globalAlpha = 1 - watermarkTransparency;
        ctx.drawImage(logo, x, y, logoSize, logoSize);
        ctx.restore();

        setWatermarkedImage(canvas.toDataURL('image/png'));
      };
      logo.onerror = () => {
        setWatermarkedImage(canvas.toDataURL('image/png'));
      };
      logo.src = selectedBrandConfig.logo;
    };
    baseImg.src = imageData;
  };

  useEffect(() => {
    if (selectedImage) {
      applyWatermark(selectedImage);
    }
  }, [selectedImage, selectedBrand, watermarkScale, watermarkTransparency]);

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
                        Transparency: {watermarkTransparency.toFixed(2)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={watermarkTransparency}
                        onChange={(e) => setWatermarkTransparency(Number(e.target.value))}
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
