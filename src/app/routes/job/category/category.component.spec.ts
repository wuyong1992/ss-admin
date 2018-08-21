import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCategoryComponent } from './category.component';

describe('JobCategoryComponent', () => {
  let component: JobCategoryComponent;
  let fixture: ComponentFixture<JobCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
