import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActiveGroupComponent } from './admin-active-group.component';

describe('AdminActiveGroupComponent', () => {
  let component: AdminActiveGroupComponent;
  let fixture: ComponentFixture<AdminActiveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActiveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActiveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
