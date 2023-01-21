import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], filterPost: string){
    if(filterPost === '' || filterPost === undefined) {
      return value;
    }
    return value.filter(getAllPersonas => getAllPersonas.nombre.toLowerCase().indexOf(filterPost) != -1)
  }
   
}
