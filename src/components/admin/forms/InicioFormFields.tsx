import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InicioFormFieldsProps {
    content: Record<string, unknown>;
    onChange: (content: Record<string, unknown>) => void;
}

export const InicioFormFields = ({ content, onChange }: InicioFormFieldsProps) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="heroTitle">Título Principal</Label>
            <Input
                id="heroTitle"
                value={(content.heroTitle as string) || ''}
                onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Subtítulo</Label>
            <Textarea
                id="heroSubtitle"
                rows={3}
                value={(content.heroSubtitle as string) || ''}
                onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value })}
            />
        </div>
    </div>
);
