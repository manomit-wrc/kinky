import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchaccountComponent } from './switchaccount.component';

describe('SwitchaccountComponent', () => {
  let component: SwitchaccountComponent;
  let fixture: ComponentFixture<SwitchaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
