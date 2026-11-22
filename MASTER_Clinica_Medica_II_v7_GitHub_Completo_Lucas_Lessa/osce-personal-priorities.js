/* Roteiro de prioridades pessoal. Não é a classificação global do OSCE.
   Somente a sessão autenticada do proprietário recebe a interface. Não usar como controle de acesso de dados. */
window.OSCE_PERSONAL_PRIORITIES=Object.freeze({
  isOwner:()=>window.MASTER_AUTH?.user?.()?.id==='d20331a2-6724-40e9-8e01-e3e82e57924e',
  version:'2026-11-22-user-plan-v1',
  groups:[
  {
    "n": 1,
    "tier": "A",
    "title": "ECG e arritmias",
    "minutes": 50,
    "level": "Dominar",
    "hint": "FA, BAV, torsades e FV; reconhecer traçado, gravidade e conduta.",
    "ids": [
      52,
      46,
      64,
      20,
      70,
      33,
      30,
      28,
      32
    ]
  },
  {
    "n": 2,
    "tier": "A",
    "title": "POCUS pulmonar e cardíaco",
    "minutes": 50,
    "level": "Dominar",
    "hint": "Linhas B, derrame pleural, tamponamento e pneumotórax; depois VCI e VD.",
    "ids": [
      87,
      88,
      89,
      90,
      91,
      92,
      93
    ]
  },
  {
    "n": 3,
    "tier": "A",
    "title": "Síncope × crise convulsiva",
    "minutes": 35,
    "level": "Dominar",
    "hint": "Antes, durante e depois do evento; exame, investigação e sinais de alarme.",
    "ids": [
      61,
      43
    ]
  },
  {
    "n": 4,
    "tier": "A",
    "title": "Síndrome de Guillain-Barré",
    "minutes": 25,
    "level": "Dominar",
    "hint": "Fraqueza, arreflexia, disautonomia, respiração e tratamento.",
    "ids": [
      7
    ]
  },
  {
    "n": 5,
    "tier": "A",
    "title": "Miastenia gravis",
    "minutes": 25,
    "level": "Dominar",
    "hint": "Fatigabilidade, ptose, crise miastênica, exames e terapêutica.",
    "ids": [
      24
    ]
  },
  {
    "n": 6,
    "tier": "A",
    "title": "LES e SAAF",
    "minutes": 30,
    "level": "Dominar",
    "hint": "Manifestações, anticorpos, tromboses e acometimento renal.",
    "ids": [
      4,
      22,
      34
    ]
  },
  {
    "n": 7,
    "tier": "B",
    "title": "Esclerose múltipla",
    "minutes": 15,
    "level": "Saber o essencial",
    "hint": "Neurite óptica, sinais, RM, líquor e surto versus prevenção.",
    "ids": [
      37
    ]
  },
  {
    "n": 8,
    "tier": "B",
    "title": "Emergências oncológicas",
    "minutes": 25,
    "level": "Saber o essencial",
    "hint": "Neutropenia febril, lise tumoral, compressão medular, hipercalcemia.",
    "ids": [
      79,
      80,
      83,
      84,
      82,
      81
    ]
  },
  {
    "n": 9,
    "tier": "B",
    "title": "Leucemias, linfomas e mieloma",
    "minutes": 20,
    "level": "Saber o essencial",
    "hint": "Pistas clínicas, hemograma/esfregaço, exames e urgências.",
    "ids": [
      39,
      59,
      60,
      69,
      45,
      8,
      25
    ]
  },
  {
    "n": 10,
    "tier": "B",
    "title": "DII, doença celíaca e câncer colorretal",
    "minutes": 20,
    "level": "Saber o essencial",
    "hint": "Crohn × retocolite, sinais de alarme e investigação.",
    "ids": [
      66,
      35,
      12,
      29
    ]
  },
  {
    "n": 11,
    "tier": "B",
    "title": "Vasculites",
    "minutes": 20,
    "level": "Saber o essencial",
    "hint": "Arterite temporal, GPA, PAN; órgãos-alvo e gravidade.",
    "ids": [
      11,
      62,
      57,
      40
    ]
  },
  {
    "n": 12,
    "tier": "B",
    "title": "Esclerose sistêmica, Sjögren e miopatias",
    "minutes": 20,
    "level": "Saber o essencial",
    "hint": "Autoanticorpos, órgãos-alvo, fraqueza proximal e crise renal.",
    "ids": [
      55,
      5,
      38
    ]
  },
  {
    "n": 13,
    "tier": "C",
    "title": "TEP e pericardite",
    "minutes": 15,
    "level": "Passagem rápida",
    "hint": "Reconhecimento, exames, instabilidade e primeira conduta.",
    "ids": [
      85,
      86
    ]
  },
  {
    "n": 14,
    "tier": "C",
    "title": "Insuficiência respiratória e PCR",
    "minutes": 15,
    "level": "Passagem rápida",
    "hint": "ABC, oxigenação, ritmos e reversíveis; revisar POCUS da PCR.",
    "ids": [
      93,
      70,
      87,
      90
    ]
  },
  {
    "n": 15,
    "tier": "C",
    "title": "Infecções e emergências clínicas",
    "minutes": 15,
    "level": "Passagem rápida",
    "hint": "Pneumonia, sepse e infecções graves; reconhecer gravidade.",
    "ids": [
      75,
      76,
      77,
      78
    ]
  }
]
});
