import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

// Brazilian states for the 15 state counselors
const ESTADOS_BRASILEIROS = [
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PE", nome: "Pernambuco" },
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
  foto?: string;
}

interface ConselhoFiscalMember {
  cargo: string;
  nome: string;
  foto?: string;
}

interface DiretoriaFormFieldsProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export const DiretoriaFormFields = ({ content, onChange }: DiretoriaFormFieldsProps) => {
  const presidente = (content.presidente as { nome?: string; foto?: string }) || { nome: "", foto: "" };
  const vicePresidente = (content.vicePresidente as { nome?: string; foto?: string }) || { nome: "", foto: "" };
  const secretarioGeral = (content.secretarioGeral as { nome?: string; foto?: string }) || { nome: "", foto: "" };
  const diretorFinanceiro = (content.diretorFinanceiro as { nome?: string; foto?: string }) || { nome: "", foto: "" };
  const viceDiretorFinanceiro = (content.viceDiretorFinanceiro as { nome?: string; foto?: string }) || { nome: "", foto: "" };
  
  const conselheirosEstaduais = (content.conselheirosEstaduais as ConselheiroEstadual[]) || 
    ESTADOS_BRASILEIROS.map(e => ({ estado: e.sigla, nome: "", foto: "" }));
  
  const conselhoFiscal = (content.conselhoFiscal as ConselhoFiscalMember[]) || 
    CARGOS_CONSELHO_FISCAL.map(cargo => ({ cargo, nome: "", foto: "" }));

  const updateDiretoria = (key: string, field: "nome" | "foto", value: string) => {
    const current = (content[key] as { nome?: string; foto?: string }) || { nome: "", foto: "" };
    onChange({ ...content, [key]: { ...current, [field]: value } });
  };

  const updateConselheiroEstadual = (index: number, field: "nome" | "foto", value: string) => {
    const updated = [...conselheirosEstaduais];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, conselheirosEstaduais: updated });
  };

  const updateConselhoFiscal = (index: number, field: "nome" | "foto", value: string) => {
    const updated = [...conselhoFiscal];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, conselhoFiscal: updated });
  };

  // Diretoria Executiva members for iteration
  const diretoriaMembers = [
    { key: "presidente", label: "Presidente", data: presidente },
    { key: "vicePresidente", label: "Vice-Presidente", data: vicePresidente },
    { key: "secretarioGeral", label: "Secretário Geral", data: secretarioGeral },
    { key: "diretorFinanceiro", label: "Diretor Financeiro", data: diretorFinanceiro },
    { key: "viceDiretorFinanceiro", label: "Vice Diretor Financeiro", data: viceDiretorFinanceiro },
  ];

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
        <CardContent className="space-y-6">
          {diretoriaMembers.map((membro) => (
            <div key={membro.key} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{membro.label}</span>
                {membro.data.foto && (
                  <img 
                    src={membro.data.foto} 
                    alt={membro.data.nome} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Nome</Label>
                  <Input
                    value={membro.data.nome || ""}
                    onChange={(e) => updateDiretoria(membro.key, "nome", e.target.value)}
                    placeholder={`Nome do ${membro.label}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    URL da Foto (Google Drive)
                  </Label>
                  <Input
                    value={membro.data.foto || ""}
                    onChange={(e) => updateDiretoria(membro.key, "foto", e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conselheiros Estaduais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conselheiros Estaduais (15 Estados)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ESTADOS_BRASILEIROS.map((estado, index) => {
              const conselheiro = conselheirosEstaduais.find(c => c.estado === estado.sigla) || 
                { estado: estado.sigla, nome: "", foto: "" };
              const conselheiroIndex = conselheirosEstaduais.findIndex(c => c.estado === estado.sigla);
              const actualIndex = conselheiroIndex >= 0 ? conselheiroIndex : index;
              
              return (
                <div key={estado.sigla} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">
                      {estado.sigla} - {estado.nome}
                    </span>
                    {conselheiro.foto && (
                      <img 
                        src={conselheiro.foto} 
                        alt={conselheiro.nome} 
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={conselheiro.nome || ""}
                      onChange={(e) => {
                        if (conselheiroIndex >= 0) {
                          updateConselheiroEstadual(actualIndex, "nome", e.target.value);
                        } else {
                          const newConselheiros = [...conselheirosEstaduais];
                          newConselheiros.push({ estado: estado.sigla, nome: e.target.value, foto: "" });
                          onChange({ ...content, conselheirosEstaduais: newConselheiros });
                        }
                      }}
                      placeholder={`Nome do Conselheiro`}
                      className="text-sm"
                    />
                    <div className="relative">
                      <Link2 className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        value={conselheiro.foto || ""}
                        onChange={(e) => {
                          if (conselheiroIndex >= 0) {
                            updateConselheiroEstadual(actualIndex, "foto", e.target.value);
                          } else {
                            const newConselheiros = [...conselheirosEstaduais];
                            newConselheiros.push({ estado: estado.sigla, nome: "", foto: e.target.value });
                            onChange({ ...content, conselheirosEstaduais: newConselheiros });
                          }
                        }}
                        placeholder="URL da Foto"
                        className="text-sm pl-7"
                      />
                    </div>
                  </div>
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
              const membro = conselhoFiscal[index] || { cargo, nome: "", foto: "" };
              return (
                <div key={cargo} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{cargo}</span>
                    {membro.foto && (
                      <img 
                        src={membro.foto} 
                        alt={membro.nome} 
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={membro.nome || ""}
                      onChange={(e) => updateConselhoFiscal(index, "nome", e.target.value)}
                      placeholder={`Nome`}
                    />
                    <div className="relative">
                      <Link2 className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        value={membro.foto || ""}
                        onChange={(e) => updateConselhoFiscal(index, "foto", e.target.value)}
                        placeholder="URL da Foto"
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
