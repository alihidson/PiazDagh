import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/cards/RecipeCard";
import recipeService from "../services/recipeService";
import FilterSidebar from "../components/recipe/FilterSidebar";

const listHeaders = {
  trending: {
    title: "دستورهای پرطرفدار",
    description: "محبوب‌ترین دستورهای این هفته",
  },
  new: {
    title: "دستورهای جدید",
    description: "تازه‌ترین دستورهای اضافه شده",
  },
};

const RecipeListPage = () => {
  const { type, id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState({ title: "دستورها", description: "" });

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSortChange = (newSort) => setSort(newSort);
  const handleReset = () => {
    setFilters({});
    setSort("");
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      const fetchType = id ? `category-${id}` : type;
      const data = await recipeService.getFilteredRecipes(
        fetchType,
        filters,
        sort,
      );
      setRecipes(data);
      setLoading(false);
    }
    load();
  }, [type, id, filters, sort]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-mint" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center text-lg-start mb-4">
        <h2 className="fw-bold text-charcoal section-heading">
          {header.title}
        </h2>
        {header.description && (
          <p className="text-charcoal opacity-75 mt-2">{header.description}</p>
        )}
      </div>
      {/* Active Filter Badges */}
      {(filters.cookTime?.length > 0 ||
        filters.difficulty?.length > 0 ||
        filters.score?.length > 0 ||
        sort) && (
        <div className="d-flex flex-wrap gap-2 mb-3">
          {filters.cookTime?.map((ct) => (
            <span
              key={ct}
              className="badge bg-mint text-white d-flex align-items-center gap-1"
            >
              {ct === "under30"
                ? "<۳۰ دقیقه"
                : ct === "30to60"
                  ? "۳۰-۶۰ دقیقه"
                  : ">۶۰ دقیقه"}
              <button
                className="btn-close btn-close-white"
                style={{ fontSize: "0.5rem" }}
                onClick={() =>
                  handleFilterChange({
                    ...filters,
                    cookTime: filters.cookTime.filter((v) => v !== ct),
                  })
                }
              ></button>
            </span>
          ))}
          {filters.difficulty?.map((d) => (
            <span
              key={d}
              className="badge bg-mint text-white d-flex align-items-center gap-1"
            >
              {d === "easy" ? "آسان" : d === "medium" ? "متوسط" : "سخت"}
              <button
                className="btn-close btn-close-white"
                style={{ fontSize: "0.5rem" }}
                onClick={() =>
                  handleFilterChange({
                    ...filters,
                    difficulty: filters.difficulty.filter((v) => v !== d),
                  })
                }
              ></button>
            </span>
          ))}
          {filters.score?.map((s) => (
            <span
              key={s}
              className="badge bg-mint text-white d-flex align-items-center gap-1"
            >
              ⭐ {s}+
              <button
                className="btn-close btn-close-white"
                style={{ fontSize: "0.5rem" }}
                onClick={() =>
                  handleFilterChange({
                    ...filters,
                    score: filters.score.filter((v) => v !== s),
                  })
                }
              ></button>
            </span>
          ))}
          {sort && (
            <span className="badge bg-plum text-white d-flex align-items-center gap-1">
              {sort === "newest"
                ? "جدیدترین"
                : sort === "oldest"
                  ? "قدیمی‌ترین"
                  : "بالاترین امتیاز"}
              <button
                className="btn-close btn-close-white"
                style={{ fontSize: "0.5rem" }}
                onClick={() => setSort("")}
              ></button>
            </span>
          )}
        </div>
      )}
      {/* Two-column layout */}
      <div className="row g-4">
        {/* Desktop Sidebar – visible on lg+ */}
        <div className="col-lg-3 d-none d-lg-block order-lg-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            sort={sort}
            onSortChange={handleSortChange}
            onReset={handleReset}
          />
        </div>

        {/* Recipe Grid */}
        <div className="col-lg-9 order-lg-1">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="col" key={recipe.id}>
                  <RecipeCard
                    id={recipe.id}
                    slug={recipe.slug}
                    image={recipe.image}
                    title={recipe.title}
                    description={recipe.description}
                    rating={recipe.rating}
                    time={recipe.time}
                    difficulty={recipe.difficulty}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="col-12 text-center py-5">
                  <p className="text-charcoal mb-2">
                    هیچ دستوری با این فیلترها یافت نشد.
                  </p>
                  <button
                    className="btn btn-outline-saffron"
                    onClick={handleReset}
                  >
                    حذف فیلترها
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating filter button – visible below lg */}
      <button
        className="btn btn-saffron rounded-circle shadow d-lg-none position-fixed"
        style={{
          bottom: "1.5rem",
          right: "1.5rem",
          width: "56px",
          height: "56px",
          zIndex: 1040,
        }}
        data-bs-toggle="offcanvas"
        data-bs-target="#filterOffcanvas"
        aria-controls="filterOffcanvas"
      >
        🔍
      </button>

      {/* Offcanvas – slides from right in RTL */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOffcanvas"
        aria-labelledby="filterOffcanvasLabel"
        dir="rtl"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title fw-bold text-mint"
            id="filterOffcanvasLabel"
          >
            فیلترها
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            sort={sort}
            onSortChange={handleSortChange}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
