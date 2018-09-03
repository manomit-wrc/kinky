import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLatestProfileComponent } from './my-latest-profile.component';

describe('MyLatestProfileComponent', () => {
  let component: MyLatestProfileComponent;
  let fixture: ComponentFixture<MyLatestProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLatestProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLatestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
