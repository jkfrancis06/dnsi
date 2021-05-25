export class Tache {
  id?: number;
  tache?: {
    id: number,
    priorite: number,
    createdAt: string,
    lastUpdate: string,
    expireAt: string,
    titre: string,
    resume: string
  };
  utilisateur?: string;
  statut?: string;
  updatedAt?: string;
  remarque?: string;
  expires?: string;
}
