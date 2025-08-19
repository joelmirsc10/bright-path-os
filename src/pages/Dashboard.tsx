import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Receipt, 
  TrendingUp, 
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total de Clientes",
      value: "1,234",
      description: "+12% em relação ao mês passado",
      icon: Users,
      trend: "up"
    },
    {
      title: "Receita Total",
      value: "R$ 45.231",
      description: "+8% em relação ao mês passado",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Excursões Ativas",
      value: "8",
      description: "3 programadas para este mês",
      icon: MapPin,
      trend: "neutral"
    },
    {
      title: "Mensagens Enviadas",
      value: "2,847",
      description: "Taxa de entrega: 98.5%",
      icon: Receipt,
      trend: "up"
    }
  ]

  const recentActivities = [
    {
      type: "client",
      title: "Novo cliente cadastrado",
      description: "Empresa ABC Ltda",
      time: "há 2 horas",
      status: "success"
    },
    {
      type: "payment",
      title: "Pagamento recebido",
      description: "R$ 2.450,00 - Cliente XYZ",
      time: "há 4 horas",
      status: "success"
    },
    {
      type: "excursion",
      title: "Excursão confirmada",
      description: "Viagem para Gramado - 45 passageiros",
      time: "há 6 horas",
      status: "info"
    },
    {
      type: "alert",
      title: "Fatura em atraso",
      description: "Cliente DEF - Vencimento há 3 dias",
      time: "há 1 dia",
      status: "warning"
    }
  ]

  const upcomingEvents = [
    {
      title: "Excursão para Gramado",
      date: "15/12/2024",
      passengers: 45,
      status: "confirmada"
    },
    {
      title: "Vencimento Fatura #1234",
      date: "18/12/2024",
      amount: "R$ 1.250,00",
      status: "pendente"
    },
    {
      title: "Reunião com Cliente ABC",
      date: "20/12/2024",
      time: "14:00",
      status: "agendada"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Atividades Recentes</CardTitle>
            <CardDescription>Últimas movimentações do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    activity.status === 'success' ? 'bg-success/10 text-success' :
                    activity.status === 'warning' ? 'bg-warning/10 text-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {activity.status === 'success' && <CheckCircle className="h-4 w-4" />}
                    {activity.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {activity.status === 'info' && <Calendar className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Próximos Eventos</CardTitle>
            <CardDescription>Agenda dos próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="space-y-2 p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                    <Badge variant={
                      event.status === 'confirmada' ? 'default' :
                      event.status === 'pendente' ? 'destructive' :
                      'secondary'
                    }>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>📅 {event.date} {event.time && `- ${event.time}`}</p>
                    {event.passengers && <p>👥 {event.passengers} passageiros</p>}
                    {event.amount && <p>💰 {event.amount}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Resumo Financeiro</CardTitle>
            <CardDescription>Performance do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Receitas</span>
                <span className="font-medium text-success">R$ 45.231</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Despesas</span>
                <span className="font-medium text-destructive">R$ 12.450</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-medium">
                <span className="text-foreground">Lucro Líquido</span>
                <span className="text-success">R$ 32.781</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Metas do Mês</CardTitle>
            <CardDescription>Progresso das metas estabelecidas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Novos Clientes</span>
                <span className="font-medium">85/100</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Receita Meta</span>
                <span className="font-medium">90/100</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Excursões</span>
                <span className="font-medium">67/80</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}