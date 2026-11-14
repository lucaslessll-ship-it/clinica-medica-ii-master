# Sessão e identidade do site

- Nome visível: **Clínica Médica e Cirurgia**, na navegação, acesso, título da aba, descrição e manifesto de instalação.
- “Manter conectado neste dispositivo” vem marcado e preserva o comportamento de sessão persistente já adotado pelo SDK. O Supabase restaura e renova a sessão enquanto ela for válida.
- Desmarcado: os tokens da sessão ficam em `sessionStorage`, limitados à aba. Marcado: ficam em `localStorage`, disponíveis após reabrir o mesmo navegador. Senhas digitadas não são armazenadas pelo aplicativo.
- A escolha é específica do navegador/dispositivo. Sair remove a sessão de ambos os locais. Expiração, revogação pelo serviço e limpeza dos dados do navegador continuam exigindo novo acesso.
- Dados de estudo, IDs, arquivos de backup e chaves antigas foram preservados para manter compatibilidade. Não houve mudança no banco, nos usuários ou nas configurações do Supabase.
- Versão dos recursos atualizada para `20261114-tabelas1`, preservando parâmetros de recuperação no redirecionamento.

Validação: suíte integrada de 68 testes aprovada após integrar a main que contém Cirurgia e POCUS. Testes específicos adicionais aprovaram o novo nome, cache de recursos, sessão persistente restaurada em novo contexto de navegador, sessão apenas na aba, restauração ao recarregar e remoção ao sair e renovação de token expirado sem pedir a senha novamente (verificação adicional). Autenticação exercitada com SDK oficial e HTTP interceptado, sem dados reais ou envio de e-mails. Validadores Python e sintaxe aprovados.
