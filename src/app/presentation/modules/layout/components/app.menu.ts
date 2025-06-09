import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Store } from '@ngrx/store';
import { selectAuthPermissions } from '@/store/selectors/auth.selectors';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <div class="layout-menuitem-root-text">
            <span>{{companyName}}</span>
        </div>
        <ul class="layout-menu" #menuContainer>
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator">
                    <span>{{item.label}}</span>
                </li>
            </ng-container>
        </ul>
    `
})
export class AppMenu implements OnInit {
    el: ElementRef = inject(ElementRef);
    private store = inject(Store);
    @ViewChild('menuContainer') menuContainer!: ElementRef;
    model: MenuItem[] = [];
    companyName: string = '';

    ngOnInit(): void {
        this.store.select(selectAuthPermissions).subscribe((permissions) => {
            console.log(" STORE ",permissions);
            this.model = permissions.menuItems;
        });
    }
}


