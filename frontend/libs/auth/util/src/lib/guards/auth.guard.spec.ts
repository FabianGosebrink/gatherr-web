import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockClass } from 'tools/testing/mock-class';
import { AuthBaseService } from '../auth-base.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [mockClass(AuthBaseService, ['isLoggedIn'])],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });
});
