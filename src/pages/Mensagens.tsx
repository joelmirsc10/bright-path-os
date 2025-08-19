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
  MessageSquare, 
  Send, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye
} from "lucide-react"

export default function Mensagens() {
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)

  // Mock data
  const messages = [
    {
      id: 1,
      destinatario: "João Silva",
      telefone: "(11) 99999-9999",
      mensagem: "Olá João! Sua fatura de R$ 1.250,00 vence hoje. Clique aqui para pagar.",
      status: "enviada",
      dataEnvio: "2024-12-15T10:30:00",
      tipo: "cobranca"
    },
    {
      id: 2,
      destinatario: "Maria Santos",
      telefone: "(11) 88888-8888",
      mensagem: "Confirmação: Sua excursão para Gramado está confirmada para 20/12!",
      status: "entregue",
      dataEnvio: "2024-12-14T15:45:00",
      tipo: "confirmacao"
    },
    {
      id: 3,
      destinatario: "Carlos Oliveira",
      telefone: "(11) 77777-7777",
      mensagem: "Lembrete: Reunião agendada para amanhã às 14h.",
      status: "pendente",
      dataEnvio: "2024-12-15T09:00:00",
      tipo: "lembrete"
    }
  ]

  const templates = [
    {
      id: 1,
      nome: "Cobrança Vencida",
      conteudo: "Olá {nome}! Sua fatura de {valor} venceu em {data_vencimento}. Por favor, regularize o pagamento para evitar juros.",
      variaveis: ["nome", "valor", "data_vencimento"]
    },
    {
      id: 2,
      nome: "Confirmação Excursão",
      conteudo: "Confirmamos sua reserva para {destino} no dia {data}. Apresente-se no local às {horario}.",
      variaveis: ["nome", "destino", "data", "horario"]
    },
    {
      id: 3,
      nome: "Lembrete Pagamento",
      conteudo: "Olá {nome}! Sua fatura de {valor} vence em {dias} dias. Não esqueça de efetuar o pagamento.",
      variaveis: ["nome", "valor", "dias"]
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enviada":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Enviada</Badge>
      case "entregue":
        return <Badge className="bg-success/10 text-success border-success/20">Entregue</Badge>
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>
      case "erro":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Erro</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "enviada":
        return <Send className="h-4 w-4 text-primary" />
      case "entregue":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "pendente":
        return <Clock className="h-4 w-4 text-warning" />
      case "erro":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground">Envio automático via WhatsApp</p>
        </div>

        <Dialog open={isCreatingTemplate} onOpenChange={setIsCreatingTemplate}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Criar Template de Mensagem</DialogTitle>
              <DialogDescription>
                Crie um template com variáveis dinâmicas para automatizar seus envios.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome-template" className="text-right">
                  Nome
                </Label>
                <Input id="nome-template" placeholder="Ex: Cobrança Atrasada" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="conteudo" className="text-right pt-2">
                  Conteúdo
                </Label>
                <div className="col-span-3 space-y-2">
                  <Textarea 
                    id="conteudo" 
                    placeholder="Digite sua mensagem usando variáveis como {nome}, {valor}, {data}..."
                    className="min-h-[100px]"
                  />
                  <div className="text-xs text-muted-foreground">
                    <p>Variáveis disponíveis:</p>
                    <code className="text-primary">{'{nome}'}, {'{valor}'}, {'{data}'}, {'{juros}'}, {'{total}'}</code>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-gradient-primary text-white">
                Salvar Template
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
              Mensagens Enviadas
            </CardTitle>
            <Send className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Entrega
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Templates Ativos
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{templates.length}</div>
            <p className="text-xs text-muted-foreground">
              Pronto para uso
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {messages.filter(m => m.status === 'pendente').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando envio
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Mensagens Recentes</CardTitle>
            <CardDescription>Últimas mensagens enviadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getStatusIcon(message.status)}
                  </div>
                   <div className="flex-1 space-y-1">
                     <div className="flex items-center justify-between">
                       <p className="text-sm font-medium text-foreground">{message.destinatario}</p>
                       {getStatusBadge(message.status)}
                     </div>
                     <p className="text-xs text-muted-foreground">{message.telefone}</p>
                     <p className="text-sm text-muted-foreground line-clamp-2">{message.mensagem}</p>
                     <p className="text-xs text-muted-foreground">
                       {new Date(message.dataEnvio).toLocaleString('pt-BR')}
                     </p>
                     <div className="flex gap-2 mt-2">
                       {message.status === 'enviada' || message.status === 'entregue' ? (
                         <Button size="sm" variant="outline">
                           Reenviar
                         </Button>
                       ) : message.status === 'pendente' ? (
                         <>
                           <Button size="sm" variant="default">
                             Enviar Agora
                           </Button>
                           <Button size="sm" variant="outline">
                             Editar Mensagem
                           </Button>
                         </>
                       ) : null}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Templates */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Templates de Mensagem</CardTitle>
            <CardDescription>Templates prontos para usar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="p-4 rounded-lg bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{template.nome}</h4>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.conteudo}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.variaveis.map((variavel) => (
                      <Badge key={variavel} variant="outline" className="text-xs">
                        {'{' + variavel + '}'}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Send */}
      <Card className="border-border bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-foreground">Envio Rápido</CardTitle>
          <CardDescription>Envie uma mensagem personalizada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Cliente</Label>
              <Input id="nome" placeholder="Nome completo" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem-rapida">Mensagem</Label>
            <Textarea 
              id="mensagem-rapida" 
              placeholder="Digite sua mensagem..."
              className="min-h-[100px]"
            />
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow">
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensagem
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}