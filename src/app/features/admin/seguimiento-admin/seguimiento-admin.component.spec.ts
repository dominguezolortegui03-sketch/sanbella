import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAdminComponent } from './seguimiento-admin.component';

describe('SeguimientoAdminComponent', () => {
  let component: SeguimientoAdminComponent;
  let fixture: ComponentFixture<SeguimientoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
