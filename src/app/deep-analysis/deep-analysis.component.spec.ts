import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepAnalysisComponent } from './deep-analysis.component';

describe('DeepAnalysisComponent', () => {
  let component: DeepAnalysisComponent;
  let fixture: ComponentFixture<DeepAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
