import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-auto-complete',
    templateUrl: 'auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutoCompleteComponent implements OnInit, AfterViewInit {
    list = [];
    debounceTimer: any;

    @ViewChild('search') private search: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.list = this.data.multiple ? this.data.list.map(el => { el.selected = false; return el; }) : this.data.list;
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
            this.cdr.detectChanges();
        }, 700);
    }

    selectItem(id, idx): void {
        if (this.data.multiple) {
            this.list[idx].selected = !this.list[idx].selected;
        } else {
            this.closeDialog(id);
        }
    }

    submitSelected(): void {
        const ids = this.data.list.filter(el => el.selected).map(el => el.id);
        this.closeDialog(ids);
    }

    closeDialog(data): void {
        this.dialogRef.close(data);
    }

    public trackByFn(index, item) {
        if (!item) return null;
        return item.id;
    }
}
