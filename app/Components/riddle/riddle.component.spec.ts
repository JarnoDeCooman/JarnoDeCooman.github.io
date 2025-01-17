import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiddleComponent } from './riddle.component';

describe('RiddleComponent', () => {
  let component: RiddleComponent;
  let fixture: ComponentFixture<RiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiddleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
