import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SobreFormFieldsProps {
    content: Record<string, unknown>;
    onChange: (content: Record<string, unknown>) => void;
}

export const SobreFormFields = ({ content, onChange }: SobreFormFieldsProps) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="title">Título da Página</Label>
            <Input
                id="title"
                value={(content.title as string) || ''}
                onChange={(e) => onChange({ ...content, title: e.target.value })}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
                id="subtitle"
                value={(content.subtitle as string) || ''}
                onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="intro1">Introdução – Parágrafo 1</Label>
            <Textarea
                id="intro1"
                rows={4}
                value={(content.intro1 as string) || ''}
                onChange={(e) => onChange({ ...content, intro1: e.target.value })}
                placeholder="A AAFAB – Associação Amigos da Força Aérea Brasileira..."
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="intro2">Introdução – Parágrafo 2</Label>
            <Textarea
                id="intro2"
                rows={4}
                value={(content.intro2 as string) || ''}
                onChange={(e) => onChange({ ...content, intro2: e.target.value })}
                placeholder="Fundada com o propósito de fortalecer..."
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="mission">Missão</Label>
            <Textarea
                id="mission"
                rows={4}
                value={(content.mission as string) || ''}
                onChange={(e) => onChange({ ...content, mission: e.target.value })}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="vision">Visão</Label>
            <Textarea
                id="vision"
                rows={4}
                value={(content.vision as string) || ''}
                onChange={(e) => onChange({ ...content, vision: e.target.value })}
            />
        </div>
        <div className="space-y-2">
            <Label>Valores (um por linha, formato: Título - Descrição)</Label>
            <Textarea
                rows={8}
                value={Array.isArray(content.values) ? (content.values as string[]).join('\n') : ''}
                onChange={(e) => onChange({ ...content, values: e.target.value.split('\n') })}
                placeholder="1 - Legalidade - Atuamos com base na Constituição...&#10;2 - Ética - Compromisso com a verdade e transparência...&#10;..."
            />
        </div>
        <div className="space-y-2">
            <Label>Público (um por linha)</Label>
            <Textarea
                rows={6}
                value={Array.isArray(content.publico) ? (content.publico as string[]).join('\n') : ''}
                onChange={(e) => onChange({ ...content, publico: e.target.value.split('\n') })}
                placeholder="Militares da ativa e reserva&#10;Pensionistas e familiares&#10;..."
            />
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Seção CTA (Chamada para Ação)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="ctaTitle">Título do CTA</Label>
                    <Input
                        id="ctaTitle"
                        value={(content.ctaTitle as string) || ''}
                        onChange={(e) => onChange({ ...content, ctaTitle: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ctaText">Texto do CTA</Label>
                    <Textarea
                        id="ctaText"
                        rows={3}
                        value={(content.ctaText as string) || ''}
                        onChange={(e) => onChange({ ...content, ctaText: e.target.value })}
                    />
                </div>
            </CardContent>
        </Card>
    </div>
);
