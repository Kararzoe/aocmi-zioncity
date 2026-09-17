<template>
  <div />
</template>

<style scoped>
.floating-btns {
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}
.float-btn {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
}
.float-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 28px rgba(0,0,0,0.3);
}
.live { background: #FF0000; width: 60px; height: 60px; font-size: 20px; flex-direction: column; gap: 1px; }
.live-label { font-size: 8px; font-weight: 900; letter-spacing: 0.15em; line-height: 1; }

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: pulseRing 2s ease-out infinite;
}
.live .pulse-ring { border: 3px solid #FF0000; }

@keyframes pulseRing {
  0%   { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
}
</style>
