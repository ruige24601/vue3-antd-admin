import Mock from 'mockjs2'

const login = options => {
  return {
    result: {
      id: 1,
      isDel: 0,
      createdAt: '2020-11-02T15:16:08.888Z',
      updatedAt: '2020-11-02T15:16:08.888Z',
      username: 'admin',
      platform: null,
      isSuper: 1,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlzU3VwZXIiOjEsImlhdCI6MTYxMDg1MzYwMSwiZXhwIjoxNjExNDU4NDAxfQ.JC-EH9TDNqHUmxX7jDsUK5bAdF8HAf9ndSRqUbUw9eI',
      IP: '127.0.0.1',
    },
    code: 0,
    message: '请求成功',
  }
}
Mock.mock(/\/admin\/login/, 'post', login)
