import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  User,
  CreditCard,
  MapPin,
  CheckCircle,
  Info,
  Package,
  RefreshCcw,
  Ruler,
  Phone,
  FileText,
  Star,
  Truck,
  Zap,
  Crosshair,
  Maximize2,
  ShieldCheck,
  Percent,
  Thermometer,
  Sun,
  Activity,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Data ---

const SHOE_IMAGES = [
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=1600"
];

const NAMES = ["VORTEX_01", "AERO-X", "SPECTRE_MK2", "KINETIC_V", "OBLIVION", "NEXUS_SYS", "FLUX_CORE", "VOID_WALKER", "PRIME_ARC", "ECHO_CHAMBER"];
const TAGS = ["SPORT", "SNEAKER", "WINTER", "SUMMER", "FITNESS", "LIFESTYLE"];

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[i % NAMES.length];
    let category = "MENSWEAR";
    if (i % 3 === 0) category = "WOMENSWEAR";
    
    const tag = TAGS[i % TAGS.length];
    
    // Sale Logic: 30% chance of being on sale
    const basePrice = Math.floor(Math.random() * (450 - 180) + 180);
    const isOnSale = i % 3 === 0; // consistent seed
    const salePrice = isOnSale ? Math.floor(basePrice * 0.7) : null;

    return {
      id: i + 1,
      name: `${name}_${(i + 1).toString().padStart(3, '0')}`,
      price: basePrice,
      salePrice: salePrice,
      category: category,
      tag: tag,
      rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 20,
      image: SHOE_IMAGES[i % SHOE_IMAGES.length],
      description: "COMPONENT: ADAPTIVE MESH // SYSTEM: KINETIC RETURN // STATUS: EXPERIMENTAL. Designed for the post-industrial landscape.",
      thumbnails: [
        SHOE_IMAGES[i % SHOE_IMAGES.length],
        SHOE_IMAGES[(i + 1) % SHOE_IMAGES.length],
        SHOE_IMAGES[(i + 2) % SHOE_IMAGES.length]
      ]
    };
  });
};

const PRODUCTS = generateProducts(48); 

// --- Creative Components ---

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    
    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block" style={{ transform: 'translate3d(-100px, -100px, 0)' }}>
      <div className={`relative -ml-3 -mt-3 transition-all duration-200 ease-out ${clicked ? 'scale-90' : 'scale-100'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#ccff00] rounded-full" />
        <div className={`w-6 h-6 border border-[#ccff00] rounded-full transition-all duration-300 ${clicked ? 'scale-150 opacity-50' : 'scale-100 opacity-100'}`} />
      </div>
    </div>
  );
};

const BootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black text-[#ccff00] flex flex-col justify-between p-12 font-mono uppercase tracking-widest cursor-wait">
      <div className="flex justify-between">
        <span>SYS.BOOT_SEQUENCE</span>
        <span>V.2.0.24</span>
      </div>
      <div className="text-9xl font-black tabular-nums leading-none tracking-tighter">
        {Math.min(progress, 100)}%
      </div>
      <div className="w-full h-2 bg-gray-900 overflow-hidden">
        <div className="h-full bg-[#ccff00] transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>INITIALIZING ASSETS...</span>
        <span>SECURE CONNECTION ESTABLISHED</span>
      </div>
    </div>
  );
};

const GlitchText = ({ text }) => (
  <div className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-75">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-75">{text}</span>
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const base = "relative px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300 border overflow-hidden group";
  
  const variants = {
    primary: "border-[#ccff00] text-[#ccff00] hover:text-black",
    secondary: "border-white text-white hover:text-black",
    ghost: "border-transparent text-gray-500 hover:text-[#ccff00]"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}>
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:font-bold">{children}</span>
      <div className={`absolute inset-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 ${variant === 'primary' ? 'bg-[#ccff00]' : 'bg-white'}`} />
    </button>
  );
};

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0" 
       style={{ 
         backgroundImage: `
           linear-gradient(rgba(20, 20, 20, 1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(20, 20, 20, 1) 1px, transparent 1px)
         `,
         backgroundSize: '40px 40px',
         backgroundColor: '#050505'
       }}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
  </div>
);

const ImageLightbox = ({ src, onClose }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/95 flex flex-col items-center justify-center animate-fade-in">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 text-white hover:text-[#ccff00] z-50 p-4 border border-white/20 hover:border-[#ccff00] rounded-full transition-all"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div className="absolute top-8 left-8 font-mono text-xs text-gray-500">
        FULL_RES_VIEWER // HOVER_TO_ZOOM
      </div>

      <div 
        className="relative w-[90vw] h-[80vh] overflow-hidden cursor-crosshair border border-white/10"
        onMouseMove={handleMouseMove}
      >
        <img 
          src={src} 
          className="absolute w-[200%] h-[200%] max-w-none object-cover transition-transform duration-75"
          style={{ 
            transform: `translate(-${position.x / 2}%, -${position.y / 2}%)`,
            left: '0',
            top: '0'
          }}
          alt="Zoom View"
        />
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, navItems, activeItem, onNavClick, cartCount }) => (
  <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-black border-l border-[#ccff00]/20 z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
    <div className="p-8 flex justify-between items-center border-b border-[#ccff00]/20">
      <span className="text-[#ccff00] font-mono">MENU_SYS</span>
      <button onClick={onClose} className="text-white hover:text-[#ccff00] hover:rotate-90 transition-all"><X /></button>
    </div>
    <div className="flex-1 flex flex-col justify-center px-8 gap-8">
      {navItems.map(item => (
        <button 
          key={item} 
          onClick={() => onNavClick(item)} 
          className={`text-4xl font-black uppercase text-left tracking-tighter hover:text-[#ccff00] hover:pl-4 transition-all duration-300 ${activeItem === item ? 'text-[#ccff00] pl-4' : 'text-white'}`}
        >
          {item}
        </button>
      ))}
    </div>
    <div className="p-8 border-t border-[#ccff00]/20 font-mono text-xs text-gray-500">
      <div className="flex justify-between mb-2">
        <span>CART STATUS</span>
        <span className="text-[#ccff00]">{cartCount} ITEMS</span>
      </div>
      <div className="flex justify-between">
        <span>LOCATION</span>
        <span>TOKYO / NYC / LDN</span>
      </div>
    </div>
  </div>
);

// --- Layout Components ---

const Navbar = ({ cartCount, onMenuClick, onLogoClick }) => (
  <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
    <button onClick={onLogoClick} className="pointer-events-auto group">
      <div className="text-2xl font-black tracking-tighter text-white group-hover:text-[#ccff00] transition-colors">
        ZENITH<span className="text-[#ccff00]">_LABS</span>
      </div>
    </button>

    <div className="flex items-center gap-8 pointer-events-auto">
      <button onClick={() => onMenuClick('cart')} className="group flex items-center gap-2 text-white hover:text-[#ccff00] transition-colors">
        <span className="font-mono text-xs hidden md:block">[ CART : {cartCount.toString().padStart(2, '0')} ]</span>
        <ShoppingBag className="w-5 h-5" />
      </button>
      <button onClick={() => onMenuClick('menu')} className="text-white hover:text-[#ccff00] transition-colors">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

// --- Pages ---

const HomePage = ({ onProductClick, activeCategory, setActiveCategory }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory) {
      if (['MENSWEAR', 'WOMENSWEAR'].includes(activeCategory)) {
        result = result.filter(p => p.category === activeCategory);
      } else if (activeCategory === 'SALE') {
        result = result.filter(p => p.salePrice);
      } else {
        result = result.filter(p => p.tag === activeCategory);
      }
    }

    if (sortBy === 'low') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'high') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); 
  }, [activeCategory, sortBy]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % 5);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const subCategories = [
    { name: 'SPORT', icon: Activity },
    { name: 'SNEAKER', icon: Zap },
    { name: 'WINTER', icon: Thermometer },
    { name: 'SUMMER', icon: Sun },
    { name: 'FITNESS', icon: Crosshair },
    { name: 'SALE', icon: Percent },
  ];

  return (
    <div className="relative pt-32 pb-24 px-4 md:px-12 max-w-[1920px] mx-auto min-h-screen">
      
      {!activeCategory && currentPage === 1 && (
        <header className="mb-32 relative group">
          <div className="absolute -top-20 -left-10 w-[120%] h-[120%] opacity-20 bg-[#ccff00]/10 blur-[100px] pointer-events-none group-hover:opacity-30 transition-opacity" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <div className="font-mono text-[#ccff00] text-xs mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ccff00] animate-pulse" />
                SYSTEM_ONLINE // SEASON_04
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                <GlitchText text="FUTURE" /> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">PRIMITIVE</span>
              </h1>
              <div className="flex gap-4">
                <Button onClick={() => document.getElementById('grid').scrollIntoView({behavior:'smooth'})}>
                  INITIATE_SHOP
                </Button>
              </div>
            </div>

            <div className="relative aspect-video md:aspect-square overflow-hidden border border-[#ccff00]/30 bg-gray-900">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay z-10" />
              <img 
                src={PRODUCTS[heroIndex].image} 
                className="w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-100"
                alt="Hero Strobe"
              />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-[#ccff00] bg-black/50 px-2 py-1 backdrop-blur-sm border border-[#ccff00]/20">
                FIG_0{heroIndex + 1} // PROTOTYPE
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ccff00]/10 to-transparent w-full h-[10%] animate-scanline pointer-events-none z-20" />
            </div>
          </div>
        </header>
      )}

      <div id="grid" className="sticky top-0 z-30 bg-[#050505]/95 backdrop-blur-md border-y border-white/10 py-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto gap-4 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 font-mono text-xs border transition-all whitespace-nowrap ${!activeCategory ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-white/20 text-gray-400 hover:border-white'}`}
            >
              ALL
            </button>
            {subCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs border transition-all whitespace-nowrap ${activeCategory === cat.name ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'border-white/20 text-gray-400 hover:border-white'}`}
              >
                <cat.icon className="w-3 h-3" />
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="font-mono text-xs text-gray-500 hidden md:block">
              {filteredProducts.length} UNITS
            </span>
            <div className="relative group w-full md:w-48">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Filter className="w-4 h-4" />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-black/50 border border-white/20 text-white py-2 pl-10 pr-8 w-full focus:outline-none focus:border-[#ccff00] font-mono text-xs"
              >
                <option value="featured">FEATURED</option>
                <option value="low">PRICE: LOW TO HIGH</option>
                <option value="high">PRICE: HIGH TO LOW</option>
                <option value="rating">RATING: HIGH TO LOW</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
        {currentProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product)}
            className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#ccff00]/50 transition-colors aspect-[4/5] cursor-pointer overflow-hidden"
          >
            {product.salePrice && (
              <div className="absolute top-0 right-0 bg-[#ccff00] text-black font-black font-mono text-xs px-3 py-1 z-20">
                SALE -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
              </div>
            )}

            <div className="absolute inset-0 p-8 transition-all duration-500 group-hover:p-0">
              <img 
                src={product.image} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-[#ccff00] border border-[#ccff00] px-1">
                  {product.tag || "CORE"}
                </span>
                <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-black/50 backdrop-blur-sm p-4 -mx-6 -mb-6 md:bg-transparent md:backdrop-blur-none md:p-0 md:mx-0 md:mb-0">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1 mix-blend-difference">{product.name}</h3>
                <div className="flex justify-between items-end border-t border-white/20 pt-2 group-hover:border-[#ccff00] transition-colors">
                  <span className="font-mono text-sm text-gray-400">{product.category}</span>
                  <div className="flex flex-col items-end">
                    {product.salePrice ? (
                      <>
                        <span className="font-mono text-xs text-gray-500 line-through">${product.price}</span>
                        <span className="font-mono text-lg text-[#ccff00]">${product.salePrice}</span>
                      </>
                    ) : (
                      <span className="font-mono text-lg text-[#ccff00]">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-[#ccff00]/5 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay transition-opacity" />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button 
            variant="ghost" 
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              document.getElementById('grid').scrollIntoView({behavior: 'smooth'});
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </Button>
          
          <div className="font-mono text-sm text-gray-500">
            PAGE <span className="text-[#ccff00]">{currentPage}</span> / {totalPages}
          </div>

          <Button 
            variant="ghost"
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              document.getElementById('grid').scrollIntoView({behavior: 'smooth'});
            }}
            disabled={currentPage === totalPages}
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const ProductPage = ({ product, onBack, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('42');
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);
  
  useEffect(() => {
    window.scrollTo(0,0);
    setActiveImage(product.image);
  }, [product]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-12 max-w-[1920px] mx-auto text-white">
      {showLightbox && <ImageLightbox src={activeImage} onClose={() => setShowLightbox(false)} />}

      <button onClick={onBack} className="fixed top-24 left-6 md:left-12 z-30 flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#ccff00] transition-colors uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
        <ArrowLeft className="w-3 h-3" /> Abort
      </button>

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        <div className="w-full lg:w-2/3 space-y-2">
          <div className="aspect-square w-full bg-gray-900 border border-white/10 relative overflow-hidden group">
            <img src={activeImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <button 
              onClick={() => setShowLightbox(true)}
              className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-[#ccff00] hover:text-black text-white rounded-full transition-all z-20"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <div 
              onClick={() => setShowLightbox(true)}
              className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent font-mono text-xs text-[#ccff00] flex justify-between items-end cursor-pointer hover:text-white transition-colors"
            >
              <span>Rendering: {product.name} // High_Res</span>
              <span className="opacity-50">CLICK TO EXPAND</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.thumbnails.map((src, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(src)}
                className={`aspect-video bg-gray-900 border overflow-hidden cursor-pointer transition-all ${activeImage === src ? 'border-[#ccff00] opacity-100' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/50'}`}
              >
                <img src={src} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="border-b border-white/10 pb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <span className="font-mono text-xs text-[#ccff00] px-2 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20">IN STOCK</span>
                {product.salePrice && <span className="font-mono text-xs text-black px-2 py-1 bg-[#ccff00] border border-[#ccff00] font-bold">SALE</span>}
              </div>
              <div className="flex items-center gap-1 text-[#ccff00]">
                <Star className="w-3 h-3 fill-[#ccff00]" />
                <span className="font-mono text-xs">{product.rating} RATING</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
              {product.name}
            </h1>
            <div className="flex items-end gap-4">
              {product.salePrice ? (
                <>
                  <p className="text-4xl font-mono text-[#ccff00]">${product.salePrice}<span className="text-sm text-gray-500 ml-2">USD</span></p>
                  <p className="text-xl font-mono text-gray-600 line-through mb-1">${product.price}</p>
                </>
              ) : (
                <p className="text-4xl font-mono text-[#ccff00]">${product.price}<span className="text-sm text-gray-500 ml-2">USD</span></p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <p className="font-mono text-sm text-gray-400 leading-relaxed border-l-2 border-[#ccff00] pl-4">
              {product.description}
            </p>

            <div className="p-6 border border-white/10 bg-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-gray-400 uppercase">Size Configuration</span>
                <Ruler className="w-4 h-4 text-gray-500" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['38','39','40','41','42','43','44','45'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 font-mono text-sm border transition-all hover:bg-white hover:text-black ${selectedSize === size ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold' : 'border-white/20 text-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={() => onAddToCart(product, selectedSize)}>
              INITIATE PURCHASE
            </Button>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                <Zap className="w-4 h-4 text-[#ccff00]" />
                <span>INSTANT DISPATCH</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                <span>AUTH_VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ReviewsSection reviews={product.reviews} rating={product.rating} />
    </div>
  );
};

const ReviewsSection = ({ reviews, rating }) => (
  <div className="mt-16 border-t border-white/10 pt-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">Reviews & Feedback</h3>
        <div className="flex items-center gap-2">
          <div className="flex text-[#ccff00]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-[#ccff00]' : 'text-gray-700 fill-gray-700'}`} />
            ))}
          </div>
          <span className="font-mono text-sm text-white">{rating} / 5.0</span>
          <span className="text-gray-500 font-mono text-xs">({reviews} VERIFIED REVIEWS)</span>
        </div>
      </div>
      <Button variant="secondary">WRITE A REVIEW</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white/5 p-6 border border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ccff00] text-black rounded-full flex items-center justify-center font-bold font-mono text-xs">
                {['JD', 'AS', 'MK', 'LR'][i-1]}
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">User {Math.floor(Math.random() * 1000)}</h4>
                <div className="flex text-[#ccff00] text-[10px]">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-500">{i * 2} DAYS AGO</span>
          </div>
          <p className="text-gray-400 text-sm font-mono leading-relaxed">
            "Absolutely insane quality. The voxel-mesh technology really feels different on foot. Shipping was super fast too. Highly recommend!"
          </p>
        </div>
      ))}
    </div>
  </div>
);

const CheckoutPage = ({ cartItems, onPlaceOrder, onBack }) => {
  const [loading, setLoading] = useState(false);
  const total = cartItems.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPlaceOrder();
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-black text-white">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#ccff00] mb-12">
          <ArrowLeft className="w-3 h-3" /> RETURN_TO_CART
        </button>

        <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 border-b border-white/20 pb-6 flex items-end justify-between">
          <span>Checkout</span>
          <span className="text-[#ccff00] text-xl font-mono">${total}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 font-mono text-sm">
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest">01 / Identification</h3>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="FIRST_NAME" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
              <input required placeholder="LAST_NAME" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
            </div>
            <input required type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest">02 / Destination</h3>
            <input required placeholder="STREET_ADDRESS" className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="CITY" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
              <input required placeholder="POST_CODE" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest">03 / Transaction</h3>
            <div className="p-4 bg-[#ccff00]/5 border border-[#ccff00]/20 flex items-center gap-4 mb-4">
              <CreditCard className="w-5 h-5 text-[#ccff00]" />
              <span className="text-[#ccff00]">ENCRYPTED CONNECTION</span>
            </div>
            <input required placeholder="CARD_NUMBER" className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="MM/YY" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
              <input required placeholder="CVC" className="bg-white/5 border border-white/10 p-4 focus:border-[#ccff00] focus:outline-none text-white placeholder:text-gray-600" />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-8" disabled={loading}>
            {loading ? "PROCESSING_TRANSACTION..." : "CONFIRM_PAYMENT"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// --- Info Pages (Footer Pages) ---

const InfoPage = ({ title, icon: Icon, children, onBack }) => (
  <div className="min-h-screen pt-32 pb-24 px-6 bg-black text-white animate-fade-in">
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-mono hover:text-[#ccff00] mb-12 group w-fit uppercase tracking-wider text-gray-500">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
      <div className="flex items-center gap-6 mb-12 border-b border-white/20 pb-8">
        {Icon && <div className="p-4 bg-[#ccff00] text-black"><Icon className="w-8 h-8"/></div>}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{title}</h1>
      </div>
      <div className="prose prose-lg text-gray-400 font-mono">
        {children}
      </div>
    </div>
  </div>
);

const OrderStatusPage = ({ onBack }) => (
  <InfoPage title="Order Status" icon={Package} onBack={onBack}>
    <p className="mb-8 text-xl">Enter your order number and email address to track your shipment.</p>
    <div className="bg-white/5 p-8 border border-white/10 max-w-xl">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Order Number</label>
          <input type="text" placeholder="E.G. ZK-88219" className="w-full bg-black px-4 py-4 border border-white/20 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email Address</label>
          <input type="email" placeholder="YOU@EXAMPLE.COM" className="w-full bg-black px-4 py-4 border border-white/20 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white" />
        </div>
        <Button className="w-full">TRACK ORDER</Button>
      </div>
    </div>
  </InfoPage>
);

const ReturnsPage = ({ onBack }) => (
  <InfoPage title="Returns" icon={RefreshCcw} onBack={onBack}>
    <p className="mb-6">We want you to love your Zenith Kicks. If you're not completely satisfied, you can return your items within 30 days of delivery.</p>
    <h3 className="text-xl font-bold uppercase mb-4 text-white">How to Return</h3>
    <ol className="list-decimal pl-5 space-y-4 mb-8">
      <li>Enter your order details below to start your return.</li>
      <li>Print the prepaid shipping label we send to your email.</li>
      <li>Pack the items in their original box and drop it off at any shipping partner location.</li>
    </ol>
    <div className="bg-white/5 p-8 border border-white/10 max-w-xl">
      <h4 className="font-bold uppercase tracking-widest mb-6 text-white">Start a Return</h4>
      <div className="space-y-6">
        <input type="text" placeholder="ORDER NUMBER" className="w-full bg-black px-4 py-4 border border-white/20 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white" />
        <Button className="w-full" variant="secondary">CONTINUE</Button>
      </div>
    </div>
  </InfoPage>
);

const SizeGuidePage = ({ onBack }) => (
  <InfoPage title="Size Guide" icon={Ruler} onBack={onBack}>
    <p className="mb-8">Find your perfect fit using our conversion chart below. Zenith Kicks run true to size.</p>
    <div className="overflow-x-auto border border-white/20">
      <table className="w-full text-left border-collapse font-mono text-sm">
        <thead>
          <tr className="bg-white/10 text-white">
            <th className="p-4 uppercase">EU</th>
            <th className="p-4 uppercase">US Men</th>
            <th className="p-4 uppercase">US Women</th>
            <th className="p-4 uppercase">UK</th>
            <th className="p-4 uppercase">CM</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-gray-400">
          <tr><td className="p-4">38</td><td className="p-4">5.5</td><td className="p-4">7</td><td className="p-4">5</td><td className="p-4">24.0</td></tr>
          <tr><td className="p-4">39</td><td className="p-4">6.5</td><td className="p-4">8</td><td className="p-4">6</td><td className="p-4">24.5</td></tr>
          <tr><td className="p-4">40</td><td className="p-4">7</td><td className="p-4">8.5</td><td className="p-4">6.5</td><td className="p-4">25.0</td></tr>
          <tr><td className="p-4">41</td><td className="p-4">8</td><td className="p-4">9.5</td><td className="p-4">7.5</td><td className="p-4">26.0</td></tr>
          <tr><td className="p-4">42</td><td className="p-4">8.5</td><td className="p-4">10</td><td className="p-4">8</td><td className="p-4">26.5</td></tr>
          <tr><td className="p-4">43</td><td className="p-4">9.5</td><td className="p-4">11</td><td className="p-4">9</td><td className="p-4">27.5</td></tr>
          <tr><td className="p-4">44</td><td className="p-4">10</td><td className="p-4">11.5</td><td className="p-4">9.5</td><td className="p-4">28.0</td></tr>
          <tr><td className="p-4">45</td><td className="p-4">11</td><td className="p-4">12.5</td><td className="p-4">10.5</td><td className="p-4">29.0</td></tr>
        </tbody>
      </table>
    </div>
  </InfoPage>
);

const ContactPage = ({ onBack }) => (
  <InfoPage title="Contact Us" icon={Phone} onBack={onBack}>
    <p className="mb-8">Have a question? Our team is here to help. Reach out to us and we'll get back to you within 24 hours.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8 font-mono">
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-2 text-white">Customer Service</h4>
          <p className="text-gray-500">support@zenithkicks.com</p>
          <p className="text-gray-500">+1 (555) 123-4567</p>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-2 text-white">Headquarters</h4>
          <p className="text-gray-500">123 Innovation Blvd<br/>Silicon Valley, CA 94025</p>
        </div>
      </div>
      <form className="space-y-6">
        <input type="text" placeholder="YOUR NAME" className="w-full bg-black border-b border-white/20 p-4 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white" />
        <input type="email" placeholder="YOUR EMAIL" className="w-full bg-black border-b border-white/20 p-4 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white" />
        <textarea placeholder="HOW CAN WE HELP?" rows="4" className="w-full bg-black border-b border-white/20 p-4 focus:border-[#ccff00] focus:outline-none font-mono text-sm text-white"></textarea>
        <Button className="w-full">SEND MESSAGE</Button>
      </form>
    </div>
  </InfoPage>
);

const LegalPage = ({ title, onBack }) => (
  <InfoPage title={title} icon={FileText} onBack={onBack}>
    <p className="font-mono text-sm text-gray-500 mb-8">LAST UPDATED: JANUARY 2024</p>
    <div className="space-y-8 mt-6">
      <section>
        <h3 className="text-xl font-bold uppercase mb-4 text-white">1. Introduction</h3>
        <p>Welcome to Zenith Kicks. By accessing our website, you agree to these terms and conditions.</p>
      </section>
      <section>
        <h3 className="text-xl font-bold uppercase mb-4 text-white">2. Use of Our Service</h3>
        <p>You agree not to misuse our services or help anyone else do so. We reserve the right to terminate accounts that violate our policies.</p>
      </section>
      <section>
        <h3 className="text-xl font-bold uppercase mb-4 text-white">3. Privacy</h3>
        <p>Your privacy is important to us. Please review our Privacy Policy to understand how we handle your information.</p>
      </section>
      <section>
        <h3 className="text-xl font-bold uppercase mb-4 text-white">4. Limitations</h3>
        <p>Zenith Kicks is not responsible for any indirect damages arising from the use of our products.</p>
      </section>
    </div>
  </InfoPage>
);

// --- Main App Logic ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [sidebarMode, setSidebarMode] = useState(null); 
  
  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setSidebarMode('cart');
  };

  const updateQuantity = (pid, size, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => (item.product.id === pid && item.size === size) ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (pid, size) => {
    setCart(prev => prev.filter(item => !(item.product.id === pid && item.size === size)));
  };

  const handleNavClick = (target) => {
    setSidebarMode(null);

    if (target === 'cart') {
      setSidebarMode('cart');
      return;
    }
    
    // Check for footer-specific static pages
    if (['Order Status', 'Returns & Exchanges', 'Size Guide', 'Contact Us', 'Privacy Policy', 'Terms of Service'].includes(target)) {
       setView(target);
       window.scrollTo(0,0);
       return;
    }

    // Standard Navigation
    setView('home'); 
    setSelectedProduct(null);

    if(['MENSWEAR','WOMENSWEAR', 'SALE'].includes(target)) { 
      setActiveCategory(target); 
    } else {
      setActiveCategory(null);
    }
  };

  if (loading) return <BootLoader onComplete={() => setLoading(false)} />;

  return (
    <div className="font-sans bg-[#050505] text-white min-h-screen selection:bg-[#ccff00] selection:text-black overflow-x-hidden cursor-none">
      <CustomCursor />
      <GridBackground />
      
      <Navbar 
        cartCount={cart.reduce((a,b)=>a+b.quantity,0)} 
        onMenuClick={(mode) => setSidebarMode(mode)}
        onLogoClick={() => handleNavClick('ARCHIVE')}
      />

      <Sidebar 
        isOpen={!!sidebarMode} 
        onClose={() => setSidebarMode(null)}
        navItems={['MENSWEAR', 'WOMENSWEAR', 'SALE', 'ARCHIVE']}
        activeItem={activeCategory}
        onNavClick={handleNavClick}
        cartCount={cart.length}
      />

      {/* Cart Overlay */}
      {sidebarMode === 'cart' && (
        <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[60] p-8 flex flex-col transform transition-transform ${sidebarMode === 'cart' ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <h2 className="font-mono text-[#ccff00]">CART_SYSTEM</h2>
            <button onClick={() => setSidebarMode(null)}><X className="w-5 h-5 text-gray-500 hover:text-white" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-xs">
                <span>NO_ITEMS_DETECTED</span>
              </div>
            ) : (
              cart.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border border-white/5 p-2 bg-white/5">
                  <img src={item.product.image} className="w-20 h-20 object-cover grayscale" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm uppercase">{item.product.name}</h4>
                      <p className="font-mono text-xs text-gray-500">SIZE: {item.size}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#ccff00] text-sm">${item.product.salePrice || item.product.price}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="hover:text-[#ccff00]"><Minus className="w-3 h-3"/></button>
                        <span className="text-xs font-mono">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="hover:text-[#ccff00]"><Plus className="w-3 h-3"/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex justify-between font-mono text-sm mb-4">
                <span className="text-gray-500">TOTAL</span>
                <span className="text-[#ccff00]">${cart.reduce((a,b)=>a+((b.product.salePrice || b.product.price)*b.quantity),0)}</span>
              </div>
              <Button className="w-full" onClick={() => { setSidebarMode(null); setView('checkout'); }}>PROCEED</Button>
            </div>
          )}
        </div>
      )}

      {/* Main Content Router */}
      <main className="relative z-10">
        {view === 'home' && (
          <HomePage 
            onProductClick={(p) => { setSelectedProduct(p); setView('product'); }} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
          />
        )}
        
        {view === 'product' && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onBack={() => setView('home')} 
            onAddToCart={addToCart} 
          />
        )}

        {view === 'checkout' && (
          <CheckoutPage 
            cartItems={cart} 
            onBack={() => setSidebarMode('cart')} 
            onPlaceOrder={() => { setCart([]); setView('home'); alert('ORDER CONFIRMED'); }} 
          />
        )}

        {/* Footer Pages Router */}
        {view === 'Order Status' && <OrderStatusPage onBack={() => setView('home')} />}
        {view === 'Returns & Exchanges' && <ReturnsPage onBack={() => setView('home')} />}
        {view === 'Size Guide' && <SizeGuidePage onBack={() => setView('home')} />}
        {view === 'Contact Us' && <ContactPage onBack={() => setView('home')} />}
        {view === 'Privacy Policy' && <LegalPage title="Privacy Policy" onBack={() => setView('home')} />}
        {view === 'Terms of Service' && <LegalPage title="Terms of Service" onBack={() => setView('home')} />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black py-12 px-6 md:px-12 mt-24">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter mb-2">ZENITH<span className="text-[#ccff00]">_LABS</span></h3>
            <p className="font-mono text-xs text-gray-500 max-w-xs">
              EXPERIMENTAL FOOTWEAR DIVISION.<br/>
              EST. 2024 // SECTOR 7G
            </p>
          </div>
          <div className="flex gap-12 font-mono text-xs text-gray-400">
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold mb-2">LEGAL</span>
              <button onClick={() => handleNavClick('Privacy Policy')} className="hover:text-[#ccff00] text-left">PRIVACY_PROTOCOL</button>
              <button onClick={() => handleNavClick('Terms of Service')} className="hover:text-[#ccff00] text-left">TERMS_OF_USE</button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold mb-2">CONNECT</span>
              <button className="hover:text-[#ccff00] text-left">INSTAGRAM</button>
              <button className="hover:text-[#ccff00] text-left">DISCORD</button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold mb-2">SUPPORT</span>
              <button onClick={() => handleNavClick('Order Status')} className="hover:text-[#ccff00] text-left">ORDER_STATUS</button>
              <button onClick={() => handleNavClick('Returns & Exchanges')} className="hover:text-[#ccff00] text-left">RETURNS</button>
              <button onClick={() => handleNavClick('Contact Us')} className="hover:text-[#ccff00] text-left">CONTACT</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center font-mono text-[10px] text-gray-600 uppercase">
          <span>© 2024 ZENITH KICKS</span>
          <span>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </footer>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .cursor-none {
          cursor: none;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}