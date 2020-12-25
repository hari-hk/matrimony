import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-auto-complete',
    templateUrl: 'auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})

export class AutoCompleteComponent implements OnInit {
    list = [];
    debounceTimer: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.list = this.data.list;
    }
    filterData(ev): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.list = ev?.target?.value ?
                this.data.list.filter(el => el.name.toLowerCase().includes(ev.target.value.toLowerCase()))
                : this.data.list;
        }, 700);
    }
}
