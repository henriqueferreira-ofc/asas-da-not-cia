import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAllNoticias, useDeleteNoticia, useTogglePublished } from "@/hooks/useNoticias";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AdminComunicados() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { data: allNoticias, isLoading } = useAllNoticias();
  const deleteNoticia = useDeleteNoticia();
  const togglePublished = useTogglePublished();

  // Filter only "comunicados" category
  const comunicados = allNoticias?.filter(n => n.category === "comunicados") || [];
  
  const filteredComunicados = comunicados.filter(
    (comunicado) =>
      comunicado.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteNoticia.mutateAsync(deleteId);
      toast({
        title: "Comunicado excluído",
        description: "O comunicado foi excluído com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o comunicado.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await togglePublished.mutateAsync({ id, published: !currentStatus });
      toast({
        title: currentStatus ? "Comunicado despublicado" : "Comunicado publicado",
        description: currentStatus 
          ? "O comunicado foi despublicado com sucesso."
          : "O comunicado foi publicado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do comunicado.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-headline">Comunicados</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os comunicados oficiais da AAFAB
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/noticias/nova?category=comunicados">
            <Plus className="w-4 h-4 mr-2" />
            Novo Comunicado
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar comunicados..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Comunicado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : filteredComunicados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? "Nenhum comunicado encontrado para esta busca" 
                      : "Nenhum comunicado cadastrado"}
                  </p>
                  {!searchQuery && (
                    <Button asChild variant="link" className="mt-2">
                      <Link to="/admin/noticias/nova?category=comunicados">
                        Criar primeiro comunicado
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredComunicados.map((comunicado) => (
                <TableRow key={comunicado.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium line-clamp-1">{comunicado.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={comunicado.published ? "default" : "secondary"}>
                      {comunicado.published ? "Publicado" : "Rascunho"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(comunicado.created_at), "dd MMM yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/noticias/editar/${comunicado.id}`}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleTogglePublished(comunicado.id, comunicado.published)}
                        >
                          {comunicado.published ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Despublicar
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Publicar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteId(comunicado.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir comunicado?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O comunicado será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteNoticia.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
