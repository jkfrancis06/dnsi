export class Affaire {
  id: number | undefined;
  affaire?: {
    id: number;
    numeroMatricule: string;
    nom: string
  };
  createdBy!: {
    id: number;
    nom: string;
    prenom: string;
    niveauAccreditation: number;
  };
  priorite!: number;
  createdAt!: string;
  lastUpdate!: string;
  expireAt!: string;
  titre!: string;
  resume!: string;
  tacheUtilisateurs!: [
    {
      id: 0;
      tache: string;
      utilisateur: {
        id: 0;
        nom: string;
        prenom: string;
        niveauAccreditation: 0
      };
      statut: string;
      updatedAt: string;
      remarque: string
    }
  ];
  createdAtTimeStamp!: string;
  expiresAtTimeStamp!: string;
  expiresIn!: string
  numeroMatricule: any;
}
