import { Component, OnInit } from '@angular/core';
import { LivreService } from '../service/livre.service';
import { Livre } from '../models/livre';
import { FormGroup ,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {
  successMessage: any;
  errorMessage: any;

  constructor(private livreService : LivreService) { 
  
      this.livreService = livreService;
      }

  ngOnInit(): void {
  
  this.getAllLivres();
  }
  
  livre: Livre = new Livre;
  livres : Livre[] =[];
  
  afficherFormulaire : boolean = false;

  
  fonctionModifierVariable(){
    return this.afficherFormulaire= !this.afficherFormulaire;
  }
  
  getAllLivres(){
  this.livreService.getAllLivre().subscribe(res => {
      this.livres = res;
      })
  }
  
  
  formulaireAjoutLivre = new FormGroup({
    'isbnn':new FormControl('',Validators.required),
    'image':new FormControl('',Validators.required),
    'titre':new FormControl('',Validators.required),
    'sousTitre':new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required),
    'langue':new FormControl('',Validators.required),
    'quantite':new FormControl('',Validators.required),
    'dateMisEnVente':new FormControl('',Validators.required),
    'datePublication':new FormControl('',Validators.required),
    'editeur':new FormControl('',Validators.required),
    'nombreDePage':new FormControl('',Validators.required),
    'nomDeLaSerie':new FormControl('',Validators.required),
    'genre':new FormControl('',Validators.required),
    'contributeurs':new FormControl('',Validators.required),
  
  })
  
  enregistrerLivre(){
  console.log(this.formulaireAjoutLivre.value);
  if(this.formulaireAjoutLivre.valid){
    
    console.log(this.formulaireAjoutLivre.value);
    this.livreService.ajoutLivre(this.formulaireAjoutLivre.value).subscribe((response)=>{
      console.log(response, "Les reponse");
      this.getAllLivres();
      
      this.successMessage = "Livre a été Ajouter";
          this.fonctionModifierVariable()
      
    })
    }else{

      // console.log("Tous les champs sont obligatoires")
      this.errorMessage = "Tous les champs sont obligatoire";
    }
  }
  
    //Suppression par id
    supprimer(id: number) {
      console.log(id);
      this.livreService.deleteById(id).subscribe(res=>{
        console.log(res);
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
          this.supprimer(id);
          this.getAllLivres();
          Swal.fire(
            'Supprimé !',
            'Le role a été supprimé.',
            'success'
          );
          this.getAll();
    
        }
      })
    }

}
