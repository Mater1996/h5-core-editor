import {
  animationOptions,
  animationValue2Name,
  firstLevelAnimationOptions
} from '../../../constants/animation.js'
import EventBus from '../../../bus'

export default {
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
        <div
          defaultActiveKey={animations[0].value}
          onChange={tab => {}}
          style="width:100%;"
          tabBarStyle={{ marginLeft: '-16px' }}
          size="small"
          tabBarGutter={0}
          tabPosition="left"
        >
          {animations.map(group => (
            <div tab={group.label || group.value} key={group.value}>
              <div
                grid={{ gutter: 12, column: 2 }}
                dataSource={group.children}
                renderItem={(item, index) => (
                  <div class="shortcut-button-wrapper">
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
                  </div>
                )}
              ></div>
            </div>
          ))}
        </div>
      )
    },
    renderAvaiableAnimations () {
      return (
        <div
          class="avaiable-animations-tabs"
          defaultActiveKey={firstLevelAnimationOptions[0].label}
          onChange={tab => {}}
          style="width:100%;"
          // tabBarStyle={{}}
          size="small"
          tabBarGutter={0}
        >
          {firstLevelAnimationOptions.map(firstGroup => (
            <div tab={firstGroup.label} key={firstGroup.label}>
              {/* group.label.match(firstGroup.value) <-> !!'abc'.match(/a|e/) === true */}
              {this.renderSecondAnimationTabs(
                animationOptions.filter(
                  group => !!group.label.match(firstGroup.value)
                )
              )}
            </div>
          ))}
        </div>
      )
    },
    renderAnimationOptions (animationOption) {
      return (
        <div layout="horizontal">
          <div
            label={this.$t('editor.editPanel.animation.type')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
          >
            <div
              type="link"
              size="small"
              icon="ordered-list"
              onClick={() => {
                this.drawerVisible = true
              }}
            >
              {this.$t('editor.editPanel.animation.list')}
            </div>
          </div>
          <div
            label={this.$t('editor.editPanel.animation.duration')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <div
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <div
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <input
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </div>
          </div>
          <div
            label={this.$t('editor.editPanel.animation.delay')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <div
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <div
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <input
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </div>
          </div>
          <div
            label={this.$t('editor.editPanel.animation.iteration')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <div
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <div
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginLeft: '4px'
              }}
            >
              <input
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}次(times)`}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </div>
          </div>
          <div
            label={this.$t('editor.editPanel.animation.inifinite')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16, offset: 2 }}
            style="margin-bottom:0;"
          >
            <div
              value={animationOption.infinite}
              onChange={value => {
                animationOption.infinite = value
              }}
            />
          </div>
        </div>
      )
    }
  },
  render (h) {
    return (
      <div class="main-animate widget" id="animation-right-panel">
        <div>
          {/* 添加动画、运行动画 */}
          <button type="primary" onClick={this.addAnimation}>
            {this.$t('editor.editPanel.animation.add')}
          </button>
          <button type="primary" onClick={this.runAnimate}>
            {this.$t('editor.editPanel.animation.run')}
          </button>
        </div>
        <div
          accordion
          class="collapse-wrapper"
          activeKey={'' + this.activeCollapsePanel}
          onChange={key => {
            // 当全部收起来时候，key 为 undefined
            this.activeCollapsePanel = typeof key !== 'undefined' ? +key : -1
          }}
        >
          {this.animationQueue.map((addedAnimation, index) => (
            <div key={`${index}`}>
              <template slot="header">
                {/* #!zh: 动画{index + 1} */}
                {/* #!en: Animation{index + 1}</span> */}
                <span>
                  {this.$t('editor.editPanel.animation.title', {
                    index: index + 1
                  })}
                </span>
                <span color="orange">
                  {animationValue2Name[addedAnimation.type] ||
                    addedAnimation.type}
                </span>
              </template>
              {this.renderAnimationOptions(addedAnimation)}
            </div>
          ))}
        </div>
        <div
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
        </div>
      </div>
    )
  }
}
