import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListEditComponent } from './edit.component';

describe('JobListEditComponent', () => {
  let component: JobListEditComponent;
  let fixture: ComponentFixture<JobListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
