import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ChevronDown, Shield, Star, Users, Loader2, Flag, Image as ImageIcon, MessageSquare, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";
import { getGoogleDriveDirectUrl } from "@/lib/google-drive";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/images/cesd-hero-new.png";

export default function CesdPage() {
    const { data: pageData, isLoading } = usePageContent("cesd");

    // Default values matching the previous static content
    const defaultContent = {
        hero: {
            title: "PRD – Memorial Digital CESD",
            subtitle: "A história da caserna vive em nós. Um tributo aos soldados de 1994 a 2001.",
            videoUrl: "",
            buttonText: "Iniciar Jornada"
        },
        timeline: [
            { year: "1994", title: "O Início da Jornada", description: "A primeira turma forja os pilares que sustentariam gerações." },
            { year: "1997", title: "Consolidação Militar", description: "O espírito de corpo se torna inquebrável diante dos novos desafios." },
            { year: "2001", title: "O Legado", description: "A última formação. O encerramento de um ciclo histórico." }
        ],
        gallery: [
            { url: "", caption: "IMAGEM 1" },
            { url: "", caption: "IMAGEM 2" },
            { url: "", caption: "IMAGEM 3" },
            { url: "", caption: "IMAGEM 4" },
            { url: "", caption: "IMAGEM 5" },
            { url: "", caption: "IMAGEM 6" }
        ],
        sections: {
            caserna: {
                title: "Muito mais que um alojamento, foi a nossa forja.",
                content: "Lá compartilhamos o suor, as incertezas e a camaradagem. O cheiro da graxa, o som da alvorada. A caserna não era feita de paredes, mas de homens dispostos a defender um mesmo ideal.",
                imageUrl: ""
            },
            farda: {
                title: "O peso do azul, a honra do serviço.",
                content: "Vestir o azul da Força Aérea Brasileira significava entregar um pedaço da própria alma ao céu. Uma farda que não se veste apenas no corpo, mas que marca a nossa identidade para sempre.",
                imageUrl: ""
            }
        },
        testimonials: [
            { name: "Sd. Exemplo 1", role: "Turma de 1995", text: "O CESD moldou toda a minha vida e carreira.", photoUrl: "" },
            { name: "Sd. Exemplo 2", role: "Turma de 1996", text: "Gostaria de gravar um vídeo ou deixar um texto aqui depois.", photoUrl: "" }
        ],
        cta: {
            title: "Fortaleça o Nosso Legado",
            description: "A Associação Amigos da Força Aérea Brasileira mantém viva a chama do nosso orgulho. Junte-se a nós.",
            buttonText: "Apoie a Instituição"
        }
    };

    const content = (pageData?.content as any) || defaultContent;
    const [userRating, setUserRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [totalRatings, setTotalRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Generate or retrieve visitor ID
    const getVisitorId = useCallback(() => {
        let id = localStorage.getItem("cesd_visitor_id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("cesd_visitor_id", id);
        }
        return id;
    }, []);

    // Load stats and check if already rated
    useEffect(() => {
        const loadStats = async () => {
            const { data } = await supabase.rpc("get_cesd_rating_stats");
            if (data && data.length > 0) {
                setTotalRatings(Number(data[0].total_ratings));
                setAverageRating(Number(data[0].average_rating));
            }
            // Check if visitor already rated
            const visitorId = getVisitorId();
            const { data: existing } = await supabase
                .from("cesd_ratings" as any)
                .select("rating")
                .eq("visitor_id", visitorId)
                .maybeSingle();
            if (existing) {
                setUserRating((existing as any).rating);
                setHasRated(true);
            }
        };
        loadStats();
    }, [getVisitorId]);

    const handleRate = async (star: number) => {
        if (hasRated || isSubmitting) return;
        setIsSubmitting(true);
        setUserRating(star);
        const visitorId = getVisitorId();
        await supabase.from("cesd_ratings" as any).insert({ rating: star, visitor_id: visitorId } as any);
        setHasRated(true);
        // Refresh stats
        const { data } = await supabase.rpc("get_cesd_rating_stats");
        if (data && data.length > 0) {
            setTotalRatings(Number(data[0].total_ratings));
            setAverageRating(Number(data[0].average_rating));
        }
        setIsSubmitting(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-900 selection:text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Primary Background Image */}
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src={heroBg}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Video Overlay if available */}
                    {content.hero?.videoUrl ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={getGoogleDriveDirectUrl(content.hero.videoUrl, 'image')}
                            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                        >
                            <source src={getGoogleDriveDirectUrl(content.hero.videoUrl, 'video')} type="video/mp4" />
                        </video>
                    ) : null}

                    {/* Sophisticated Overlays */}
                    <div className="absolute inset-0 bg-slate-950/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-100 to-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            {content.hero?.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200/90 font-light max-w-2xl mx-auto mb-10 tracking-wide border-b border-blue-500/30 pb-6">
                            {content.hero?.subtitle}
                        </p>

                        <div className="relative inline-block group">
                            {/* "Inuzitante" background glow effect */}
                            <div className="absolute inset-0 -m-2 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all duration-700 animate-pulse" />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
                                className="relative z-10 px-2 py-2.5 font-bold text-white transition-all duration-300 bg-slate-900/90 border border-blue-500/40 rounded-full hover:border-blue-400 overflow-hidden shadow-[0_0_25px_rgba(59,130,246,0.15)] backdrop-blur-md"
                            >
                                {/* Shimmering sweep effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                                    animate={{ y: ['-200%', '200%'] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                />

                                <div className="relative z-10 flex flex-col items-center gap-1.5">
                                    <span className="text-[10px] leading-none tracking-[0.1em] uppercase [writing-mode:vertical-lr]">
                                        {content.hero?.buttonText || "Iniciar Jornada"}
                                    </span>

                                    <div className="flex flex-col gap-0.5 items-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-0.5 h-0.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                                        />
                                        <div className="w-3 h-px bg-blue-500/30" />
                                        <ArrowRight className="w-3 h-3 text-blue-300 group-hover:translate-y-1 transition-transform rotate-90" />
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute bottom-10 z-10"
                >
                    <ChevronDown className="w-8 h-8 text-blue-400/70" />
                </motion.div>
            </section>

            {/* Timeline Section */}
            <section id="timeline" className="py-24 relative overflow-hidden bg-slate-950">
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />

                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{content.sectionTitles?.timeline || 'A Linha do Tempo'}</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-900/20 via-blue-500/50 to-blue-900/20" />

                        {(content.timeline || []).map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="w-5/12" />
                                <div className="z-10 bg-slate-950 border-2 border-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                    <span className="text-blue-400 font-bold text-sm">{item.year}</span>
                                </div>
                                <div className={`w-5/12 bg-slate-900/40 border border-blue-900/30 p-8 rounded-2xl backdrop-blur-md hover:border-blue-500/50 transition-all duration-500 group relative`}>
                                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                    <h3 className="text-xl font-bold text-blue-100 mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Manifestações em Brasília Section */}
            <section className="py-24 relative overflow-hidden bg-slate-900/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.15),transparent_60%)]" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="flex items-center justify-center gap-3 text-blue-400 font-medium tracking-widest uppercase text-sm mb-4">
                            <Flag className="w-5 h-5" /> História e Luta
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">{content.sectionTitles?.manifestacoes || 'Manifestações em Brasília'}</h2>
                        <div className="w-40 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                    </motion.div>

                    <div className="max-w-6xl mx-auto space-y-24">
                        {(content.manifestacoes && content.manifestacoes.length > 0) ? (
                            content.manifestacoes.map((item: any, idx: number) => {
                                const photos = item.imageUrls && item.imageUrls.length > 0 
                                    ? item.imageUrls.filter((u: string) => u) 
                                    : (item.imageUrl ? [item.imageUrl] : []);
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-slate-900/40 border border-blue-900/30 rounded-2xl p-8 md:p-10 backdrop-blur-md"
                                    >
                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-blue-100 mb-6">{item.title}</h3>
                                        
                                        {/* Description + Location aligned right */}
                                        <div className="flex justify-end mb-8">
                                            <div className="text-right max-w-2xl space-y-3">
                                                <p className="text-slate-400 text-lg leading-relaxed">{item.content}</p>
                                                {item.location && (
                                                    <div className="inline-block p-1 px-4 rounded-lg bg-blue-950/50 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                                                        {item.location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Photos grid - 4 per row */}
                                        {photos.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {photos.map((photoUrl: string, pIdx: number) => (
                                                    <motion.div
                                                        key={pIdx}
                                                        whileHover={{ scale: 1.03 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="relative aspect-square rounded-xl overflow-hidden border border-blue-500/30 shadow-xl bg-slate-800 cursor-pointer group"
                                                        onClick={() => setLightboxImage(getGoogleDriveDirectUrl(photoUrl) || photoUrl)}
                                                    >
                                                        <img 
                                                            src={getGoogleDriveDirectUrl(photoUrl)} 
                                                            alt={`${item.title} - Foto ${pIdx + 1}`} 
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                                        />
                                                        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 flex items-center justify-center">
                                                            <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {photos.length === 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                <div className="aspect-square rounded-xl border border-blue-500/20 bg-slate-800 flex items-center justify-center">
                                                    <ImageIcon className="w-8 h-8 text-blue-900/50" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-900/40 border border-blue-900/30 rounded-2xl p-8 md:p-10 backdrop-blur-md"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold text-blue-100 mb-6">O Grito por Justiça</h3>
                                <div className="flex justify-end mb-8">
                                    <div className="text-right max-w-2xl space-y-3">
                                        <p className="text-slate-400 text-lg leading-relaxed">
                                            Em momentos cruciais da nossa história, ocupamos os espaços de poder em Brasília para garantir que o legado dos soldados não fosse esquecido.
                                        </p>
                                        <div className="inline-block p-1 px-4 rounded-lg bg-blue-950/50 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                                            Esplanada dos Ministérios
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square rounded-xl border border-blue-500/20 bg-slate-800 flex items-center justify-center">
                                            <ImageIcon className="w-8 h-8 text-blue-900/50" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-slate-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1),transparent_70%)]" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">{content.sectionTitles?.gallery || 'Memórias Visuais'}</h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto">Fragmentos de um tempo que moldou o nosso caráter.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {(content.gallery || []).map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, zIndex: 10, rotateZ: i % 2 === 0 ? 1 : -1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-slate-800/50"
                            >
                                <div className="absolute inset-0 items-center justify-center flex bg-slate-800">
                                    {item.url ? (
                                        <img
                                            src={getGoogleDriveDirectUrl(item.url)}
                                            alt={item.caption}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <span className="text-slate-500 text-sm font-mono uppercase">MEMÓRIA {i + 1}</span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 ring-4 ring-inset ring-blue-500/0 group-hover:ring-blue-500/20 rounded-xl transition-all duration-300 flex items-end p-4">
                                    <span className="text-white text-xs font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{item.caption}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emotional Sections */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-32">
                        {/* A Caserna */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid gap-12 md:grid-cols-2 items-center"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-blue-500 font-medium tracking-widest uppercase text-sm mb-2">
                                    <Shield className="w-5 h-5" /> A Caserna
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{content.sections?.caserna?.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {content.sections?.caserna?.content}
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02, rotateY: 2 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,58,138,0.3)] bg-slate-900 border border-slate-800 flex items-center justify-center group"
                            >
                                {content.sections?.caserna?.imageUrl ? (
                                    <img
                                        src={getGoogleDriveDirectUrl(content.sections.caserna.imageUrl)}
                                        alt="Caserna"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <span className="text-slate-500 text-sm font-mono uppercase">IMAGEM CASERNA</span>
                                )}
                                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </motion.div>

                        {/* A Farda Azul */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid gap-12 md:grid-cols-2 items-center md:flex-row-reverse"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, rotateY: -2 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="order-2 md:order-1 relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,58,138,0.3)] bg-slate-900 border border-slate-800 flex items-center justify-center group"
                            >
                                {content.sections?.farda?.imageUrl ? (
                                    <img
                                        src={getGoogleDriveDirectUrl(content.sections.farda.imageUrl)}
                                        alt="Farda Azul"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <span className="text-slate-500 text-sm font-mono uppercase">IMAGEM FARDA AZUL</span>
                                )}
                                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                            <div className="order-1 md:order-2 space-y-6">
                                <div className="flex items-center gap-3 text-blue-500 font-medium tracking-widest uppercase text-sm mb-2">
                                    <Star className="w-5 h-5" /> A Farda Azul
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{content.sections?.farda?.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {content.sections?.farda?.content}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-800 relative">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{content.sectionTitles?.testimonials || 'Palavras da Tropa'}</h2>
                        <p className="text-blue-200/40">Depoimentos reais de quem viveu a caserna</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {(content.testimonials || []).map((test: any, i: number) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group backdrop-blur-sm"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-10 -mt-10" />

                                <div className="flex gap-4 items-center justify-start mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-blue-600/30 overflow-hidden shadow-inner">
                                        {test.photoUrl ? (
                                            <img
                                                src={getGoogleDriveDirectUrl(test.photoUrl)}
                                                alt={test.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-900/20">
                                                <Users className="w-6 h-6 text-blue-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-blue-100 font-bold">{test.name}</h4>
                                        <p className="text-blue-500/70 text-sm tracking-tight">{test.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 italic leading-relaxed font-serif">"{test.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Combined Rating & CTA Section */}
            <section className="py-24 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.15),transparent_50%)]" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-4xl mx-auto">

                        {/* Star Rating Box - Ultra Compact */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.5)" }}
                            viewport={{ once: true }}
                            className="flex-1 p-5 rounded-[2rem] bg-slate-900/40 border border-blue-500/10 text-center backdrop-blur-md relative overflow-hidden flex flex-col justify-center transition-colors duration-500 group"
                        >
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-all duration-1000" />
                            <MessageSquare className="w-6 h-6 text-blue-500 mx-auto mb-3 opacity-80" />
                            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Curtiu o Memorial?</h3>
                            <p className="text-slate-500 text-xs mb-4 px-4 line-clamp-1">Sua avaliação ajuda a manter viva a nossa história.</p>

                            <div className="flex items-center justify-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => !hasRated && setHoveredRating(star)}
                                        onMouseLeave={() => !hasRated && setHoveredRating(0)}
                                        onClick={() => handleRate(star)}
                                        disabled={hasRated || isSubmitting}
                                        className="focus:outline-none transition-transform active:scale-95 disabled:cursor-default"
                                    >
                                        <Star
                                            className={`w-7 h-7 transition-all duration-300 ${star <= (hoveredRating || userRating)
                                                ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                                                : 'text-slate-700 hover:text-slate-600'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Rating stats */}
                            {totalRatings > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <span className="text-yellow-400 font-bold text-sm">{averageRating}</span>
                                    <span className="text-slate-500 text-xs">•</span>
                                    <span className="text-slate-400 text-xs">{totalRatings} {totalRatings === 1 ? 'avaliação' : 'avaliações'}</span>
                                </div>
                            )}

                            {hasRated && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-blue-400 text-xs font-bold mt-1"
                                >
                                    ✨ Obrigado pela sua avaliação!
                                </motion.p>
                            )}
                        </motion.div>

                        {/* CTA Box - Ultra Compact */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.6)" }}
                            viewport={{ once: true }}
                            className="flex-1 bg-slate-900/60 border border-blue-500/20 p-5 rounded-[2rem] backdrop-blur-xl shadow-2xl relative group overflow-hidden flex flex-col justify-center transition-colors duration-500"
                        >
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-colors duration-700" />

                            <div className="relative z-10 text-center">
                                <Users className="w-6 h-6 text-blue-500/70 mx-auto mb-3" />
                                <h2 className="text-lg md:text-xl font-black text-white mb-2 tracking-tight leading-none">{content.cta?.title || "Apoie o Legado"}</h2>
                                <p className="text-blue-100/40 mb-4 text-[10px] leading-snug line-clamp-2 px-6 italic font-medium">
                                    "{content.cta?.description?.slice(0, 60)}..."
                                </p>
                                <Button asChild size="sm" className="h-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full px-5 text-[10px] shadow-lg transition-all hover:scale-105 active:scale-95">
                                    <Link to="/ajude-nos">
                                        {content.cta?.buttonText || "Apoie"}
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setLightboxImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightboxImage(null)}
                                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <img
                                src={lightboxImage}
                                alt="Foto ampliada"
                                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
