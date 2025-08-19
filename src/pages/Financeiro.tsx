import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Edit,
  Trash2
} from "lucide-react"

export default function Financeiro() {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isEditingTransaction, setIsEditingTransaction] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [transactionType, setTransactionType] = useState("receita")
  const [isRecurrent, setIsRecurrent] = useState(false)
  const [isPaid, setIsPaid] = useState(true)

  const [formData, setFormData] = useState({
    tipo: "receita",
    descricao: "",
    valor: "",
    categoria: "",
    data: "",
    recorrente: false,
    tipoRecorrencia: "fixo",
    repeticao: 1,
    intervalo: "meses",
    parcelaAtual: 1,
    totalParcelas: 1,
    valorTotal: "",
    valorParcela: "",
    status: true
  })

  // Mock data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      tipo: "receita",
      descricao: "Pagamento Cliente ABC",
      valor: 2500.00,
      categoria: "Vendas",
      data: "2024-12-15",
      status: "realizado",
      recorrente: false,
      tipoRecorrencia: null,
      parcelas: "1/1"
    },
    {
      id: 2,
      tipo: "despesa",
      descricao: "Combustível para ônibus",
      valor: 450.00,
      categoria: "Operacional",
      data: "2024-12-14",
      status: "realizado",
      recorrente: true,
      tipoRecorrencia: "fixo",
      parcelas: "1/12"
    },
    {
      id: 3,
      tipo: "receita",
      descricao: "Excursão Gramado",
      valor: 12000.00,
      categoria: "Turismo",
      data: "2024-12-13",
      status: "pendente",
      recorrente: false,
      tipoRecorrencia: null,
      parcelas: "1/1"
    }
  ])

  const [categories, setCategories] = useState([
    "Vendas", "Turismo", "Operacional", "Marketing", "Administração"
  ])

  const [newCategory, setNewCategory] = useState("")

  const totalReceitas = transactions
    .filter(t => t.tipo === "receita" && t.status === "realizado")
    .reduce((sum, t) => sum + t.valor, 0)

  const totalDespesas = transactions
    .filter(t => t.tipo === "despesa" && t.status === "realizado")
    .reduce((sum, t) => sum + t.valor, 0)

  const saldoTotal = totalReceitas - totalDespesas

  const getStatusBadge = (status: string) => {
    if (status === "realizado") {
      return <Badge className="bg-success/10 text-success border-success/20">Realizado</Badge>
    }
    return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>
  }

  const getTypeBadge = (tipo: string) => {
    if (tipo === "receita") {
      return <Badge className="bg-success/10 text-success border-success/20">Receita</Badge>
    }
    return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Despesa</Badge>
  }

  const handleSaveTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      tipo: formData.tipo,
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
      categoria: formData.categoria,
      data: formData.data,
      status: formData.status ? "realizado" : "pendente",
      recorrente: formData.recorrente,
      tipoRecorrencia: formData.recorrente ? formData.tipoRecorrencia : null,
      parcelas: formData.recorrente && formData.tipoRecorrencia === "parcelado" 
        ? `${formData.parcelaAtual}/${formData.totalParcelas}` 
        : "1/1"
    }

    setTransactions([...transactions, newTransaction])
    setIsAddingTransaction(false)
    setFormData({
      tipo: "receita",
      descricao: "",
      valor: "",
      categoria: "",
      data: "",
      recorrente: false,
      tipoRecorrencia: "fixo",
      repeticao: 1,
      intervalo: "meses",
      parcelaAtual: 1,
      totalParcelas: 1,
      valorTotal: "",
      valorParcela: "",
      status: true
    })
  }

  const handleEditTransaction = () => {
    setTransactions(transactions.map(t => 
      t.id === selectedTransaction.id 
        ? {
            ...t,
            tipo: formData.tipo,
            descricao: formData.descricao,
            valor: parseFloat(formData.valor),
            categoria: formData.categoria,
            data: formData.data,
            status: formData.status ? "realizado" : "pendente",
            recorrente: formData.recorrente,
            tipoRecorrencia: formData.recorrente ? formData.tipoRecorrencia : null,
            parcelas: formData.recorrente && formData.tipoRecorrencia === "parcelado" 
              ? `${formData.parcelaAtual}/${formData.totalParcelas}` 
              : "1/1"
          }
        : t
    ))
    setIsEditingTransaction(false)
    setSelectedTransaction(null)
  }

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
      setIsAddingCategory(false)
    }
  }

  const openEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setFormData({
      tipo: transaction.tipo,
      descricao: transaction.descricao,
      valor: transaction.valor.toString(),
      categoria: transaction.categoria,
      data: transaction.data,
      recorrente: transaction.recorrente,
      tipoRecorrencia: transaction.tipoRecorrencia || "fixo",
      repeticao: 1,
      intervalo: "meses",
      parcelaAtual: parseInt(transaction.parcelas.split('/')[0]) || 1,
      totalParcelas: parseInt(transaction.parcelas.split('/')[1]) || 1,
      valorTotal: "",
      valorParcela: "",
      status: transaction.status === "realizado"
    })
    setIsEditingTransaction(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Despesas & Receitas</h1>
          <p className="text-muted-foreground">Controle financeiro da empresa</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Categoria</DialogTitle>
                <DialogDescription>
                  Crie uma nova categoria para organizar suas transações.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria-nome" className="text-right">
                    Nome
                  </Label>
                  <Input 
                    id="categoria-nome" 
                    className="col-span-3"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Ex: Manutenção"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCategory} className="bg-gradient-primary text-white">
                  Criar Categoria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white shadow-glow">
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Transação</DialogTitle>
                <DialogDescription>
                  Registre uma nova receita ou despesa da empresa.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">Descrição</Label>
                  <Textarea 
                    id="descricao" 
                    className="col-span-3"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right">Valor</Label>
                  <Input 
                    id="valor" 
                    type="number" 
                    placeholder="0,00" 
                    className="col-span-3"
                    value={formData.valor}
                    onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria" className="text-right">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data" className="text-right">Data</Label>
                  <Input 
                    id="data" 
                    type="date" 
                    className="col-span-3"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox 
                      id="status"
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData({...formData, status: !!checked})}
                    />
                    <Label htmlFor="status" className="text-sm">
                      Pagamento realizado
                    </Label>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Recorrente</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch 
                      checked={formData.recorrente}
                      onCheckedChange={(checked) => setFormData({...formData, recorrente: checked})}
                    />
                    <Label className="text-sm">Esta transação se repete</Label>
                  </div>
                </div>

                {formData.recorrente && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Tipo de Recorrência</Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="parcelado" 
                            name="tipoRecorrencia" 
                            value="parcelado"
                            checked={formData.tipoRecorrencia === "parcelado"}
                            onChange={(e) => setFormData({...formData, tipoRecorrencia: e.target.value})}
                          />
                          <Label htmlFor="parcelado">Parcelado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="fixo" 
                            name="tipoRecorrencia" 
                            value="fixo"
                            checked={formData.tipoRecorrencia === "fixo"}
                            onChange={(e) => setFormData({...formData, tipoRecorrencia: e.target.value})}
                          />
                          <Label htmlFor="fixo">Fixo</Label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Repetir a cada</Label>
                      <div className="col-span-3 flex gap-2">
                        <Input 
                          type="number" 
                          min="1"
                          className="w-20"
                          value={formData.repeticao}
                          onChange={(e) => setFormData({...formData, repeticao: parseInt(e.target.value)})}
                        />
                        <Select value={formData.intervalo} onValueChange={(value) => setFormData({...formData, intervalo: value})}>
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dias">Dias</SelectItem>
                            <SelectItem value="semanas">Semanas</SelectItem>
                            <SelectItem value="meses">Meses</SelectItem>
                            <SelectItem value="anos">Anos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.tipoRecorrencia === "parcelado" && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Parcela Atual</Label>
                          <Input 
                            type="number" 
                            min="1"
                            className="col-span-3"
                            value={formData.parcelaAtual}
                            onChange={(e) => setFormData({...formData, parcelaAtual: parseInt(e.target.value)})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Total de Parcelas</Label>
                          <Input 
                            type="number" 
                            min="1"
                            className="col-span-3"
                            value={formData.totalParcelas}
                            onChange={(e) => setFormData({...formData, totalParcelas: parseInt(e.target.value)})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Valor Total</Label>
                          <Input 
                            type="number" 
                            className="col-span-3"
                            value={formData.valorTotal}
                            onChange={(e) => setFormData({...formData, valorTotal: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Valor da Parcela</Label>
                          <Input 
                            type="number" 
                            className="col-span-3"
                            value={formData.valorParcela}
                            onChange={(e) => setFormData({...formData, valorParcela: e.target.value})}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleSaveTransaction} className="bg-gradient-primary text-white">
                  Salvar Transação
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Receitas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Despesas
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoTotal >= 0 ? 'text-success' : 'text-destructive'}`}>
              R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Resultado do período
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1 grid gap-4 sm:grid-cols-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="receita">Receitas</SelectItem>
                  <SelectItem value="despesa">Despesas</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                  <SelectItem value="year">Este ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Transações</CardTitle>
          <CardDescription>
            Histórico de todas as movimentações financeiras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recorrente</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{getTypeBadge(transaction.tipo)}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    {transaction.descricao}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {transaction.categoria}
                  </TableCell>
                  <TableCell className={`font-medium ${
                    transaction.tipo === 'receita' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.tipo === 'receita' ? '+' : '-'}R$ {transaction.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(transaction.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    {transaction.recorrente ? (
                      <div>
                        <Badge variant="outline">Sim</Badge>
                        {transaction.tipoRecorrencia === "parcelado" && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {transaction.parcelas}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Badge variant="secondary">Não</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditTransaction(transaction)}
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

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditingTransaction} onOpenChange={setIsEditingTransaction}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>
              Altere as informações da transação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-tipo" className="text-right">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-descricao" className="text-right">Descrição</Label>
              <Textarea 
                id="edit-descricao" 
                className="col-span-3"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-valor" className="text-right">Valor</Label>
              <Input 
                id="edit-valor" 
                type="number" 
                placeholder="0,00" 
                className="col-span-3"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-categoria" className="text-right">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-data" className="text-right">Data</Label>
              <Input 
                id="edit-data" 
                type="date" 
                className="col-span-3"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox 
                  id="edit-status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({...formData, status: !!checked})}
                />
                <Label htmlFor="edit-status" className="text-sm">
                  Pagamento realizado
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditTransaction} className="bg-gradient-primary text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
