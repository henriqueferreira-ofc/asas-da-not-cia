import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Brazilian states for the 15 state counselors
const ESTADOS_BRASILEIROS = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
];

const CARGOS_CONSELHO_FISCAL = [
  "Presidente",
  "Segundo Conselheiro",
  "Terceiro Conselheiro",
  "Advogada",
];

interface ConselheiroEstadual {
  estado: string;
  nome: string;
}

interface ConselhoFiscalMember {
  cargo: string;
  nome: string;
}

interface DiretoriaFormFieldsProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export const DiretoriaFormFields = ({ content, onChange }: DiretoriaFormFieldsProps) => {
  const presidente = (content.presidente as { nome?: string }) || { nome: "" };
  const vicePresidente = (content.vicePresidente as { nome?: string }) || { nome: "" };
  const secretarioGeral = (content.secretarioGeral as { nome?: string }) || { nome: "" };
  const diretorFinanceiro = (content.diretorFinanceiro as { nome?: string }) || { nome: "" };
  const viceDiretorFinanceiro = (content.viceDiretorFinanceiro as { nome?: string }) || { nome: "" };
  
  const conselheirosEstaduais = (content.conselheirosEstaduais as ConselheiroEstadual[]) || 
    ESTADOS_BRASILEIROS.map(e => ({ estado: e.sigla, nome: "" }));
  
  const conselhoFiscal = (content.conselhoFiscal as ConselhoFiscalMember[]) || 
    CARGOS_CONSELHO_FISCAL.map(cargo => ({ cargo, nome: "" }));

  const updateDiretoria = (key: string, nome: string) => {
    onChange({ ...content, [key]: { nome } });
  };

  const updateConselheiroEstadual = (index: number, nome: string) => {
    const updated = [...conselheirosEstaduais];
    updated[index] = { ...updated[index], nome };
    onChange({ ...content, conselheirosEstaduais: updated });
  };

  const updateConselhoFiscal = (index: number, nome: string) => {
    const updated = [...conselhoFiscal];
    updated[index] = { ...updated[index], nome };
    onChange({ ...content, conselhoFiscal: updated });
  };

  return (
    <div className="space-y-8">
      {/* Título da Página */}
      <div className="space-y-2">
        <Label htmlFor="title">Título da Página</Label>
        <Input
          id="title"
          value={(content.title as string) || ""}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
        />
      </div>

      {/* Diretoria Executiva */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diretoria Executiva</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Presidente</Label>
              <Input
                value={presidente.nome || ""}
                onChange={(e) => updateDiretoria("presidente", e.target.value)}
                placeholder="Nome do Presidente"
              />
            </div>
            <div className="space-y-2">
              <Label>Vice-Presidente</Label>
              <Input
                value={vicePresidente.nome || ""}
                onChange={(e) => updateDiretoria("vicePresidente", e.target.value)}
                placeholder="Nome do Vice-Presidente"
              />
            </div>
            <div className="space-y-2">
              <Label>Secretário Geral</Label>
              <Input
                value={secretarioGeral.nome || ""}
                onChange={(e) => updateDiretoria("secretarioGeral", e.target.value)}
                placeholder="Nome do Secretário Geral"
              />
            </div>
            <div className="space-y-2">
              <Label>Diretor Financeiro</Label>
              <Input
                value={diretorFinanceiro.nome || ""}
                onChange={(e) => updateDiretoria("diretorFinanceiro", e.target.value)}
                placeholder="Nome do Diretor Financeiro"
              />
            </div>
            <div className="space-y-2">
              <Label>Vice Diretor Financeiro</Label>
              <Input
                value={viceDiretorFinanceiro.nome || ""}
                onChange={(e) => updateDiretoria("viceDiretorFinanceiro", e.target.value)}
                placeholder="Nome do Vice Diretor Financeiro"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conselheiros Estaduais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conselheiros Estaduais (15 Estados)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ESTADOS_BRASILEIROS.map((estado, index) => {
              const conselheiro = conselheirosEstaduais.find(c => c.estado === estado.sigla) || 
                { estado: estado.sigla, nome: "" };
              const conselheiroIndex = conselheirosEstaduais.findIndex(c => c.estado === estado.sigla);
              const actualIndex = conselheiroIndex >= 0 ? conselheiroIndex : index;
              
              return (
                <div key={estado.sigla} className="space-y-1">
                  <Label className="text-xs">
                    {estado.sigla} - {estado.nome}
                  </Label>
                  <Input
                    value={conselheiro.nome || ""}
                    onChange={(e) => {
                      if (conselheiroIndex >= 0) {
                        updateConselheiroEstadual(actualIndex, e.target.value);
                      } else {
                        // Initialize if not exists
                        const newConselheiros = [...conselheirosEstaduais];
                        newConselheiros.push({ estado: estado.sigla, nome: e.target.value });
                        onChange({ ...content, conselheirosEstaduais: newConselheiros });
                      }
                    }}
                    placeholder={`Conselheiro de ${estado.sigla}`}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conselho Fiscal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conselho Fiscal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CARGOS_CONSELHO_FISCAL.map((cargo, index) => {
              const membro = conselhoFiscal[index] || { cargo, nome: "" };
              return (
                <div key={cargo} className="space-y-2">
                  <Label>{cargo}</Label>
                  <Input
                    value={membro.nome || ""}
                    onChange={(e) => updateConselhoFiscal(index, e.target.value)}
                    placeholder={`Nome - ${cargo}`}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
