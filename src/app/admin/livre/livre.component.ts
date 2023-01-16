import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Livre } from 'src/app/models/livre';
import { LivreService } from 'src/app/service/livre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
  
})
export class LivreComponent implements OnInit {

  constructor( private livreService : LivreService) {
  
  this.livreService = livreService;
  }
  editer : String = 'Editer un Livre';
  liste : String = 'Liste des Livres';
  details : String = 'Details';
  ajouter : String = 'Ajouter un livre';
  errorMessage :  any;
  livre : Livre = new Livre();

  successMessage : any;
  
  isAfficherFormulaire : boolean = false;
  
  
livres : Livre[] = []
  ngOnInit(): void {
  
    this.getAllLivres();
  }
  
  
  getAllLivres(){
    this.livreService.getAllLivre().subscribe(response =>{
    this.livres= response;
    })
  }
  
  formulairePassageDeFormulaireAlaListe(){
  this.isAfficherFormulaire =!this.isAfficherFormulaire;
  }
  
  formulaireAjoutLivre=  new FormGroup({
  
  'nom' : new FormControl('',Validators.required),
  'auteur' : new FormControl('',Validators.required),
  'image' : new FormControl('',Validators.required),
  'categorie' : new FormControl('',Validators.required),
  'pdf' : new FormControl('',Validators.required),
  'prix' : new FormControl('',Validators.required),
  'description' : new FormControl('',Validators.required),
  })
   
  
  saveLivre(){
    if(this.formulaireAjoutLivre.value){
     this.livreService.ajoutLivre(this.formulaireAjoutLivre.value).subscribe((response)=>{
      
      this.formulaireAjoutLivre.reset();
      this.successMessage = "Livre Ajouté avec Success";
      this.formulairePassageDeFormulaireAlaListe();
     }); 
    
    }else{
    
      this.errorMessage = "Tous les champs sont Obligatoire";
    }
  }
  
  
    supprimerLivrepByObject(id: number){
    
      this.livreService.deleteById(id).subscribe((response)=>{
      
        // this.getAllLivres()
      
      });
      
    }
    unLivre : Livre = new Livre();
    
    getById(id: number){
    
    this.livreService.findById(id).subscribe((response)=>{
    
    response=this.unLivre});
  
  }
    
    aditLivre(){
    
      this.livreService.editLivre(this.livre.id, this.livre).subscribe((response:Livre)=>{
        this.livre= new Livre();
    })
  }
    
  
    confirmBox(id: number){
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.supprimerLivrepByObject(id);
          this.getAllLivres ();
          Swal.fire(
            'Supprimé !',
            'Le role a été supprimé.',
            'success'
          );
          this.getAllLivres();
    
        }
      })
    }
  

supprimerLivreByObject( livreSup: Livre){

  this.livreService.deleteByObjet(livreSup).subscribe((response)=>{
  })


}


confirmBox1(livre: Livre){
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le !'
  }).then((result) => {
    if (result.isConfirmed) {
      this.supprimerLivreByObject(livre);
      this.getAllLivres ();
      Swal.fire(
        'Supprimé !',
        'Le role a été supprimé.',
        'success'
      );
      this.getAllLivres();

    }
  })
}


}
