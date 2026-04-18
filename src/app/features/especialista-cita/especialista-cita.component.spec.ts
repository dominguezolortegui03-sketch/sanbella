import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaCitaComponent } from './especialista-cita.component';

describe('EspecialistaCitaComponent', () => {
  let component: EspecialistaCitaComponent;
  let fixture: ComponentFixture<EspecialistaCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialistaCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
