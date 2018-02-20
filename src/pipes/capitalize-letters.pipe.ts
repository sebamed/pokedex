import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeLetters'
})
export class CapitalizeLettersPipe implements PipeTransform {
    transform(value: string, args: any[]): string {
        if (!args) return value.charAt(0).toUpperCase() + value.slice(1);
        if (args.length < 2) return value.charAt(0).toUpperCase() + value.slice(1);
        if (value === null) return 'Not assigned';
        console.log(args[0] + args[1]);
        return value.substr(0, args[0]) + value.substr(args[0], args[1]).toUpperCase() + value.substr(args[1], value.length);
    }
}