/* 通用灯箱：点击 .ex 内的视频/图片放大查看，Esc 或点击遮罩关闭 */
(function(){
  function open(el){
    var isVid = el.tagName === 'VIDEO';
    var box = document.createElement('div');
    box.className = 'lbox';
    var media;
    if (isVid) {
      media = document.createElement('video');
      media.src = el.currentSrc || el.src;
      media.controls = true; media.autoplay = true; media.loop = true; media.muted = false;
    } else {
      media = document.createElement('img');
      media.src = el.currentSrc || el.src;
    }
    box.appendChild(media);
    var cap = document.createElement('div');
    var title = el.closest('.ex') ? el.closest('.ex').querySelector('b') : null;
    cap.className = 'cap';
    cap.textContent = title ? title.textContent : '';
    box.appendChild(cap);
    var x = document.createElement('span');
    x.className = 'x'; x.textContent = '✕';
    box.appendChild(x);
    function close(){
      box.classList.remove('on');
      setTimeout(function(){ if(box.parentNode) box.parentNode.removeChild(box); }, 250);
      document.removeEventListener('keydown', esc);
    }
    function esc(e){ if(e.key === 'Escape') close(); }
    box.addEventListener('click', close);
    x.addEventListener('click', function(e){ e.stopPropagation(); close(); });
    document.addEventListener('keydown', esc);
    document.body.appendChild(box);
    requestAnimationFrame(function(){ box.classList.add('on'); });
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('video, img') : null;
    if (t && t.closest('.ex')) {
      e.preventDefault();
      if (t.tagName === 'VIDEO' && !t.paused) t.pause();
      open(t);
    }
  });
})();
