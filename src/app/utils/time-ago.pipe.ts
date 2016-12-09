import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: number): string {
    return moment.unix(timestamp).fromNow();
  }
}
