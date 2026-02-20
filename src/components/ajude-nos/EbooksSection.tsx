import { Link } from "react-router-dom";
import { BookOpen, Download, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PrefetchLink } from "@/components/common/PrefetchLink";
import { prefetchEbook } from "@/App";

interface Ebook {
    id: string;
    title: string;
    description: string | null;
    price: number;
    cover_url: string | null;
    pages: number | null;
    stripe_price_id: string | null;
    pix_link: string | null;
    card_link: string | null;
}

interface EbooksSectionProps {
    title: string;
    subtitle: string;
    ebooks: Ebook[] | null;
    isLoading: boolean;
    checkingOutId: string | null;
    onPurchase: (ebookId: string, title: string, price: number, stripePrice: string | null, pixLink: string | null, cardLink: string | null) => void;
}

export function EbooksSection({
    title,
    subtitle,
    ebooks,
    isLoading,
    checkingOutId,
    onPurchase
}: EbooksSectionProps) {
    return (
        <section id="ebooks" className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl font-serif font-bold text-headline">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {subtitle}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-xl" />
                    ))}
                </div>
            ) : ebooks && ebooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ebooks.map((ebook) => (
                        <div
                            key={ebook.id}
                            className="bg-card rounded-xl border-2 border-border p-6 hover:border-accent hover:bg-accent/5 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                {ebook.cover_url ? (
                                    <img src={ebook.cover_url} alt={ebook.title} className="w-16 h-20 rounded-lg object-cover shrink-0 shadow-md" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-8 h-8 text-accent" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-headline mb-2 leading-tight">
                                        {ebook.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {ebook.description || 'Sem descrição'}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                                        <span className="bg-secondary px-2 py-1 rounded">PDF</span>
                                        {ebook.pages && <span>{ebook.pages} páginas</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                                <div>
                                    <span className="text-2xl font-bold text-headline">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ebook.price)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PrefetchLink to={`/ebook/${ebook.id}`} prefetch={prefetchEbook}>
                                        <Button variant="ghost" size="sm" className="gap-1 text-xs" title="Ver página / Copiar link para redes sociais">
                                            <Share2 className="w-3.5 h-3.5" />
                                            Compartilhar
                                        </Button>
                                    </PrefetchLink>
                                    <Button
                                        className="gap-2"
                                        disabled={checkingOutId === ebook.id}
                                        onClick={() => onPurchase(ebook.id, ebook.title, ebook.price, ebook.stripe_price_id, ebook.pix_link, ebook.card_link)}
                                    >
                                        {checkingOutId === ebook.id ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" />Aguarde...</>
                                        ) : (
                                            <><Download className="w-4 h-4" />Adquirir</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">Nenhum e-book disponível no momento.</p>
            )}
        </section>
    );
}
