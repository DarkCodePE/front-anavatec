import {Pipe, PipeTransform} from "@angular/core";

@Pipe({

    name: 'namInit'

})

export class NamInitPipe implements PipeTransform {
    transform(value:string): string {

        if (!value){

            return "";

        }

        const names:string[] = value.split(" ");

        if (names.length > 1){

            return names[0].charAt(0) + names[1].charAt(0);

        }else if ( names[0].length>=2){

            return names[0].substr(0,2).toUpperCase();

        }else{

            return '';

        }

    }




}