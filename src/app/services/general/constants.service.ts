import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public SERVER_ADDRESS = 'http://127.0.0.1:8000';
  public SERVER_SRC_ADDRESS = 'http://127.0.0.1:8000/upload';

  public LOGIN_URL = "/api/login_check";
  public USER_TASKS = "/api/utilisateur/tasks";
  public GET_TASK = "/api/taches";
  public UPDATE_TACHE_UTILISATEUR = "/api/tache_utilisateurs";
  public GET_TACHE_UTILISATEUR_CREATED = "/api/utilisateur/task-created";
  public GET_UTILISATEUR_AFFAIRES = "/api/utilisateur/affaire/get";
  public GET_DEPARTEMENT_AFFAIRES = "/api/departements/";
  public GET_AFFAIRE = "/api/affaires/";
  public POST_AFFAIRE = "/api/affaires";
  public GET_DEPARTMENT_USERS = "/api/departement-users/get";
  public CREATE_AFFAIRE_UTILISATEUR = "/api/affaire_utilisateurs";
  public REMOVE_AFFAIRE_UTILISATEUR = "/api/affaire_utilisateurs/";
  public GET_AFFAIRE_ENTITES = "/api/affaire-entites/get/";
  public UPLOAD_FILES_URL = "/api/personne-file/upload";
  public CREATE_CONSULTATION = "/api/can_consults"


  public CREATE_PERSONNE = "/api/personnes";
  public CREATE_ORGANISATION = "/api/organisations";
  public CREATE_VEHICULE = "/api/vehicules";

  // search

  public GET_ENTITES = "/api/entites?"
  public GET_PERSONNES = "/api/personnes?"
  public GET_VEHICULES = "/api/vehicules?"
  public GET_ORGANISATION = "/api/organisation?"

  constructor() { }
}
