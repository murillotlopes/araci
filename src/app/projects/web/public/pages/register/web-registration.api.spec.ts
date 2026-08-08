import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WEB_API_URL } from '../../../../../core/http/api-url.token';
import { WebRegistrationApi } from './web-registration.api';

describe('WebRegistrationApi', () => {
  let api: WebRegistrationApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: WEB_API_URL, useValue: 'http://localhost:4000/web' },
      ],
    });

    api = TestBed.inject(WebRegistrationApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('registers a user using the documented web endpoint and contract', () => {
    const input = { email: 'user@example.com', password: 'secret' };

    api.register(input).subscribe((response) => expect(response).toBeNull());

    const request = http.expectOne('http://localhost:4000/web/user/register');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(input);
    request.flush(null);
  });
});
