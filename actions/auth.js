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
} from './types'

// ユーザー登録
export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const body = JSON.stringify({
    name,
    email,
    password,
  })

  try {
    const res = await fetch('/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (res.status === 200) {
      dispatch({
        type: REGISTER_SUCCESS,
      })
    } else {
      dispatch({
        type: REGISTER_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// ログイン
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const body = JSON.stringify({
    email,
    password,
  })

  try {
    const res = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      })
      dispatch(user())
    } else {
      dispatch({
        type: LOGIN_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// ユーザー情報取得
export const user = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/user', {
      method: 'GET',
    })

    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: USER_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: USER_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// リフレッシュトークン
export const refresh = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/refresh', {
      method: 'GET',
    })

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      })
      dispatch(verify())
    } else {
      dispatch({
        type: REFRESH_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// 認証チェック
export const verify = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/verify', {
      method: 'GET',
    })

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      })
      dispatch(user())
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// ログアウト
export const logout = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  try {
    const res = await fetch('/api/account/logout', {
      method: 'POST',
    })

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// チェックアウト
export const create_checkout = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const body = JSON.stringify({
    email,
  })

  try {
    const res = await fetch('/api/account/create_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: CREATE_CHECKOUT_SUCCESS,
        payload: data.url,
      })
      dispatch(verify())
    } else {
      dispatch({
        type: CREATE_CHECKOUT_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: CREATE_CHECKOUT_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

// チェックアウト詳細
export const detail_checkout = (session_id) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  })

  const body = JSON.stringify({
    session_id,
  })

  try {
    const res = await fetch('/api/account/detail_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: DETAIL_CHECKOUT_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: DETAIL_CHECKOUT_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: DETAIL_CHECKOUT_FAIL,
    })
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}
