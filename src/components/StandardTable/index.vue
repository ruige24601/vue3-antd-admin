<template>
  <a-table
    v-bind="$props"
    :data-source="dataSource"
    :pagination="pageOption"
    :loading="loading"
    @change="paginationChange"
  >
    <!--  自定义slots start-->
    <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import { Card, Select, Table, Popconfirm, message } from 'ant-design-vue'
import {
  ColumnProps,
  tableProps,
  TableProps,
} from 'ant-design-vue/lib/table/interface'
import { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination'
import { usePages } from '@/hooks'
import { ResultBody, ResponsePagination } from '@/types/base'
import T from 'ant-design-vue/es/table/Table'
import useDragCol from '../dynamic-table/utils/useDragCol'

type PageOption = Partial<typeof PaginationProps>

interface Props extends TableProps {
  rowKey: string | ((record: any) => string)
  pageOption: PageOption
  getListFunc: (prams) => any
}

export default defineComponent({
  name: 'StandardTable',
  props: Object.assign({}, tableProps, {
    getListFunc: {
      // 获取列表数据函数API
      type: Function,
      require: true,
      default: () => () => {},
    },
    pageOption: {
      // 分页参数
      type: Object as PropType<PageOption>,
      default: () => ({}),
    },
  }),
  components: {
    [Table.name]: Table,
  },
  setup(props, { attrs, emit, slots }) {
    const { pageOption } = usePages()
    useDragCol(props.columns)

    const state = reactive({
      dataSource: [], // 表格数据
      pageOption: Object.assign(pageOption, props.pageOption), // 表格分页
      loading: false, // 表格加载
    })

    // 获取表格数据
    const refreshTableData = async (params = {}) => {
      params = {
        pageNumber: state.pageOption.current,
        pageSize: state.pageOption.pageSize,
        ...props.pageOption,
        ...params,
      }
      state.loading = true
      const {
        responseEntity,
        responsePagination,
      }: ResultBody<any> = await props
        .getListFunc?.(params)
        .finally(() => (state.loading = false))
      responsePagination &&
        Object.assign(state.pageOption, {
          pageSize: responsePagination.pageSize,
          total: responsePagination.totalCount,
        })
      state.dataSource = responseEntity
    }

    refreshTableData()

    // 分页改变
    const paginationChange = (pagination, filters, sorter) => {
      state.pageOption = {
        ...state.pageOption,
        ...pagination,
      }
      refreshTableData({
        pageSize: pagination.pageSize,
        pageNumber: pagination.current,
        // ...props.pageOption,
      })
    }

    return {
      ...toRefs(state),
      paginationChange,
      refreshTableData,
    }
  },
})
</script>
