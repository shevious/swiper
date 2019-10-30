import $ from '../../utils/dom';
import Support from '../../utils/support';
import Utils from '../../utils/utils';

const Book = {
  setTranslate(translate) {
    const swiper = this;
    const {
      slides, rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress,
    } = swiper;
    console.log("translate=", translate, "progress = ", swiper.progress);
    //console.log("animating=", swiper.animating);
    //console.log("maxTranslate=",swiper.maxTranslate(), "minTranslate=", swiper.minTranslate());
    if (swiper.bookEffect.touchFlag == 1 && translate < -200) {
      swiper.translate = -200;
      translate = swiper.translate;
      swiper.updateProgress(translate);
    }
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
    
      
/*
    console.log("shift of wrapper component = ", translate);
    console.log("total slide number = ", slides.length);
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;
      console.log("i = ", i, "progress = ", progress);
    }
*/
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
  touchStart(touchstart) {
    const swiper = this;
    swiper.bookEffect.touchFlag = 1;
    console.log('### touchstart');
  },
  touchEnd() {
    const swiper = this;
    console.log('### touchEnd touchFlag =', swiper.bookEffect.touchFlag);
    swiper.bookEffect.touchFlag = 0;
  },
};

export default {
  name: 'effect-book',
  params: {
    bookEffect: {
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
      bookEffect: {
        setTranslate: Book.setTranslate.bind(swiper),
        setTransition: Book.setTransition.bind(swiper),
        touchStart: Book.touchStart.bind(swiper),
        touchEnd: Book.touchEnd.bind(swiper),
        touchFlag: 0,
      },
    });
  },
  on: {
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;

      swiper.classNames.push(`${swiper.params.containerModifierClass}book`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate(translate) {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;
      swiper.bookEffect.setTranslate(translate);
    },
    setTransition(duration) {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;
      swiper.bookEffect.setTransition(duration);
    },
    touchStart(touchstart) {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;
      swiper.bookEffect.touchStart(touchstart);
    },
    touchEnd() {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;
      swiper.bookEffect.touchEnd();
    },
    progress(pp) {
      const swiper = this;
      if (swiper.params.effect !== 'book') return;
      //swiper.bookEffect.touchEnd();
      //console.log("### progress=", pp);
    },
  },
};
