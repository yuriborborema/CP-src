import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpComponent } from './logp.component';

describe('LogpComponent', () => {
  let component: LogpComponent;
  let fixture: ComponentFixture<LogpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
