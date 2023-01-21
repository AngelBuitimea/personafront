import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { PersonaService } from 'src/app/services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  personaForm: FormGroup;
  show=true;
  personas: any;
  filterPost:string;
  filterApellido:string;
  filterGenero:string;
  value:string="";

  constructor(
    public fb: FormBuilder,
    public personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
    });;
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );
  }
  deletModal(persona) {
    Swal.fire({
      title: '¿ELIMINAR?',
      text: "¿Está seguro de que desea eliminar a esta persona?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.eliminar(persona);
        Swal.fire(
          
          'Eliminado!',
          'Se ha eliminado satisfactoriamente.',
          'success'
        )
        
      }
    })
  }

  confirmModal() {
    Swal.fire({
      title: '¿GUARDAR?',
      text: "¿Está seguro de que desea guardar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardar();
        Swal.fire(
          'Guardado!',
          'Se ha guardado satisfactoriamente.',
          'success'
        )
        
      }
    })
  }

  mostrar() {
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );
  }

  

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personas = this.personas.filter(persona => resp.id !== persona.id);
      this.personas.push(resp);
      this.mostrar();
    },

      error => { console.error(error) }

    )
  }
  eliminar(persona) {
    this.personaService.deletePersona(persona.id).subscribe(resp => {
      this.mostrar();
      if (resp === true) {
        this.personas.pop()
      }
    })
  }
  editar(persona) {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      genero: persona.genero,
    })
  }
  agregar(){
    this.personaForm.reset();
  }

}
