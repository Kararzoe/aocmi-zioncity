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
  </div>
</template>
