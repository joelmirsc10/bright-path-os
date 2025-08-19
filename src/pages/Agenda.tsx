import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  Users, 
  Plus, 
  Filter,
  Edit,
  Trash2,
  Settings
} from "lucide-react"

export default function Agenda() {
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isEditingEvent, setIsEditingEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [filterType, setFilterType] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  const [events, setEvents] = useState([
    {
      id: 1,
      titulo: "Excursão Gramado",
      tipo: "excursao",
      data: "2024-12-20",
      horario: "06:00",
      descricao: "Partida para Serra Gaúcha - 45 passageiros",
      status: "confirmado",
      cor: "#22c55e",
      valor: "R$ 20.250,00",
      detalhes: {
        destino: "Gramado/RS",
        passageiros: 45,
        onibus: "Ônibus 001"
      }
    },
    {
      id: 2,
      titulo: "Vencimento Fatura #1234",
      tipo: "cobranca",
      data: "2024-12-18",
      horario: null,
      descricao: "Fatura de João Silva vencendo hoje",
      valor: "R$ 1.250,00",
      status: "pendente",
      cor: "#ef4444",
      detalhes: {
        cliente: "João Silva",
        empresa: "Supermercado Silva"
      }
    },
    {
      id: 3,
      titulo: "Pagamento Cliente ABC",
      tipo: "recebimento",
      data: "2024-12-22",
      horario: "14:00",
      descricao: "Pagamento de excursão confirmado",
      valor: "R$ 2.500,00",
      status: "agendado",
      cor: "#3b82f6",
      detalhes: {
        cliente: "Maria Santos",
        metodo: "PIX"
      }
    },
    {
      id: 4,
      titulo: "Manutenção do Ônibus 002",
      tipo: "manutencao",
      data: "2024-12-25",
      horario: "08:00",
      descricao: "Revisão programada do veículo",
      valor: "R$ 800,00",
      status: "agendado",
      cor: "#f59e0b",
      detalhes: {
        veiculo: "Ônibus 002 - Volvo",
        oficina: "Auto Center Silva"
      }
    }
  ])

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    data: "",
    horario: "",
    descricao: "",
    valor: "",
    status: "agendado",
    cor: "#3b82f6"
  })

  const eventTypes = [
    { value: "excursao", label: "Excursão", color: "#22c55e" },
    { value: "cobranca", label: "Cobrança", color: "#ef4444" },
    { value: "recebimento", label: "Recebimento", color: "#3b82f6" },
    { value: "manutencao", label: "Manutenção", color: "#f59e0b" },
    { value: "reuniao", label: "Reunião", color: "#8b5cf6" },
    { value: "outros", label: "Outros", color: "#6b7280" }
  ]

  const filteredEvents = events.filter(event => {
    if (filterType !== "all" && event.tipo !== filterType) return false
    if (selectedMonth && !event.data.startsWith(selectedMonth)) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-success/10 text-success border-success/20">Confirmado</Badge>
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>
      case "agendado":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Agendado</Badge>
      case "cancelado":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case "excursao":
        return <MapPin className="h-4 w-4" />
      case "cobranca":
        return <DollarSign className="h-4 w-4" />
      case "recebimento":
        return <DollarSign className="h-4 w-4" />
      case "manutencao":
        return <Users className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const handleSaveEvent = () => {
    const newEvent = {
      id: Date.now(),
      ...formData,
      detalhes: {} as any
    }

    if (isEditingEvent && selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? {...e, ...formData} : e))
      setIsEditingEvent(false)
      setSelectedEvent(null)
    } else {
      setEvents([...events, newEvent])
      setIsAddingEvent(false)
    }

    setFormData({
      titulo: "",
      tipo: "",
      data: "",
      horario: "",
      descricao: "",
      valor: "",
      status: "agendado",
      cor: "#3b82f6"
    })
  }

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    setFormData({
      titulo: event.titulo,
      tipo: event.tipo,
      data: event.data,
      horario: event.horario || "",
      descricao: event.descricao,
      valor: event.valor || "",
      status: event.status,
      cor: event.cor
    })
    setIsEditingEvent(true)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId))
  }

  // Organizar eventos por data
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    const date = event.data
    if (!acc[date]) acc[date] = []
    acc[date].push(event)
    return acc
  }, {} as Record<string, any[]>)

  const sortedDates = Object.keys(eventsByDate).sort()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Calendário integrado do sistema</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white shadow-glow">
                <Plus className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Novo Evento</DialogTitle>
                <DialogDescription>
                  Adicione um novo evento à agenda
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="titulo" className="text-right">Título</Label>
                  <Input 
                    id="titulo" 
                    className="col-span-3"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value) => {
                    const eventType = eventTypes.find(t => t.value === value)
                    setFormData({...formData, tipo: value, cor: eventType?.color || "#3b82f6"})
                  }}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: type.color }}
                            />
                            {type.label}
                          </div>
                        </SelectItem>
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
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agendado">Agendado</SelectItem>
                      <SelectItem value="confirmado">Confirmado</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveEvent} className="bg-gradient-primary text-white">
                  Salvar Evento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={() => alert("Gerenciar tipos de evento")}>
            <Settings className="mr-2 h-4 w-4" />
            Gerenciar Tipos
          </Button>
        </div>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Novo Evento</DialogTitle>
              <DialogDescription>
                Adicione um novo evento à agenda
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="titulo" className="text-right">Título</Label>
                <Input 
                  id="titulo" 
                  className="col-span-3"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => {
                  const eventType = eventTypes.find(t => t.value === value)
                  setFormData({...formData, tipo: value, cor: eventType?.color || "#3b82f6"})
                }}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          />
                          {type.label}
                        </div>
                      </SelectItem>
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
                <Label htmlFor="horario" className="text-right">Horário</Label>
                <Input 
                  id="horario" 
                  type="time"
                  className="col-span-3"
                  value={formData.horario}
                  onChange={(e) => setFormData({...formData, horario: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valor" className="text-right">Valor</Label>
                <Input 
                  id="valor" 
                  placeholder="R$ 0,00"
                  className="col-span-3"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="descricao" className="text-right pt-2">Descrição</Label>
                <Textarea 
                  id="descricao" 
                  className="col-span-3"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEvent} className="bg-gradient-primary text-white">
                Salvar Evento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Filtrar por tipo</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Mês</Label>
                <Input 
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Legenda</Label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.slice(0, 3).map((type) => (
                    <div key={type.value} className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: type.color }}
                      />
                      {type.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <div className="space-y-4">
        {sortedDates.length === 0 ? (
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum evento encontrado</h3>
              <p className="text-muted-foreground">
                Não há eventos para o período selecionado. Adicione um novo evento para começar.
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedDates.map((date) => (
            <Card key={date} className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-5 w-5" />
                  {new Date(date).toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventsByDate[date].map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: event.cor }}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getEventIcon(event.tipo)}
                          <h4 className="font-medium text-foreground">{event.titulo}</h4>
                          {event.horario && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {event.horario}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{event.descricao}</p>
                        {event.valor && (
                          <p className="text-sm font-medium text-success mt-1">{event.valor}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event.status)}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditingEvent} onOpenChange={setIsEditingEvent}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>
              Altere as informações do evento
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-titulo" className="text-right">Título</Label>
              <Input 
                id="edit-titulo" 
                className="col-span-3"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-tipo" className="text-right">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value) => {
                const eventType = eventTypes.find(t => t.value === value)
                setFormData({...formData, tipo: value, cor: eventType?.color || "#3b82f6"})
              }}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: type.color }}
                        />
                        {type.label}
                      </div>
                    </SelectItem>
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
              <Label htmlFor="edit-status" className="text-right">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEvent} className="bg-gradient-primary text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
