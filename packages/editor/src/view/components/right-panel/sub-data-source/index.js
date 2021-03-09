/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-08 17:32:12
 * @Description: 订阅数据源
 */

// import Table from '../../../../components/table'

export default {
  props: {
    subDataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentSubDataSource: ''
    }
  },
  methods: {
    _handleAddSubDataSource () {
      this.$emit('change', [...this.subDataSource, this.currentSubDataSource])
    }
  },
  render () {
    return (
      <div>
        <input
          class="inline-block border mr-2 text-xs h-7"
          v-model={this.currentSubDataSource}
        />
        <button
          class="inline-block border bg-green-600 text-xs p-1 px-2 text-center text-white"
          onClick={this._handleAddSubDataSource}
        >
          添加
        </button>
        <div>
          {...this.subDataSource.map(v => {
            return <p>{v}</p>
          })}
        </div>
        {/* <Table/> */}
      </div>
    )
  }
}
