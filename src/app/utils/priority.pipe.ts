import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../data';

@Pipe({name: 'priority'})
export class PriorityPipe implements PipeTransform {
  transform(priority: number): string {
      return TaskPriority[priority];
  }
}
