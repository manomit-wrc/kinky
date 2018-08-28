import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProtectionComponent } from './profile-protection.component';

describe('ProfileProtectionComponent', () => {
  let component: ProfileProtectionComponent;
  let fixture: ComponentFixture<ProfileProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
