import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTestsAdminComponent } from './all-tests-admin.component';

describe('AllTestsAdminComponent', () => {
  let component: AllTestsAdminComponent;
  let fixture: ComponentFixture<AllTestsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTestsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
