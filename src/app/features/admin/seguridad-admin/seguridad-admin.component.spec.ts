import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadAdminComponent } from './seguridad-admin.component';

describe('SeguridadAdminComponent', () => {
  let component: SeguridadAdminComponent;
  let fixture: ComponentFixture<SeguridadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguridadAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguridadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
