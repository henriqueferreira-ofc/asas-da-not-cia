import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface CesdFormFieldsProps {
    content: Record<string, any>;
    onChange: (content: Record<string, any>) => void;
}

export const CesdFormFields = ({ content, onChange }: CesdFormFieldsProps) => {
    // Helper to update specific nested fields
    const updateHero = (field: string, value: string) => {
        const hero = { ...(content.hero || {}), [field]: value };
        onChange({ ...content, hero });
    };

    const updateCTA = (field: string, value: string) => {
        const cta = { ...(content.cta || {}), [field]: value };
        onChange({ ...content, cta });
    };

    const updateSection = (section: string, field: string, value: string) => {
        const sections = { ...(content.sections || {}) };
        sections[section] = { ...(sections[section] || {}), [field]: value };
        onChange({ ...content, sections });
    };

    // Array field helpers
    const addTimelineYear = () => {
        const timeline = [...(content.timeline || [])];
        timeline.push({ year: '', title: '', description: '' });
        onChange({ ...content, timeline });
    };

    const removeTimelineYear = (index: number) => {
        const timeline = [...(content.timeline || [])];
        timeline.splice(index, 1);
        onChange({ ...content, timeline });
    };

    const updateTimelineYear = (index: number, field: string, value: string) => {
        const timeline = [...(content.timeline || [])];
        timeline[index] = { ...timeline[index], [field]: value };
        onChange({ ...content, timeline });
    };

    const addGalleryImage = () => {
        const gallery = [...(content.gallery || [])];
        gallery.push({ url: '', caption: '' });
        onChange({ ...content, gallery });
    };

    const removeGalleryImage = (index: number) => {
        const gallery = [...(content.gallery || [])];
        gallery.splice(index, 1);
        onChange({ ...content, gallery });
    };

    const updateGalleryImage = (index: number, field: string, value: string) => {
        const gallery = [...(content.gallery || [])];
        gallery[index] = { ...gallery[index], [field]: value };
        onChange({ ...content, gallery });
    };

    const addTestimonial = () => {
        const testimonials = [...(content.testimonials || [])];
        testimonials.push({ name: '', role: '', text: '', photoUrl: '' });
        onChange({ ...content, testimonials });
    };

    const removeTestimonial = (index: number) => {
        const testimonials = [...(content.testimonials || [])];
        testimonials.splice(index, 1);
        onChange({ ...content, testimonials });
    };

    const updateTestimonial = (index: number, field: string, value: string) => {
        const testimonials = [...(content.testimonials || [])];
        testimonials[index] = { ...testimonials[index], [field]: value };
        onChange({ ...content, testimonials });
    };

    const addManifestacao = () => {
        const manifestacoes = [...(content.manifestacoes || [])];
        manifestacoes.push({ title: '', content: '', imageUrl: '', location: '' });
        onChange({ ...content, manifestacoes });
    };

    const removeManifestacao = (index: number) => {
        const manifestacoes = [...(content.manifestacoes || [])];
        manifestacoes.splice(index, 1);
        onChange({ ...content, manifestacoes });
    };

    const updateManifestacao = (index: number, field: string, value: string) => {
        const manifestacoes = [...(content.manifestacoes || [])];
        manifestacoes[index] = { ...manifestacoes[index], [field]: value };
        onChange({ ...content, manifestacoes });
    };

    return (
        <div className="space-y-12">
            {/* HERO SECTION */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Seção Hero (Topo)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Título do Hero</Label>
                        <Input
                            value={content.hero?.title || ''}
                            onChange={(e) => updateHero('title', e.target.value)}
                            placeholder="Ex: PRD – Memorial Digital CESD"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Texto do Botão</Label>
                        <Input
                            value={content.hero?.buttonText || ''}
                            onChange={(e) => updateHero('buttonText', e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Subtítulo / Descrição</Label>
                    <Textarea
                        value={content.hero?.subtitle || ''}
                        onChange={(e) => updateHero('subtitle', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>URL do Vídeo de Fundo (Opcional)</Label>
                    <Input
                        value={content.hero?.videoUrl || ''}
                        onChange={(e) => updateHero('videoUrl', e.target.value)}
                        placeholder="https://..."
                    />
                </div>
            </div>

            {/* TIMELINE SECTION */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-xl font-bold">Timeline (História)</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addTimelineYear} className="gap-2">
                        <Plus className="w-4 h-4" /> Adicionar Ano
                    </Button>
                </div>
                <div className="grid gap-6">
                    {(content.timeline || []).map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/30 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 w-8 h-8"
                                onClick={() => removeTimelineYear(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Ano</Label>
                                    <Input value={item.year || ''} onChange={(e) => updateTimelineYear(index, 'year', e.target.value)} placeholder="1994" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>Título</Label>
                                    <Input value={item.title || ''} onChange={(e) => updateTimelineYear(index, 'title', e.target.value)} />
                                </div>
                                <div className="md:col-span-3 space-y-2">
                                    <Label>Descrição</Label>
                                    <Textarea value={item.description || ''} onChange={(e) => updateTimelineYear(index, 'description', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MANIFESTAÇÕES SECTION */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-xl font-bold">Manifestações em Brasília</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addManifestacao} className="gap-2">
                        <Plus className="w-4 h-4" /> Adicionar Momento
                    </Button>
                </div>
                <div className="grid gap-6">
                    {(content.manifestacoes || []).map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/30 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 w-8 h-8"
                                onClick={() => removeManifestacao(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Título do Momento</Label>
                                    <Input value={item.title || ''} onChange={(e) => updateManifestacao(index, 'title', e.target.value)} placeholder="Ex: O Grito por Justiça" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Local / Tag</Label>
                                    <Input value={item.location || ''} onChange={(e) => updateManifestacao(index, 'location', e.target.value)} placeholder="Ex: Esplanada dos Ministérios" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>História / Conteúdo</Label>
                                    <Textarea value={item.content || ''} onChange={(e) => updateManifestacao(index, 'content', e.target.value)} rows={3} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>URL da Foto (Google Drive ou link)</Label>
                                    <Input value={item.imageUrl || ''} onChange={(e) => updateManifestacao(index, 'imageUrl', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GALLERY SECTION */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-xl font-bold">Galeria de Memórias</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addGalleryImage} className="gap-2">
                        <Plus className="w-4 h-4" /> Adicionar Imagem
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(content.gallery || []).map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/30 relative flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 w-8 h-8"
                                onClick={() => removeGalleryImage(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="space-y-2 mt-6">
                                <Label>URL da Imagem</Label>
                                <Input value={item.url || ''} onChange={(e) => updateGalleryImage(index, 'url', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Legenda (Hover)</Label>
                                <Input value={item.caption || ''} onChange={(e) => updateGalleryImage(index, 'caption', e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DETAILED SECTIONS */}
            <div className="space-y-8">
                <h3 className="text-xl font-bold border-b pb-2">Seções de Conteúdo</h3>

                {/* A Caserna */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-bold text-blue-600">Seção: A Caserna</h4>
                    <div className="space-y-2">
                        <Label>Título da Seção</Label>
                        <Input
                            value={content.sections?.caserna?.title || ''}
                            onChange={(e) => updateSection('caserna', 'title', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        <Textarea
                            rows={5}
                            value={content.sections?.caserna?.content || ''}
                            onChange={(e) => updateSection('caserna', 'content', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>URL da Imagem</Label>
                        <Input
                            value={content.sections?.caserna?.imageUrl || ''}
                            onChange={(e) => updateSection('caserna', 'imageUrl', e.target.value)}
                        />
                    </div>
                </div>

                {/* A Farda Azul */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-bold text-blue-600">Seção: A Farda Azul</h4>
                    <div className="space-y-2">
                        <Label>Título da Seção</Label>
                        <Input
                            value={content.sections?.farda?.title || ''}
                            onChange={(e) => updateSection('farda', 'title', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        <Textarea
                            rows={5}
                            value={content.sections?.farda?.content || ''}
                            onChange={(e) => updateSection('farda', 'content', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>URL da Imagem</Label>
                        <Input
                            value={content.sections?.farda?.imageUrl || ''}
                            onChange={(e) => updateSection('farda', 'imageUrl', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-xl font-bold">Depoimentos (Palavras da Tropa)</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addTestimonial} className="gap-2">
                        <Plus className="w-4 h-4" /> Adicionar Depoimento
                    </Button>
                </div>
                <div className="grid gap-6">
                    {(content.testimonials || []).map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/30 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 w-8 h-8"
                                onClick={() => removeTestimonial(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nome</Label>
                                    <Input value={item.name || ''} onChange={(e) => updateTestimonial(index, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Turma / Cargo</Label>
                                    <Input value={item.role || ''} onChange={(e) => updateTestimonial(index, 'role', e.target.value)} placeholder="Turma de 1994" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>Mensagem</Label>
                                    <Textarea value={item.text || ''} onChange={(e) => updateTestimonial(index, 'text', e.target.value)} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>URL da Foto</Label>
                                    <Input value={item.photoUrl || ''} onChange={(e) => updateTestimonial(index, 'photoUrl', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold border-b pb-2">Finalização (CTA)</h3>
                <div className="space-y-2">
                    <Label>Título</Label>
                    <Input
                        value={content.cta?.title || ''}
                        onChange={(e) => updateCTA('title', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea
                        value={content.cta?.description || ''}
                        onChange={(e) => updateCTA('description', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Texto do Botão</Label>
                    <Input
                        value={content.cta?.buttonText || ''}
                        onChange={(e) => updateCTA('buttonText', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
