import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionMessageComponent } from './introduction-message.component';

describe('IntroductionMessageComponent', () => {
  let component: IntroductionMessageComponent;
  let fixture: ComponentFixture<IntroductionMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
