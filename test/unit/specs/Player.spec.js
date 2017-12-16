import Vue from 'vue'
import Player from '@/components/Player'

describe('Player.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Player)
    const vm = new Constructor().$mount()
    expect(vm.$el.className).toBe('container')
    expect(vm.$el.querySelector('.header .title').textContent).toEqual(`Creeper's Player`)
    expect(vm.$el.querySelector('.metadata .music-title').textContent).toEqual(' ')
  })
})
