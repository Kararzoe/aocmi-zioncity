<template>
  <Transition name="player">
    <div v-if="track" :class="['global-player', minimized ? 'minimized' : '']">
      <audio ref="audioEl" :src="track.src" @timeupdate="onTime" @loadedmetadata="onMeta" @ended="onEnded" />

      <!-- Album art + info -->
      <div class="player-info">
        <div class="player-thumb">
          <img v-if="track.img" :src="track.img" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-[#1a237e] flex items-center justify-center">
            <i class="fas fa-music text-white text-xs" />
          </div>
          <div class="thumb-pulse" />
        </div>
        <div v-if="!minimized" class="player-meta">
          <p class="player-title">{{ track.title }}</p>
          <p class="player-sub">AOCMI Zion City</p>
        </div>
      </div>

      <!-- Controls -->
      <div v-if="!minimized" class="player-controls">
        <button @click="skip(-15)" class="ctrl-btn" title="Rewind 15s"><i class="fas fa-rotate-left text-xs" /><span class="text-[8px]">15</span></button>
        <button @click="togglePlay" class="play-btn">
          <i :class="`fas ${playing ? 'fa-pause' : 'fa-play'} ${playing ? '' : 'ml-0.5'}`" />
        </button>
        <button @click="skip(15)" class="ctrl-btn" title="Forward 15s"><i class="fas fa-rotate-right text-xs" /><span class="text-[8px]">15</span></button>
      </div>

      <!-- Progress -->
      <div v-if="!minimized" class="player-progress">
        <span class="time-label">{{ fmt(currentTime) }}</span>
        <input type="range" :max="duration || 100" :value="currentTime" @input="seek" class="progress-bar" />
        <span class="time-label">{{ fmt(duration) }}</span>
      </div>

      <!-- Volume + actions -->
      <div v-if="!minimized" class="player-right">
        <i class="fas fa-volume-up text-white/50 text-xs" />
        <input type="range" min="0" max="1" step="0.05" :value="volume" @input="setVol" class="vol-bar" />
        <a v-if="track.link" :href="track.link" target="_blank" class="ctrl-btn" title="Open Link">
          <i class="fas fa-external-link-alt text-xs" />
        </a>
      </div>

      <!-- Minimize / Close -->
      <div class="player-actions">
        <button @click="minimized = !minimized" class="action-btn" :title="minimized ? 'Expand' : 'Minimize'">
          <i :class="`fas ${minimized ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`" />
        </button>
        <button @click="close" class="action-btn" title="Close">
          <i class="fas fa-times text-xs" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { track, playing, currentTime, duration, volume, play, pause, setTrack } = useAudioPlayer()
const audioEl = ref(null)
const minimized = ref(false)

watch(track, async (t) => {
  if (!t) return
  await nextTick()
  audioEl.value.load()
  audioEl.value.play()
})

watch(playing, (p) => {
  if (!audioEl.value) return
  p ? audioEl.value.play() : audioEl.value.pause()
})

const togglePlay = () => playing.value ? pause() : play()
const onTime = () => { currentTime.value = audioEl.value.currentTime }
const onMeta = () => { duration.value = audioEl.value.duration }
const onEnded = () => { playing.value = false }
const seek = (e) => { audioEl.value.currentTime = e.target.value }
const setVol = (e) => { volume.value = e.target.value; audioEl.value.volume = e.target.value }
const skip = (s) => { audioEl.value.currentTime = Math.max(0, audioEl.value.currentTime + s) }
const close = () => { pause(); setTrack(null) }
const fmt = (s) => { if (!s) return '0:00'; const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, '0')}` }
</script>

<style scoped>
.global-player {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: rgba(10, 17, 40, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  width: min(680px, 95vw);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  color: white;
}
.global-player.minimized {
  width: auto;
  padding: 10px 14px;
  gap: 10px;
}
.player-info { display: flex; align-items: center; gap: 10px; min-width: 0; }
.player-thumb { width: 40px; height: 40px; border-radius: 10px; overflow: hidden; position: relative; shrink: 0; flex-shrink: 0; }
.thumb-pulse { position: absolute; inset: 0; border-radius: 10px; border: 2px solid rgba(99,102,241,0.6); animation: thumbPulse 2s ease-in-out infinite; }
.player-meta { min-width: 0; }
.player-title { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
.player-sub { font-size: 10px; color: rgba(255,255,255,0.4); }
.player-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.ctrl-btn { display: flex; flex-direction: column; align-items: center; color: rgba(255,255,255,0.6); hover:color: white; background: none; border: none; cursor: pointer; padding: 4px; transition: color 0.2s; }
.ctrl-btn:hover { color: white; }
.play-btn { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #4f46e5); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 4px 12px rgba(99,102,241,0.4); transition: transform 0.2s; }
.play-btn:hover { transform: scale(1.08); }
.player-progress { flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0; }
.time-label { font-size: 10px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
.progress-bar { flex: 1; height: 3px; accent-color: #6366f1; cursor: pointer; }
.player-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.vol-bar { width: 60px; height: 3px; accent-color: #6366f1; cursor: pointer; }
.player-actions { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
.action-btn { background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer; padding: 2px; transition: color 0.2s; }
.action-btn:hover { color: white; }

.player-enter-active, .player-leave-active { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
.player-enter-from, .player-leave-to { opacity: 0; transform: translateX(-50%) translateY(80px); }

@keyframes thumbPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
</style>
