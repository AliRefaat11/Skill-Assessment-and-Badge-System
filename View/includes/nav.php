<nav class="w-full sticky top-0 z-40 bg-card/70 backdrop-blur border-b border-border">
  <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/newnewnew/joy-sparkle-theme-main/static-php/index.php" class="inline-flex items-center gap-3">
      <span class="nav-logo">
        <i data-lucide="zap" class="w-5 h-5"></i>
      </span>
      <span class="font-semibold">Rankify</span>
    </a>
    <div class="flex items-center gap-4 text-sm">
      <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/index.php">Home</a>
      <?php if(!empty($_SESSION['user'])): ?>
        <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/profile.php">Profile</a>
        <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/admin.php">Admin</a>
        <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/logout.php">Logout</a>
      <?php else: ?>
        <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/auth.php?tab=login">Login</a>
        <a class="hover:underline" href="/newnewnew/joy-sparkle-theme-main/static-php/auth.php?tab=signup">Sign Up</a>
      <?php endif; ?>
    </div>
  </div>
</nav>