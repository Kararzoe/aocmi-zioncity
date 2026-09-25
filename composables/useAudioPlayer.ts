export const useAudioPlayer = () => {
  const track = useState('audio-track', () => null)
  const playing = useState('audio-playing', () => false)
  const currentTime = useState('audio-time', () => 0)
  const duration = useState('audio-duration', () => 0)
  const volume = useState('audio-volume', () => 1)

  const setTrack = (t) => {
    track.value = t
    playing.value = !!t
    currentTime.value = 0
    duration.value = 0
  }

  const play = () => { playing.value = true }
  const pause = () => { playing.value = false }

  return { track, playing, currentTime, duration, volume, setTrack, play, pause }
}
