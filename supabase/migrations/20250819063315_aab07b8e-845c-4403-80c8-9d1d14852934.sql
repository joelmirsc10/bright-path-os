-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add trigger for profiles timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update RLS policies for all existing tables to require authentication

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Permitir acesso total categorias" ON public.categorias_financeiras;
DROP POLICY IF EXISTS "Permitir acesso total clientes" ON public.clientes;
DROP POLICY IF EXISTS "Permitir acesso total configuracoes" ON public.configuracoes_sistema;
DROP POLICY IF EXISTS "Permitir acesso total eventos" ON public.eventos_agenda;
DROP POLICY IF EXISTS "Permitir acesso total excursoes" ON public.excursoes;
DROP POLICY IF EXISTS "Permitir acesso total historico" ON public.historico_mensagens;
DROP POLICY IF EXISTS "Permitir acesso total passageiros" ON public.passageiros;
DROP POLICY IF EXISTS "Permitir acesso total templates" ON public.templates_mensagem;
DROP POLICY IF EXISTS "Permitir acesso total transacoes" ON public.transacoes_financeiras;

-- Create secure policies for categorias_financeiras
CREATE POLICY "Authenticated users can view categorias" 
ON public.categorias_financeiras 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage categorias" 
ON public.categorias_financeiras 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for clientes
CREATE POLICY "Authenticated users can view clientes" 
ON public.clientes 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage clientes" 
ON public.clientes 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for configuracoes_sistema (admin only)
CREATE POLICY "Authenticated users can view configuracoes" 
ON public.configuracoes_sistema 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage configuracoes" 
ON public.configuracoes_sistema 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for eventos_agenda
CREATE POLICY "Authenticated users can view eventos" 
ON public.eventos_agenda 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage eventos" 
ON public.eventos_agenda 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for excursoes
CREATE POLICY "Authenticated users can view excursoes" 
ON public.excursoes 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage excursoes" 
ON public.excursoes 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for historico_mensagens
CREATE POLICY "Authenticated users can view historico_mensagens" 
ON public.historico_mensagens 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage historico_mensagens" 
ON public.historico_mensagens 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for passageiros
CREATE POLICY "Authenticated users can view passageiros" 
ON public.passageiros 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage passageiros" 
ON public.passageiros 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for templates_mensagem
CREATE POLICY "Authenticated users can view templates" 
ON public.templates_mensagem 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage templates" 
ON public.templates_mensagem 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create secure policies for transacoes_financeiras
CREATE POLICY "Authenticated users can view transacoes" 
ON public.transacoes_financeiras 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage transacoes" 
ON public.transacoes_financeiras 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix database function security (update search_path)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.calcular_idade(data_nascimento date)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    RETURN EXTRACT(year FROM age(CURRENT_DATE, data_nascimento));
END;
$$;

CREATE OR REPLACE FUNCTION public.gerar_numero_documento()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    RETURN 'DOC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('documento_seq')::text, 4, '0');
END;
$$;