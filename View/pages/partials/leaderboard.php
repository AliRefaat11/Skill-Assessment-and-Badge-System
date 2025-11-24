<div class="bg-gradient-card border border-border shadow-card rounded-xl">
  <div class="px-6 py-4 border-b border-border/50">
    <h3 class="text-2xl font-bold text-foreground flex items-center gap-2">
      <i data-lucide="trophy" class="w-6 h-6 text-warning"></i>
      Top Learners
    </h3>
  </div>
  <div class="p-4 space-y-3">
    <?php
      $leaders = [
        ["rank"=>1, "name"=>"Alex Johnson", "xp"=>12450, "avatar"=>"AJ"],
        ["rank"=>2, "name"=>"Sarah Chen", "xp"=>11280, "avatar"=>"SC"],
        ["rank"=>3, "name"=>"Mike Rodriguez", "xp"=>10950, "avatar"=>"MR"],
        ["rank"=>4, "name"=>"Emma Davis", "xp"=>9870, "avatar"=>"ED"],
        ["rank"=>5, "name"=>"James Wilson", "xp"=>8920, "avatar"=>"JW"],
      ];
      foreach($leaders as $entry):
        $icon = '';
        if($entry['rank']===1){ $icon = '<i data-lucide="trophy" class="w-5 h-5 text-warning"></i>'; }
        elseif($entry['rank']===2){ $icon = '<i data-lucide="medal" class="w-5 h-5 text-muted-foreground"></i>'; }
        elseif($entry['rank']===3){ $icon = '<i data-lucide="award" class="w-5 h-5 text-badge-bronze"></i>'; }
        else { $icon = '<span class="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">'.$entry['rank'].'</span>'; }
    ?>
      <div class="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
        <div class="flex-shrink-0 w-8 flex justify-center"><?= $icon ?></div>
        <div class="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center bg-primary/10 text-primary font-semibold">
          <?= htmlspecialchars($entry['avatar']) ?>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-foreground truncate"><?= htmlspecialchars($entry['name']) ?></p>
          <p class="text-sm text-muted-foreground"><?= number_format($entry['xp']) ?> XP</p>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

