import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public SERVER_ADDRESS = 'http://127.0.0.1:8000';

  public LOGIN_URL = "/api/login_check";
  public USER_TASKS = "/api/utilisateur/tasks";
  public GET_TASK = "/api/taches";
  public UPDATE_TACHE_UTILISATEUR = "/api/tache_utilisateurs";
  public GET_TACHE_UTILISATEUR_CREATED = "/api/utilisateur/task-created";
  public GET_UTILISATEUR_AFFAIRES = "/api/utilisateur/affaire/get";
  public GET_DEPARTEMENT_AFFAIRES = "/api/departements/";
  public GET_AFFAIRE = "/api/affaires/";
  constructor() { }
}
