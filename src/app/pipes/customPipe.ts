import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'Sidefilter',
    pure: false
})
export class CustomFilterPipe implements PipeTransform{
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.Side==filter.Side);
        // return items.filter(item => item.Side.indexOf(filter.Side) !== -1);
    }
}