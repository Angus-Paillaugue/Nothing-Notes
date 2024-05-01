<script>
  import { Button, Icon } from '$lib/components';
</script>

<section class="h-screen w-full flex flex-col items-center justify-center gap-4">
  <h1 class="text-4xl">Nothing Notes</h1>
  <p>A minimalist note-taking app that helps you focus on what matters.</p>

  <Button href="/log-in">Get Started</Button>
</section>


<section class="flex flex-col items-center justify-center py-14">
  <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-3 w-full">
    <div class="flex flex-col gap-2 items-center text-center">
      <Icon name="pen" class="size-14" />
      <h2>Create Notes</h2>
      <p>Jot down your thoughts, ideas, and reminders with ease.</p>
    </div>
    <div class="flex flex-col gap-2 items-center text-center">
      <Icon name="pin" class="size-14" />
      <h2>Organize Ideas</h2>
      <p>Keep your notes organized and easy to find.</p>
    </div>
    <div class="flex flex-col gap-2 items-center text-center">
      <Icon name="cloud" class="size-14" />
      <h2>Sync Everywhere</h2>
      <p>Access your notes from any device, anywhere.</p>
    </div>
  </div>
</section>
