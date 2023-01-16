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
  
  addUrl = 'http://localhost:9000/livre/add';
  
 ajoutLivre(data: any):Observable <any> {
  console.log("Livre Save ", data);
  return this.http.post( `${this.addUrl}`,data)
 }
 
 //Modification d'une occurrence ;
 
 editLivre(id : number , livre : Livre) : Observable<Livre>{
  return this.http.put<Livre>('http://localhost:9000/livre/edit/'+id ,livre)
}

 
 //Suppression d'une occurrence par la clé primaire ;
 suppUrl = 'http://localhost:9000/livre/supp/';
//  deleteById( id : number):Observable <Livre>{
//   let ids=id;
//   return this.http.delete<Livre>( `${this.suppUrl}/${ids}` )
  
//  }

deleteById( id : number):Observable <Livre>{
  // let ids=id;
  return this.http.delete<Livre>(this.suppUrl+id )
  
 }
 
 //Suppression d'une occurrence par l'objet entier ;
 suppObjetUrl = 'http://localhost:9000/livre/supprimer'
 deleteByObjet(data : Livre): Observable<Livre>{

  return this.http.delete<Livre>(`${this.suppObjetUrl}`)
 
 }
 
 //Recherche d'une occurrence par la clé primaire ;
 findByIdUrl= 'http://localhost:9000/livre/one'
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

getAllURL = 'http://localhost:9000/allLivre'
getAllLivre():Observable<Array<Livre>>{

  return this.http.get<Array<Livre>>(this.getAllURL);
}



}
