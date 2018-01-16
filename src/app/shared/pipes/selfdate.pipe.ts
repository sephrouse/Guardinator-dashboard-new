import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'selfdate' })
export class SelfdatePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        let formatStr = args[0];
        return moment(value).format(formatStr);
    }
}
