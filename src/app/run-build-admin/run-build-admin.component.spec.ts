import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunBuildAdminComponent } from './run-build-admin.component';

describe('RunBuildAdminComponent', () => {
  let component: RunBuildAdminComponent;
  let fixture: ComponentFixture<RunBuildAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunBuildAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunBuildAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
