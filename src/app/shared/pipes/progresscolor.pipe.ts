import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'progresscolor' })
export class ProgresscolorPipe implements PipeTransform {
    transform(value) {
        if(value < 30){
            return 'red'
        }else if( value < 60){
            return 'orange'
        }else if( value < 85){
            return 'yellow'
        }else{
            return 'blue'
        }
    }
}
