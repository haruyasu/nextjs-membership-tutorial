import {
  // ユーザー登録
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  // ログイン
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  // ユーザー情報取得
  USER_SUCCESS,
  USER_FAIL,

  // リフレッシュトークン
  REFRESH_SUCCESS,
  REFRESH_FAIL,

  // 認証チェック
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,

  // ログアウト
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  // チェックアウト完了
  CREATE_CHECKOUT_SUCCESS,
  CREATE_CHECKOUT_FAIL,

  // チェックアウト詳細
  DETAIL_CHECKOUT_SUCCESS,
  DETAIL_CHECKOUT_FAIL,

  // 読み込み中
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from '../actions/types'

const initialState = {
  user: null,
  isAuthenticated: null,
  loading: false,
  checkout_url: null,
  checkout_detail: null,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    // ユーザー登録
    case REGISTER_SUCCESS:
      return {
        ...state,
      }
    case REGISTER_FAIL:
      return {
        ...state,
      }

    // ログイン
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      }

    // ユーザー情報取得
    case USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      }
    case USER_FAIL:
      return {
        ...state,
        user: null,
      }

    // リフレッシュトークン
    case REFRESH_SUCCESS:
      return {
        ...state,
      }
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    // 認証チェック
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    // ログアウト
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case LOGOUT_FAIL:
      return {
        ...state,
      }

    // チェックアウト完了
    case CREATE_CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout_url: payload,
      }
    case CREATE_CHECKOUT_FAIL:
      return {
        ...state,
      }

    // チェックアウト詳細
    case DETAIL_CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout_detail: payload,
      }
    case DETAIL_CHECKOUT_FAIL:
      return {
        ...state,
      }

    // 読み込み中
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default authReducer
