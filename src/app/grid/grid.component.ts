import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.scss']
})
export class GridComponent {
    itemsList = [];
    start = 0;
    limit = 30;
    loading = false;
    constructor(
        private api: ApiService
    ) {
        this.lazyLoadItems();
    }

    onScroll($event) {
        if (this.loading) {
            return false;
        }
        const target = $event.target;
        if (target.scrollHeight <= target.offsetHeight + target.scrollTop) {
            this.lazyLoadItems();
        }
    }
    isImageValid(img: string) {
        return new Promise((resolve, reject) => {
            const a = new Image();
            a.onload = () => {
                resolve(img);
            };
            a.onerror = () => {
                reject(img);
            };
            a.src = img;
        });
    }
    lazyLoadItems() {
        this.loading = true;
        this.api.getList(this.start, this.limit).subscribe(async (data: Array<any>) => {
            data.forEach((x) => {
                this.isImageValid(x.di_image).then(() => {
                    this.start++;
                    this.itemsList.push(x);
                }).catch();
            });
            this.loading = false;
        }, (err) => {
            this.loading = false;
        });
    }
}
