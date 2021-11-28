import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMovies'
})
export class FilterMoviesPipe implements PipeTransform {

  transform(value: any, filterString :string)  {
  if(filterString == '' || filterString ==undefined){
    return value;
  }
    return value.filter((serchBy : any)=>{
      return serchBy.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1;
    })

  }

}
