/* Conteúdo editorial versionado. Os índices das alternativas são estáveis. */
(() => {
'use strict';
const refs = {
 als: ['AHA 2025 · Suporte avançado de vida no adulto','https://pubmed.ncbi.nlm.nih.gov/41122884/'],
 tachy: ['AHA 2025 · Algoritmo de taquiarritmia com pulso','https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf'],
 brady: ['AHA 2025 · Algoritmo de bradicardia com pulso','https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Bradycardia-250514.pdf'],
 af: ['ACC/AHA/ACCP/HRS 2023 · Fibrilação atrial','https://pmc.ncbi.nlm.nih.gov/articles/PMC11104284/'],
 mit: ['Moody e Mark · MIT-BIH Arrhythmia Database 1.0.0','https://physionet.org/content/mitdb/1.0.0/']
};
const chapters = [
 ['mecanismo','Da condução ao traçado','O nó sinusal inicia a ativação atrial (P). O nó AV retarda a transmissão (parte do PR). O sistema His–Purkinje ativa rapidamente os ventrículos (QRS). A onda T representa a repolarização ventricular.','Automaticidade aumentada gera disparos espontâneos. Pós-potenciais podem deflagrar batimentos em condições como QT longo. Na reentrada, a onda elétrica recircula quando encontra tecido novamente excitável. O bloqueio AV ocorre quando um impulso atrial chega atrasado ou deixa de alcançar o ventrículo.','tachy'],
 ['estabilidade','Pulso, perfusão e causa','Avalie pulso e perfusão, monitorize e obtenha ECG de 12 derivações se isso não atrasar a intervenção. Hipotensão, choque, alteração mental aguda, desconforto isquêmico e insuficiência cardíaca aguda sinalizam gravidade quando causados pelo ritmo.','Uma taquicardia sinusal pode sustentar o débito na sepse ou hipovolemia. Procure hipóxia, isquemia, distúrbios de potássio e magnésio, intoxicação e fármacos. Trate a causa e avalie a resposta hemodinâmica.','tachy'],
 ['estreito','Taquicardia de QRS estreito','QRS <120 ms favorece ativação ventricular pelo sistema habitual. Uma frequência próxima de 150/min e regular deve levantar flutter com condução 2:1. A TRN costuma começar e parar abruptamente, com P ocultas ou próximas do QRS.','Em taquicardia regular estreita estável, manobras vagais e adenosina podem interromper circuitos dependentes do nó AV. Um bloqueio AV transitório pode apenas expor as ondas do flutter. Guarde a tira do monitor e reavalie o ECG após a intervenção.','tachy'],
 ['fa','FA, flutter e risco tromboembólico','Na FA, a ativação atrial desorganizada produz intervalos RR irregularmente irregulares e ausência de ondas P repetíveis. No flutter, a macroreentrada atrial é organizada e pode conduzir em proporções fixas ou variáveis.','No adulto estável, controle de frequência ou ritmo depende de sintomas, função ventricular, comorbidades e duração do episódio. Em FA ≥48 h ou duração incerta, o planejamento eletivo inclui anticoagulação prévia por pelo menos três semanas ou imagem para excluir trombo. Mantém-se anticoagulação por pelo menos quatro semanas após cardioversão, com decisão de longo prazo baseada no risco. Instabilidade atribuível à FA exige cardioversão elétrica imediata.','af'],
 ['preexcitacao','Pré-excitação e via acessória','PR curto e onda delta em ritmo sinusal sugerem pré-excitação. Uma taquicardia irregular muito rápida, com QRS largo de morfologia variável, pode ser FA com condução pela via acessória.','Bloquear o nó AV pode favorecer a condução ventricular rápida pela via acessória e precipitar FV. Evite adenosina, betabloqueadores, verapamil/diltiazem, digoxina e amiodarona IV nesse cenário. Em paciente estável, a diretriz inclui procainamida IV ou ibutilida IV sob supervisão especializada. Na instabilidade, cardioversão elétrica sincronizada.','af'],
 ['ventricular','QRS largo, TV e torsades','QRS ≥120 ms pode ocorrer por TV, aberrância ou pré-excitação. Dissociação AV, batimentos de captura e fusão aumentam a suspeita de TV. Diante de dúvida em taquicardia regular larga, conduza como TV e avalie risco estrutural e causas reversíveis.','Torsades é uma TV polimórfica associada a QT prolongado. Suspenda agentes que prolongam QT e corrija eletrólitos. Considere magnésio IV na recorrência de torsades. TV polimórfica sustentada exige choque não sincronizado. TV monomórfica instável com pulso permite sincronização. FV/TV sem pulso exige RCP e desfibrilação.','als'],
 ['bradicardia','Bradicardia, bloqueios AV e estimulação','No primeiro grau, PR >200 ms com relação 1:1. Mobitz I apresenta prolongamento progressivo do PR antes de uma P bloqueada. Mobitz II apresenta P bloqueada sem prolongamento progressivo do PR. No BAV avançado, várias P falham em conduzir. No terceiro grau, não há relação fixa entre P e QRS.','Com hipoperfusão persistente, trate a causa e siga o algoritmo de bradicardia. Atropina costuma funcionar melhor no nó AV. Em bloqueios avançados, prepare estimulação e suporte em paralelo. Confirme captura elétrica no monitor e captura mecânica pelo pulso ou por onda de pressão arterial.','brady'],
 ['eletricidade','Cardioversão, desfibrilação e marcapasso','Na cardioversão sincronizada, confirme as marcas sobre cada R e reative a sincronização após o choque se o aparelho a desativar. Evite disparo sobre a T. Siga a energia indicada para o ritmo e o aparelho e seda sempre que viável sem atrasar a intervenção.','Em FV/TV sem pulso e TV polimórfica sustentada, o choque é não sincronizado. No marcapasso transcutâneo confirme captura mecânica, reavalie perfusão e providencie estratégia de estimulação definitiva conforme a causa e a evolução.','als']
];
const drugs = [
 ['Adenosina','Ativa receptores A1 e reduz transitoriamente a condução no nó AV. Pode terminar TRN/TRAV ortodrômica.', '6 mg IV em bolus rápido com flush de salina. Se necessário, 12 mg IV na segunda dose no algoritmo AHA 2025.','ECG contínuo. Evite em FA pré-excitada, ritmo largo irregular ou polimórfico e broncoespasmo ativo. Dipiridamol potencializa o efeito.','tachy'],
 ['Atropina','Antagoniza receptores muscarínicos e reduz o tônus vagal no nó sinusal e no nó AV.', '1 mg IV a cada 3–5 minutos conforme resposta, até 3 mg no total.','Avalie pulso, perfusão e isquemia. Se ineficaz, prepare estimulação e/ou infusão vasoativa. Não adie a estimulação num bloqueio avançado instável.','brady'],
 ['Procainamida','Antiarrítmico classe IA. Reduz condução pelo bloqueio de canais de sódio e prolonga a repolarização.', 'No algoritmo de taquicardia larga estável, 20–50 mg/min IV. Interrompa se a arritmia suprimir, surgir hipotensão, QRS aumentar >50% ou atingir 17 mg/kg. Manutenção 1–4 mg/min.','Monitorize PA, QRS e QT. Evite com QT longo ou insuficiência cardíaca congestiva. Disfunção renal exige revisão da dose e da manutenção.','tachy'],
 ['Amiodarona','Bloqueia múltiplos canais, com efeito sobre repolarização e condução. Pode ser opção na TV monomórfica estável.', '150 mg IV em 10 minutos. Pode repetir se TV recidivar. O algoritmo lista 1 mg/min pelas primeiras seis horas.','Observe PA, bradicardia, QT e interações. A indicação e a dose de PCR são distintas. Evite na FA pré-excitada.','tachy'],
 ['Adrenalina e dopamina','Em infusão, aumentam cronotropismo e suporte hemodinâmico. São opções de ponte na bradicardia com comprometimento quando a atropina é ineficaz.', 'Adrenalina 2–10 µg/min IV ou dopamina 5–20 µg/kg/min IV, tituladas à resposta.', 'Monitore PA, ritmo, perfusão e acesso venoso. Reavalie necessidade de estimulação transvenosa e trate a causa.','brady']
];
const q = (id,level,chapter,competency,stem,key,choices,memory) => ({
 id:'ue-mastery-arr-'+id+'-v1',revision:'1',t:'arritmias',kind:'mastery',origin:'Clínica Master · autoral',
 level,chapter,competency,q:stem,a:key,o:choices.map(c=>c[0]),rationales:choices.map(c=>c[1]),
 why:choices[key][1],memory
});
const questions = [
 q('01',1,'estabilidade','Avaliação inicial','Um paciente perde a consciência durante a monitorização. Está sem pulso carotídeo e o monitor exibe atividade ventricular rápida em complexos largos organizados. Qual a ação imediata?',2,[
 ['Cardioversão sincronizada','A sincronização é aplicável a ritmos com pulso em situações apropriadas.'],
 ['Adenosina IV','Não corrige uma parada em TV sem pulso.'],
 ['Iniciar RCP e desfibrilar assim que possível','TV sem pulso é um ritmo chocável. As compressões sustentam perfusão até que o choque interrompa a arritmia.'],
 ['Aguardar ECG de 12 derivações','O ECG completo atrasaria RCP e desfibrilação.'],
 ['Estimulação transcutânea','O marcapasso é usado em bradicardia selecionada com pulso.']
 ],'O pulso decide o algoritmo antes de qualquer análise de morfologia.'),
 q('02',1,'fa','Interpretação do ECG','Uma mulher de 73 anos tem palpitações. O ECG mostra QRS estreitos, intervalos RR irregularmente irregulares e atividade atrial sem ondas P repetíveis. Qual ritmo é mais provável?',0,[
 ['Fibrilação atrial','A ativação atrial desorganizada produz ausência de P consistentes e transmissão irregular pelo nó AV.'],
 ['Flutter com condução fixa 2:1','Uma razão fixa tende a produzir RR regulares. Procure ondas atriais organizadas.'],
 ['Taquicardia sinusal','O ritmo sinusal apresenta uma P consistente antes de cada QRS.'],
 ['Taquicardia por reentrada nodal','A TRN típica é regular, embora as P possam ficar ocultas.'],
 ['Taquicardia atrial multifocal','Exige pelo menos três morfologias de P discretas no mesmo eletrodo.']
 ],'Junte irregularidade de RR à ausência de P organizadas.'),
 q('03',1,'bradicardia','Interpretação do ECG','Em um traçado de um paciente estável, o PR passa de 160 para 210 e 260 ms antes de uma onda P sem QRS. A sequência reinicia com PR de 160 ms. Qual o bloqueio?',3,[
 ['Bloqueio AV de primeiro grau','Todas as ondas P conduziriam.'],
 ['Mobitz II','A perda de condução ocorre com PR conduzidos constantes, no padrão típico.'],
 ['Bloqueio AV completo','As ondas P e os QRS seguem ritmos independentes.'],
 ['Mobitz I','A condução AV se prolonga progressivamente até uma P bloquear e o ciclo reiniciar.'],
 ['Bloqueio sinoatrial','A falha é de ativação atrial e não há uma P isolada bloqueada como na sequência descrita.']
 ],'Wenckebach: o PR alonga, uma P bloqueia, o PR reinicia mais curto.'),
 q('04',1,'mecanismo','Fisiopatologia','No ECG de uma adulta, qual parte corresponde principalmente à despolarização dos ventrículos?',1,[
 ['Onda P','Representa despolarização atrial.'],
 ['Complexo QRS','A soma da despolarização ventricular forma o QRS. A ativação rápida pelo His–Purkinje tende a gerar QRS estreito.'],
 ['Onda T','Representa repolarização ventricular.'],
 ['Segmento PR','Corresponde à condução entre a ativação atrial e o início ventricular, incluindo o atraso nodal.'],
 ['Segmento ST','Corresponde ao período em que o miocárdio ventricular permanece amplamente despolarizado.']
 ],'P ativa átrio. QRS ativa ventrículo. T representa repolarização ventricular.'),
 q('05',2,'estabilidade','Tomada de decisão','Um homem com taquicardia regular de QRS estreito a 190/min tem pulso, PA 70/40 mmHg, dor isquêmica e pele fria. A taquicardia começou antes dos sinais de choque. Qual decisão é prioritária?',4,[
 ['Aguardar efeito de betabloqueador oral','A absorção é lenta e a hipotensão pode piorar.'],
 ['Completar exames antes de intervir','A deterioração hemodinâmica exige intervenção sem atrasos evitáveis.'],
 ['Usar choque não sincronizado como primeira opção','Para ritmo regular com pulso e R reconhecível, sincronize o choque.'],
 ['Observar enquanto realiza Valsalva seriada','A manobra é opção para taquicardia regular estável e não deve adiar o choque.'],
 ['Cardioversão elétrica sincronizada','O ritmo causa instabilidade com pulso. Sincronize, monitore e seda se viável sem retardar o choque.']
 ],'Instabilidade causada pelo ritmo + pulso + ritmo sincronizável → cardioversão.'),
 q('06',2,'estreito','Tomada de decisão','Um adulto tem início súbito de palpitações, QRS estreito regular a 180/min, PA 122/76 mmHg, sem dor ou dispneia. Qual intervenção inicial é apropriada?',2,[
 ['Desfibrilação','Há pulso e estabilidade.'],
 ['Atropina','Aumenta frequência e condução nodal e não é tratamento da TRN.'],
 ['Manobra vagal monitorizada','O aumento do tônus vagal pode interromper reentrada dependente do nó AV sem fármacos.'],
 ['Amiodarona em dose de PCR','A dose de PCR não corresponde ao cenário com pulso e o tratamento inicial segue outra via.'],
 ['Marcapasso transcutâneo','Não é indicado como primeira intervenção para esta taquicardia estável.']
 ],'Taquicardia regular estreita estável: comece por manobra vagal.'),
 q('07',2,'estreito','Interpretação do ECG','Um paciente apresenta ritmo ventricular regular a 150/min. Após bloqueio AV transitório documentado, o ritmo atrial permanece a 300/min com ondas contínuas em serrilha inferiores. Qual mecanismo explica melhor o achado?',1,[
 ['Reentrada nodal interrompida','A atividade atrial organizada persistente a 300/min aponta para outro circuito.'],
 ['Flutter atrial inicialmente com condução 2:1','O nó AV transmitia um de cada dois impulsos atriais. O bloqueio transitório separa o padrão atrial dos QRS.'],
 ['FA de baixa resposta','A FA não produz uma sequência regular de ondas atriais em serrilha.'],
 ['TV com captura ventricular','O achado-chave é atividade atrial regular a frequência maior, revelada pelo bloqueio AV.'],
 ['Taquicardia sinusal','A frequência e o padrão atrial em serrilha não correspondem a ondas P sinusais.']
 ],'O nó AV pode ocultar o flutter. Bloqueá-lo transitoriamente pode revelar as ondas.'),
 q('08',2,'estreito','Farmacologia','Após manobra vagal sem sucesso, um adulto estável segue com taquicardia regular estreita. Sem contraindicações, qual administração inicial de adenosina corresponde ao algoritmo AHA 2025?',3,[
 ['6 mg por infusão IV em 10 minutos','A meia-vida muito curta exige bolus rápido.'],
 ['1 mg IV a cada 3–5 minutos','É o esquema inicial de atropina na bradicardia.'],
 ['150 mg IV em 10 minutos','É esquema de amiodarona em outro cenário.'],
 ['6 mg IV em bolus rápido seguidos de flush de salina','A entrega rápida permite efeito nodal antes da metabolização. Registre o ritmo continuamente.'],
 ['12 mg IM, seguido de ECG em 30 minutos','A via IM não se aplica e a monitorização precisa ser contínua.']
 ],'Adenosina é de efeito fugaz. Bolus e flush são parte da intervenção.'),
 q('09',2,'bradicardia','Farmacologia','Um adulto com bradicardia e hipotensão persiste sintomático após suporte inicial. Qual é a dose inicial de atropina no algoritmo adulto AHA 2025?',0,[
 ['1 mg IV','Pode repetir a cada 3–5 minutos até 3 mg. Avalie resposta e prepare alternativas se a perfusão continuar comprometida.'],
 ['0,1 mg IV','Fica abaixo da dose recomendada para este algoritmo adulto.'],
 ['0,5 mg IV','Corresponde a versões históricas e não à dose do algoritmo AHA 2025 apresentado.'],
 ['3 mg IV em bolus inicial','É a dose cumulativa máxima no algoritmo.'],
 ['5 µg/kg/min IV','A unidade refere-se a infusão por peso, como na dopamina.']
 ],'Atropina: 1 mg inicial, 3–5 minutos entre doses, 3 mg cumulativos.'),
 q('10',2,'eletricidade','Procedimento','Após iniciar marcapasso transcutâneo por bloqueio AV instável, cada espícula é seguida de complexo largo no monitor. O que deve ser verificado para confirmar captura mecânica?',4,[
 ['Apenas a repetição das espículas','Espícula demonstra emissão do estímulo.'],
 ['Somente a largura do QRS','O QRS após espícula sugere captura elétrica.'],
 ['Contração dos músculos do tórax','A corrente pode estimular músculos esqueléticos sem débito eficaz.'],
 ['Frequência programada igual à do monitor','O monitor pode contar complexos sem confirmar perfusão.'],
 ['Pulso ou onda arterial correspondendo aos complexos estimulados','Uma resposta arterial sincronizada demonstra que a despolarização produziu ejeção.']
 ],'Espícula → QRS é captura elétrica. QRS → pulso é captura mecânica.'),
 q('11',2,'ventricular','Interpretação do ECG','Um adulto com infarto antigo apresenta taquicardia regular de QRS largo. Ondas P independentes atravessam o traçado e há um batimento de captura. Qual diagnóstico é mais provável?',1,[
 ['TRN com aberrância','A condução aberrante supraventricular não explica bem um batimento de captura no contexto descrito.'],
 ['Taquicardia ventricular monomórfica','Dissociação AV e captura são pistas fortes de origem ventricular. A cicatriz isquêmica favorece reentrada ventricular.'],
 ['FA pré-excitada','O ritmo ventricular geralmente é irregular e pode variar a morfologia.'],
 ['Flutter com condução 2:1','Espera-se relação organizada entre a atividade atrial e ventricular.'],
 ['Torsades de pointes','Torsades é polimórfica e associada a QT prolongado.']
 ],'Dissociação AV, captura e fusão são pistas para TV.'),
 q('12',2,'fa','Tomada de decisão','Uma paciente estável apresenta FA há pelo menos 72 horas, sem anticoagulação. Considera-se cardioversão eletiva. Qual estratégia é apropriada para reduzir risco embólico?',2,[
 ['Cardioverter diretamente porque não há dor','A ausência de dor não informa o risco de trombo atrial.'],
 ['Administrar aspirina e cardioverter','Aspirina não substitui anticoagulação terapêutica neste contexto.'],
 ['Anticoagular por pelo menos três semanas ou excluir trombo por imagem antes da cardioversão','Com FA ≥48 h, essas são estratégias pré-cardioversão segundo ACC/AHA 2023. Mantenha anticoagulação por pelo menos quatro semanas após o procedimento.'],
 ['Anticoagular apenas depois da cardioversão','Isso não reduz o risco imediato de embolização de trombo pré-existente.'],
 ['Usar controle da frequência por duas horas e cardioverter','Desacelerar o ventrículo não exclui trombo no átrio.']
 ],'Cardioversão eletiva na FA prolongada exige estratégia antitrombótica.'),
 q('13',2,'estabilidade','Diagnóstico diferencial','Uma paciente febril com pneumonia, suspeita de sepse e hipovolemia apresenta ritmo regular a 132/min, com P sinusal antes de cada QRS. PA 86/52 mmHg. Qual conduta aborda a origem mais provável da taquicardia?',3,[
 ['Cardioversão sincronizada por qualquer hipotensão','A instabilidade deve ser atribuível à arritmia. O padrão aponta para resposta sinusal à doença sistêmica.'],
 ['Adenosina para interromper reentrada','O ECG e o contexto apoiam taquicardia sinusal.'],
 ['Betabloqueador de ação longa para normalizar a frequência','Reduzir a resposta compensatória pode piorar o débito.'],
 ['Tratar a causa da hipoperfusão e reavaliar ritmo e perfusão','A frequência aumentada pode compensar redução de volume sistólico ou vasodilatação.'],
 ['Estimulação transcutânea','A frequência está aumentada e não há indicação de estimulação.']
 ],'Pergunte se o ritmo causou a instabilidade ou se responde à doença.'),
 q('14',2,'eletricidade','Procedimento','Um paciente com TV monomórfica tem pulso e deterioração hemodinâmica. As marcas de sincronização aparecem sobre as ondas T em vez das R. Qual a verificação imediata no aparelho antes do choque sincronizado, se viável sem atraso perigoso?',4,[
 ['Aumentar a energia ignorando as marcas','Energia maior não corrige o disparo em momento vulnerável.'],
 ['Confiar nas marcas porque a onda T é ventricular','A onda T marca repolarização, fase vulnerável ao choque.'],
 ['Desligar todos os eletrodos do monitor','Isso impede confirmar a detecção da onda R.'],
 ['Aguardar o efeito de medicação oral','A instabilidade exige intervenção rápida.'],
 ['Ajustar a derivação ou ganho para marcar corretamente cada R','Sincronizar com a R reduz o risco de descarga na T. Se não for possível sincronizar e o quadro for crítico, não se deve atrasar o choque.']
 ],'Confirme visualmente a sincronização na onda R.'),
 q('15',3,'preexcitacao','Segurança farmacológica','Um adulto com pré-excitação conhecida chega estável com taquicardia muito rápida, QRS largos de morfologia variável e RR irregulares. Qual estratégia farmacológica é compatível com a suspeita de FA pré-excitada?',2,[
 ['Adenosina IV para bloquear o nó AV','O bloqueio nodal pode favorecer condução pela via acessória e precipitar FV.'],
 ['Diltiazem IV para controle de frequência','Também bloqueia o nó AV e é contraindicado nesse cenário.'],
 ['Procainamida IV sob monitorização e supervisão especializada','É opção no paciente estável segundo a diretriz de FA. Prepare cardioversão se houver deterioração.'],
 ['Digoxina para lentificar a resposta ventricular','Bloqueio nodal pode aumentar o risco de resposta ventricular perigosa.'],
 ['Amiodarona IV como preferência universal para QRS largo','Na FA pré-excitada, amiodarona IV é contraindicada pela diretriz de FA.']
 ],'No ritmo largo irregular pré-excitado, não trate o nó AV como se fosse FA comum.'),
 q('16',3,'ventricular','Tomada de decisão','Uma mulher em uso de fármaco que prolonga QT apresenta hipocalemia e TV polimórfica sustentada. Está obnubilada e tem pulso muito débil. Qual intervenção imediata é apropriada?',3,[
 ['Aguardar a infusão de potássio completar','A correção etiológica é importante após a intervenção elétrica urgente.'],
 ['Cardioversão sincronizada e aguardar detecção confiável da R','Na TV polimórfica a sincronização pode falhar devido à variação de morfologia.'],
 ['Amiodarona para prolongar a refratariedade','Na torsades por QT longo, prolongar ainda mais a repolarização pode piorar o substrato.'],
 ['Choque não sincronizado imediato','A TV polimórfica sustentada deve ser interrompida sem depender de sincronização. Trate depois os fatores de recorrência.'],
 ['Estimulação transcutânea como primeira intervenção','A estratégia de aumentar frequência pode ser discutida na recorrência dependente de pausas após estabilização.']
 ],'Na TV polimórfica sustentada, choque primeiro. Depois investigue o QT e a causa.'),
 q('17',3,'ventricular','Fisiopatologia','Após choque eficaz, uma paciente tem QTc de 570 ms e episódios autolimitados de TV polimórfica que começam após pausas. Usa dois fármacos que prolongam QT. Qual conduta reduz o risco de novas crises?',0,[
 ['Retirar os fármacos, corrigir potássio e considerar magnésio IV','QT longo favorece pós-potenciais precoces, especialmente após pausas. Corrigir causas reduz o substrato de torsades.'],
 ['Reintroduzir os medicamentos em doses menores','Enquanto o QT permanece muito prolongado e há recorrência, a exposição mantém o risco.'],
 ['Usar procainamida para a TV polimórfica','Pode prolongar QT e agravar o mecanismo.'],
 ['Administrar adenosina a cada episódio','Torsades não é reentrada dependente do nó AV.'],
 ['Considerar o QT irrelevante se o magnésio sérico é normal','A associação entre QT longo e torsades permanece. Magnésio pode ser considerado mesmo sem hipomagnesemia demonstrada.']
 ],'Torsades recorrente: procure QT longo, pausas, fármacos e eletrólitos.'),
 q('18',3,'bradicardia','Tomada de decisão','Homem com dor isquêmica tem ondas P a 96/min sem relação fixa com QRS largos a 28/min. Após atropina, PA segue 68/38 mmHg e permanece confuso. Qual ação priorizar?',4,[
 ['Esperar mais 20 minutos pela resposta à atropina','O bloqueio avançado e a hipoperfusão exigem suporte imediato.'],
 ['Administrar adenosina para avaliar a condução','Adenosina pode piorar o bloqueio nodal.'],
 ['Cardioversão sincronizada','A intervenção é indicada para taquiarritmias selecionadas, não para esse escape ventricular lento.'],
 ['Observar porque há ritmo de escape','O escape não está garantindo perfusão adequada.'],
 ['Iniciar estimulação transcutânea e preparar suporte/estimulação transvenosa','A dissociação AV com escape lento, QRS largo e choque exige intervenção. Considere infusão vasoativa e trate a causa isquêmica.']
 ],'Bloqueio avançado com choque: prepare estimulação em paralelo ao suporte.'),
 q('19',3,'ventricular','Segurança farmacológica','Um paciente estável com TV monomórfica recebe procainamida no monitor. Após alguns minutos, o QRS aumentou de 140 para 220 ms e a PA caiu para 83/48 mmHg. Qual o passo após reconhecer esses achados?',1,[
 ['Aumentar a infusão porque a TV persiste','A hipotensão e o alargamento acentuado são critérios para interrupção.'],
 ['Interromper a procainamida, reavaliar pulso/perfusão e preparar cardioversão sincronizada se a TV persistir instável','Há hipotensão e aumento do QRS >50%. A deterioração muda a estratégia para intervenção elétrica quando indicado.'],
 ['Continuar até atingir 17 mg/kg','A dose máxima é um limite, não uma meta acima dos critérios de segurança.'],
 ['Adicionar outro antiarrítmico antes de avaliar a PA','Empilhar drogas pode piorar condução e hipotensão.'],
 ['Reduzir para manutenção mantendo a infusão ativa','Manutenção não se aplica diante de toxicidade hemodinâmica durante a carga.']
 ],'Procainamida: hipotensão ou QRS >50% acima do inicial exige interromper.'),
 q('20',3,'fa','Tomada de decisão','Uma mulher com FA de duração incerta e frequência de 175/min torna-se confusa, com edema pulmonar e choque atribuídos à arritmia. Qual a prioridade?',0,[
 ['Cardioversão sincronizada imediata e avaliação antitrombótica assim que viável','A instabilidade atribuída à FA justifica intervenção imediata. Aborde o risco tromboembólico sem retardar a estabilização.'],
 ['Adiar a cardioversão por três semanas de anticoagulação','A regra de preparação eletiva não deve atrasar a cardioversão de emergência.'],
 ['Exigir ecocardiograma transesofágico antes de qualquer choque','É estratégia eletiva ou quando as condições permitem, sem atrasar estabilização.'],
 ['Administrar diltiazem em bolus sem reavaliar a perfusão','Em choque e insuficiência cardíaca aguda, essa abordagem pode agravar a situação.'],
 ['Desfibrilar de imediato apesar de sincronização possível','Há pulso e ritmo elegível para cardioversão sincronizada.']
 ],'A urgência hemodinâmica muda o momento da cardioversão. O risco embólico continua exigindo avaliação.')
];
const cards = [
 ['pulso','Qual dado antecede a classificação do QRS na emergência?','A presença de pulso. FV/TV sem pulso seguem o algoritmo de parada.','estabilidade'],
 ['choque','Quais achados sugerem instabilidade causada pela taquiarritmia?','Hipotensão, alteração mental aguda, choque, dor isquêmica ou insuficiência cardíaca aguda.','estabilidade'],
 ['sinusal','Quando é prioritário tratar a causa da taquicardia?','Quando representa resposta sinusal a hipovolemia, sepse, hipóxia, dor ou outra demanda elevada.','estabilidade'],
 ['qrs','Qual limiar separa QRS estreito e largo no algoritmo adulto?','120 ms. QRS ≥120 ms é largo.','mecanismo'],
 ['trn','Por que adenosina termina a TRN típica?','Bloqueia transitoriamente a condução nodal, interrompendo o circuito de reentrada.','estreito'],
 ['adenosina','Como administrar a primeira dose de adenosina no algoritmo adulto?','6 mg IV em bolus rápido, seguidos de flush de salina, com ECG contínuo.','estreito'],
 ['flutter','O que sugere flutter 2:1 diante de frequência de 150/min?','Atividade atrial regular próxima de 300/min, com uma onda atrial conduzida a cada duas.','estreito'],
 ['fa','Quais dois achados de ECG favorecem FA?','RR irregularmente irregulares e ausência de ondas P repetíveis.','fa'],
 ['trombo','Qual a estratégia prévia usual na cardioversão eletiva de FA ≥48 h?','Três semanas de anticoagulação terapêutica ou imagem para excluir trombo. Planeje anticoagulação após.','fa'],
 ['fa-choque','FA de duração incerta com choque atribuído ao ritmo: quando cardioverter?','Imediatamente, com sincronização. Avalie anticoagulação assim que viável.','fa'],
 ['delta','O que sugere PR curto com início lento do QRS em ritmo sinusal?','Pré-excitação ventricular pela via acessória. O início lento é a onda delta.','preexcitacao'],
 ['wpw','Por que evitar bloqueadores do nó AV na FA pré-excitada?','Podem favorecer condução rápida pela via acessória e precipitar FV.','preexcitacao'],
 ['tv','Quais pistas favorecem TV em taquicardia larga regular?','Dissociação AV, captura, fusão e história de cardiopatia estrutural.','ventricular'],
 ['torsades','Qual é o substrato elétrico da torsades de pointes?','Repolarização prolongada, expressa em QT longo, com vulnerabilidade a pós-potenciais e pausas.','ventricular'],
 ['procainamida','Quando interromper a carga de procainamida no algoritmo AHA?','Com supressão da arritmia, hipotensão, QRS que aumenta >50% ou dose total de 17 mg/kg.','ventricular'],
 ['mobitz','Como diferenciar Mobitz I e II em padrões típicos?','No I, o PR alonga até uma P bloquear. No II, ocorre P bloqueada sem prolongamento progressivo.','bradicardia'],
 ['bav','O que define bloqueio AV de terceiro grau?','Atividade atrial dissociada da ventricular, com ritmo de escape.','bradicardia'],
 ['atropina','Qual esquema adulto de atropina em bradicardia sintomática?','1 mg IV, repetir a cada 3–5 minutos até 3 mg, sem atrasar suporte e estimulação quando necessários.','bradicardia'],
 ['sincronia','Em que ponto do ECG o aparelho deve sincronizar a cardioversão?','Na onda R, evitando descarga na repolarização ventricular.','eletricidade'],
 ['captura','Como confirmar captura mecânica do marcapasso transcutâneo?','Procure pulso ou onda de pressão arterial correspondente a cada QRS estimulado.','eletricidade']
].map(([id,front,back,chapter])=>({id:'arr-'+id+'-v1',front,back,chapter}));
const atlas = [
 ['ecg-fa','Fibrilação atrial','Compare a distância entre os traços verdes. Os intervalos RR variam sem padrão e não há P repetíveis.','201',7200,1800],
 ['ecg-flutter','Flutter atrial','Procure atividade atrial organizada entre os complexos. A contribuição de ondas de flutter em um único canal depende do vetor e da sobreposição com o QRS e a T.','202',550500,1800],
 ['ecg-tsv','Início de taquicardia supraventricular','Compare o trecho precedente com a sequência rápida e observe a mudança de frequência. A anotação da base indica TSV, sem definir o circuito.','209',150980,2340],
 ['ecg-tv','Episódio curto de taquicardia ventricular','Compare a morfologia dos complexos antes e durante a sequência rápida. O segmento anotado VT dura cerca de 1,5 s. Neste recorte, o achado é elétrico.','207',13570,1260],
 ['ecg-bradi','Bradicardia sinusal','Localize cada P antes do QRS e use a escala temporal para estimar a frequência. A perfusão define a urgência da intervenção.','232',3600,2520],
 ['ecg-bav','Bloqueio AV de segundo grau','Observe ondas atriais pequenas no intervalo mais longo e procure as que não se seguem de QRS. Compare a periodicidade atrial e ventricular.','231',36000,2520]
];
window.UE_MASTERY_CONTENT = {
 arritmias:{
  schemaVersion:1,edition:'2026.11',scientificReview:'2026-11-26',refs,chapters,drugs,questions,cards,atlas,
  essential:[
   ['Definição','Alteração da formação ou da condução do impulso cardíaco.'],
   ['Mecanismo','Reentrada, automaticidade anormal, atividade deflagrada e bloqueio de condução.'],
   ['Achados','Palpitações, síncope, hipotensão, isquemia ou insuficiência cardíaca aguda.'],
   ['Reconhecimento','Pulso e perfusão primeiro. No ECG: frequência, regularidade, P, PR e largura do QRS.'],
   ['Conduta prioritária','Instabilidade atribuível a taquiarritmia com pulso e ritmo sincronizável → cardioversão. FV/TV sem pulso → RCP e desfibrilação.'],
   ['Pegadinha','QRS largo irregular com pré-excitação: bloqueio do nó AV pode precipitar FV.']
  ],
  table:[
   ['Regular estreito','P oculta, abrupto','TRN/TRAV, flutter 2:1','Se estável, manobra vagal; adenosina se indicada.'],
   ['Irregular estreito','RR sem padrão, P ausente','FA','Avaliar estabilidade, controle de frequência/ritmo e risco embólico.'],
   ['Regular largo','QRS ≥120 ms, captura/fusão','TV até esclarecimento','Com pulso e instabilidade, sincronizar. Se estável, monitorar e buscar orientação especializada.'],
   ['Irregular largo','Morfologia variável ou QT longo','FA pré-excitada ou TV polimórfica','Distinguir os dois cenários. Evitar bloqueadores nodais na pré-excitação.'],
   ['Bradicardia com hipoperfusão','P e QRS dissociados ou P bloqueadas','BAV avançado ou causa reversível','Atropina conforme algoritmo. Preparar estimulação e suporte se ineficaz.']
  ],
  cases:[
   ['De palpitação a choque','Homem, 67 anos, com infarto antigo, chega com taquicardia regular de QRS largo a 176/min. Nas primeiras medidas, apresenta PA 76/42 mmHg, confusão e mantém pulso.','Qual conduta deve acontecer antes que você tente definir o circuito pelo ECG?','Cardioversão sincronizada. A hipoperfusão é atribuível à taquiarritmia e o ritmo monomórfico permite sincronização. Se perder o pulso, mude para RCP e desfibrilação.','eletricidade'],
   ['Síncope após novo medicamento','Mulher, 64 anos, usa dois medicamentos que prolongam QT. Após síncope, recupera pulso e o ECG em ritmo sinusal mostra QTc de 560 ms. O monitor documenta salvas polimórficas após pausas.','Que mecanismo explica as salvas e como reduzir a recorrência?','QT prolongado favorece pós-potenciais precoces, sobretudo após pausas. Suspenda os fármacos implicados, corrija eletrólitos, considere magnésio IV e monitore. TV polimórfica sustentada exige choque não sincronizado.','ventricular']
  ]
 }
};
})();
