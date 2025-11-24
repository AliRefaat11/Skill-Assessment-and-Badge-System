<?php include __DIR__.'/../includes/head.php'; ?>
<?php if (empty($_SESSION['user'])) { header('Location: auth.php?tab=login'); exit; } ?>

<div class="min-h-screen bg-background">
  <header class="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
          <i data-lucide="book-open" class="w-6 h-6 text-white"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p class="text-xs text-muted-foreground">Manage your platform</p>
        </div>
      </div>
      <a href="logout.php" class="inline-flex items-center px-3 py-2 rounded-md border border-border">
        <i data-lucide="log-out" class="w-4 h-4 mr-2"></i> Logout
      </a>
    </div>
  </header>

    <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div class="grid grid-cols-3 w-full max-w-xl gap-2">
      <button data-tab="courses" data-group="admin-tabs" class="px-3 py-2 rounded-md pill pill-active flex items-center justify-center gap-2">
        <i data-lucide="book-open" class="w-4 h-4"></i> Add Courses
      </button>
      <button data-tab="questions" data-group="admin-tabs" class="px-3 py-2 rounded-md pill text-muted-foreground flex items-center justify-center gap-2">
        <i data-lucide="clipboard-list" class="w-4 h-4"></i> Manage Questions
      </button>
      <button data-tab="users" data-group="admin-tabs" class="px-3 py-2 rounded-md pill text-muted-foreground flex items-center justify-center gap-2">
        <i data-lucide="users" class="w-4 h-4"></i> View Users
      </button>
    </div>

    <div data-tab-content="courses" data-group="admin-tabs" class="space-y-4">
      <div class="bg-gradient-card border subtle-border rounded-xl shadow-card">
        <div class="px-6 py-4 border-b border-border/50">
          <h3 class="text-2xl text-foreground">Add New Course</h3>
          <p class="text-muted-foreground">Create and manage courses for your platform</p>
        </div>
        <div class="p-6 space-y-4">
          <form id="form-add-course" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm" for="course-title">Course Title</label>
              <input id="course-title" class="w-full input rounded-md px-3 py-2 border" placeholder="e.g. JavaScript Basics">
            </div>
            <div class="space-y-2">
              <label class="text-sm" for="course-category">Category</label>
              <input id="course-category" class="w-full input rounded-md px-3 py-2 border" placeholder="e.g. Programming">
            </div>
            <div class="space-y-2 md:col-span-2">
              <label class="text-sm" for="course-description">Description</label>
              <textarea id="course-description" class="w-full input rounded-md px-3 py-2 border" rows="3" placeholder="Brief course description"></textarea>
            </div>
            <div class="space-y-2">
              <label class="text-sm" for="course-time">Estimated Time</label>
              <input id="course-time" class="w-full input rounded-md px-3 py-2 border" placeholder="2 hours">
            </div>
            <div class="space-y-2">
              <label class="text-sm" for="course-difficulty">Difficulty</label>
              <select id="course-difficulty" class="w-full input rounded-md px-3 py-2 border" data-custom-select>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <button type="button" id="btn-add-course" class="px-4 py-2 rounded-md btn-primary">Add Course</button>
            </div>
          </form>
          <div id="course-list" class="space-y-3"></div>
        </div>
      </div>
    </div>

    <div data-tab-content="questions" data-group="admin-tabs" class="space-y-4 hidden">
      <div class="bg-gradient-card border subtle-border rounded-xl shadow-card">
        <div class="px-6 py-4 border-b border-border/50">
          <h3 class="text-2xl text-foreground">Manage Questions</h3>
          <p class="text-muted-foreground">Add, edit, and organize quiz questions</p>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm" for="select-course">Select Course</label>
              <select id="select-course" class="w-full input rounded-md px-3 py-2 border" data-custom-select></select>
            </div>
            <div class="space-y-2">
              <label class="text-sm" for="question-text">Question</label>
              <input id="question-text" class="w-full input rounded-md px-3 py-2 border" placeholder="Type your question">
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm">Options</label>
            <div id="options" class="space-y-2">
              <div class="flex gap-2">
                <input class="flex-1 input rounded-md px-3 py-2 border" placeholder="Option 1">
                <input type="radio" name="correct" checked>
              </div>
              <div class="flex gap-2">
                <input class="flex-1 input rounded-md px-3 py-2 border" placeholder="Option 2">
                <input type="radio" name="correct">
              </div>
            </div>
            <button type="button" id="btn-add-option" class="px-3 py-1 rounded-md border border-border">Add Option</button>
          </div>
          <button type="button" id="btn-add-question" class="px-4 py-2 rounded-md btn-primary">Add Question</button>
          <div id="question-list" class="space-y-3"></div>
        </div>
      </div>
    </div>

    <div data-tab-content="users" data-group="admin-tabs" class="space-y-4 hidden">
      <div class="bg-gradient-card border subtle-border rounded-xl shadow-card">
        <div class="px-6 py-4 border-b border-border/50">
          <h3 class="text-2xl text-foreground">User Management</h3>
          <p class="text-muted-foreground">View and manage platform users</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center rounded-lg border-2 dashed border-border bg-white/5">
            <div class="text-center space-y-2">
              <i data-lucide="users" class="w-12 h-12 mx-auto text-muted-foreground"></i>
              <p class="text-muted-foreground">User management interface</p>
              <p class="text-sm text-muted-foreground">(Coming soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__.'/../includes/footer.php'; ?>

