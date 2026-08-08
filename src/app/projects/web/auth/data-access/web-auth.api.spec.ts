import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WEB_API_URL } from '../../../../core/http/api-url.token';
import { WebAuthApi } from './web-auth.api';

describe('WebAuthApi', () => {
  let api: WebAuthApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: WEB_API_URL, useValue: 'http://localhost:4000/web' },
      ],
    });

    api = TestBed.inject(WebAuthApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('signs in using the documented web endpoint and contract', () => {
    const input = { email: 'user@example.com', password: 'secret' };
    const output = { accessToken: 'token', expiresIn: 3600, authType: 'Bearer' };

    api.signIn(input).subscribe((response) => expect(response).toEqual(output));

    const request = http.expectOne('http://localhost:4000/web/auth/signin');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(input);
    request.flush(output);
  });
});
