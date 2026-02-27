import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ChevronDown, Shield, Star, Users, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";
import { getGoogleDriveDirectUrl } from "@/lib/google-drive";
import heroBg from "@/assets/images/cesd-hero.png";

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
                <div className="absolute inset-0 z-0">
                    {/* Primary Background Image */}
                    <img
                        src={heroBg}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
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

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-900/50 border border-blue-500/50 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 backdrop-blur-sm"
                        >
                            {content.hero?.buttonText || "Iniciar Jornada"}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
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

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">A Linha do Tempo</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-900/50" />

                        {(content.timeline || []).map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="w-5/12" />
                                <div className="z-10 bg-slate-900 border-2 border-blue-500/50 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                    <span className="text-blue-400 font-bold text-sm">✓</span>
                                </div>
                                <div className={`w-5/12 bg-slate-900/50 border border-slate-800 p-6 rounded-xl backdrop-blur-sm hover:border-blue-500/30 transition-colors text-left`}>
                                    <span className="text-4xl text-blue-500/40 font-black tracking-tighter absolute top-2 right-4 pointer-events-none">{item.year}</span>
                                    <h3 className="text-xl font-bold text-blue-100 mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-slate-400 text-sm relative z-10">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
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
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Memórias Visuais</h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto">Fragmentos de um tempo que moldou o nosso caráter.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {(content.gallery || []).map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.03, zIndex: 10 }}
                                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 items-center justify-center flex bg-slate-800 border border-slate-700/50">
                                    {item.url ? (
                                        <img
                                            src={getGoogleDriveDirectUrl(item.url)}
                                            alt={item.caption}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-slate-500 text-sm font-mono uppercase">MEMÓRIA {i + 1}</span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-blue-900/40 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-blue-500/0 group-hover:ring-blue-500/50 rounded-xl transition-all duration-300 flex items-end p-4">
                                    <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</span>
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
                            <div className="relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,58,138,0.3)] bg-slate-900 border border-slate-800 flex items-center justify-center">
                                {content.sections?.caserna?.imageUrl ? (
                                    <img
                                        src={getGoogleDriveDirectUrl(content.sections.caserna.imageUrl)}
                                        alt="Caserna"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-slate-500 text-sm font-mono uppercase">IMAGEM CASERNA</span>
                                )}
                            </div>
                        </motion.div>

                        {/* A Farda Azul */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid gap-12 md:grid-cols-2 items-center md:flex-row-reverse"
                        >
                            <div className="order-2 md:order-1 relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,58,138,0.3)] bg-slate-900 border border-slate-800 flex items-center justify-center">
                                {content.sections?.farda?.imageUrl ? (
                                    <img
                                        src={getGoogleDriveDirectUrl(content.sections.farda.imageUrl)}
                                        alt="Farda Azul"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-slate-500 text-sm font-mono uppercase">IMAGEM FARDA AZUL</span>
                                )}
                            </div>
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
            <section className="py-24 bg-slate-900/50 border-y border-slate-800">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Palavras da Tropa</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {(content.testimonials || []).map((test: any, i: number) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-600/20 transition-colors" />

                                <div className="flex gap-4 items-center justify-start mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-blue-900/50 flex flex-shrink-0 items-center justify-center">
                                        {test.photoUrl ? (
                                            <img
                                                src={getGoogleDriveDirectUrl(test.photoUrl)}
                                                alt={test.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <Users className="w-6 h-6 text-slate-500" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-blue-100 font-bold">{test.name}</h4>
                                        <p className="text-blue-500/70 text-sm">{test.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 italic">"{test.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.2),transparent_50%)]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto bg-slate-900/40 border border-blue-500/20 p-12 rounded-3xl backdrop-blur-sm shadow-[0_0_50px_rgba(30,58,138,0.15)]"
                    >
                        <Users className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.cta?.title}</h2>
                        <p className="text-blue-200/60 mb-8 max-w-xl mx-auto">
                            {content.cta?.description}
                        </p>
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full px-8 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            <Link to="/ajude-nos">
                                {content.cta?.buttonText || "Apoie a Instituição"}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
