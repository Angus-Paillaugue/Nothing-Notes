<script>
  import "../app.css";
  import { Navbar } from "$lib/components/";
</script>

<div class="max-w-screen-lg mx-auto relative">
  <Navbar />

  <slot />
</div>
