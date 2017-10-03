<template>
  <div class="layer">
    <img ref="img" :src="pic" draggable="false">
  </div>
</template>

<script>
import Hammer from "hammerjs"
export default {
  name: 'layer',
  data () {
    return {
      pic: './static/images/content/origin.jpg',
      START_X: 0,
      START_Y: 0,
      ticking: false,
    }
  },
  methods: {
    dragstart(){
      return false;
    }
  },
  mounted () {
    var img = document.querySelector("#gffn img");
    img.ondragstart = function(){return false;};

    var reqAnimationFrame = (function () {
      return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    var screen = document.querySelector("#origin");
    var el = document.querySelector("#gffn");

    var transform;

    var mc = new Hammer.Manager(el);

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

    mc.on("panstart panmove", onPan);
    mc.on("panend", onPanEnd);
    mc.on("rotatestart rotatemove", onRotate);
    mc.on("rotateend", onRotateEnd);
    mc.on("pinchstart pinchmove", onPinch);
    mc.on("pinchend", onPinchEnd);

    function resetElement() {
      transform = {
        translate: { x: START_X, y: START_Y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
      };
      requestElementUpdate();
    }

    function updateElementTransform() {
      var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
      ];

      value = value.join(" ");
      el.style.webkitTransform = value;
      el.style.mozTransform = value;
      el.style.transform = value;
      ticking = false;
    }

    function requestElementUpdate() {
      if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
      }
    }

    function onPan(ev) {
      el.className = '';
      transform.translate = {
        x: START_X + ev.deltaX,
        y: START_Y + ev.deltaY
      };
      requestElementUpdate();
    }
    function onPanEnd (ev) {
      el.className = '';
      transform.translate = {
        x: START_X + ev.deltaX,
        y: START_Y + ev.deltaY
      };
      requestElementUpdate();
    }

    var initScale = 1;
    function onPinch(ev) {
      if(ev.type == 'pinchstart') {
        initScale = transform.scale || 1;
      }

      el.className = '';
      transform.scale = initScale * ev.scale;

      requestElementUpdate();
    }

    var initAngle = 0;
    function onRotate(ev) {
      if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
      }

      el.className = '';
      transform.rz = 1;
      transform.angle = initAngle + ev.rotation;

      requestElementUpdate();
    }
    resetElement();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
