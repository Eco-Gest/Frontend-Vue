import { setActivePinia, createPinia } from "pinia";
import {
  vi,
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import { useAuthStore } from "../store/auth";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;


describe("useAuthStore", () => {
  let store: ReturnType<typeof useAuthStore>;
  let postMock: vi.MockInstance;

  // initialise store
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthStore();
    postMock = vi.fn().mockResolvedValue({ data: { access_token: 'test_token' } });
    $axios.post = postMock;
  });

  // reset store after each test
  afterEach(() => {
    store.$reset();
    postMock.mockReset();
  });

  test("references a store", () => {
    expect(store).toBeDefined();
  });

  test("no user loggedin on innit", () => {
    expect(store.$state.isLoggedIn).toStrictEqual(false);
  });

  test("logs in successfully", async () => {
    vi.mocked($axios.post).mockResolvedValueOnce({ data: { access_token: 'test_token' } });
    await store.login({ email: 'test@test.com', password: 'test' });
    expect(store.$state.isLoggedIn).toBe(true);
    expect(store.$state.access_token).toBe('test_token');
  });

  test("fails to log in", async () => {
    vi.mocked($axios.post).mockImplementationOnce(() => {
      return Promise.reject(new Error('Failed to log in'));
    });
    try {
      await store.login({ email: 'test@test.com', password: 'test' });
    } catch (error) {
      // Handle the error
    }
    expect(store.$state.isLoggedIn).toBe(false);
    });

  test("logs out", () => {
    store.$state.isLoggedIn = true;
    store.logout();
    expect(store.$state.isLoggedIn).toBe(false);
  });

  test("registers successfully", async () => {
    const registerData = { email: 'test@test.com', password: 'test', username: 'testuser' };
    vi.mocked($axios.post).mockResolvedValueOnce({});
    await store.register(registerData);
    expect(postMock).toHaveBeenCalledWith('/register', registerData);
  });
  
  test("fails to register", async () => {
    const registerData = { email: 'test@test.com', password: 'test', username: 'testuser' };
    vi.mocked($axios.post).mockRejectedValueOnce(new Error('Failed to register'));
    await expect(store.register(registerData)).rejects.toThrow('Failed to register');
  });

  test("resets state", () => {
    store.$state.isLoggedIn = true;
    store.$state.access_token = 'test_token';
    store.resetState();
    expect(store.$state.isLoggedIn).toBe(false);
    expect(store.$state.access_token).toBe('');
  });


});