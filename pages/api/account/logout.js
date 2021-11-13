import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('access', '', {
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
        path: '/',
        expires: new Date(0),
      }),
      cookie.serialize('refresh', '', {
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
        path: '/',
        expires: new Date(0),
      }),
    ])

    return res.status(200).json({
      success: 'ログアウトに成功しました',
    })
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    })
  }
}
