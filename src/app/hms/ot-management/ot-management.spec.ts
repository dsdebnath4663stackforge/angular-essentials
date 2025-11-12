import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtManagement } from './ot-management';

describe('OtManagement', () => {
  let component: OtManagement;
  let fixture: ComponentFixture<OtManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
