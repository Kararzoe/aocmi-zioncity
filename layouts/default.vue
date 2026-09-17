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
  </div>
</template>
