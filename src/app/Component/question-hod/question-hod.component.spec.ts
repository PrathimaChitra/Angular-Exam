import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHodComponent } from './question-hod.component';

describe('QuestionHodComponent', () => {
  let component: QuestionHodComponent;
  let fixture: ComponentFixture<QuestionHodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionHodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
