const Search = () => {
  <form method="get" class="form">
    <input
      type="text"
      name="searchTerm"
      value="@ViewBag.SearchTerm"
      placeholder="Buscar Producto"
    />
    <button type="submit">Buscar</button>
  </form>;
};

