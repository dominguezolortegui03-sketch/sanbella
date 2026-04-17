import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimintoAdminComponent } from './seguiminto-admin.component';

describe('SeguimintoAdminComponent', () => {
  let component: SeguimintoAdminComponent;
  let fixture: ComponentFixture<SeguimintoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimintoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimintoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
