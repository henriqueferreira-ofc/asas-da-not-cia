import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function TermosFormFields({ content, onChange }: Props) {
  const set = (key: string, value: string) => onChange({ ...content, [key]: value });

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={(content.titulo as string) || ''}
            onChange={(e) => set('titulo', e.target.value)}
            placeholder="Termos de Uso"
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={(content.subtitulo as string) || ''}
            onChange={(e) => set('subtitulo', e.target.value)}
            placeholder="Leia com atenção as condições de uso do portal AAFAB."
          />
        </div>
      </div>

      <hr />

      <div>
        <Label>1. Aceitação dos Termos</Label>
        <Textarea
          rows={4}
          value={(content.s1 as string) || ''}
          onChange={(e) => set('s1', e.target.value)}
          placeholder="Texto da seção 1..."
        />
      </div>

      <div>
        <Label>2. Uso do Conteúdo</Label>
        <Textarea
          rows={4}
          value={(content.s2 as string) || ''}
          onChange={(e) => set('s2', e.target.value)}
          placeholder="Texto da seção 2..."
        />
      </div>

      <div>
        <Label>3. Compra de E-Books</Label>
        <Textarea
          rows={4}
          value={(content.s3 as string) || ''}
          onChange={(e) => set('s3', e.target.value)}
          placeholder="Texto da seção 3..."
        />
      </div>

      <div>
        <Label>4. Política de Reembolso</Label>
        <Textarea
          rows={4}
          value={(content.s4 as string) || ''}
          onChange={(e) => set('s4', e.target.value)}
          placeholder="Texto da seção 4..."
        />
      </div>

      <div>
        <Label>5. Responsabilidade</Label>
        <Textarea
          rows={4}
          value={(content.s5 as string) || ''}
          onChange={(e) => set('s5', e.target.value)}
          placeholder="Texto da seção 5..."
        />
      </div>

      <div>
        <Label>6. Links Externos</Label>
        <Textarea
          rows={3}
          value={(content.s6 as string) || ''}
          onChange={(e) => set('s6', e.target.value)}
          placeholder="Texto da seção 6..."
        />
      </div>

      <div>
        <Label>7. Alterações nos Termos</Label>
        <Textarea
          rows={3}
          value={(content.s7 as string) || ''}
          onChange={(e) => set('s7', e.target.value)}
          placeholder="Texto da seção 7..."
        />
      </div>

      <div>
        <Label>8. Legislação Aplicável</Label>
        <Textarea
          rows={3}
          value={(content.s8 as string) || ''}
          onChange={(e) => set('s8', e.target.value)}
          placeholder="Texto da seção 8..."
        />
      </div>

      <div>
        <Label>Nota de rodapé (última atualização)</Label>
        <Input
          value={(content.rodape as string) || ''}
          onChange={(e) => set('rodape', e.target.value)}
          placeholder="Última atualização: fevereiro de 2025 · AAFAB"
        />
      </div>
    </div>
  );
}
