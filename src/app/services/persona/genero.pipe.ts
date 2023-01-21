import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: any[], filterGenero: string){
    if(filterGenero === '' || filterGenero === undefined) {
      return value;
    }
    return value.filter(getAllPersonas => getAllPersonas.genero.toLowerCase().indexOf(filterGenero) != -1)
  }
   
}
