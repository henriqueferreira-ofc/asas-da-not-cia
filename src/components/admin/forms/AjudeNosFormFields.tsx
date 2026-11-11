import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDonationOptions, type DonationOption } from '@/lib/donations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AjudeNosFormFieldsProps {
    content: Record<string, unknown>;
    onChange: (content: Record<string, unknown>) => void;
}

export const AjudeNosFormFields = ({ content, onChange }: AjudeNosFormFieldsProps) => {
    const options = getDonationOptions(content);
    const updateOptions = (donationOptions: DonationOption[]) => onChange({ ...content, donationOptions });
    const updateOption = (index: number, field: keyof DonationOption, value: string) =>
        updateOptions(options.map((option, position) => position === index ? { ...option, [field]: value } : option));
    return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Cabeçalho da Página</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Título Principal</Label>
                    <Input id="title" value={(content.title as string) || ''} onChange={(e) => onChange({ ...content, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" rows={3} value={(content.description as string) || ''} onChange={(e) => onChange({ ...content, description: e.target.value })} />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Seção E-Books</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="ebooksTitle">Título da Seção</Label>
                    <Input id="ebooksTitle" value={(content.ebooksTitle as string) || ''} onChange={(e) => onChange({ ...content, ebooksTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ebooksSubtitle">Subtítulo</Label>
                    <Input id="ebooksSubtitle" value={(content.ebooksSubtitle as string) || ''} onChange={(e) => onChange({ ...content, ebooksSubtitle: e.target.value })} />
                </div>
                <p className="text-xs text-muted-foreground">Os e-books são gerenciados em E-books {'>'} catálogo</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Seção Doação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="donationTitle">Título</Label>
                    <Input id="donationTitle" value={(content.donationTitle as string) || ''} onChange={(e) => onChange({ ...content, donationTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="donationDescription">Descrição</Label>
                    <Textarea id="donationDescription" rows={3} value={(content.donationDescription as string) || ''} onChange={(e) => onChange({ ...content, donationDescription: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="donationFooter">Texto de rodapé</Label>
                    <Input id="donationFooter" value={(content.donationFooter as string) || ''} onChange={(e) => onChange({ ...content, donationFooter: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pixBeneficiary">Nome do Beneficiário PIX</Label>
                    <Input id="pixBeneficiary" value={(content.pixBeneficiary as string) || ''} onChange={(e) => onChange({ ...content, pixBeneficiary: e.target.value })} />
                </div>

                {options.map((option, index) => (
                    <div key={index} className="border-t pt-4 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <p className="font-medium text-sm">Doação {index + 1}</p>
                            <Button type="button" variant="ghost" size="icon" title={`Remover doação ${index + 1}`} aria-label={`Remover doação ${index + 1}`} onClick={() => updateOptions(options.filter((_, position) => position !== index))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`donation-value-${index}`}>Valor (R$)</Label>
                                <Input id={`donation-value-${index}`} inputMode="decimal" placeholder="19,90" value={option.value} onChange={e => updateOption(index, 'value', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`donation-link-${index}`}>Link de pagamento</Label>
                                <Input id={`donation-link-${index}`} type="url" placeholder="https://" value={option.link} onChange={e => updateOption(index, 'link', e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`donation-pix-${index}`}>Código PIX Copia e Cola (opcional quando há link)</Label>
                            <Textarea id={`donation-pix-${index}`} rows={2} value={option.pixCode} onChange={e => updateOption(index, 'pixCode', e.target.value)} />
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => updateOptions([...options, { value: '', link: '', pixCode: '' }])}>
                    <Plus className="h-4 w-4" /> Adicionar valor
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Seção "Como sua ajuda é utilizada"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="impactTitle">Título da Seção</Label>
                    <Input id="impactTitle" value={(content.impactTitle as string) || ''} onChange={(e) => onChange({ ...content, impactTitle: e.target.value })} />
                </div>
                <div className="border-t pt-4 space-y-4">
                    <p className="font-medium text-sm">Item 1</p>
                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Input value={(content.impact1Title as string) || ''} onChange={(e) => onChange({ ...content, impact1Title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea rows={2} value={(content.impact1Description as string) || ''} onChange={(e) => onChange({ ...content, impact1Description: e.target.value })} />
                    </div>
                </div>
                <div className="border-t pt-4 space-y-4">
                    <p className="font-medium text-sm">Item 2</p>
                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Input value={(content.impact2Title as string) || ''} onChange={(e) => onChange({ ...content, impact2Title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea rows={2} value={(content.impact2Description as string) || ''} onChange={(e) => onChange({ ...content, impact2Description: e.target.value })} />
                    </div>
                </div>
                <div className="border-t pt-4 space-y-4">
                    <p className="font-medium text-sm">Item 3</p>
                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Input value={(content.impact3Title as string) || ''} onChange={(e) => onChange({ ...content, impact3Title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea rows={2} value={(content.impact3Description as string) || ''} onChange={(e) => onChange({ ...content, impact3Description: e.target.value })} />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
    );
};
