<template>
  <div>
    <AnnouncementBanner />
    <TheNavbar />
    <main>
      <slot />
    </main>
    <TheFooter />
    <BackToTop />
    <ToastContainer />
    <InstallBanner />
    <FloatingButtons />
    <GlobalAudioPlayer />
  </div>
</template>
