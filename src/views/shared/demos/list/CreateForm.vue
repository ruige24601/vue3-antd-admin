<template>
  <a-modal
    :title="isEdit ? '编辑规则' : '新建规则'"
    :width="640"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="loading">
      <a-form v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item
          v-show="formModel && formModel.id > 0"
          v-bind="validateInfos.id"
          label="主键ID"
        >
          <a-input v-model:value="formModel.id" disabled />
        </a-form-item>
        <a-form-item v-bind="validateInfos.description" label="描述">
          <a-input v-model:value="formModel.description" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.callNo" label="服务调用次数">
          <a-input-number
            v-model:value="formModel.callNo"
            :min="1"
            :max="99"
            style="width: 100%;"
          />
        </a-form-item>
        <a-form-item label="调用状态" v-bind="validateInfos.status">
          <a-select v-model:value="formModel.status" placeholder="请选择状态">
            <a-select-option :value="0">
              关闭
            </a-select-option>
            <a-select-option :value="1">
              运行中
            </a-select-option>
            <a-select-option :value="2">
              已上线
            </a-select-option>
            <a-select-option :value="3">
              异常
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="validateInfos.updatedAt" label="更新时间">
          <a-date-picker
            v-model:value="formModel.updatedAt"
            show-time
            placeholder="请选择更新时间"
            style="width: 100%;"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRaw,
  toRef,
  toRefs,
  watch,
} from 'vue'
import {
  Form,
  Spin,
  Select,
  InputNumber,
  DatePicker,
  message,
  Modal,
  Input,
} from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import * as API from './service'
import moment from 'moment'
import { ServiceDetail } from './data'

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

// @ts-ignore
const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

export default defineComponent({
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Spin.name]: Spin,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [InputNumber.name]: InputNumber,
    [DatePicker.name]: DatePicker,
    [Modal.name]: Modal,
    [Input.name]: Input,
  },
  props: {
    // visible: {
    //   type: Boolean,
    //   required: true,
    // },
    model: {
      type: Object,
      default: () => null,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
    })
    const formModel: ServiceDetail = reactive({
      id: '',
      no: '',
      description: '',
      callNo: '',
      status: '',
      updatedAt: '',
    })
    const formRules = reactive({
      description: [
        { required: true, min: 5, message: '请输入至少五个字符的规则描述！' },
      ],
    })
    const { resetFields, validate, validateInfos } = useForm(
      formModel,
      formRules
    )
    const isEdit = computed(() => {
      if (!props.model || !props.model.id) {
        return false
      } else {
        return true
      }
    })
    const queryServiceDetail = async record => {
      state.loading = true
      const res = await API.queryServiceDetail({
        requestEntity: record,
      }).finally(() => (state.loading = false))
      const updatedAt =
        res.responseEntity.updatedAt && moment(res.responseEntity.updatedAt)
      Object.assign(formModel, res.responseEntity, { updatedAt })
    }
    watch(
      () => props.model,
      () => {
        if (!props.model || !props.model.id) {
          resetFields()
        } else {
          queryServiceDetail(props.model)
        }
      },
      { immediate: true }
    )
    let count = 1
    const handleOk = async () => {
      try {
        await validate()
        state.loading = true
        if (isEdit.value) {
          await API.serviceUpdate({
            requestEntity: formModel,
          })
          message.success('修改成功')
        } else {
          await API.serviceAdd({
            requestEntity: formModel,
          })
          message.success('新增成功')
        }
        emit('update:visible', false)
        emit('submitOk')
      } catch (error) {
        console.warn('error', error)
      } finally {
        state.loading = false
      }
    }

    const handleCancel = () => {
      // formRef.value.resetFields()
      // emit('cancel')
    }
    return {
      ...toRefs(state),
      formLayout,
      handleOk,
      handleCancel,
      validateInfos,
      formModel,
      resetFields,
      isEdit,
    }
  },
})
</script>

<style></style>
