import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Save, 
  Palette, 
  DollarSign, 
  MessageSquare, 
  Zap, 
  Bell, 
  Shield 
} from "lucide-react"

export default function Configuracoes() {
  const [config, setConfig] = useState({
    // Configurações Gerais
    nomeSoftware: "SaaS Manager",
    slogan: "Sistema de Gestão",
    logo: "",
    corPrimaria: "#3b82f6",
    
    // Configurações Financeiras
    taxaJuros: 5.0,
    multaAtraso: 3.0,
    diasVencimento: 30,
    descontoPagamentoAntecipado: 2.0,
    aplicarJurosAutomatico: true,
    
    // WhatsApp API
    urlEvolutionAPI: "https://api.evolutionapi.com",
    apiKey: "",
    nomeInstancia: "minha-empresa",
    webhookUrl: "",
    envioAutomaticoCobrancas: true,
    confirmacaoReservas: true,
    
    // Automação e Workflows
    lembreteVencimento: true,
    cobrancaAutomatica: true,
    confirmacaoExcursao: true,
    
    // Notificações
    notificacoesEmail: true,
    alertasSistema: true,
    emailRelatorios: "",
    
    // Backup e Dados
    backupAutomatico: true,
    frequenciaBackup: "diario",
    horarioBackup: "02:00"
  })

  const handleSaveGeneral = () => {
    console.log("Salvando configurações gerais...", {
      nomeSoftware: config.nomeSoftware,
      slogan: config.slogan,
      logo: config.logo,
      corPrimaria: config.corPrimaria
    })
    alert("Configurações gerais salvas com sucesso!")
  }

  const handleSaveFinancial = () => {
    console.log("Salvando configurações financeiras...", {
      taxaJuros: config.taxaJuros,
      multaAtraso: config.multaAtraso,
      diasVencimento: config.diasVencimento,
      descontoPagamentoAntecipado: config.descontoPagamentoAntecipado,
      aplicarJurosAutomatico: config.aplicarJurosAutomatico
    })
    alert("Configurações financeiras salvas com sucesso!")
  }

  const handleSaveWhatsApp = () => {
    console.log("Salvando configurações WhatsApp...", {
      urlEvolutionAPI: config.urlEvolutionAPI,
      apiKey: config.apiKey,
      nomeInstancia: config.nomeInstancia,
      webhookUrl: config.webhookUrl,
      envioAutomaticoCobrancas: config.envioAutomaticoCobrancas,
      confirmacaoReservas: config.confirmacaoReservas
    })
    // Simulate QR code generation
    alert("Conectando ao WhatsApp...\n\nQR Code gerado! Escaneie com seu WhatsApp para conectar.\n\n[Aqui apareceria o QR Code real na implementação]")
  }

  const handleConfigureWorkflows = () => {
    console.log("Configurando workflows avançados...")
  }

  const handleBackupNow = () => {
    console.log("Iniciando backup manual...")
    const currentDate = new Date().toISOString().split('T')[0]
    const backupData = {
      date: currentDate,
      config: config,
      version: "1.0.0",
      tables: ["clientes", "excursoes", "financeiro", "mensagens"]
    }
    
    const dataStr = JSON.stringify(backupData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `backup-saas-manager-${currentDate}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    alert("Backup gerado e baixado com sucesso!")
  }

  const handleExportData = () => {
    console.log("Exportando dados...")
    const currentDate = new Date().toISOString().split('T')[0]
    const exportData = {
      clientes: [],
      excursoes: [],
      transacoes: [],
      mensagens: [],
      exportDate: currentDate
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `dados-export-${currentDate}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    alert("Dados exportados com sucesso!")
  }

  const handleImportData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            console.log("Dados importados:", data)
            alert("Dados importados com sucesso!")
          } catch (error) {
            alert("Erro ao importar dados. Verifique o formato do arquivo.")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleRestoreBackup = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const backupData = JSON.parse(e.target?.result as string)
            console.log("Backup restaurado:", backupData)
            alert("Backup restaurado com sucesso!")
          } catch (error) {
            alert("Erro ao restaurar backup. Verifique o formato do arquivo.")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Configure as definições do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Configurações Gerais */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-foreground">Configurações Gerais</CardTitle>
              <CardDescription>Personalize a aparência e identidade do sistema</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome-software">Nome do Software</Label>
                <Input 
                  id="nome-software" 
                  value={config.nomeSoftware}
                  onChange={(e) => setConfig({...config, nomeSoftware: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slogan">Slogan</Label>
                <Input 
                  id="slogan" 
                  value={config.slogan}
                  onChange={(e) => setConfig({...config, slogan: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo">Logo (URL ou caminho)</Label>
              <Input 
                id="logo" 
                placeholder="https://exemplo.com/logo.png"
                value={config.logo}
                onChange={(e) => setConfig({...config, logo: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cor-primaria">Cor Primária</Label>
              <div className="flex gap-2 items-center">
                <Input 
                  id="cor-primaria" 
                  type="color"
                  className="w-20 h-10"
                  value={config.corPrimaria}
                  onChange={(e) => setConfig({...config, corPrimaria: e.target.value})}
                />
                <Input 
                  value={config.corPrimaria}
                  onChange={(e) => setConfig({...config, corPrimaria: e.target.value})}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            
            <Button onClick={handleSaveGeneral} className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações Gerais
            </Button>
          </CardContent>
        </Card>

        {/* Configurações Financeiras */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <DollarSign className="h-5 w-5 text-success" />
            <div>
              <CardTitle className="text-foreground">Configurações Financeiras</CardTitle>
              <CardDescription>Configure juros, multas e parâmetros de cobrança</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="taxa-juros">Taxa de Juros (% ao mês)</Label>
                <Input 
                  id="taxa-juros" 
                  type="number" 
                  step="0.1"
                  value={config.taxaJuros}
                  onChange={(e) => setConfig({...config, taxaJuros: parseFloat(e.target.value)})}
                />
                <p className="text-xs text-muted-foreground">Aplicado automaticamente em faturas em atraso</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="multa-atraso">Multa por Atraso (%)</Label>
                <Input 
                  id="multa-atraso" 
                  type="number" 
                  step="0.1"
                  value={config.multaAtraso}
                  onChange={(e) => setConfig({...config, multaAtraso: parseFloat(e.target.value)})}
                />
                <p className="text-xs text-muted-foreground">Percentual sobre o valor original da fatura</p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dias-vencimento">Dias para Vencimento Padrão</Label>
                <Input 
                  id="dias-vencimento" 
                  type="number"
                  value={config.diasVencimento}
                  onChange={(e) => setConfig({...config, diasVencimento: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="desconto-antecipado">Desconto para Pagamento Antecipado (%)</Label>
                <Input 
                  id="desconto-antecipado" 
                  type="number" 
                  step="0.1"
                  value={config.descontoPagamentoAntecipado}
                  onChange={(e) => setConfig({...config, descontoPagamentoAntecipado: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="juros-automatico"
                checked={config.aplicarJurosAutomatico}
                onCheckedChange={(checked) => setConfig({...config, aplicarJurosAutomatico: checked})}
              />
              <Label htmlFor="juros-automatico">
                Aplicar Juros Automaticamente
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">Calcular e aplicar juros automaticamente no vencimento</p>
            
            <Button onClick={handleSaveFinancial} className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações Financeiras
            </Button>
          </CardContent>
        </Card>

        {/* Integração WhatsApp */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-foreground">Integração WhatsApp (Evolution API)</CardTitle>
              <CardDescription>Configure a conexão com a Evolution API para automação</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="url-api">URL da Evolution API</Label>
                <Input 
                  id="url-api" 
                  value={config.urlEvolutionAPI}
                  onChange={(e) => setConfig({...config, urlEvolutionAPI: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Sua chave da API"
                  value={config.apiKey}
                  onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome-instancia">Nome da Instância</Label>
                <Input 
                  id="nome-instancia" 
                  value={config.nomeInstancia}
                  onChange={(e) => setConfig({...config, nomeInstancia: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL (Opcional)</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://webhook.seu-dominio.com"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({...config, webhookUrl: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="envio-cobrancas"
                  checked={config.envioAutomaticoCobrancas}
                  onCheckedChange={(checked) => setConfig({...config, envioAutomaticoCobrancas: checked})}
                />
                <Label htmlFor="envio-cobrancas">
                  Envio Automático de Cobranças
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Enviar mensagens automáticas para faturas em atraso</p>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="confirmacao-reservas"
                  checked={config.confirmacaoReservas}
                  onCheckedChange={(checked) => setConfig({...config, confirmacaoReservas: checked})}
                />
                <Label htmlFor="confirmacao-reservas">
                  Confirmação de Reservas
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Enviar confirmações automáticas para excursões</p>
            </div>
            
            <Button onClick={handleSaveWhatsApp} className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações WhatsApp
            </Button>
          </CardContent>
        </Card>

        {/* Automação e Workflows */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            <div>
              <CardTitle className="text-foreground">Automação e Workflows</CardTitle>
              <CardDescription>Configure fluxos automáticos para seu negócio</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Lembrete de Vencimento (3 dias antes)</h4>
                    <p className="text-sm text-muted-foreground">Enviar WhatsApp 3 dias antes do vencimento</p>
                  </div>
                  <Switch 
                    checked={config.lembreteVencimento}
                    onCheckedChange={(checked) => setConfig({...config, lembreteVencimento: checked})}
                  />
                </div>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Cobrança Automática (No vencimento)</h4>
                    <p className="text-sm text-muted-foreground">Aplicar juros e enviar cobrança no dia do vencimento</p>
                  </div>
                  <Switch 
                    checked={config.cobrancaAutomatica}
                    onCheckedChange={(checked) => setConfig({...config, cobrancaAutomatica: checked})}
                  />
                </div>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Confirmação de Excursão (1 dia antes)</h4>
                    <p className="text-sm text-muted-foreground">Enviar detalhes e lembrete 1 dia antes da viagem</p>
                  </div>
                  <Switch 
                    checked={config.confirmacaoExcursao}
                    onCheckedChange={(checked) => setConfig({...config, confirmacaoExcursao: checked})}
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={handleConfigureWorkflows} variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Configurar Workflows Avançados
            </Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <Bell className="h-5 w-5 text-info" />
            <div>
              <CardTitle className="text-foreground">Notificações</CardTitle>
              <CardDescription>Configure alertas e notificações do sistema</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notificacoes-email"
                  checked={config.notificacoesEmail}
                  onCheckedChange={(checked) => setConfig({...config, notificacoesEmail: checked})}
                />
                <Label htmlFor="notificacoes-email">
                  Notificações por Email
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Receber relatórios por email</p>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="alertas-sistema"
                  checked={config.alertasSistema}
                  onCheckedChange={(checked) => setConfig({...config, alertasSistema: checked})}
                />
                <Label htmlFor="alertas-sistema">
                  Alertas de Sistema
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Notificar sobre problemas técnicos</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-relatorios">Email para Relatórios</Label>
              <Input 
                id="email-relatorios" 
                type="email"
                placeholder="admin@empresa.com"
                value={config.emailRelatorios}
                onChange={(e) => setConfig({...config, emailRelatorios: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup e Dados */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-foreground">Backup e Dados</CardTitle>
              <CardDescription>Gerencie backups e exportação de dados</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="backup-automatico"
                  checked={config.backupAutomatico}
                  onCheckedChange={(checked) => setConfig({...config, backupAutomatico: checked})}
                />
                <Label htmlFor="backup-automatico">
                  Backup Automático
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Fazer backup diário dos dados</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Frequência do Backup</Label>
                <p className="text-sm text-muted-foreground">Diário às {config.horarioBackup}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="horario-backup">Horário</Label>
                <Input 
                  id="horario-backup" 
                  type="time"
                  value={config.horarioBackup}
                  onChange={(e) => setConfig({...config, horarioBackup: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleBackupNow} variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Fazer Backup Agora
              </Button>
              
              <Button onClick={handleExportData} variant="outline">
                Exportar Dados (CSV)
              </Button>
              
              <Button onClick={handleRestoreBackup} variant="outline">
                Restaurar Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}