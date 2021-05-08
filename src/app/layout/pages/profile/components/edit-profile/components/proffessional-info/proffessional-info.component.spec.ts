import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffessionalInfoComponent } from './proffessional-info.component';

describe('ProffessionalInfoComponent', () => {
  let component: ProffessionalInfoComponent;
  let fixture: ComponentFixture<ProffessionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProffessionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProffessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
