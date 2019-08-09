import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [HttpClientModule],
      providers: [TodoService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of todos', () => {
    const service: TodoService = TestBed.get(TodoService);
    const mockTodos: Todo[] = [
      { id: 1, userId: 1, title: 'MockTitle 1', completed: true },
      { id: 2, userId: 2, title: 'MockTitle 2', completed: false },
      { id: 3, userId: 3, title: 'MockTitle 3', completed: false }
    ];

    spyOn(service, 'getTodos').and.returnValue(of(mockTodos));
    component.ngOnInit();
    fixture.detectChanges();
    const allAHrefElements = fixture.debugElement.queryAll(By.css('a'));
    expect(allAHrefElements.length).toBe(mockTodos.length);

    const spy = spyOn(component, 'clickOnTodo');
    const todo2Test = 1;
    allAHrefElements[todo2Test].nativeElement.click();
    expect(spy).toHaveBeenCalledWith(mockTodos[todo2Test]);
  });
});
