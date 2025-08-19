import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { 
  MapPin, 
  Plus, 
  Calendar,
  Clock,
  Users,
  Bus,
  Eye,
  Edit
} from "lucide-react"

export default function Excursoes() {
  const [isCreatingExcursion, setIsCreatingExcursion] = useState(false)

  // Mock data
  const excursions = [
    {
      id: 1,
      destino: "Gramado/RS",
      descricao: "Excursão completa pela Serra Gaúcha",
      dataPartida: "2024-12-20",
      horarioPartida: "06:00",
      dataRetorno: "2024-12-22",
      horarioRetorno: "20:00",
      onibus: "Ônibus 001 - Mercedes",
      capacidade: 45,
      reservas: 38,
      preco: 450.00,
      status: "confirmada"
    },
    {
      id: 2,
      destino: "Aparados da Serra",
      descricao: "Turismo ecológico nos cânions",
      dataPartida: "2024-12-28",
      horarioPartida: "05:30",
      dataRetorno: "2024-12-30",
      horarioRetorno: "19:00",
      onibus: "Ônibus 002 - Volvo",
      capacidade: 40,
      reservas: 25,
      preco: 380.00,
      status: "vendendo"
    },
    {
      id: 3,
      destino: "Campos do Jordão/SP",
      descricao: "Festival de Inverno e turismo gastronômico",
      dataPartida: "2025-01-15",
      horarioPartida: "07:00",
      dataRetorno: "2025-01-17",
      horarioRetorno: "21:00",
      onibus: "Ônibus 003 - Scania",
      capacidade: 50,
      reservas: 12,
      preco: 520.00,
      status: "planejada"
    }
  ]

  const passengers = [
    {
      id: 1,
      excursaoId: 1,
      nome: "Ana Silva",
      rg: "12.345.678-9",
      idade: 35,
      telefone: "(11) 99999-9999",
      poltrona: 15,
      statusPagamento: "pago"
    },
    {
      id: 2,
      excursaoId: 1,
      nome: "Carlos Santos",
      rg: "98.765.432-1",
      idade: 42,
      telefone: "(11) 88888-8888",
      poltrona: 16,
      statusPagamento: "pendente"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-success/10 text-success border-success/20">Confirmada</Badge>
      case "vendendo":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Vendendo</Badge>
      case "planejada":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Planejada</Badge>
      case "cancelada":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Cancelada</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    if (status === "pago") {
      return <Badge className="bg-success/10 text-success border-success/20">Pago</Badge>
    }
    return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Excursões</h1>
          <p className="text-muted-foreground">Gestão completa de viagens e passageiros</p>
        </div>

        <Dialog open={isCreatingExcursion} onOpenChange={setIsCreatingExcursion}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Nova Excursão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Excursão</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova excursão.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destino">Destino</Label>
                  <Input id="destino" placeholder="Ex: Gramado/RS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input id="preco" type="number" placeholder="450.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" placeholder="Descrição detalhada da excursão..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-partida">Data de Partida</Label>
                  <Input id="data-partida" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario-partida">Horário de Partida</Label>
                  <Input id="horario-partida" type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retorno">Data de Retorno</Label>
                  <Input id="data-retorno" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario-retorno">Horário de Retorno</Label>
                  <Input id="horario-retorno" type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="onibus">Ônibus</Label>
                  <Input id="onibus" placeholder="Ex: Ônibus 001 - Mercedes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacidade">Capacidade</Label>
                  <Input id="capacidade" type="number" placeholder="45" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-gradient-primary text-white">
                Criar Excursão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Excursões Ativas
            </CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {excursions.filter(e => e.status !== 'cancelada').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Em andamento
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Passageiros
            </CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {excursions.reduce((total, exc) => total + exc.reservas, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Reservas confirmadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Estimada
            </CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {excursions.reduce((total, exc) => total + (exc.reservas * exc.preco), 0).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Das reservas atuais
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Ocupação
            </CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round((excursions.reduce((total, exc) => total + exc.reservas, 0) / 
                excursions.reduce((total, exc) => total + exc.capacidade, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Média geral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Excursions Table */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Excursões</CardTitle>
          <CardDescription>Todas as excursões cadastradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destino</TableHead>
                <TableHead>Data/Horário</TableHead>
                <TableHead>Ônibus</TableHead>
                <TableHead>Ocupação</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {excursions.map((excursion) => (
                <TableRow key={excursion.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{excursion.destino}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {excursion.descricao}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(excursion.dataPartida).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {excursion.horarioPartida}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {excursion.onibus}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">
                        {excursion.reservas}/{excursion.capacidade}
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all" 
                          style={{ width: `${(excursion.reservas / excursion.capacidade) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    R$ {excursion.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{getStatusBadge(excursion.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          console.log("Visualizar excursão:", excursion.id)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          console.log("Editar excursão:", excursion.id)
                        }}
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

      {/* Recent Passengers */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Passageiros Recentes</CardTitle>
            <CardDescription>Últimas reservas realizadas</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log("Adicionar novo passageiro")
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Passageiro
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>RG</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Poltrona</TableHead>
                <TableHead>Pagamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passengers.map((passenger) => (
                <TableRow key={passenger.id}>
                  <TableCell className="font-medium text-foreground">
                    {passenger.nome}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {passenger.rg}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {passenger.idade} anos
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {passenger.telefone}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{passenger.poltrona}</Badge>
                  </TableCell>
                  <TableCell>{getPaymentBadge(passenger.statusPagamento)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}