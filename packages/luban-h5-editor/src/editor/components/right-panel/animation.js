import {
  animationOptions,
  animationValue2Name,
  firstLevelAnimationOptions
} from '@/constants/animation.js'
import EventBus from '@/bus'
import {
  Tabs,
  List,
  Form,
  Button,
  Popover,
  Slider,
  Switch,
  Collapse,
  Icon,
  Drawer,
  InputNumber,
  Tag
} from 'ant-design-vue'

export default {
  components: {
    [InputNumber.name]: InputNumber,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Tabs.name]: Tabs,
    [Form.name]: Form,
    [Button.name]: Button,
    [Popover.name]: Popover,
    [Slider.name]: Slider,
    [Switch.name]: Switch,
    [Collapse.name]: Collapse,
    [Collapse.Panel.name]: Collapse.Panel,
    [Icon.name]: Icon,
    [Drawer.name]: Drawer,
    [Tabs.TabPane.name]: Tabs.TabPane,
    [Button.Group.name]: Button.Group,
    [Form.Item.name]: Form.Item,
    [Tag.name]: Tag
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    animationQueue () {
      return this.value || []
    }
  },
  data: () => ({
    activeCollapsePanel: 0,
    activePreviewAnimation: '',
    drawerVisible: false
  }),
  methods: {
    addAnimation () {
      this.animationQueue.push({
        type: '',
        duration: 1,
        delay: 0,
        interationCount: 1,
        infinite: false
      })
      this.activeCollapsePanel = this.animationQueue.length - 1
      this.$emit('change', this.animationQueue)
    },
    deleteAnimate (index) {
      this.animationQueue.splice(index, 1)
      this.$emit('change', this.animationQueue)
    },
    updateAnimation (type) {
      const activeAnimationQueue = this.animationQueue[this.activeCollapsePanel]
      if (activeAnimationQueue) {
        activeAnimationQueue.type = type
      }
      this.drawerVisible = false
      this.$emit('change', this.animationQueue)
    },
    runAnimate () {
      EventBus.$emit('RUN_ANIMATIONS')
    },
    renderSecondAnimationTabs (animations) {
      return (
        <a-tabs
          defaultActiveKey={animations[0].value}
          onChange={tab => {}}
          style="width:100%;"
          tabBarStyle={{ marginLeft: '-16px' }}
          size="small"
          tabBarGutter={0}
          tabPosition="left"
        >
          {animations.map(group => (
            <a-tab-pane tab={group.label || group.value} key={group.value}>

              <a-list
                grid={{ gutter: 12, column: 2 }}
                dataSource={group.children}
                renderItem={(item, index) => (
                  <a-list-item class="shortcut-button-wrapper">
                    <div
                      onClick={() => this.updateAnimation(item.value)}
                      class={[
                        'shortcut-button',
                        this.activePreviewAnimation === item.value &&
                      `${item.value} animated`
                      ]}
                      onMouseenter={e => {
                        this.activePreviewAnimation = item.value
                      }}
                      onMouseleave={() => {}}
                    >
                      {item.label}
                    </div>
                  </a-list-item>
                )}
              ></a-list>
            </a-tab-pane>
          ))}
        </a-tabs>
      )
    },
    renderAvaiableAnimations () {
      return (
        <a-tabs
          class="avaiable-animations-tabs"
          defaultActiveKey={firstLevelAnimationOptions[0].label}
          onChange={tab => {}}
          style="width:100%;"
          // tabBarStyle={{}}
          size="small"
          tabBarGutter={0}
        >
          {firstLevelAnimationOptions.map(firstGroup => (
            <a-tab-pane tab={firstGroup.label} key={firstGroup.label}>
              {/* group.label.match(firstGroup.value) <-> !!'abc'.match(/a|e/) === true */}
              {this.renderSecondAnimationTabs(
                animationOptions.filter(
                  group => !!group.label.match(firstGroup.value)
                )
              )}
            </a-tab-pane>
          ))}
        </a-tabs>
      )
    },
    renderAnimationOptions (animationOption) {
      return (
        <a-form layout="horizontal">
          <a-form-item
            label={this.$t('editor.editPanel.animation.type')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
          >
            <a-button
              type="link"
              size="small"
              icon="ordered-list"
              onClick={() => {
                this.drawerVisible = true
              }}
            >
              {this.$t('editor.editPanel.animation.list')}
            </a-button>
          </a-form-item>
          <a-form-item
            label={this.$t('editor.editPanel.animation.duration')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <a-form-item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </a-form-item>
            <a-form-item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label={this.$t('editor.editPanel.animation.delay')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <a-form-item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </a-form-item>
            <a-form-item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label={this.$t('editor.editPanel.animation.iteration')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <a-form-item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </a-form-item>
            <a-form-item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}次(times)`}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item
            label={this.$t('editor.editPanel.animation.inifinite')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <a-switch
              value={animationOption.infinite}
              onChange={value => {
                animationOption.infinite = value
              }}
            />
          </a-form-item>
        </a-form>
      )
    }
  },
  render (h) {
    return (
      <div class="main-animate widget" id="animation-right-panel">
        <a-button-group>
          {/* 添加动画、运行动画 */}
          <a-button type="primary" onClick={this.addAnimation}>
            <a-icon type="plus" />
            {this.$t('editor.editPanel.animation.add')}
          </a-button>
          <a-button type="primary" onClick={this.runAnimate}>
            {this.$t('editor.editPanel.animation.run')}
            <a-icon type="right-circle" />
          </a-button>
        </a-button-group>
        <a-collapse
          accordion
          class="collapse-wrapper"
          activeKey={'' + this.activeCollapsePanel}
          onChange={key => {
            // 当全部收起来时候，key 为 undefined
            this.activeCollapsePanel = typeof key !== 'undefined' ? +key : -1
          }}
        >
          {this.animationQueue.map((addedAnimation, index) => (
            <a-collapse-panel key={`${index}`}>
              <template slot="header">
                {/* #!zh: 动画{index + 1} */}
                {/* #!en: Animation{index + 1}</span> */}
                <span>
                  {this.$t('editor.editPanel.animation.title', {
                    index: index + 1
                  })}
                </span>
                <a-tag color="orange">
                  {animationValue2Name[addedAnimation.type] ||
                    addedAnimation.type}
                </a-tag>
                <a-icon
                  type="delete"
                  onClick={() => this.deleteAnimate(index)}
                  title="删除动画"
                ></a-icon>
              </template>
              {this.renderAnimationOptions(addedAnimation)}
            </a-collapse-panel>
          ))}
        </a-collapse>
        <a-drawer
          title="请选择动画"
          placement="left"
          closable={true}
          onClose={() => {
            this.drawerVisible = false
          }}
          width="100%"
          visible={this.drawerVisible}
          wrapStyle={{ position: 'absolute' }}
          getContainer={false}
        >
          <div>{this.renderAvaiableAnimations()}</div>
        </a-drawer>
      </div>
    )
  }
}
