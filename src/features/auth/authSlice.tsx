import { User } from '@models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/app/store';
import * as SecureStore from 'expo-secure-store';
import axios, { setTokenInAxiosHeaders } from 'src/app/axios';

// SECURE STORE TOKEN HANDLING

const saveToken = async (token: string) => {
  await SecureStore.setItemAsync('token', token);
};

const getToken = async () => {
  return await SecureStore.getItemAsync('token');
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync('token');
};

export interface AuthState {
  /** Auth status explanation
   * - idle: initial state
   * - loading: fetching data
   * - success: endpoint call succeeded and returned data
   * - failure: endpoint call failed
   *  */

  isSignedIn: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'success' | 'failure';
}

// PAYLOAD TYPES
type SignInPayloadType = {
  email: string;
  password: string;
};

type SignUpPayloadType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
  status: 'idle',
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type SignupResponse = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  isActive: boolean;
  password: string;
  role: string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    idle: (state: AuthState) => {
      state.status = 'idle';
    },
    request: (state: AuthState) => {
      state.status = 'loading';
    },
    signupSuccess: (state: AuthState) => {
      state.status = 'success';
    },
    signinSuccess: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isSignedIn = true;
      state.status = 'success';
    },
    signoutSuccess: (state: AuthState) => {
      state.user = null;
      state.isSignedIn = false;
      state.status = 'success';
    },
    failure: (state: AuthState) => {
      state.user = null;
      state.isSignedIn = false;
      state.status = 'failure';
    },
  },
});

export const signIn = (payload: SignInPayloadType) => async (dispatch: AppDispatch) => {
  // set the status to loading
  dispatch(authSlice.actions.request());
  try {
    const response = await axios.post<AuthResponse>('/auth/login', payload);
    const user = response.data.user;
    const token = response.data.token;
    console.log('login response for testing:', response.data);
    if (user && token) {
      // save the token to secure store
      await saveToken(token);
      setTokenInAxiosHeaders(token);
      // set the user in the store
      dispatch(authSlice.actions.signinSuccess(user));
    } else {
      dispatch(authSlice.actions.failure());
      throw new Error('Invalid response from server while authenticating user');
    }
  } catch (error: any) {
    dispatch(authSlice.actions.failure());
    return {
      type: 'error',
      statusCode: error.response.data.statusCode,
      message: 'Invalid response from server',
    };
  } finally {
    dispatch(authSlice.actions.idle());
  }
};

export const signUp = (payload: SignUpPayloadType) => async (dispatch: AppDispatch) => {
  // set the status to loading
  dispatch(authSlice.actions.request());
  try {
    const response = await axios.post<SignupResponse>('/auth/signup', payload);
    const user = response.data.id;
    if (user) {
      dispatch(authSlice.actions.signupSuccess());
      return response.data;
    } else {
      dispatch(authSlice.actions.failure());
      throw new Error('Invalid response from server while creating user');
    }
  } catch (error) {
    console.log(error);
    dispatch(authSlice.actions.failure());
  } finally {
    dispatch(authSlice.actions.idle());
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.request());
  try {
    await deleteToken();
    setTokenInAxiosHeaders('');
    dispatch(authSlice.actions.signoutSuccess());
    const token = await getToken();
    if (token?.length) {
      console.log('Token not deleted');
      dispatch(authSlice.actions.failure());
    }
  } catch (error) {
    console.log(error);
    dispatch(authSlice.actions.failure());
  } finally {
    dispatch(authSlice.actions.idle());
  }
};

export const autoSignIn = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.request());
  setTimeout(async () => {
    try {
      const storedToken = await getToken();
      if (storedToken) {
        const res = await axios.get<AuthResponse>('/auth/verify', {
          headers: { authorization: storedToken },
        });
        const { user, token } = res.data;
        if (user && token) {
          await saveToken(token);
          setTokenInAxiosHeaders(token);
          dispatch(authSlice.actions.signinSuccess(user));
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        throw new Error('No token found');
      }
    } catch (error) {
      console.log(error);
      dispatch(authSlice.actions.failure());
    } finally {
      dispatch(authSlice.actions.idle());
    }
  }, 2000);
};

export const { idle, request, signupSuccess, signinSuccess, signoutSuccess, failure } = authSlice.actions;

export default authSlice.reducer;
