import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import { TituloListar } from '../../models/Titulo';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  titulos: TituloListar[] = [];
  titulosAll: TituloListar[] = [];
  tituloForm: FormGroup;

  constructor(private servicePortal: PortalService, private cdr: ChangeDetectorRef, private router: Router) {
    this.tituloForm = new FormGroup({
      cnpj: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      fone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      covarage: new FormControl('', Validators.required),
      issueDate: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    
    this.servicePortal.GetTitulos()
  .subscribe(
    (response: TituloListar[]) => {  // Retorno direto como um array
      this.titulos = response;
      console.log('Received titles:', this.titulos);
    },
    (error: any) => {
      console.error('Error fetching titles:', error);
    }
  );

  }
  trackById(index: number, item: TituloListar): string {
    return item.id;
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR'); 
  }
  
  getTotal(): number {
    return this.titulos.reduce((total, titulo) => total + (titulo.value - titulo.discount), 0);
  }

  deletar(id: string | undefined) {
    if (!id) {
      console.error("Erro: ID inválido para exclusão.");
      return;
    }
    
    console.log("ID para exclusão:", id); // Verifique no console se o ID está correto
    
    this.servicePortal.DeletarTitulo(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error("Erro ao deletar título:", err);
      }
    });
  }

  criarTitulo() {
    if (this.tituloForm.invalid) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    this.servicePortal.criarTitulo(this.tituloForm.value).subscribe({
      next: (res) => {
        alert("Título criado com sucesso!");
        this.tituloForm.reset();
        window.location.reload()
        // this.trackById(); // Recarrega a lista
      },
      error: (err) => {
        console.error("Erro ao criar título:", err);
        alert("Erro ao criar título.");
      }
    });
  }
   navegarParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
}