import { defineComponent, ref } from 'vue'

import { Layout } from 'ant-design-vue'
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons-vue'
import styles from './index.module.scss'

const { Footer: ALayoutFooter } = Layout

export default defineComponent({
  name: 'page-footer',
  components: { ALayoutFooter },
  setup() {
    return () => (
      <>
        <a-layout-footer class={styles.page_footer}>
          <div class={styles.copyright}>
            Copyright <CopyrightOutlined /> 2020{' '}
            <a href="#" target="_blank">
              CCB
            </a>
          </div>
        </a-layout-footer>
      </>
    )
  },
})
