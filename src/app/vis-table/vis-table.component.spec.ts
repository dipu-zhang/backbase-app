import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisTableComponent } from './vis-table.component';

describe('VisTableComponent', () => {
  let component: VisTableComponent;
  let fixture: ComponentFixture<VisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
