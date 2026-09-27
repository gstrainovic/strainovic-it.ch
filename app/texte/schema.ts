import type { Sprache } from '~/utils/sprache'

const de = {
  bestandRolle: 'Bestandssystem',
  bestandName: 'ERP beim Kunden',
  bestandDetail: 'Rechnungen liegen als PDF vor und müssen von Hand erfasst werden.',
  hin: 'Rechnungs-PDF',
  zurueck: 'strukturiertes JSON',
  eigenRolle: 'selbst gebaut',
  eigenName: 'Dienst auf Azure',
  eigenDetail: 'Liest den Beleg aus und gibt ihn strukturiert als JSON zurück.',
  legende:
    'Damit verbucht das ERP Eingangsrechnungen selbst, statt sie abtippen zu lassen. Die Anwender können dem Dienst relevante Rechnungen anlernen. Gebaut mit TypeScript, Node.js und Prisma.'
}

export default {
  de,
  fr: {
    bestandRolle: 'Système existant',
    bestandName: 'ERP du client',
    bestandDetail: 'Les factures arrivent en PDF et doivent être saisies à la main.',
    hin: 'Facture PDF',
    zurueck: 'JSON structuré',
    eigenRolle: 'développé par moi',
    eigenName: 'Service sur Azure',
    eigenDetail: 'Lit le justificatif et le renvoie structuré en JSON.',
    legende:
      'L’ERP comptabilise ainsi lui-même les factures fournisseurs au lieu de les faire ressaisir. Les utilisateurs peuvent apprendre au service à reconnaître les factures pertinentes. Réalisé avec TypeScript, Node.js et Prisma.'
  },
  it: {
    bestandRolle: 'Sistema esistente',
    bestandName: 'ERP del cliente',
    bestandDetail: 'Le fatture arrivano in PDF e vanno registrate a mano.',
    hin: 'Fattura PDF',
    zurueck: 'JSON strutturato',
    eigenRolle: 'sviluppato da me',
    eigenName: 'Servizio su Azure',
    eigenDetail: 'Legge il documento e lo restituisce strutturato in JSON.',
    legende:
      'Così l’ERP registra da solo le fatture in entrata, invece di farle ribattere. Gli utenti possono insegnare al servizio a riconoscere le fatture rilevanti. Realizzato con TypeScript, Node.js e Prisma.'
  },
  en: {
    bestandRolle: 'Existing system',
    bestandName: 'Client’s ERP',
    bestandDetail: 'Invoices arrive as PDF and have to be entered by hand.',
    hin: 'Invoice PDF',
    zurueck: 'structured JSON',
    eigenRolle: 'built by me',
    eigenName: 'Service on Azure',
    eigenDetail: 'Reads the document and returns it as structured JSON.',
    legende:
      'This lets the ERP book incoming invoices itself instead of having them retyped. Users can train the service on the invoices that matter. Built with TypeScript, Node.js and Prisma.'
  }
} satisfies Record<Sprache, typeof de>
