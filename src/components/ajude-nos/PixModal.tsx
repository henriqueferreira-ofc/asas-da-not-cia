import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, QrCode } from "lucide-react";

interface PixModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedItem: string;
    selectedValue: string;
    selectedPixCode: string;
    copied: boolean;
    onCopyPixCode: () => void;
    pixBeneficiary: string;
}

export function PixModal({
    isOpen,
    onOpenChange,
    selectedItem,
    selectedValue,
    selectedPixCode,
    copied,
    onCopyPixCode,
    pixBeneficiary
}: PixModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-serif">
                        Pagamento via PIX
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center space-y-6 py-4">
                    <div className="bg-secondary rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">{selectedItem}</p>
                        <p className="text-3xl font-bold text-headline">R$ {selectedValue}</p>
                    </div>

                    {selectedPixCode ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                                <Check className="w-5 h-5" />
                                <p className="text-sm font-medium">PIX Copia e Cola pronto!</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Código PIX</p>
                                <div className="bg-secondary rounded-lg p-3">
                                    <p className="text-xs font-mono text-foreground break-all mb-3 max-h-20 overflow-y-auto">
                                        {selectedPixCode}
                                    </p>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={onCopyPixCode}
                                        className="w-full gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Código Copiado!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copiar Código PIX
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-48 h-48 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                                <div className="text-center">
                                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-xs text-muted-foreground">Entre em contato para PIX</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Para E-Books, entre em contato conosco
                            </p>
                        </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{pixBeneficiary}</p>
                    </div>

                    <div className="text-left bg-accent/5 rounded-lg p-4 text-sm">
                        <p className="font-medium text-headline mb-2">Como pagar:</p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                            <li>Abra o app do seu banco</li>
                            <li>Escolha pagar com PIX</li>
                            <li>Escaneie o QR Code ou cole a chave</li>
                            <li>Confirme o valor e finalize</li>
                        </ol>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
