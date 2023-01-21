import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apellido'
})
export class ApellidoPipe implements PipeTransform {

  transform(value: any[], filterApellido: string){
    if(filterApellido === '' || filterApellido === undefined) {
      return value;
    }
    return value.filter(getAllPersonas => getAllPersonas.apellido.toLowerCase().indexOf(filterApellido) != -1)
  }
   
}
