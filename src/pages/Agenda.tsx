import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, MapPin, Users, Plus } from "lucide-react"

export default function Agenda() {
  const events = [
    {
      id: 1,
      titulo: "Excursão Gramado",
      tipo: "excursao",
      data: "2024-12-20",
      horario: "06:00",
      descricao: "Partida para Serra Gaúcha",
      status: "confirmado"
    },
    {
      id: 2,
      titulo: "Vencimento Fatura #1234",
      tipo: "cobranca",
      data: "2024-12-18",
      valor: "R$ 1.250,00",
      cliente: "João Silva",
      status: "pendente"
    },
    {
      id: 3,
      titulo: "Pagamento Cliente ABC",
      tipo: "recebimento",
      data: "2024-12-22",
      valor: "R$ 2.500,00",
      status: "agendado"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">Calendário integrado do sistema</p>
        </div>
        <Button className="bg-gradient-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm">{event.titulo}</CardTitle>
                <Badge variant={event.status === 'confirmado' ? 'default' : 'secondary'}>
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(event.data).toLocaleDateString('pt-BR')}
              </div>
              {event.horario && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {event.horario}
                </div>
              )}
              {event.valor && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <DollarSign className="h-4 w-4" />
                  {event.valor}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}