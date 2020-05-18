import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert encodeURI
 */
@Pipe({
  name: 'EncodeURI'
})
export class EncodeURIPipe implements PipeTransform {
  
  transform(value: string): string {
    return encodeURI(value);
  }

}
