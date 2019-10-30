import $ from '../../utils/dom';
import Support from '../../utils/support';
import Utils from '../../utils/utils';

const Channel = {
  setTranslate(translate) {
    const swiper = this;
    const {
      slides, rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress,
    } = swiper;
    console.log("shift of wrapper component = ", translate);
    console.log("total slide number = ", slides.length);
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;
      console.log("i = ", i, "progress = ", progress);
    }
/*
    const swiper = this;
    const {
      rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress,
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
    }
*/
  },
  setTransition(duration) {
    const swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

export default {
  name: 'effect-channel',
  params: {
    channelEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      channelEffect: {
        setTranslate: Channel.setTranslate.bind(swiper),
        setTransition: Channel.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'channel') return;

      swiper.classNames.push(`${swiper.params.containerModifierClass}channel`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate(translate) {
      const swiper = this;
      if (swiper.params.effect !== 'channel') return;
      swiper.channelEffect.setTranslate(translate);
    },
    setTransition(duration) {
      const swiper = this;
      if (swiper.params.effect !== 'channel') return;
      swiper.channelEffect.setTransition(duration);
    },
  },
};
