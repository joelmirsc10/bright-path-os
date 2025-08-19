import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PassageiroDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  passageiro?: any
  onSave: (passageiro: any) => void
}

export function PassageiroDialog({ open, onOpenChange, passageiro, onSave }: PassageiroDialogProps) {
  const [formData, setFormData] = useState({
    nome: passageiro?.nome || "",
    rg: passageiro?.rg || "",
    idade: passageiro?.idade || "",
    telefone: passageiro?.telefone || "",
    poltrona: passageiro?.poltrona || "",
    statusPagamento: passageiro?.statusPagamento || "pendente",
    valorPago: passageiro?.valorPago || "",
    excursaoId: passageiro?.excursaoId || ""
  })

  const handleSave = () => {
    onSave({
      ...passageiro,
      ...formData,
      id: passageiro?.id || Date.now()
    })
    onOpenChange(false)
  }

  const isEditing = !!passageiro

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Passageiro" : "Novo Passageiro"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Altere as informações do passageiro" : "Adicione um novo passageiro à excursão"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input 
                id="nome" 
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Digite o nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input 
                id="rg" 
                value={formData.rg}
                onChange={(e) => setFormData({...formData, rg: e.target.value})}
                placeholder="00.000.000-0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idade">Idade</Label>
              <Input 
                id="idade" 
                type="number"
                value={formData.idade}
                onChange={(e) => setFormData({...formData, idade: parseInt(e.target.value)})}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input 
                id="telefone" 
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="poltrona">Poltrona</Label>
              <Input 
                id="poltrona" 
                type="number"
                value={formData.poltrona}
                onChange={(e) => setFormData({...formData, poltrona: parseInt(e.target.value)})}
                placeholder="Número da poltrona"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor-pago">Valor Pago</Label>
              <Input 
                id="valor-pago" 
                type="number"
                step="0.01"
                value={formData.valorPago}
                onChange={(e) => setFormData({...formData, valorPago: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status-pagamento">Status do Pagamento</Label>
            <Select value={formData.statusPagamento} onValueChange={(value) => setFormData({...formData, statusPagamento: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="parcial">Pago Parcial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excursao">Excursão</Label>
            <Select value={formData.excursaoId} onValueChange={(value) => setFormData({...formData, excursaoId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a excursão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Gramado/RS</SelectItem>
                <SelectItem value="2">Aparados da Serra</SelectItem>
                <SelectItem value="3">Campos do Jordão/SP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-gradient-primary text-white">
            {isEditing ? "Salvar Alterações" : "Adicionar Passageiro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}