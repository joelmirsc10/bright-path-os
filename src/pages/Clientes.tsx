import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Label } from "@/components/ui/label"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { 
  Search, 
  Plus, 
  Eye, 
  Edit,
  Filter,
  Building2,
  Phone,
  Mail
} from "lucide-react"

export default function Clientes() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [sortBy, setSortBy] = useState("nome")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isAddingClient, setIsAddingClient] = useState(false)
  const [isViewingClient, setIsViewingClient] = useState(false)
  const [isEditingClient, setIsEditingClient] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nome: "",
    nome_loja: "",
    documento: "",
    telefone: "",
    email: "",
    status: "ativo"
  })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    // Dados mock temporários até configurar o banco
    const mockClients = [
      {
        id: 1,
        nome: "João Silva",
        nome_loja: "Supermercado Silva",
        documento: "12.345.678/0001-90",
        telefone: "(11) 99999-9999",
        email: "joao@silva.com",
        status: "ativo"
      },
      {
        id: 2,
        nome: "Maria Santos",
        nome_loja: "Padaria Doce Vida",
        documento: "987.654.321-00",
        telefone: "(11) 88888-8888",
        email: "maria@docevidqa.com",
        status: "ativo"
      },
      {
        id: 3,
        nome: "Carlos Oliveira",
        nome_loja: "Farmácia Saúde+",
        documento: "11.222.333/0001-44",
        telefone: "(11) 77777-7777",
        email: "carlos@saudemais.com",
        status: "inativo"
      }
    ]
    
    setClients(mockClients)
    setLoading(false)
  }

  const saveClient = async () => {
    const newClient = {
      id: Date.now(),
      ...formData
    }
    
    setClients([...clients, newClient])
    setIsAddingClient(false)
    resetForm()
    toast({
      title: "Sucesso",
      description: "Cliente adicionado com sucesso"
    })
  }

  const updateClient = async () => {
    const updatedClient = {
      ...selectedClient,
      ...formData
    }
    
    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c))
    setIsEditingClient(false)
    setSelectedClient(null)
    resetForm()
    toast({
      title: "Sucesso",
      description: "Cliente atualizado com sucesso"
    })
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      nome_loja: "",
      documento: "",
      telefone: "",
      email: "",
      status: "ativo"
    })
  }

  const openEditClient = (client: any) => {
    setSelectedClient(client)
    setFormData({
      nome: client.nome || "",
      nome_loja: client.nome_loja || "",
      documento: client.documento || "",
      telefone: client.telefone || "",
      email: client.email || "",
      status: client.status || "ativo"
    })
    setIsEditingClient(true)
  }

  const filteredClients = clients
    .filter(client => {
      const matchesSearch = client.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.nome_loja?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.documento?.includes(searchTerm) ||
                           client.email?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === "todos" || client.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "nome") return (a.nome || "").localeCompare(b.nome || "")
      if (sortBy === "status") return (a.status || "").localeCompare(b.status || "")
      return 0
    })

  const getStatusBadge = (status: string) => {
    if (status === "ativo") {
      return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>
    }
    return <Badge variant="secondary">Inativo</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie todos os seus clientes</p>
        </div>

        <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha as informações do cliente abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input 
                  id="nome" 
                  className="col-span-3"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nomeLoja" className="text-right">
                  Nome da Loja
                </Label>
                <Input 
                  id="nomeLoja" 
                  className="col-span-3"
                  value={formData.nome_loja}
                  onChange={(e) => setFormData({...formData, nome_loja: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documento" className="text-right">
                  CNPJ/CPF
                </Label>
                <Input 
                  id="documento" 
                  className="col-span-3"
                  value={formData.documento}
                  onChange={(e) => setFormData({...formData, documento: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone
                </Label>
                <Input 
                  id="telefone" 
                  className="col-span-3"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  className="col-span-3"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                className="bg-gradient-primary text-white"
                onClick={saveClient}
                disabled={!formData.nome || !formData.documento}
              >
                Salvar Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, loja, documento ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nome">Nome A-Z</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Clientes</CardTitle>
          <CardDescription>
            {filteredClients.length} cliente(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{client.nome}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{client.nome_loja}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {client.documento}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {client.telefone}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedClient(client)
                          setIsViewingClient(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditClient(client)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Clientes
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{loading ? "..." : clients.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
            <Building2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {loading ? "..." : clients.filter(c => c.status === 'ativo').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((clients.filter(c => c.status === 'ativo').length / clients.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos este Mês
            </CardTitle>
            <Plus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">
              +20% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Client Dialog */}
      <Dialog open={isViewingClient} onOpenChange={setIsViewingClient}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>
              Informações completas do cliente
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Nome:</Label>
                <span className="col-span-3">{selectedClient.nome}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Nome da Loja:</Label>
                <span className="col-span-3">{selectedClient.nome_loja}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">CNPJ/CPF:</Label>
                <span className="col-span-3">{selectedClient.documento}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Telefone:</Label>
                <span className="col-span-3">{selectedClient.telefone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email:</Label>
                <span className="col-span-3">{selectedClient.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status:</Label>
                <span className="col-span-3">{getStatusBadge(selectedClient.status)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditingClient} onOpenChange={setIsEditingClient}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Altere as informações do cliente abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nome" className="text-right">Nome</Label>
              <Input 
                id="edit-nome" 
                className="col-span-3"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nomeLoja" className="text-right">Nome da Loja</Label>
              <Input 
                id="edit-nomeLoja" 
                className="col-span-3"
                value={formData.nome_loja}
                onChange={(e) => setFormData({...formData, nome_loja: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-documento" className="text-right">CNPJ/CPF</Label>
              <Input 
                id="edit-documento" 
                className="col-span-3"
                value={formData.documento}
                onChange={(e) => setFormData({...formData, documento: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-telefone" className="text-right">Telefone</Label>
              <Input 
                id="edit-telefone" 
                className="col-span-3"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input 
                id="edit-email" 
                type="email" 
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
              <Button 
                type="submit" 
                className="bg-gradient-primary text-white"
                onClick={updateClient}
                disabled={!formData.nome || !formData.documento}
              >
                Salvar Alterações
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}