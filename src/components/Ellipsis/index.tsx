import { cutStrByFullLength, getStrFullLength } from '@/components/_util/util'
import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'

export default defineComponent({
  name: 'Ellipsis',
  // components: {
  //   Tooltip,
  // },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-ellipsis',
    },
    tooltip: {
      type: Boolean,
    },
    length: {
      type: Number,
      required: true,
    },
    lines: {
      type: Number,
      default: 1,
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    function getStrDom(str, fullLength) {
      return (
        <span>
          {cutStrByFullLength(str, props.length) +
            (fullLength > props.length ? '...' : '')}
        </span>
      )
    }
    function getTooltip(fullStr, fullLength) {
      return (
        <Tooltip>
          {{
            title: () => fullStr,
            default: () => getStrDom(fullStr, fullLength),
          }}
        </Tooltip>
      )
    }
    return () => {
      const { tooltip, length } = props
      const str = slots
        .default?.()
        .map(vnode => vnode.children)
        .join('')
      const fullLength = getStrFullLength(str)
      const strDom =
        tooltip && fullLength > length
          ? getTooltip(str, fullLength)
          : getStrDom(str, fullLength)
      return strDom
    }
  },
})
