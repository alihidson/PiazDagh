import { useState } from "react";

// Data for filters (could be moved to a separate file later)
const cookTimeOptions = [
  { value: "under30", label: "کمتر از ۳۰ دقیقه" },
  { value: "30to60", label: "۳۰ تا ۶۰ دقیقه" },
  { value: "over60", label: "بیش از ۶۰ دقیقه" },
];

const difficultyOptions = [
  { value: "easy", label: "آسان" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "سخت" },
];

const scoreOptions = [
  { value: "4.5", label: "۴.۵ و بالاتر" },
  { value: "4.0", label: "۴.۰ و بالاتر" },
  { value: "3.5", label: "۳.۵ و بالاتر" },
];

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "highest", label: "بالاترین امتیاز" },
];

const FilterSidebar = ({
  filters,
  onFilterChange,
  sort,
  onSortChange,
  onReset,
}) => {
  const handleCheckboxChange = (category, value) => (e) => {
    const updated = e.target.checked
      ? [...(filters[category] || []), value]
      : (filters[category] || []).filter((v) => v !== value);
    onFilterChange({ ...filters, [category]: updated });
  };

  const handleSortChange = (value) => {
    onSortChange(value);
  };

  return (
    <div className="card bg-canvas border-0 shadow-sm">
      <div className="card-body p-4">
        <h5 className="fw-bold text-mint mb-4 text-start">فیلترها</h5>

        {/* Cook Time */}
        <div className="mb-4">
          <h6 className="text-charcoal fw-bold mb-2 text-start">⏱ زمان پخت</h6>
          {cookTimeOptions.map((opt) => (
            <div className="form-check text-start" key={opt.value}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`time-${opt.value}`}
                checked={(filters.cookTime || []).includes(opt.value)}
                onChange={handleCheckboxChange("cookTime", opt.value)}
                style={{ accentColor: "#e88427", marginRight: "0" }}
              />
              <label
                className="form-check-label text-charcoal"
                htmlFor={`time-${opt.value}`}
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <h6 className="text-charcoal fw-bold mb-2 text-start">👨‍🍳 سختی</h6>
          {difficultyOptions.map((opt) => (
            <div className="form-check text-start" key={opt.value}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`diff-${opt.value}`}
                checked={(filters.difficulty || []).includes(opt.value)}
                onChange={handleCheckboxChange("difficulty", opt.value)}
                style={{ accentColor: "#e88427", marginRight: "0" }}
              />
              <label
                className="form-check-label text-charcoal"
                htmlFor={`diff-${opt.value}`}
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="mb-4">
          <h6 className="text-charcoal fw-bold mb-2 text-start">⭐ امتیاز</h6>
          {scoreOptions.map((opt) => (
            <div className="form-check text-start" key={opt.value}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`score-${opt.value}`}
                checked={(filters.score || []).includes(opt.value)}
                onChange={handleCheckboxChange("score", opt.value)}
                style={{ accentColor: "#e88427", marginRight: "0" }}
              />
              <label
                className="form-check-label text-charcoal"
                htmlFor={`score-${opt.value}`}
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>

        <hr className="text-charcoal" style={{ opacity: 0.15 }} />

        {/* Sort By */}
        <div className="mb-4">
          <h6 className="text-charcoal fw-bold mb-2 text-start">
            📋 مرتب‌سازی
          </h6>
          {sortOptions.map((opt) => (
            <div className="form-check text-start" key={opt.value}>
              <input
                className="form-check-input"
                type="radio"
                name="sortBy"
                id={`sort-${opt.value}`}
                checked={sort === opt.value}
                onChange={() => handleSortChange(opt.value)}
                style={{ accentColor: "#50ad95", marginRight: "0" }}
              />
              <label
                className="form-check-label text-charcoal"
                htmlFor={`sort-${opt.value}`}
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>

        {/* Reset */}
        <button onClick={onReset} className="btn btn-outline-saffron w-100">
          حذف فیلترها
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
