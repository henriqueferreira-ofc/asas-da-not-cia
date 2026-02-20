import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContatoFormFieldsProps {
    content: Record<string, unknown>;
    onChange: (content: Record<string, unknown>) => void;
}

export const ContatoFormFields = ({ content, onChange }: ContatoFormFieldsProps) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="title">Título da Página</Label>
            <Input
                id="title"
                value={(content.title as string) || ''}
                onChange={(e) => onChange({ ...content, title: e.target.value })}
                placeholder="Entre em Contato"
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo (texto abaixo do título)</Label>
            <Textarea
                id="subtitle"
                rows={2}
                value={(content.subtitle as string) || ''}
                onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
                placeholder="Estamos à disposição para atender associados..."
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">E-mail (quadro E-mail)</Label>
            <Input
                id="email"
                type="email"
                value={(content.email as string) || ''}
                onChange={(e) => onChange({ ...content, email: e.target.value })}
                placeholder="aafabdm@gmail.com"
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
                id="phone"
                value={(content.phone as string) || ''}
                onChange={(e) => onChange({ ...content, phone: e.target.value })}
                placeholder="(61) 3965-2394 / 98321-3399"
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="openingHours">Horário de atendimento (opcional, aparece no quadro Telefone)</Label>
            <Input
                id="openingHours"
                value={(content.openingHours as string) || ''}
                onChange={(e) => onChange({ ...content, openingHours: e.target.value })}
                placeholder="Ex: Segunda a Sexta 08h às 18h. Deixe vazio para não exibir."
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Textarea
                id="address"
                rows={3}
                value={(content.address as string) || ''}
                onChange={(e) => onChange({ ...content, address: e.target.value })}
                placeholder="SCS Quadra 02 Ed. Oscar Niemeyer..."
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="formTitle">Título do formulário</Label>
            <Input
                id="formTitle"
                value={(content.formTitle as string) || ''}
                onChange={(e) => onChange({ ...content, formTitle: e.target.value })}
                placeholder="Envie sua Mensagem"
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="whatsappLink">Link do WhatsApp</Label>
            <Input
                id="whatsappLink"
                value={(content.whatsappLink as string) || ''}
                onChange={(e) => onChange({ ...content, whatsappLink: e.target.value })}
                placeholder="https://wa.me/5561999999999"
            />
        </div>
    </div>
);
