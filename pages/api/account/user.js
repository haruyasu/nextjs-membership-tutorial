import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const access = cookies.access ?? false

    if (access === false) {
      return res.status(401).json({
        error: 'アクセストークンがありません',
      })
    }

    try {
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      const data = await apiRes.json()

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data.user,
        })
      } else {
        return res.status(apiRes.status).json({
          error: 'ユーザー情報取得に失敗しました',
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: 'ユーザー情報取得に失敗しました',
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    })
  }
}
