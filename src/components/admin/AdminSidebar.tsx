import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  LogOut, 
  Plus,
  ChevronLeft,
  Calendar,
  FileText,
  Settings,
  BookOpen,
  FolderOpen,
  Cog
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import logoAafab from '@/assets/logo-aafab.png';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Newspaper, label: 'Notícias', href: '/admin/noticias' },
  { icon: Calendar, label: 'Agenda / Eventos', href: '/admin/eventos' },
  { icon: FileText, label: 'Comunicados', href: '/admin/comunicados' },
  { icon: BookOpen, label: 'E-books', href: '/admin/ebooks' },
  { icon: FolderOpen, label: 'Categorias', href: '/admin/categorias' },
  { icon: Settings, label: 'Páginas', href: '/admin/paginas' },
  { icon: Cog, label: 'Configurações', href: '/admin/configuracoes' },
];


export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/admin" className="flex items-center gap-3">
          <img 
            src={logoAafab} 
            alt="AAFAB" 
            className="w-10 h-10 object-contain bg-white rounded-full p-0.5"
          />
          <div>
            <h1 className="font-serif font-bold text-lg text-headline">AAFAB</h1>
            <p className="text-xs text-muted-foreground">Painel Admin</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/admin' && location.pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>


        <div className="mt-6 pt-6 border-t border-border">
          <Link
            to="/admin/noticias/nova"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Notícia
          </Link>
        </div>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border space-y-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar ao Site
        </Link>
        
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
