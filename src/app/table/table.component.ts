import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    itemsList = [];
    start = 0;
    limit = 30;
    loading = false;
    constructor(
        private api: ApiService
    ) {
        this.loadAllItems();
    }
    getDuplicatedName(title: string) {
        let exists = false;
        let count = -1;
        let name;
        do {
            count++;
            name = `${title}${count ? ' ' + count : ''}`;
            exists = this.itemsList.find(x => x.title === name);
        } while (exists);
        return count ? `${title} ${count}` : title;
    }
    loadAllItems() {
        this.loading = true;
        this.api.getList(this.start, this.limit).subscribe((data: Array<any>) => {
            data.forEach((x) => {
                x.title = this.getDuplicatedName(x.title);
                this.itemsList.push(x);
            });
            this.loading = false;
        }, (err) => {
            this.loading = false;
        });
    }
    onScroll($event) {
        if (this.loading) {
            return false;
        }
        const target = $event.target;
        if (target.scrollHeight <= target.offsetHeight + target.scrollTop) {
            this.loadAllItems();
        }
    }
}
