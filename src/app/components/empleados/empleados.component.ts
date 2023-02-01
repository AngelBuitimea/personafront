import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,ReactiveFormsModule} from '@angular/forms';
import { PersonaList, PersonaService } from 'src/app/services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  listaPersonas: any = [];
  personaList: PersonaList = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
      apellidoMaterno: '',
      puesto: '',
      rfc: '',
      direccion:'',
      correoElectronico: '',
      cuentaGithub: '',
      estado: '',
      ciudad: '',
      numero1: '',
      numero2: '',
      genero: '',
      password: '',
      rol: '',
  };

  personaForm: FormGroup;
  show=true;
  personas: any;
  filterPost:string;
  filterApellido:string;
  filterGenero:string;
  value:string="";
  edit=false;
  userRol:string;

  constructor(
    public reactiveFormsModule:ReactiveFormsModule,
    public fb: FormBuilder,
    public personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      puesto: ['', Validators.required],
      rfc: ['', Validators.required],
      direccion: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      cuentaGithub: ['', Validators.required],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      numero1: ['', Validators.required],
      numero2: ['', Validators.required],
      genero: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
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
        this.validar();
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
    this.edit=true;
    console.log(this.edit);

    this.personaList.id=persona.id;
    console.log(this.personaList.id);

    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellidoPaterno: persona.apellidopaterno,
      apellidoMaterno: persona.apellidomaterno,
      puesto: persona.puesto,
      rfc: persona.rfc,
      direccion:persona.direccion,
      correoElectronico: persona.correoelectronico,
      cuentaGithub: persona.cuentagithub,
      estado: persona.estado,
      ciudad: persona.ciudad,
      numero1: persona.numero1,
      numero2: persona.numero2,
      genero: persona.genero,
      password: persona.password,
      rol: persona.rol
    })
  }
  editPersona(): void {
    this.personaService.editPersona(this.personaList.id,this.personaForm.value).subscribe(resp => { 
      this.personaForm.reset();
      this.mostrar();
      console.log(resp);
    },
    err => console.error(err)
  )
  }
  validar(){
    if(this.edit==true){
      this.editPersona();
    }else{
      this.guardar();
    }
  }
  
  agregar(){
    this.edit=false;
    console.log(this.edit);
    this.personaForm.reset();
  }

  rol(){
    if(this.userRol='Super Administrador'){

    }if(this.userRol='Administrador'){
      
    }if(this.userRol='Empleado'){

    }
  }
}
