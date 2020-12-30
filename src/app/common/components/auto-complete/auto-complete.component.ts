import { AfterViewInit, ElementRef } from '@angular/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-auto-complete',
    templateUrl: 'auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})

export class AutoCompleteComponent implements OnInit, AfterViewInit {
    list = [];
    debounceTimer: any;

    @ViewChild('search') private search: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>) { }

    ngOnInit(): void {
        this.list = this.data.list;
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.search.nativeElement.focus();
        }, 200);
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
    closeDialog(data): void {
        this.dialogRef.close(data);
    }
}
