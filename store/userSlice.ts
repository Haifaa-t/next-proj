import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: {
    email: string
    firstName?: string
    lastName?: string
    profilePicture?: string
  }
}

const initialState: UserState = {
  user: {
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      
      if (!state.user) {
        state.user = {
          email: '',
          firstName: '',
          lastName: '',
          profilePicture: ''
        }
      }
      state.user.email = action.payload.email
    },

    logout: (state) => {
      
      if (state.user) {
        state.user.email = ''
      }
    },

    updateProfile: (
      state,
      action: PayloadAction<{
        firstName: string
        lastName: string
        profilePicture: string
      }>
    ) => {
      
      if (!state.user) {
        state.user = {
          email: '',
          firstName: '',
          lastName: '',
          profilePicture: ''
        }
      }
      state.user.firstName = action.payload.firstName
      state.user.lastName = action.payload.lastName
      state.user.profilePicture = action.payload.profilePicture
    }
  }
})

export const { login, logout, updateProfile } = userSlice.actions
export default userSlice.reducer
