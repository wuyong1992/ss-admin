import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCategoryEditComponent } from './edit.component';

describe('JobCategoryEditComponent', () => {
  let component: JobCategoryEditComponent;
  let fixture: ComponentFixture<JobCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
