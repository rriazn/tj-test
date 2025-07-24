import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteCompetitionComponent } from './execute-competition.component';

describe('ExecuteCompetitionComponent', () => {
  let component: ExecuteCompetitionComponent;
  let fixture: ComponentFixture<ExecuteCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecuteCompetitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
