import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'humanFileSize'})
export class HumanFileSizePipe implements PipeTransform {
  transform(size: number,): string {
    var thresh = 1024;
    if(Math.abs(size) < thresh) {
        return size + ' B';
    }
    var units = ['kB','MB','GB','TB','PB','EB','ZB','YB']
    var u = -1;
    do {
        size /= thresh;
        ++u;
    } while(Math.abs(size) >= thresh && u < units.length - 1);
    return size.toFixed(1)+' '+units[u];
  }
}
