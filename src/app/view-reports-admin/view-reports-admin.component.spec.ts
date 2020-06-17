import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportsAdminComponent } from './view-reports-admin.component';

describe('ViewReportsAdminComponent', () => {
  let component: ViewReportsAdminComponent;
  let fixture: ComponentFixture<ViewReportsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
