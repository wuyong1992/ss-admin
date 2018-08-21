import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCategoryViewComponent } from './view.component';

describe('JobCategoryViewComponent', () => {
  let component: JobCategoryViewComponent;
  let fixture: ComponentFixture<JobCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
