import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloListar } from '../../models/Titulo';
import { Router } from '@angular/router';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-dashboard',
 standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  titulos: TituloListar[] = [];
  titulosAll: TituloListar[] = [];

  constructor(private servicePortal: PortalService, private cdr: ChangeDetectorRef, private router: Router) {}
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
}
