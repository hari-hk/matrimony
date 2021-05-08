import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerProfileComponent } from './edit-partner-profile.component';

describe('EditPartnerProfileComponent', () => {
  let component: EditPartnerProfileComponent;
  let fixture: ComponentFixture<EditPartnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
