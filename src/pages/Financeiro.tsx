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
import { useToast } from "@/hooks/use-toast"
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
// Exportação Excel será implementada via API quando necessário

export default function Financeiro() {
  const { toast } = useToast()
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isEditingTransaction, setIsEditingTransaction] = useState(false)
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
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

  const saldoFinal = totalReceitas - totalDespesas

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
    resetForm()
    toast({
      title: "Sucesso",
      description: "Transação adicionada com sucesso"
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
    resetForm()
    toast({
      title: "Sucesso",
      description: "Transação atualizada com sucesso"
    })
  }

  const handleDeleteTransaction = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      setTransactions(transactions.filter(t => t.id !== id))
      toast({
        title: "Sucesso",
        description: "Transação removida com sucesso"
      })
    }
  }

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
      setIsAddingCategory(false)
      toast({
        title: "Sucesso",
        description: "Categoria adicionada com sucesso"
      })
    }
  }

  const handleEditCategory = () => {
    if (newCategory && selectedCategory) {
      const updatedCategories = categories.map(cat => 
        cat === selectedCategory ? newCategory : cat
      )
      setCategories(updatedCategories)
      setNewCategory("")
      setSelectedCategory("")
      setIsEditingCategory(false)
      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso"
      })
    }
  }

  const handleDeleteCategory = (category: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories(categories.filter(cat => cat !== category))
      toast({
        title: "Sucesso",
        description: "Categoria removida com sucesso"
      })
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

  const resetForm = () => {
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

  const exportToExcel = () => {
    // Simular exportação para Excel
    const dataForExport = transactions.map(t => ({
      'Tipo': t.tipo,
      'Descrição': t.descricao,
      'Valor': t.valor,
      'Categoria': t.categoria,
      'Data': t.data,
      'Status': t.status,
      'Recorrente': t.recorrente ? 'Sim' : 'Não',
      'Parcelas': t.parcelas
    }))

    console.log('Dados para exportação:', dataForExport)
    
    toast({
      title: "Sucesso",
      description: "Relatório será exportado em breve"
    })
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
          <Button onClick={exportToExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

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
      <div className="grid gap-4 md:grid-cols-4">
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
              Valor realizado
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
              Valor realizado
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Final Mês
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoFinal >= 0 ? 'text-success' : 'text-destructive'}`}>
              R$ {saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Receitas - Despesas
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transações Pendentes
            </CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {transactions.filter(t => t.status === 'pendente').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando confirmação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Management */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Categorias</CardTitle>
          <CardDescription>Gerencie as categorias de transações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <span className="text-sm">{category}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSelectedCategory(category)
                    setNewCategory(category)
                    setIsEditingCategory(true)
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCategory(category)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Transações</CardTitle>
          <CardDescription>Histórico completo de receitas e despesas</CardDescription>
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
                <TableHead>Parcelas</TableHead>
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
                  <TableCell className={`font-medium ${transaction.tipo === 'receita' ? 'text-success' : 'text-destructive'}`}>
                    R$ {transaction.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(transaction.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {transaction.parcelas}
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditingCategory} onOpenChange={setIsEditingCategory}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Altere o nome da categoria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-categoria" className="text-right">
                Nome
              </Label>
              <Input 
                id="edit-categoria" 
                className="col-span-3"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditCategory} className="bg-gradient-primary text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditingTransaction} onOpenChange={setIsEditingTransaction}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>
              Altere os dados da transação.
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
                className="col-span-3"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-categoria" className="text-right">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({...formData, status: !!checked})}
                />
                <Label className="text-sm">
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
                        id="edit-parcelado" 
                        name="editTipoRecorrencia" 
                        value="parcelado"
                        checked={formData.tipoRecorrencia === "parcelado"}
                        onChange={(e) => setFormData({...formData, tipoRecorrencia: e.target.value})}
                      />
                      <Label htmlFor="edit-parcelado">Parcelado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="edit-fixo" 
                        name="editTipoRecorrencia" 
                        value="fixo"
                        checked={formData.tipoRecorrencia === "fixo"}
                        onChange={(e) => setFormData({...formData, tipoRecorrencia: e.target.value})}
                      />
                      <Label htmlFor="edit-fixo">Fixo</Label>
                    </div>
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
                  </>
                )}
              </>
            )}
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