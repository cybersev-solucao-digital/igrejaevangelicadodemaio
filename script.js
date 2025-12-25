function toggleMenu(){
  document.getElementById("nav").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", async () => {

  const supabase = window.supabase.createClient(
    "https://qbuttdvrrwcbudqfeesb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidXR0ZHZycndjYnVkcWZlZXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMzk0MjUsImV4cCI6MjA4MTkxNTQyNX0.bihML3Do8M8tMw0G7L_533EMppWX-DrJ1h8b7FqUcPg"
  );

  const grid = document.getElementById("atividadesGrid");

  const { data, error } = await supabase
    .from("atividades")
    .select("*")
    .order("data", { ascending: false });

  if(error){
    console.error("Erro ao carregar posts:", error);
    return;
  }

  if(!data || data.length === 0){
    grid.innerHTML = "<p>Nenhuma atividade disponível.</p>";
    return;
  }

  data.forEach(a => {
    grid.innerHTML += `
      <div class="atividade">
        <img src="${a.imagem_url}" alt="${a.titulo}">
        <div class="atividade-content">
          <h3>${a.titulo}</h3>
          <div class="departamento">${a.departamento}</div>
          <p>${a.descricao}</p>
          <span>${new Date(a.data).toLocaleDateString()}</span>
        </div>
      </div>
    `;
  });

});
/* === Atualização automática inteligente === */

let paginaVisivel = true;

window.addEventListener("focus", () => {
  location.reload();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    paginaVisivel = false;
  }

  if (document.visibilityState === "visible" && !paginaVisivel) {
    paginaVisivel = true;
    location.reload();
  }
});