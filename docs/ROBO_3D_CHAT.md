# Robô 3D e respostas visíveis

O ícone linear foi substituído por um mascote original com aparência 3D, fundo transparente e paleta branca/verde-petróleo. O WebP de 256 px pesa aproximadamente 15 KiB. O botão mantém nome acessível, ocultação, retorno pelo menu e preferência local. O flutuante é reposicionado no celular quando os controles de leitura aparecem.

## Falha reproduzida

Em viewport 390 × 600, abrindo pelo menu depois de ocultar o boneco, a ajuda expandida e os demais controles comprimiam o histórico para 32 px. A rolagem para o fim das fontes colocava o começo da resposta acima da área visível (topo em -155 px, contra início do histórico em 161 px). Não bastava confirmar que o texto existia no DOM.

## Correção

- A conversa recebe espaço mínimo e prioridade no painel; compositor é horizontal e compacto.
- Ajuda abre pelo botão “?” e atalhos ficam em um bloco recolhível. Ambos são recolhidos ao enviar a pergunta.
- A primeira aula consultada permanece acessível; fontes adicionais ficam recolhidas.
- A rolagem aponta para o início da nova resposta, sem reabrir automaticamente o teclado.
- O tamanho do painel acompanha `visualViewport`, e a fonte do campo evita o zoom automático em iPhone.
- Aviso de espera aparece na própria conversa. Erros e ausência de resposta não ficam em branco: há mensagem, timeout de 65 segundos e nova tentativa quando apropriado.
- Resposta vazia recebida do servidor é tratada como erro, em vez de criar um cartão vazio.

## Validação

Testes cobrem imagem decodificada, ocultar/reexibir, menu mobile/desktop, três temas, consulta e fontes, resposta realmente dentro da área visível, falha 502 com nova tentativa, timeout, encerramento de sessão e foco. As chamadas do modelo nesses testes são simuladas. Captura conferida em 390 × 600 mostra a resposta acima do formulário, sem ajuda ou fontes extras comprimindo a conversa.

A consulta somente de leitura aos logs de produção encontrou chamadas do ai-tutor com status 200 e 502 na janela verificada. Não foram lidos nem registrados conteúdos de perguntas, respostas, chaves, tokens ou identificadores pessoais. O status 200 confirma uma chamada bem-sucedida, mas não equivale à conferência clínica de seu texto. Não houve mudança na Edge Function, no cadastro da chave ou no banco nesta entrega.

A atualização simultânea do Laboratório de equilíbrio ácido-base (`9cb5d60`) foi preservada. Recursos versionados como `20261116-robo3d1`.

## Recolher junto ao Pomodoro

Ao ocultar o robô, um botão compacto com o mesmo mascote aparece imediatamente ao lado do Pomodoro na barra superior. Esse botão restaura o flutuante sem abrir o chat nem fazer chamadas à IA. A preferência persiste após recarga, e o acesso pelo menu continua disponível. A barra de 320 px usa o Pomodoro compacto para preservar os alvos de toque e evitar rolagem horizontal. Recursos desta atualização: `20261116-iarestore1`.
