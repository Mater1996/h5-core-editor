/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-16 18:25:53
 * @Description :
 */
// import animationMixin from '@/mixins/animation.js'

export default {
  // mixins: [animationMixin],
  props: ['element'],
  mounted () {
    this.runAnimations()
  },
  render (h) {
    return (
      <div style={ this.element.getStyle({ position: 'absolute' })}>
        {this.$slots.default}
      </div>
    )
  }
}
