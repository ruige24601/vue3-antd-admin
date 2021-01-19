<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <Row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model:value="queryParam.id" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select
                v-model:value="queryParam.status"
                placeholder="请选择"
                default-value="0"
                style="width: 100%"
              >
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number
                  v-model:value="queryParam.callNo"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker
                  v-model:value="queryParam.date"
                  style="width: 100%"
                  placeholder="请输入更新日期"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select
                  v-model:value="queryParam.useStatus"
                  placeholder="请选择"
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="
                (advanced && { float: 'right', overflow: 'hidden' }) || {}
              "
            >
              <a-button type="primary" @click="tableRef.refreshTableData()"
                >查询</a-button
              >
              <a-button style="margin-left: 8px" @click="handleReset"
                >重置</a-button
              >
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <UpOutlined v-if="advanced" />
                <DownOutlined v-else />
              </a>
            </span>
          </a-col>
        </Row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" @click="handleAdd">
        <template #icon><PlusOutlined /></template>新建
      </a-button>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1"><DeleteOutlined />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><LockOutlined />锁定</a-menu-item>
          </a-menu>
        </template>

        <a-button style="margin-left: 8px">
          批量操作 <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>

    <StandardTable
      ref="tableRef"
      size="default"
      rowKey="callNo"
      :columns="columns"
      :getListFunc="loadData"
      bordered
    >
      <template #serial="{index}">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #description="{text}">
        <Ellipsis :length="4" tooltip>{{ text }}</Ellipsis>
      </template>
      <template #status="{text}">
        <a-badge :status="statusTypeFilter(text)" :text="statusFilter(text)" />
      </template>
      <template #action="{record}">
        <a @click="handleEdit(record)">配置</a>
        <a-divider type="vertical" />
        <a>订阅报警</a>
      </template>
    </StandardTable>

    <CreateForm
      ref="createModal"
      v-model:visible="visible"
      :model="mdl"
      @submitOk="tableRef.refreshTableData()"
    ></CreateForm>
  </div>
</template>

<script lang="tsx">
import {
  Row,
  Col,
  Select,
  InputNumber,
  DatePicker,
  Icon,
  Dropdown,
  Menu,
  Badge,
  Divider,
  Input,
  Form,
} from 'ant-design-vue'
import { reactive, ref, toRefs, h } from 'vue'
import {
  UpOutlined,
  DownOutlined,
  PlusOutlined,
  DeleteOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
import StandardTable from '@/components/StandardTable/index.vue'
import Ellipsis from '@/components/Ellipsis'
import * as API from './service'
import CreateForm from './CreateForm.vue'
import { RequestPagination } from '@/types/base'
import { QueryParam, TableItem } from './data'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
interface State {
  mdl: Partial<TableItem>
  advanced: boolean
  queryParam: QueryParam
  visible: boolean
}
interface Column extends ColumnProps {
  slots?: {
    customRender: string
  }
}
const columns: Column[] = [
  {
    title: '#',
    slots: { customRender: 'serial' },
  },
  {
    title: '规则编号',
    dataIndex: 'no',
  },
  {
    title: '描述',
    dataIndex: 'description',
    slots: { customRender: 'description' },
    // customRender: ({ text }) => (
    //   <Ellipsis length={4} tooltip>
    //     {text}
    //   </Ellipsis>
    // ),
    // customRender: ({ text }) => h(Ellipsis, { length: 4 }, text),
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    customRender: ({ text }) => text + ' 次',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    slots: { customRender: 'action' },
  },
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭',
  },
  1: {
    status: 'processing',
    text: '运行中',
  },
  2: {
    status: 'success',
    text: '已上线',
  },
  3: {
    status: 'error',
    text: '异常',
  },
}

const dataSource = {
  key: '1',
  id: '1',
  no: '1',
  description: '这是一段描述',
  callNo: '1',
  status: '1',
  updatedAt: '1',
  editable: false,
}

export default {
  name: 'TableList2',
  components: {
    // [Row.name]: Row,
    Row,
    [Col.name]: Col,
    Col,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [DatePicker.name]: DatePicker,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    UpOutlined,
    DownOutlined,
    PlusOutlined,
    DeleteOutlined,
    LockOutlined,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    StandardTable,
    Ellipsis,
    [Badge.name]: Badge,
    [Divider.name]: Divider,
    CreateForm,
  },
  setup() {
    const state: State = reactive({
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        id: '',
      },
      visible: false,
      mdl: {},
    })
    const tableRef = ref()
    const createModal = ref()

    function toggleAdvanced() {
      state.advanced = !state.advanced
    }

    const statusFilter = type => statusMap[type].text
    const statusTypeFilter = type => statusMap[type].status

    const loadData = (parameter: RequestPagination) => {
      return API.getServiceList({
        requestPagination: {
          ...parameter,
        },
        requestEntity: {
          ...state.queryParam,
        },
      }).then(res => {
        return res
      })
    }
    const handleReset = () => {
      state.queryParam = {}
      tableRef.value.refreshTableData()
    }
    const handleAdd = () => {
      state.mdl = {}
      state.visible = true
    }
    const handleEdit = (record: TableItem) => {
      state.mdl = { ...record }
      state.visible = true
    }

    return {
      ...toRefs(state),
      state,
      toggleAdvanced,
      columns,
      statusFilter,
      statusTypeFilter,
      loadData,
      handleReset,
      tableRef,
      handleAdd,
      handleEdit,
      createModal,
      dataSource,
    }
  },
}
</script>

<style lang="less"></style>
