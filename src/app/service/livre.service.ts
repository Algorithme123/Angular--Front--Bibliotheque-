import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../models/livre';


@Injectable({
  providedIn: 'root'
})
export class LivreService {

  constructor( private http:HttpClient ) { 
  
  
  }
  
  // lien ajout 
  
  addUrl = 'http://localhost:9000/livre/ajout';
  
 ajoutLivre(data: any):Observable <any> {
  console.log("Livre Save ", data);
  return this.http.post( `${this.addUrl}`,data)
 }
 
 //Modification d'une occurrence ;
 
 editUrl = 'http://localhost:9000/livre/edit/{id}';
 
 
 //Suppression d'une occurrence par la clé primaire ;
 suppUrl = 'http://localhost:9000/livre/supp';
 deleteById( id : any):Observable <any>{
  let ids=id;
  return this.http.delete( `${this.suppUrl}/${ids}` )
  
 }
 
 //Suppression d'une occurrence par l'objet entier ;
 suppObjetUrl = 'http://localhost:9000/livre/supprimer'
 deleteByObjet(data : any): Observable<any>{

  return this.http.delete(`${this.suppObjetUrl}`,data)
 
 }
 
 //Recherche d'une occurrence par la clé primaire ;
 findByIdUrl= 'http://localhost:9000/livre'
 findById(id : any): Observable<any>{
    let ids=id;
    return this.http.get(`${this.findByIdUrl}/${ids}`);
    
 }
 
 
 //Recherche d'une occurrence au moins par un autre attribut de l'entité ;
 findByIsbnUrl= 'http://localhost:9000/livre';
 findByIsbn(isbn : String):Observable<any>{
  let isbnn= isbn;
  return this.http.get(`${this.findByIsbnUrl}/${isbnn}`);
 }

 




// Affichage de toutes les occurrences ;

getAllURL = 'http://localhost:9000/livre/liste'
getAllLivre():Observable<Array<Livre>>{

  return this.http.get<Array<Livre>>(this.getAllURL);
}



}
