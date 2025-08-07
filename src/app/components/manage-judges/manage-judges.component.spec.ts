import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJudgesComponent } from './manage-judges.component';

describe('ManageJudgesComponent', () => {
  let component: ManageJudgesComponent;
  let fixture: ComponentFixture<ManageJudgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageJudgesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJudgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
