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
  </div>
</template>
