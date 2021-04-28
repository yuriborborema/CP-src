import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadProdDepComponent } from './cad-prod-dep.component';

describe('CadProdDepComponent', () => {
  let component: CadProdDepComponent;
  let fixture: ComponentFixture<CadProdDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadProdDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadProdDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
