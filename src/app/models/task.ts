import {Tache} from "./tache";

export class Task {
  affaire?: {
    id:number,
    numeroMatricule: string
    nom: string
  };
  createdAt?: string;
  createdAtTimeStamp?: number;
  createdBy?: {
    id: number,
    nom: string,
    prenom: string
  };
  expireAt?: string;
  expiresAtTimeStamp?: number;
  expiresIn?: string;
  id?: number;
  lastUpdate?: string;
  priorite?: number;
  resume?:string;
  tacheUtilisateurs?: any[];
  titre?: string
}
