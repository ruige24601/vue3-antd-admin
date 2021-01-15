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
              <a-button
                type="primary"
                @click="$refs.tableRef.refreshTableData()"
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
    >
      <template #serial="{text, record, index}">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #description="{text, record, index}">
        <Ellipsis :length="4" tooltip>{{ text }}</Ellipsis>
      </template>
      <template #status="{text, record, index}">
        <a-badge :status="statusTypeFilter(text)" :text="statusFilter(text)" />
      </template>
      <template #action="{text, record}">
        <a @click="handleEdit(record)">配置</a>
        <a-divider type="vertical" />
        <a @click="handleSub(record)">订阅报警</a>
      </template>
    </StandardTable>
  </div>
</template>

<script lang="ts">
import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'
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
} from 'ant-design-vue'
import { reactive, ref, toRefs } from 'vue'
import {
  UpOutlined,
  DownOutlined,
  PlusOutlined,
  DeleteOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
// import StandardTable from '@/components/standard-table'
// import StandardTable from '@/components/standard-table/table'
import StandardTable from '@/components/StandardTable'
import Ellipsis from '@/components/Ellipsis/index.tsx'
import { getRoleList, getServiceList } from '@/api/manage'

interface State {
  advanced: boolean
  queryParam: any
}

const columns = [
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
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
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

const dataSource = [
  {
    no: 1,
    description: '这是一段描述这是一段描述',
    callNo: 100,
    status: '1',
    updatedAt: '2010-01-01',
  },
]

export default {
  components: {
    // [Row.name]: Row,
    Row,
    [Col.name]: Col,
    Col,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [InputNumber.name]: InputNumber,
    [DatePicker.name]: DatePicker,
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
  },
  setup() {
    const state: State = reactive({
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        id: '',
      },
    })
    const tableRef = ref()

    function toggleAdvanced() {
      state.advanced = !state.advanced
    }

    const statusFilter = type => statusMap[type].text
    const statusTypeFilter = type => statusMap[type].status

    const loadData = parameter => {
      const requestParameters = Object.assign({}, parameter, state.queryParam)
      return getServiceList(requestParameters).then(res => {
        return res
      })
    }
    const handleReset = () => {
      state.queryParam = {}
      tableRef.value.refreshTableData()
    }

    return {
      ...toRefs(state),
      state,
      toggleAdvanced,
      columns,
      dataSource,
      statusFilter,
      statusTypeFilter,
      loadData,
      handleReset,
      tableRef,
    }
  },
}
</script>

<style lang="less">
.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}
</style>
