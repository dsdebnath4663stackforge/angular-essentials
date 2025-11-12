import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacAudit } from './rbac-audit';

describe('RbacAudit', () => {
  let component: RbacAudit;
  let fixture: ComponentFixture<RbacAudit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacAudit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacAudit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
