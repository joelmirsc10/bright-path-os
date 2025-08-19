import { useState } from "react"
import { Plus, Search, Settings, MessageSquare, Phone, Edit3, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const Cobranca = () => {
  const [isCreatingFatura, setIsCreatingFatura] = useState(false)
  const [isCreatingTipo, setIsCreatingTipo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for invoices
  const faturas = [
    {
      id: 1,
      cliente: "João Silva",
      valorOriginal: 1250.00,
      juros: 0.00,
      multa: 0.00,
      total: 1250.00,
      vencimento: "14/01/2024",
      status: "Pago",
      tipo: "Mensalidade"
    },
    {
      id: 2,
      cliente: "Maria Santos",
      valorOriginal: 850.00,
      juros: 42.50,
      multa: 25.50,
      total: 918.00,
      vencimento: "09/01/2024",
      status: "Em Atraso",
      tipo: "Multa"
    },
    {
      id: 3,
      cliente: "Pedro Costa",
      valorOriginal: 2100.00,
      juros: 0.00,
      multa: 0.00,
      total: 2100.00,
      vencimento: "24/01/2024",
      status: "Pendente",
      tipo: "Excursão"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <Badge variant="default" className="bg-green-100 text-green-800">Pago</Badge>
      case "Em Atraso":
        return <Badge variant="destructive">Em Atraso</Badge>
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredFaturas = faturas.filter(fatura =>
    fatura.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Cobrança</h1>
          <p className="text-muted-foreground">Gerencie faturas, juros e cobranças automatizadas</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreatingTipo} onOpenChange={setIsCreatingTipo}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Cria Tipo de Cobrança
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Tipo de Cobrança</DialogTitle>
                <DialogDescription>
                  Crie um novo tipo de cobrança para categorizar suas faturas
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome-tipo">Nome do Tipo</Label>
                  <Input id="nome-tipo" placeholder="Ex: Mensalidade, Multa, Excursão" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descricao-tipo">Descrição</Label>
                  <Textarea id="descricao-tipo" placeholder="Descrição do tipo de cobrança" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsCreatingTipo(false)}>Criar Tipo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingFatura} onOpenChange={setIsCreatingFatura}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Fatura
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Fatura</DialogTitle>
                <DialogDescription>
                  Adicione uma nova cobrança ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cliente">Nome do Cliente</Label>
                  <Input id="cliente" placeholder="Digite o nome do cliente" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo-cobranca">Tipo de Cobrança</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensalidade">Mensalidade</SelectItem>
                      <SelectItem value="multa">Multa</SelectItem>
                      <SelectItem value="excursao">Excursão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valor-original">Valor Original</Label>
                  <Input id="valor-original" type="number" placeholder="0,00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vencimento">Data Vencimento</Label>
                  <Input id="vencimento" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="juros">Valor de Juros</Label>
                  <Input id="juros" type="number" placeholder="0,00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="multa">Valor de Multa</Label>
                  <Input id="multa" type="number" placeholder="0,00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="atraso">Em Atraso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsCreatingFatura(false)}>Criar Fatura</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ 4.268,00</div>
            <p className="text-xs text-muted-foreground">Incluindo juros e multas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturas Pagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">R$ 918,00 em juros</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">8</div>
            <p className="text-xs text-muted-foreground">Vencimento próximo</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Faturas</CardTitle>
          <CardDescription>Gerencie todas as cobranças em um só lugar</CardDescription>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor Original</TableHead>
                <TableHead>Juros</TableHead>
                <TableHead>Multa</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaturas.map((fatura) => (
                <TableRow key={fatura.id}>
                  <TableCell className="font-medium">{fatura.cliente}</TableCell>
                  <TableCell>R$ {fatura.valorOriginal.toFixed(2)}</TableCell>
                  <TableCell>R$ {fatura.juros.toFixed(2)}</TableCell>
                  <TableCell>R$ {fatura.multa.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">R$ {fatura.total.toFixed(2)}</TableCell>
                  <TableCell>{fatura.vencimento}</TableCell>
                  <TableCell>{getStatusBadge(fatura.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Cobrar
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Configuration Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Cobrança</CardTitle>
            <CardDescription>Configure juros e multas automaticamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="taxa-juros">Taxa de Juros (% ao mês)</Label>
              <Input id="taxa-juros" type="number" defaultValue="5,0" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="multa-atraso">Multa por Atraso (%)</Label>
              <Input id="multa-atraso" type="number" defaultValue="3,0" />
            </div>
            <Button className="w-full">Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automação de Cobrança</CardTitle>
            <CardDescription>Configure lembretes automáticos via WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembrete 3 dias antes</Label>
                <p className="text-sm text-muted-foreground">Enviar via WhatsApp</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cobrança no vencimento</Label>
                <p className="text-sm text-muted-foreground">Aplicar juros automático</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full">Configurar Automação</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cobranca