import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/redux-store/store";
import {
  initialState as userInit,
  fetchUserDetails,
} from "@/redux-store/slices/userSlice";
import {
  initialState as projectInit,
  fetchProjects,
} from "@/redux-store/slices/projectSlice";

describe("Redux store", () => {
  it("has correct initial state for userState", () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState().userState).toEqual({ ...userInit });
  });

  it("has correct initial state for projectInfo", () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState().projectsInfo).toEqual({ ...projectInit });
  });

  it("updates userState correctly on fullfilled", () => {
    const store = configureStore({ reducer: rootReducer });
    const mockPayload = {
      _id: "123",
      user: "testUser",
    };

    store.dispatch(fetchUserDetails.fulfilled(mockPayload));

    expect(store.getState().userState).toEqual({
      isLogged: true,
      userId: "123",
      user: mockPayload,
      status: "succeeded",
      error: null,
    });
  });

  it('updates userState correctly on pending', () => {
    const store = configureStore({ reducer: rootReducer });

    store.dispatch(fetchUserDetails.pending());

    expect(store.getState().userState).toEqual({
      isLogged: false,
      userId: null,
      user: null,
      status: 'loading',
      error: null,
    });
  });

  it('updates userState correctly on rejected', () => {
    const store = configureStore({ reducer: rootReducer });
    const mockError = 'Error fetching user details';

    store.dispatch(fetchUserDetails.rejected(new Error(mockError)));

    expect(store.getState().userState).toEqual({
      isLogged: false,
      userId: null,
      user: null,
      status: 'failed',
      error: mockError,
    });
  });

  it("updates projectsInfo correctly on fullfilled", () => {
    const store = configureStore({ reducer: rootReducer });
    const mockPayload = {
      data: ["123", "456", "789"],
    };

    store.dispatch(fetchProjects.fulfilled(mockPayload));

    expect(store.getState().projectsInfo).toEqual({
      projects: mockPayload.data,
      status: "succeeded",
      error: null,
    });
  });

  it('updates projectsInfo correctly on pending', () => {
    const store = configureStore({ reducer: rootReducer });

    store.dispatch(fetchProjects.pending());

    expect(store.getState().projectsInfo).toEqual({
      projects: null,
      status: 'loading',
      error: null,
    });
  });

  it('updates projectsInfo correctly on rejected', () => {
    const store = configureStore({ reducer: rootReducer });
    const mockError = 'Error fetching projects';

    store.dispatch(fetchProjects.rejected(new Error(mockError)));

    expect(store.getState().projectsInfo).toEqual({
      projects: null,
      status: 'failed',
      error: mockError,
    });
  });
});
