import { useState } from "react";
import { Facebook, Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ShareButtonsProps {
  title: string;
  imageUrl?: string;
}

export function ShareButtons({ title, imageUrl }: ShareButtonsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing - opens app
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const shareData: ShareData = {
          title: title,
          text: title,
          url: currentUrl,
        };
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast.success("Link copiado!");
      } catch {
        toast.error("Não foi possível copiar o link");
      }
    }
  };

  const handleShareMenuOption = (platform: 'facebook' | 'instagram' | 'whatsapp') => {
    setShowShareMenu(false);
    handleShare(platform);
  };

  return (
    <div className="py-6 mb-8">
      {/* Main share buttons - large horizontal layout like G1 */}
      <div className="grid grid-cols-3 gap-3">
        {/* Facebook */}
        <button 
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center py-5 px-6 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
          title="Compartilhar no Facebook"
        >
          <Facebook className="w-7 h-7 text-[#1877F2]" />
        </button>
        
        {/* WhatsApp */}
        <button 
          onClick={() => handleShare('whatsapp')}
          className="flex items-center justify-center py-5 px-6 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
          title="Compartilhar no WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
        </button>
        
        {/* Share button with menu */}
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full flex items-center justify-center py-5 px-6 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
            title="Mais opções de compartilhamento"
          >
            <Share2 className="w-7 h-7 text-muted-foreground" />
          </button>
          
          {/* Share menu dropdown */}
          {showShareMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowShareMenu(false)}
              />
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[180px]">
                <button
                  onClick={() => handleShareMenuOption('facebook')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleShareMenuOption('instagram')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <Instagram className="w-5 h-5 text-[#E4405F]" />
                  <span className="text-sm">Instagram</span>
                </button>
                <button
                  onClick={() => handleShareMenuOption('whatsapp')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setShowShareMenu(false);
                    handleNativeShare();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-t border-border"
                >
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Copiar link</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}