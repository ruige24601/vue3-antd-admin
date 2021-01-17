import { RequestBody } from '@/types/base'
import Mock from 'mockjs2'
import { builder, getQueryParameters } from './_util'

const totalCount = 5701

const getAdminAccount = options => {
  return {
    result: {
      data: [
        {
          id: 111,
          isDel: 0,
          createdAt: '2021-01-16T06:05:57.401Z',
          updatedAt: '2021-01-16T06:05:57.401Z',
          platform: null,
          isSuper: 0,
          roles: [
            {
              id: 2,
              createdAt: '2020-11-11T14:31:52.024Z',
              updatedAt: '2021-01-15T12:35:40.000Z',
              title: '系统审计员2qqqq',
              description: 'wdf',
            },
            {
              id: 16,
              createdAt: '2020-11-30T08:17:17.918Z',
              updatedAt: '2020-11-30T08:17:17.918Z',
              title: '船长',
              description: '老大',
            },
            {
              id: 19,
              createdAt: '2020-12-04T12:49:08.579Z',
              updatedAt: '2020-12-29T02:45:30.000Z',
              title: '路人王',
              description: '噜噜噜',
            },
          ],
          platformDict: null,
          username: 'hooray',
        },
        {
          id: 110,
          isDel: 0,
          createdAt: '2021-01-15T16:25:43.323Z',
          updatedAt: '2021-01-15T16:25:43.323Z',
          platform: null,
          isSuper: 0,
          roles: [
            {
              id: 3,
              createdAt: '2020-11-11T14:32:40.512Z',
              updatedAt: '2021-01-11T01:57:49.000Z',
              title: '系统管理员',
              description: '系统管理员。',
            },
          ],
          platformDict: null,
          username: 'test',
        },
        {
          id: 108,
          isDel: 0,
          createdAt: '2021-01-15T08:50:25.440Z',
          updatedAt: '2021-01-15T11:36:27.000Z',
          platform: null,
          isSuper: 0,
          roles: [
            {
              id: 20,
              createdAt: '2020-12-06T15:28:09.200Z',
              updatedAt: '2020-12-16T10:20:52.000Z',
              title: 'nami',
              description: '123',
            },
          ],
          platformDict: null,
          username: 'ceshi -',
        },
      ],
      total: 3,
      pageNumber: '1',
      pageSize: '10',
    },
    code: 0,
    message: '请求成功',
  }
}

const getAdminAccess = options => {
  return {
    result: {
      data: [
        {
          id: 66,
          isDel: 0,
          createdAt: '2021-01-13T04:53:08.627Z',
          updatedAt: '2021-01-13T04:53:29.000Z',
          moduleName: '白皮书',
          actionName: '',
          icon: 'icon-zhuxingtu',
          url: '/white',
          moduleId: -1,
          sort: 1,
          keepAlive: 1,
          description: null,
          children: true,
        },
        {
          id: 68,
          isDel: 0,
          createdAt: '2021-01-14T11:11:08.810Z',
          updatedAt: '2021-01-14T11:11:08.810Z',
          moduleName: '新模块',
          actionName: '',
          icon: 'icon-yun',
          url: '/newPage',
          moduleId: -1,
          sort: 1,
          keepAlive: 1,
          description: null,
          children: false,
        },
        {
          id: 69,
          isDel: 0,
          createdAt: '2021-01-15T16:24:37.599Z',
          updatedAt: '2021-01-15T16:24:37.599Z',
          moduleName: 'NBA',
          actionName: '',
          icon: 'icon-BUG',
          url: '/nb',
          moduleId: -1,
          sort: 1,
          keepAlive: 1,
          description: null,
          children: true,
        },
        {
          id: 71,
          isDel: 0,
          createdAt: '2021-01-15T16:54:01.143Z',
          updatedAt: '2021-01-15T16:54:01.143Z',
          moduleName: 'ddds',
          actionName: '',
          icon: 'icon-zhuxingtu',
          url: 'dd',
          moduleId: -1,
          sort: 1,
          keepAlive: 1,
          description: null,
          children: true,
        },
        {
          id: 1,
          isDel: 0,
          createdAt: '2020-11-02T15:16:08.891Z',
          updatedAt: '2021-01-08T06:11:22.000Z',
          moduleName: '系统管理',
          actionName: '',
          icon: 'icon-zhuxingtu',
          url: 'system',
          moduleId: -1,
          sort: 6,
          keepAlive: 1,
          description: null,
          children: true,
        },
      ],
      total: 5,
      pageNumber: '1',
      pageSize: '10',
    },
    code: 0,
    message: '请求成功',
  }
}
const getAdminDictConfig = options => {
  return {
    result: {
      data: [
        {
          id: 66,
          createdAt: '2021-01-16T07:18:57.471Z',
          updatedAt: '2021-01-16T07:18:57.471Z',
          label: '123123123',
          category: '123123',
          description: '123123',
        },
        {
          id: 52,
          createdAt: '2021-01-07T07:27:06.721Z',
          updatedAt: '2021-01-07T07:27:06.721Z',
          label: '666',
          category: '666',
          description: null,
        },
        {
          id: 51,
          createdAt: '2021-01-07T07:26:58.369Z',
          updatedAt: '2021-01-07T07:26:58.369Z',
          label: '555',
          category: '555',
          description: null,
        },
        {
          id: 50,
          createdAt: '2021-01-07T07:26:47.871Z',
          updatedAt: '2021-01-07T07:26:47.871Z',
          label: '44',
          category: '44',
          description: null,
        },
        {
          id: 42,
          createdAt: '2021-01-06T12:03:33.179Z',
          updatedAt: '2021-01-14T00:47:55.000Z',
          label: '1',
          category: '2',
          description: 'ahah',
        },
      ],
      total: 5,
      pageNumber: '1',
      pageSize: '10',
    },
    code: 0,
    message: '请求成功',
  }
}

const getAdminRole = options => {
  return {
    result: {
      data: [
        {
          id: 2,
          createdAt: '2020-11-11T14:31:52.024Z',
          updatedAt: '2021-01-15T12:35:40.000Z',
          title: '系统审计员2q',
          description: 'wdf',
        },
        {
          id: 3,
          createdAt: '2020-11-11T14:32:40.512Z',
          updatedAt: '2021-01-11T01:57:49.000Z',
          title: '系统管理员',
          description: '系统管理员。',
        },
        {
          id: 13,
          createdAt: '2020-11-26T06:28:06.454Z',
          updatedAt: '2021-01-05T09:04:04.000Z',
          title: '草帽团',
          description: '草帽海贼团1',
        },
        {
          id: 15,
          createdAt: '2020-11-28T06:51:56.827Z',
          updatedAt: '2021-01-08T06:10:59.000Z',
          title: '员工',
          description: '员工',
        },
        {
          id: 16,
          createdAt: '2020-11-30T08:17:17.918Z',
          updatedAt: '2020-11-30T08:17:17.918Z',
          title: '船长',
          description: '老大',
        },
        {
          id: 17,
          createdAt: '2020-11-30T08:31:17.816Z',
          updatedAt: '2020-11-30T08:31:17.816Z',
          title: '123',
          description: 'wqe',
        },
        {
          id: 18,
          createdAt: '2020-11-30T14:35:05.463Z',
          updatedAt: '2021-01-11T09:19:28.000Z',
          title: 'baba111',
          description: '',
        },
        {
          id: 19,
          createdAt: '2020-12-04T12:49:08.579Z',
          updatedAt: '2020-12-29T02:45:30.000Z',
          title: '路人王',
          description: '噜噜噜',
        },
        {
          id: 20,
          createdAt: '2020-12-06T15:28:09.200Z',
          updatedAt: '2020-12-16T10:20:52.000Z',
          title: 'nami',
          description: '123',
        },
        {
          id: 21,
          createdAt: '2020-12-09T03:02:46.722Z',
          updatedAt: '2020-12-16T09:19:40.000Z',
          title: '12132123',
          description: '',
        },
      ],
      total: 12,
      pageNumber: '1',
      pageSize: '10',
    },
    code: 0,
    message: '请求成功',
  }
}

Mock.mock(/\/admin\/account/, 'get', getAdminAccount)
Mock.mock(/\/admin\/access/, 'get', getAdminAccess)
Mock.mock(/\/admin\/dict_config/, 'get', getAdminDictConfig)
Mock.mock(/\/admin\/role/, 'get', getAdminRole)
